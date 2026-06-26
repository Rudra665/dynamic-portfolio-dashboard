/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, useRef } from "react";
import { getPortfolio, refreshPrices } from "../app/api/api";
import { PortfolioResponse, PricePoint } from "@/lib/types";

const PORTFOLIO_REFRESH_INTERVAL = 15 * 1000; // 15 seconds in milliseconds
const MAX_HISTORY_POINTS = 30;

export function usePortfolio() {
	const [portfolio, setPortfolio] = useState<PortfolioResponse | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const [priceHistory, setPriceHistory] = useState<
		Record<string, PricePoint[]>
	>({});

	async function fetchAndRefresh() {
		try {
			setError(null);
			await refreshPrices();
			const data = await getPortfolio();
			setPortfolio(data);

			// Appending a new point per stock for the chart data, but only if we get a real CMP
			setPriceHistory((prev) => {
				const next = { ...prev };
				const now = Date.now();

				for (const row of data.rows) {
					if (row.cmp === null) continue;
					const existing = next[row.exchangeCode] || [];
					const lastPoint = existing[existing.length - 1];

					if (lastPoint && lastPoint.cmp === row.cmp) continue;

					const updated = [...existing, { time: now, cmp: row.cmp }];
					next[row.exchangeCode] = updated.slice(-MAX_HISTORY_POINTS);
				}

				return next;
			});
		} catch (err) {
			console.error("Error fetching portfolio data:", err);
			setError("Error fetching portfolio data");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		// const timeout = setTimeout(() => {
		fetchAndRefresh();
		// }, 0);

		intervalRef.current = setInterval(
			fetchAndRefresh,
			PORTFOLIO_REFRESH_INTERVAL,
		);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	return {
		portfolio,
		loading,
		error,
		priceHistory,
		refresh: fetchAndRefresh,
	};
}
