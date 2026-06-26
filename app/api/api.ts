import { PortfolioResponse } from "../../lib/types";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3001";

export async function refreshPrices(): Promise<void> {
	const response = await fetch(`${API_BASE_URL}/api/refresh`, {
		method: "POST",
	});
	if (!response.ok) {
		throw new Error(`Failed to refresh prices: ${response.statusText}`);
	}
}

export async function getPortfolio(): Promise<PortfolioResponse> {
	const response = await fetch(`${API_BASE_URL}/api/portfolio`);
	if (!response.ok) {
		throw new Error(`Failed to fetch portfolio: ${response.statusText}`);
	}
	const data: PortfolioResponse = await response.json();
	console.log("Fetched portfolio data:", data); // Debugging line
	return data; // Return the 'response' property of the fetched data
}
