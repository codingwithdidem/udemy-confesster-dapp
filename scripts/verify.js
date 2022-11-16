const hre = require("hardhat");

const contractAddress = "0x93266D756a97068E912720f22A4c93654bf5F358";

async function main() {
  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [],
  });

  console.log("Contract verified!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
