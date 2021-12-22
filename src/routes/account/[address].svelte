<script context="module">
	export async function preload(page, session) {
		const { address } = page.params;
		return { addr : address };
	}
</script>

<script>
    import Portfolio from '../../components/Portfolio.svelte';
    import Toast from '../../helpers/Toast.svelte'
    import {address, shortAddress, searchAddress, portfolioStats, searchPortfolioStats} from '../../components/store'
    import {getPortfolioStats} from '../../helpers/portfoliostats'
    import { goto } from "@sapper/app";
    let inputAddress="";
</script>

<div class="flex bg-gray-900 min-h-screen text-gray-100">
    <!-- Fapper , address, and some tools -->
    <div class="w-64">
        <div on:click={async () => {await goto("/dashboard")}} class="p-4 text-2xl font-bold m-2">Fapper</div>
        <div class=" border rounded-lg border-gray-600 p-2 m-4 w-max"> 
            <i class="fas fa-user-circle "></i> 
            <span class=" p-2">{$shortAddress!="" ? $shortAddress : "0xsensei"}</span> 
        </div>
    </div>
    <!-- Dashboard -->
    <div class=" flex-auto border-x border-gray-600">
        <Portfolio inputUser={true}/>
    </div>
    <!-- Input address -->
    <div class=" w-96">
        <div class="flex flex-row bg-gray-500 ring-4 ring-blue-500 ring-offset-1 ring-offset-purple-100 rounded-xl m-4">
            <button on:click={async () => {
                if(inputAddress != "") {
                    $searchAddress = inputAddress
                    inputAddress = ""
                } else {
                    return 
                }
                console.log("Hey sasuke");
                
                $searchPortfolioStats = await getPortfolioStats($searchAddress)
                console.log("Search portfolio Stats", $searchPortfolioStats);
                
                await goto("/account/" + $searchAddress)
            }}>
                <i class="fas fa-search fa-x p-2 text-white"></i>
            </button>
            <input bind:value={inputAddress} class=" flex-auto bg-transparent text-white placeholder:text-gray-300  rounded-xl focus:outline-none hover:outline-none p-1" type="text" placeholder="Search by account,token ..." />
        </div>

        <!-- Network fee and info -->
        <div class=" p-4">
            Network fee
        </div>
    </div>
</div>
<Toast />
