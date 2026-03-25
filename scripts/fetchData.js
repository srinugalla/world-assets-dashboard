const fs = require("fs");
const fetch = require("node-fetch");

async function fetchData() {
    try {
        const assets = {
            AAPL: "AAPL",
            GOOGL: "GOOGL",
            BTC: "bitcoin",
            ETH: "ethereum",
            GOLD: "GC=F",
            OIL: "CL=F"
        };

        const data = {};
        const history = {};

        for (const key of Object.keys(assets)) {
            if (key === "BTC" || key === "ETH") {
                data[key] = await getCrypto(assets[key]);
                history[key] = await getCryptoHistory(assets[key]);
            } else {
                data[key] = await getPrice(assets[key]);
                history[key] = await getHistory(assets[key]);
            }
        }

        // Save current prices
        fs.writeFileSync("data/assets.json", JSON.stringify(data, null, 2));

        // Save history
        fs.writeFileSync("data/history.json", JSON.stringify(history, null, 2));

        console.log("✅ Data updated");
    } catch (err) {
        console.error("❌ Fetch error:", err);
    }
}

/* 📈 STOCK PRICE */
async function getPrice(symbol) {
    const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`);
    const json = await res.json();
    return json.chart.result[0].meta.regularMarketPrice;
}

/* 📉 STOCK HISTORY */
async function getHistory(symbol) {
    const res = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=10d&interval=1d`
    );
    const json = await res.json();
    return json.chart.result[0].indicators.quote[0].close;
}

/* 🪙 CRYPTO PRICE */
async function getCrypto(id) {
    const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
    );
    const json = await res.json();
    return json[id].usd;
}

/* 🪙 CRYPTO HISTORY */
async function getCryptoHistory(id) {
    const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=10`
    );
    const json = await res.json();

    return json.prices.map(p => p[1]); // extract prices
}

fetchData();