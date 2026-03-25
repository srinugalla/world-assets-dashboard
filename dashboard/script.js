async function loadData() {
    const data = window.ASSET_DATA;
    const history = window.HISTORY_DATA;

    renderCards(data, history);
    createTicker(data);
    createHeatmap(history);
    createMainChart(history);
    createGauges();
    createAlerts(data, history);
    createSummary(data, history);
}

/* 💎 CARDS + REAL SPARKLINES */
function renderCards(data, history) {
    Object.keys(data).forEach(key => {
        const el = document.getElementById(key);

        if (el) {
            el.innerHTML = `
                <h2>${key}</h2>
                <p>$${data[key]}</p>
                <canvas id="spark${key}"></canvas>
            `;

            createSparkline(`spark${key}`, history[key]);
        }
    });
}

/* 📊 SPARKLINES (REAL DATA) */
function createSparkline(id, data) {
    if (!data) return;

    new Chart(document.getElementById(id), {
        type: "line",
        data: {
            labels: data.map((_, i) => i),
            datasets: [{
                data: data,
                borderColor: "#2ecc71",
                borderWidth: 2,
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false } }
        }
    });
}

/* 📺 TICKER */
function createTicker(data) {
    const el = document.getElementById("tickerContent");

    el.innerHTML = Object.entries(data)
        .map(([k, v]) => `${k}: $${v}`)
        .join("  •  ");
}

/* 🟩 HEATMAP (REAL CHANGE %) */
function createHeatmap(history) {
    const container = document.getElementById("heatmap");

    Object.keys(history).forEach(key => {
        const prices = history[key];
        if (!prices || prices.length < 2) return;

        const change = ((prices.at(-1) - prices[0]) / prices[0]) * 100;

        const div = document.createElement("div");
        div.className = "heat-cell";

        div.style.background =
            change > 0 ? "rgba(0,255,0,0.25)" : "rgba(255,0,0,0.25)";

        div.innerHTML = `${key}<br>${change.toFixed(2)}%`;

        container.appendChild(div);
    });
}

/* 📈 MAIN CHART (REAL DATA) */
function createMainChart(history) {
    new Chart(document.getElementById("marketChart"), {
        type: "line",
        data: {
            labels: history.AAPL.map((_, i) => i),
            datasets: [
                {
                    label: "AAPL",
                    data: history.AAPL,
                    borderColor: "#58a6ff",
                    tension: 0.4
                },
                {
                    label: "BTC",
                    data: history.BTC,
                    borderColor: "#ff4d4f",
                    tension: 0.4
                }
            ]
        }
    });
}

/* 🎯 GAUGES */
function createGauges() {
    const configs = [
        { id: "gauge1", value: 75, label: "Health" },
        { id: "gauge2", value: 45, label: "Risk" },
        { id: "gauge3", value: 85, label: "Liquidity" },
        { id: "gauge4", value: 60, label: "Momentum" }
    ];

    configs.forEach(g => {
        new Chart(document.getElementById(g.id), {
            type: "doughnut",
            data: {
                datasets: [{
                    data: [g.value, 100 - g.value],
                    backgroundColor: [
                        g.value > 70 ? "#2ecc71" :
                            g.value > 40 ? "orange" : "#ff4d4f",
                        "#222"
                    ]
                }]
            },
            options: {
                plugins: {
                    title: { display: true, text: g.label }
                },
                cutout: "75%"
            }
        });
    });
}

/* 🚨 ALERT SYSTEM (REAL CHANGE) */
function createAlerts(data, history) {
    const alerts = [];

    Object.keys(history).forEach(asset => {
        const prices = history[asset];
        if (!prices || prices.length < 2) return;

        const change = ((prices.at(-1) - prices[0]) / prices[0]) * 100;

        if (change > 5) alerts.push({ text: `${asset} surged 🚀`, type: "critical" });
        if (change < -5) alerts.push({ text: `${asset} dropping ⚠️`, type: "warning" });
    });

    const list = document.getElementById("alertsList");

    alerts.forEach(a => {
        const li = document.createElement("li");
        li.innerText = a.text;
        li.className = a.type === "critical" ? "alert-critical" : "alert-warning";
        list.appendChild(li);
    });
}

/* 🧠 SUMMARY (DATA-DRIVEN) */
function createSummary(data, history) {
    const el = document.getElementById("summary");

    const btc = data.BTC;
    const aapl = data.AAPL;

    el.innerText = `
Market Overview:

BTC: $${btc}
AAPL: $${aapl}

Market showing ${btc > 65000 ? "bullish" : "neutral"} sentiment.
Volatility remains moderate.
  `;
}

loadData();