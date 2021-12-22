<script>
	import { onMount } from 'svelte';

	import { getContext } from 'svelte';
  	import Modal from './Modal.svelte';

 	const { open, close } = getContext('simple-modal');

	import Nav from '../components/Nav.svelte';
	import { connectWallet, onStartup } from "../constants/wallet";
	import { address, portfolioStats } from "../components/store";
	import {getPortfolioStats} from '../helpers/portfoliostats'

	import { goto } from "@sapper/app";

	async function connectWalletAndUpdateDashboard() {
		open(Modal, { message: "Yo!!!" });
		await connectWallet()
		console.log("Address -> ", $address)
		$portfolioStats = await getPortfolioStats($address)
		await goto("/dashboard")
		close(() => {console.log("Closing the modal");})
	}


	onMount(async () => {
		await onStartup();
	})
</script>

<svelte:head>
	<title>Fapper</title>
</svelte:head>

<Nav />

<div class="grid grid-cols-1 gap-12 place-items-center max-w-5xl px-48 mx-auto my-48 py-8 bg-zinc-600 rounded-3xl ">
	<div class="text-3xl text-center font-mono font-extrabold">Your homepage to <span class=" text-blue-400">DeFi</span> </div>
	<div class="text-xl text-center font-mono ">Track all your DeFi portfolio from one place. Invest into the latest opportunities in open finance.</div>
	<div class=" flex justify-center">
		{#if $address != ""}
		<button on:click={async () => {
					if($portfolioStats == undefined) {
						$portfolioStats = await getPortfolioStats($address)
					}
					await goto("/dashboard")

				}
			} class="bg-blue-600 ring-2 ring-purple-500 ring-offset-1 ring-offset-purple-100 rounded-xl w-40 text-gray-100 p-2">Go to dashboard</button>
		{:else}
		<button on:click={connectWalletAndUpdateDashboard} class="bg-blue-600 ring-2 ring-purple-500 ring-offset-1 ring-offset-purple-100 rounded-xl w-40 text-gray-100 p-2">Connect Wallet</button>
		{/if}
	</div>
</div>