import { useEffect, useState } from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

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
      <Box display={"flex"} justifyContent={"center"} p={"5"}>
        <Stack>
          <HStack>
            <WalletMultiButton />
            <WalletDisconnectButton />
          </HStack>
          {publicKey ? (
            <Text fontSize="2xl" fontWeight={"bold"} color="#444444">
              {(balance || 0) / 1e9} SOL
            </Text>
          ) : null}
          {publicKey ? (
            <>
              <Button
                onClick={() => setShowTransModal(true)}
                colorScheme="orange"
              >
                Send Transaction
              </Button>
              <Button
                onClick={() => setShowAirdropModal(true)}
                colorScheme="blue"
              >
                Request Air Drop
              </Button>
            </>
          ) : null}
        </Stack>
      </Box>
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Receiver SOL Address"
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Amount</FormLabel>
            <Input
              value={amount || ""}
              onChange={(e) => setAmount(sanitizeDecimalInput(e.target.value))}
              placeholder="Amount in SOL"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={handleSend}
            colorScheme="blue"
            mr={3}
            isLoading={isLoading}
          >
            Send
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
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
