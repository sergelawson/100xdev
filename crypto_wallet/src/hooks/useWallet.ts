import { Keypair } from "@solana/web3.js";
//import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";

import {
  generateMnemonic,
  mnemonicToEntropy,
  entropyToMnemonic,
  validateMnemonic,
  mnemonicToSeed,
} from "web-bip39";
import wordlist from "web-bip39/wordlists/english";

function uint8ArrayToHex(uint8Array: Uint8Array): string {
  return Array.from(uint8Array)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
const useWallet = () => {
  const generateMnemonicPhrase = async () => {
    const phrase = await generateMnemonic(wordlist);

    return phrase;
  };

  const getMemonicSeed = async (phrase: string) => {
    const seed = await mnemonicToSeed(phrase);

    return seed;
  };

  const getSolanaAdress = (wNumber: number, seed: Uint8Array) => {
    const path = `m/44'/501'/${wNumber}'/0'`;
    const derivedSeed = derivePath(path, uint8ArrayToHex(seed)).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const address = Keypair.fromSecretKey(secret).publicKey.toBase58();

    return address;
  };

  const getEtheriumAdress = () => {};

  const getBitcoinAdress = () => {};

  return { generateMnemonicPhrase, getMemonicSeed, getSolanaAdress };
};

export default useWallet;
