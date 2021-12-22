import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { BigNumber } from "bignumber.js";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { get } from "svelte/store";

import {
  ethersProvider,
  address,
  ethersSigner,
  web3ModalObj
} from "../components/store";

async function setAccount(provider) {
  ethersProvider.set(new ethers.providers.Web3Provider(provider));
  ethersSigner.set(get(ethersProvider).getSigner());
  address.set(await get(ethersSigner).getAddress());


  provider.on("chainChanged", () => {
    window.location.reload();
  });

  provider.on("accountsChanged", async () => {
    await setAccount(provider);
  });
}

export async function onStartup() {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        rpc: {
          1: "https://mainnet.infura.io/v3/7b6e08e0772b4c93a860cf2d40f8b400",
        },
        chainId: 42,
      },
    },
  };

  let web3ModalTheme = {
    background: "rgb( 8, 12, 20)",
    main: "rgb(199, 199, 199)",
    secondary: "rgb(136, 136, 136)",
    border: "rgba(0, 0, 0, 0.14)",
    hover: "rgb(16, 26, 32)",
  };

  const web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions,
    theme: web3ModalTheme,
  });

  web3ModalObj.set(web3Modal);

  if (web3Modal.cachedProvider) {
    const provider = await web3Modal.connect();
    await setAccount(provider);
  }

  window.bn = BigNumber;
}

export async function connectWallet() {
  console.log("Connecting ...");
  const provider = await get(web3ModalObj).connect();
  await setAccount(provider);
}
