import { ethers } from "ethers";
import Contract from "../artifacts/contracts/Confesster.sol/Confesster.json";
import { contractAddress } from "../config";

export default function getContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
  return contract;
}
