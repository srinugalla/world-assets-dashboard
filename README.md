![GitHub Actions](https://img.shields.io/github/actions/workflow/status/srinugalla/world-assets-dashboard/update.yml?label=build\&logo=github)
![Last Commit](https://img.shields.io/github/last-commit/srinugalla/world-assets-dashboard?logo=git)
![Repo Size](https://img.shields.io/github/repo-size/srinugalla/world-assets-dashboard)
![Stars](https://img.shields.io/github/stars/srinugalla/world-assets-dashboard?style=social)
![Node](https://img.shields.io/badge/node-18.x-green)
![Automation](https://img.shields.io/badge/updates-15min-brightgreen)

---

# ⚡ World Asset Monitoring Terminal

A **fully automated financial monitoring dashboard** that tracks global assets and renders a live terminal-style UI directly inside GitHub.

---

## 🚀 Live Dashboard

> Auto-updated every 15 minutes via CI/CD pipeline

![Dashboard](assets/dashboard.png?raw=true)

---

## 🌍 Overview

This project simulates a **real-world financial monitoring system**, combining:

* 📊 Data ingestion (stocks, crypto, commodities)
* 📉 Historical trend analysis
* 📺 Real-time style dashboard UI
* ⚙️ Automated CI/CD rendering pipeline

---

## ✨ Features

### 📊 Multi-Asset Tracking

* Stocks: AAPL, GOOGL
* Crypto: BTC, ETH
* Commodities: Gold, Oil

---

### 📉 Historical Analysis

* 10-day price tracking
* Real trend-based sparklines
* Multi-line market chart

---

### 🟩 Market Heatmap

* Visual gain/loss indicators
* Dynamic color-based performance

---

### 📺 Live Ticker

* Continuous asset price updates
* Terminal-style scrolling feed

---

### 🚨 Smart Alerts Engine

* Detects significant price movements
* Highlights bullish/bearish signals

---

### 🎯 Market Health Gauges

* Volatility
* Momentum
* Liquidity
* Risk indicators

---

### 🔁 Full Automation

* Runs every **15 minutes**
* Triggered on:

  * ⏱️ schedule (cron)
  * 🚀 code push
  * 🖱️ manual execution

---

## 🧠 Architecture

```text
Financial APIs (Yahoo Finance, CoinGecko)
                ↓
        Node.js Data Fetcher
                ↓
     JSON Storage (assets + history)
                ↓
    Dashboard UI (HTML + Chart.js)
                ↓
     Puppeteer Screenshot Engine
                ↓
     GitHub Actions (CI/CD)
                ↓
      README Live Dashboard
```

---

## ⚙️ Automation Pipeline

Each workflow run:

1. Fetches latest market data
2. Updates historical datasets
3. Renders dashboard UI
4. Captures screenshot using Puppeteer
5. Commits updated output to repository

---

## 🛠️ Tech Stack

* **Node.js**
* **Puppeteer**
* **Chart.js**
* **GitHub Actions**
* **Yahoo Finance API**
* **CoinGecko API**

---

## 📁 Project Structure

```
world-assets-dashboard/
├── dashboard/         # UI (HTML, CSS, JS)
├── scripts/           # Data fetching + rendering
├── data/              # Generated datasets
├── assets/            # Dashboard image output
├── .github/workflows  # CI/CD automation
└── README.md
```

---

## 🔧 Local Setup

```bash
npm install
node scripts/fetchData.js
node scripts/capture.js
```

---

## 💡 Why This Project Matters

This project demonstrates:

* ⚙️ CI/CD automation design
* 📊 Data pipeline architecture
* 📈 Financial data processing
* 🎨 UI rendering without frameworks
* 🤖 Headless browser automation

---

## 🚀 Future Enhancements

* 🟡 Candlestick charts (TradingView-style)
* 🧠 AI-generated market insights
* 🌍 Live hosted dashboard (Vercel)
* 📡 Real-time streaming (WebSockets)

---

## 👤 Author

**srinugalla**

---

## ⭐ Support

If you like this project, consider giving it a star ⭐
---

## ⚠️ Disclaimer

This project is intended for **educational and informational purposes only**.

- The data displayed is sourced from public APIs and may not be accurate, complete, or up to date.
- This dashboard does **not constitute financial advice**.
- Do **not** use this project for trading or investment decisions.
- The author is not responsible for any financial losses or actions taken based on this data.

Always consult a qualified financial professional before making any investment decisions.