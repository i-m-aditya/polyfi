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
					<div>{ $portfolioStats != undefined ? "$" + $portfolioStats.netWorth :  "$0"}</div>
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
				{#if $portfolioStats != undefined}  
					{#each $portfolioStats.tokenStats as tokenStat}
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
								<div class=" font-medium">{"$" + tokenStat.tokenWorth.toFixed(2)}</div>
								<div class=" font-light italic text-gray-400">{tokenStat.balance}</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>
			
			
		</div>
		<div class=" border rounded-lg flex border-gray-600 bg-gray-800">
			<i class="fas fa-wallet p-6 text-blue-400"></i>
			<div class="p-2 flex-auto">
				<div>NFTs</div> 
				<div>{ $portfolioStats != undefined ? "$" + $portfolioStats.netWorth :  "$0"}</div>
			</div>
			<button>
				<i class="far fa-plus-square p-6 fa-lg text-blue-400"></i>
			</button>
		</div>
	</div>
</div>