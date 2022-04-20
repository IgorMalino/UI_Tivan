import { BscConnector } from "@binance-chain/bsc-connector";

export const bsc = new BscConnector({
  supportedChainIds: [56, 97], // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
});

// invoke method on bsc e.g.
// await bsc.activate();
// await bsc.getAccount();
// await bsc.getChainId();

// const bsc_provider = bsc.getProvider()

// provider = new ethers.providers.Web3Provider(bsc_provider)
