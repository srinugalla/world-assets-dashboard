async function loadData() {
    const data = window.ASSET_DATA || {};
    const history = window.HISTORY_DATA || {};

    renderCards(data, history);
    createTicker(data);
    createHeatmap(history);
    createMainChart(history);
    createGauges();
    createAlerts(data, history);
    createSummary(data, history);

    // ⏰ Last updated
    const el = document.getElementById("lastUpdated");
    if (el) {
        el.innerText = "Last updated: " + new Date().toLocaleString();
    }
}

/* 💎 CARDS + REAL SPARKLINES */
function renderCards(data, history) {
    Object.keys(data).forEach(key => {
        const el = document.getElementById(key);

        if (el) {
            const prices = history[key] || [];
            const change = prices.length > 1
                ? ((prices.at(-1) - prices[0]) / prices[0]) * 100
                : 0;

            const isUp = change >= 0;
            const color = isUp ? "#22c55e" : "#ef4444";

            el.innerHTML = `
                <div class="card-header">${key}</div>
                <div class="price" style="color:${color}">
                    $${Number(data[key]).toFixed(2)}
                </div>
                <div class="change" style="color:${color}">
                    ${change.toFixed(2)}%
                </div>
                <div class="time">${new Date().toLocaleTimeString()}</div>
                <canvas id="spark${key}"></canvas>
            `;

            createSparkline(`spark${key}`, prices, color);
        }
    });
}

/* 📊 SPARKLINES */
function createSparkline(id, data, color) {
    if (!data || data.length === 0) return;

    new Chart(document.getElementById(id), {
        type: "line",
        data: {
            labels: data.map((_, i) => i),
            datasets: [{
                data: data,
                borderColor: color,
                borderWidth: 2,
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false } },
            elements: {
                point: { radius: 0 }
            }
        }
    });
}

/* 📺 TICKER */
function createTicker(data) {
    const el = document.getElementById("tickerContent");

    el.innerHTML = Object.entries(data)
        .map(([k, v]) => `${k}: $${Number(v).toFixed(2)}`)
        .join("   •   ");
}

/* 🟩 HEATMAP */
function createHeatmap(history) {
    const container = document.getElementById("heatmap");
    container.innerHTML = ""; // prevent duplicates

    Object.keys(history).forEach(key => {
        const prices = history[key];
        if (!prices || prices.length < 2) return;

        const change = ((prices.at(-1) - prices[0]) / prices[0]) * 100;

        const intensity = Math.min(Math.abs(change) / 10, 1);

        const div = document.createElement("div");
        div.className = "heat-cell";

        div.style.background =
            change > 0
                ? `rgba(34,197,94,${intensity})`
                : `rgba(239,68,68,${intensity})`;

        div.innerHTML = `
            <div>${key}</div>
            <div>${change.toFixed(2)}%</div>
        `;

        container.appendChild(div);
    });
}

/* 📈 MAIN CHART */
function createMainChart(history) {
    if (!history.AAPL || !history.BTC) return;

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
                    borderColor: "#f59e0b",
                    tension: 0.4
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    labels: { color: "#fff" }
                }
            },
            scales: {
                x: { ticks: { color: "#888" } },
                y: { ticks: { color: "#888" } }
            }
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
                        g.value > 70 ? "#22c55e" :
                            g.value > 40 ? "#f59e0b" : "#ef4444",
                        "#111"
                    ]
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: g.label,
                        color: "#fff"
                    }
                },
                cutout: "75%"
            }
        });
    });
}

/* 🚨 ALERTS */
function createAlerts(data, history) {
    const list = document.getElementById("alertsList");
    list.innerHTML = "";

    Object.keys(history).forEach(asset => {
        const prices = history[asset];
        if (!prices || prices.length < 2) return;

        const change = ((prices.at(-1) - prices[0]) / prices[0]) * 100;

        if (change > 5) addAlert(`${asset} surged 🚀`, "critical");
        if (change < -5) addAlert(`${asset} dropping ⚠️`, "warning");
    });

    function addAlert(text, type) {
        const li = document.createElement("li");
        li.innerText = text;
        li.className = type === "critical" ? "alert-critical" : "alert-warning";
        list.appendChild(li);
    }
}

/* 🧠 SUMMARY */
function createSummary(data, history) {
    const el = document.getElementById("summary");

    const btc = data.BTC || 0;
    const trend = btc > 65000 ? "bullish 📈" : "neutral ⚖️";

    el.innerText = `
Market Overview:

BTC: $${btc}
AAPL: $${data.AAPL}

Market sentiment: ${trend}
Volatility: Moderate
Liquidity: Strong
    `;
}

/* 🚀 INIT */
loadData();