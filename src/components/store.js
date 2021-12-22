import {writable, derived} from 'svelte/store'
import { getPortfolioStats } from "../helpers/portfoliostats";

export const searchAddress = writable("")

export const address = writable("")

export const portfolioStats = writable()

// PS : portfolioStats
export const searchPortfolioStats = writable()

export const shortAddress = derived(address, ($address) => {
    if ($address === "") {
      return "";
    }
    return $address.substr(0, 5) + "..." + $address.substr($address.length - 6);
});

export const walletConnected = derived(address, ($address) => {
    if ($address === "") {
      return false;
    }
    return true;
});


export const ethersSigner = writable({});
export const web3ModalObj = writable({});
export const chainId = writable(1);
export const ethersProvider = writable({});