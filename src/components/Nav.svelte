<script>
	
    import {address, shortAddress, portfolioStats, searchAddress,searchPortfolioStats} from '../components/store'
	import { goto } from "@sapper/app";
	import {getPortfolioStats} from '../helpers/portfoliostats'

	let inputAddress;
</script>
<div class=" flex flex-row justify-between font-mono py-2">
	<div class=" flex w-1/3 text-center  mx-2">
		<div class=" w-36 text-xl font-bold p-2">Fapper</div>
		<div class=" flex-auto flex flex-row bg-gray-500 ring-2 ring-blue-500 ring-offset-1 ring-offset-purple-100 rounded-xl">
			<button on:click={async () => {
                if(inputAddress != "") {
                    $searchAddress = inputAddress
                    inputAddress = ""
                } else {
                    return 
                }
				if($address != "") {
					$portfolioStats = await getPortfolioStats($address)
				}
                $searchPortfolioStats = await getPortfolioStats($searchAddress)
                await goto("/account/" + $searchAddress)
            }}>
                <i class="fas fa-search fa-x p-2 text-white"></i>
            </button>
            <input bind:value={inputAddress} class=" flex-auto bg-transparent text-white placeholder:text-gray-300  rounded-xl focus:outline-none hover:outline-none p-1" type="text" placeholder="Search by account,token ..." />
		</div>
	</div>
	<div class=" flex text-center p-2 w-96 justify-between mx-4">
		<div class="">
			Address Book
		</div>
		<div class="">
			Learn
		</div>
		<div class=" ">
			Build
		</div>
	</div>
</div>
