const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
    try {
        const browser = await puppeteer.launch({
            args: ["--no-sandbox"]
        });

        const page = await browser.newPage();

        // ✅ Set viewport (IMPORTANT for layout)
        await page.setViewport({
            width: 1400,
            height: 1000
        });

        // ✅ Load data
        const assets = JSON.parse(fs.readFileSync("data/assets.json", "utf-8"));
        const history = JSON.parse(fs.readFileSync("data/history.json", "utf-8"));

        // ✅ Open dashboard
        await page.goto(`file://${process.cwd()}/dashboard/index.html`, {
            waitUntil: "networkidle0"
        });

        // ✅ Inject data into browser
        await page.evaluate((assets, history) => {
            window.ASSET_DATA = assets;
            window.HISTORY_DATA = history;
        }, assets, history);

        // ✅ Wait for charts to render
        await page.waitForTimeout(3000);

        // ✅ Screenshot
        await page.screenshot({
            path: "assets/dashboard.png",
            fullPage: true
        });

        await browser.close();

        console.log("📸 Dashboard captured successfully");
    } catch (err) {
        console.error("❌ Capture error:", err);
    }
})();