<script>
    import {address, portfolioStats, searchPortfolioStats, searchAddress} from '../components/store'
    import { goto } from "@sapper/app";


    let showWalletDiv = false
    export let inputUser;
    let stats;
    $: stats = inputUser ? $searchPortfolioStats : $portfolioStats
</script>
<div class="flex flex-col text-gray-100">
    <!-- Dashboard -->
    <div class=" flex-none h-16 border-y border-t-0 border-b-gray-600  p-4 text-2xl font-light">
        {#if inputUser == true}
            <span on:click={
                async () => {
                    await goto("/dashboard")
                }
            } class=" mr-2"><i class="fas fa-arrow-left"></i></span>
             {$searchAddress}
        {:else}
            Dashboard
        {/if}
    </div>

    <!-- Connected address -->

    <div class=" h-56 flex flex-col border-y border-t-0 border-b-gray-600 ">
        <div class="h-24 p-4">
            <div class=" border rounded-lg border-gray-600 p-2 w-max"> 
                <i class="fas fa-user-circle "></i> 
                <span class=" p-2">
                    {#if inputUser == true}
                        {$searchAddress}
                    {:else}
                        {$address}
                    {/if}
                </span> 
            </div>
        </div>
        <div class=" flex-auto p-4">
            <div class=" text-xl font-light "> Net worth</div>
            <div class=" text-4xl font-semibold">{ stats != undefined ? "$" + stats.netWorth :  "$0"}</div>
        </div>
    </div>
    <div class=" flex-auto flex flex-col ">
        <div class=" p-4 text-xl font-light">
            Portfolio
        </div>
    
        <div class=" grid grid-cols-1 gap-4 mx-14 text-gray-100 font-light">
            <div class=" flex flex-col border rounded-lg border-gray-600 bg-gray-800">
                <div class=" flex">
                    <i class="fas fa-wallet p-6 text-blue-400"></i>
                    <div class="p-2 flex-auto">
                        <div>Wallet</div> 
                        <div>{ stats != undefined ? "$" + stats.netWorth :  "$0"}</div>
                    </div>
                    <button on:click|preventDefault={
                        () => {
                            showWalletDiv = !showWalletDiv
    
                        }
                    }>
                        <i class="far fa-plus-square p-6 fa-lg text-blue-400"></i>
                    </button>
                </div>
                <div class=" {showWalletDiv ? "visible " : "hidden "} flex flex-col">
                    <!-- Token -->
                    {#if stats != undefined}  
                        {#each stats.tokenStats as tokenStat}
                            <div class="flex p-4 border rounded-lg border-gray-600 bg-gray-900 m-1 mx-10">
                                <div class="flex-auto flex flex-row"> 
                                    <span><i class="fab fa-ethereum fa-2x p-2 mx-1"></i></span>
                                    <div>
                                        <div class=" font-medium">{tokenStat.token}</div>
                                        <div class=" font-light italic text-gray-400">{tokenStat.quoteRate}</div>
                                    </div>
                                </div>
                                <!-- Token balance -->
                                <div>
                                    <div class=" font-medium">{"$" + tokenStat.tokenWorth.toFixed(3)}</div>
                                    <div class=" font-light italic text-gray-400">{tokenStat.balance}</div>
                                </div>
                            </div>
                        {/each}
                    {/if}
                </div>
                
                
            </div>
            <!-- <div class=" border rounded-lg flex border-gray-600 bg-gray-800">
                <i class="fas fa-wallet p-6 text-blue-400"></i>
                <div class="p-2 flex-auto">
                    <div>NFTs</div> 
                    <div>{ stats != undefined ? "$" + stats.netWorth :  "$0"}</div>
                </div>
                <button>
                    <i class="far fa-plus-square p-6 fa-lg text-blue-400"></i>
                </button>
            </div> -->
        </div>
    </div>
</div> 