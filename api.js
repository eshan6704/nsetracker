import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js";

let appInstance = null;

export async function connectBackend() {
  if (!appInstance) {
    try {
      appInstance = await Client.connect("eshan6704/trackerbackend");
      console.log("[API] Connected to trackerbackend");
    } catch (err) {
      console.error("[API] Connection failed:", err);
      throw err;
    }
  }
  return appInstance;
}

export async function fetchStockData(symbol, exchange = "NSE") {
  try {
    const app = await connectBackend();
    const result = await app.predict("/fetch_data", [symbol, exchange]);
    console.log("[API] Data fetched for", symbol);
    return result.data[0];
  } catch (err) {
    console.error("[API] Fetch error:", err);
    throw err;
  }
}
