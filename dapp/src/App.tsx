import { useEffect, useState } from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { FiNavigation } from "react-icons/fi";
import { FiArrowDown } from "react-icons/fi";

function App() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [balance, setBalance] = useState<number>();
  const [showTransModal, setShowTransModal] = useState<boolean>(false);
  const [showAirdropModal, setShowAirdropModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendSOLTransaction = async (address: string, amount: number) => {
    setIsLoading(true);
    if (!publicKey) throw new WalletNotConnectedError();

    // 890880 lamports as of 2022-09-01
    const lamports = amount * 1e9;
    const toPubkey = new PublicKey(address);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: toPubkey,
        lamports,
      })
    );

    try {
      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();

      const signature = await sendTransaction(transaction, connection, {
        minContextSlot,
      });

      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendAirdrop = async (address: string, amount: number) => {
    setIsLoading(true);
    if (!publicKey) throw new WalletNotConnectedError();
    const toPublicKey = new PublicKey(address);

    try {
      await connection.requestAirdrop(toPublicKey, amount * 1e9);
      getCurrentBalance();

      console.log("Airdrop successfull");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentBalance = async () => {
    if (!publicKey) {
      throw new WalletNotConnectedError();
    }

    const bal = await connection.getBalance(publicKey);

    setBalance(bal);
  };

  useEffect(() => {
    getCurrentBalance();
  }, [publicKey]);

  return (
    <>
      <div className="flex justify-center p-6">
        <div className="flex flex-col gap-y-5">
          <div className="flex gap-x-2">
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
          {publicKey ? (
            <p className="text-2xl font-bold">{(balance || 0) / 1e9} SOL</p>
          ) : null}
          {publicKey ? (
            <div className="flex flex-col gap-y-2">
              <Button
                onClick={() => setShowTransModal(true)}
                color="warning"
                startContent={<FiNavigation />}
              >
                Send Transaction
              </Button>
              <Button
                onClick={() => setShowAirdropModal(true)}
                color="primary"
                startContent={<FiArrowDown />}
              >
                Request Air Drop
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      <FormModal
        isOpen={showTransModal}
        onClose={() => setShowTransModal(false)}
        onSend={sendSOLTransaction}
        title="Send Transaction"
      />
      <FormModal
        isOpen={showAirdropModal}
        onClose={() => setShowAirdropModal(false)}
        onSend={sendAirdrop}
        title="Request Airdrop"
        isLoading={isLoading}
      />
    </>
  );
}
type FormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSend: (address: string, amount: number) => Promise<void>;
  isLoading?: boolean;
};
const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  title,
  onSend,
  isLoading,
}) => {
  const [amount, setAmount] = useState<number | null>();

  const [address, setAddress] = useState<string>();

  const handleSend = () => {
    if (!amount || !address) {
      console.error("Invalid amount or address", amount, address);
      return;
    }

    onSend(address, amount);
    setAmount(null);
    setAddress("");
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="top-center"
      isDismissable={false}
      //  backdrop="opaque"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <Input
                //variant="bordered"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                label="Receiver SOL Address"
              />
              <Input
                label="Amount in SOL"
                //variant="bordered"
                value={amount?.toString() || ""}
                onChange={(e) =>
                  setAmount(sanitizeDecimalInput(e.target.value))
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={handleSend}
                color="primary"
                isLoading={isLoading}
              >
                Send
              </Button>
              <Button color="danger" variant="flat" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

function sanitizeDecimalInput(input: string) {
  // Use a regular expression to match unsigned decimal values (e.g., 123, 123.45)
  const sanitizedInput = input.match(/^\d*\.?\d*$/);

  // If the input matches the regex, return it; otherwise, return an empty string or null
  return sanitizedInput ? Number(sanitizedInput[0]) : 0;
}

export default App;
