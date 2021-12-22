import axios from "axios"
import Whitelist from '../whitelist.json'

export const getPortfolioStats = async (address) => {

    if(address == "") {
        return;
    }

    console.log("Addresss", address);

    const response = await axios.get(`https://api.covalenthq.com/v1/1/address/${address}/balances_v2/?key=ckey_5ddc1bf0c1694b68bff31df262a`)
    
    console.log("Response", "Yo ");
    const erc20Data = response.data["data"]["items"]
    const whitelistedErc20Data = erc20Data.filter(item => Whitelist.tokens.includes(item["contract_ticker_symbol"]))
    console.log("whitelistedErc20", whitelistedErc20Data);

    let tokenStats = []
    
    // console.log("symbol", whitelistedErc20Data[3]["contract_ticker_symbol"]);
    // console.log("balance", (Number(whitelistedErc20Data[3]["balance"])/1e18).toFixed(3)*whitelistedErc20Data[3]["quote_rate"] );
    tokenStats = [];
    whitelistedErc20Data.forEach(element => {
        // Hack: Covalent api has 1e6 decimals for usdc
        let decimalValue = element["contract_ticker_symbol"] == "USDC" ? 1e6 : 1e18;
        let tokenWorth = (Number(element["balance"])/decimalValue).toFixed(3) * element["quote_rate"];
        tokenStats.push(
            {
                token: element["contract_ticker_symbol"],
                balance: (Number(element["balance"])/decimalValue).toFixed(3),
                tokenWorth : tokenWorth,
                quoteRate: element["quote_rate"]
            }
        )
    });
    let nftStats = {}
    let netWorth = tokenStats.reduce((previousValue, currentValue) => previousValue + currentValue["tokenWorth"], 0);
    console.log("Net worth", netWorth);
    return {
        netWorth: netWorth.toFixed(3),
        nftStats: nftStats,
        tokenStats: tokenStats
    }
}