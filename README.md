<div id="top"></div>

<br />
<div align="center">
  <a href="https://github.com/codingwithdidem/udemy-confesster-dapp">
    <img src="https://raw.githubusercontent.com/codingwithdidem/udemy-confesster-dapp/main/public/confesster.svg" alt="Logo" width="110" height="80">
  </a>

<h3 align="center">Confesster - A Confession app built on blockchain</h3>

</div>

## About The Project

[![Confesster][product-screenshot]](https://twitter.com/DidemKkkaraasl1)

Confesster is a udemy course project built on top of Goerli test network and The Graph, that allows users to create, view new confessions. They can also buy coffee to each other.

### Built With

- Frontend framework: Next.js
- Smart contracts: Solidity
- Ethereum web client library: Ethers.js
- File storage: IPFS - Web3 Storage
- Querying data: The Graph
- CSS Framework: ChakraUI
- Ethereum development environment: Hardhat
- Layer 2 blockchain: Goerli Testnet

<!-- GETTING STARTED -->

## Getting Started

To get this application up and and running on your local machine follow these simple steps.

### Prerequisites

You need to have Node.js, NPM and hardhat installed on your computer, before running this project.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/codingwithdidem/udemy-confesster-dapp.git
   ```
2. Install NPM packages

   ```sh
   npm install
   ```

   or

   ```sh
   yarn install
   ```

3. Create an `.env.local` file looking like this
   ```sh
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=""
   GOERLI_RPC_URL=""
   METAMASK_PRIVATE_KEY=""
   ETHERSCAN_API_KEY=""
   NEXT_PUBLIC_WEB3_STORAGE_TOKEN=""
   ```
4. Compile the smart contract
   ```sh
   npx hardhat compile
   ```
5. Deploy the smart contract
6. Verify the smart contract (Optional)

7. Deploy subgraph in `indexer` directory by following steps in `indexer/README.md` (optional, since it is already deployed in hosted service)

8. Get subgraph query endpoint after deployment and update it in `apollo-client.js`

9. Run the app

   ```sh
   npm run dev
   ```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue.
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### License

This project is an open source software licensed under the MIT License

[product-screenshot]: https://raw.githubusercontent.com/codingwithdidem/udemy-confesster-dapp/main/public/share/product.png
