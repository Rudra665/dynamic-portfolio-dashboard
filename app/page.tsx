"use client";

import { usePortfolio } from "../customHooks/usePortfolio";
import { SummaryCards } from "../components/SummaryCards";
import { SectorAllocation } from "../components/SectorAllocation";
import { PortfolioTable } from "../components/PortfolioTable";
import { PortfolioRow } from "../lib/types";
import { useMemo, useState } from "react";
import { StockDetailPanel } from "@/components/StockDetailModal";

function getTopPerformer(rows: PortfolioRow[]) {
	console.log("Rows with gains:", rows); // Debugging line
	const withGains = rows.filter((r) => r.gainLoss !== null);
	if (withGains.length === 0) return null;
	return withGains.reduce((best, cur) =>
		(cur.gainLoss ?? 0) > (best.gainLoss ?? 0) ? cur : best,
	);
}

export default function Home() {
	const { portfolio, loading, error, priceHistory, refresh } = usePortfolio();
	const [selectedRow, setSelectedRow] = useState<PortfolioRow | null>(null);
	console.log("Portfolio data:", portfolio); // Debugging line
	const [searchQuery, setSearchQuery] = useState("");
	const filteredRows = useMemo(() => {
		if (!searchQuery.trim()) return portfolio?.rows || [];
		const query = searchQuery.toLowerCase();
		return (portfolio?.rows || []).filter(
			(r) =>
				r.stockName.toLowerCase().includes(query) ||
				r.exchangeCode.toLowerCase().includes(query),
		);
	}, [portfolio?.rows, searchQuery]);
	if (loading)
		return (
			<div className="p-8 font-body text-muted text-center">
				Loading portfolio…
			</div>
		);
	if (error) return <div className="p-8 text-loss">{error}</div>;
	if (!portfolio) return null;

	return (
		<>
			<header className="bg-surface flex justify-between items-center p-6">
				<h1 className="text-text font-display text-2xl font-semibold">
					Portfolio Dashboard
				</h1>
				<div className="flex gap-4">
					<input
						type="text"
						placeholder="Search stocks…"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="bg-surface border border-border rounded-md px-3 py-2 text-sm font-body
             placeholder:text-muted focus-visible:outline-2 focus-visible:outline-[#6C5CE7]"
					/>
					<button
						onClick={refresh}
						className="bg-[#6C5CE7] text-white px-4 py-2 rounded-md text-sm font-medium"
					>
						Refresh
					</button>
				</div>
			</header>
			<main className="min-h-screen bg-[linear-gradient(135deg,rgba(30,41,59,0.85),rgba(15,23,42,0.9))] text-text font-body p-6 space-y-6">
				<SummaryCards
					totalInvestment={portfolio.totalInvestment}
					totalPresentValue={portfolio.totalPresentValue}
					totalGainLoss={portfolio.totalGainLoss}
					topPerformer={getTopPerformer(portfolio.rows)}
				/>

				<div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
					<SectorAllocation
						sectorSummaries={portfolio.sectorSummaries}
						totalInvestment={portfolio.totalInvestment}
					/>
					<PortfolioTable
						rows={filteredRows}
						sectorSummaries={portfolio.sectorSummaries}
						onRowClick={setSelectedRow}
					/>
					{selectedRow && (
						<StockDetailPanel
							row={selectedRow}
							history={
								selectedRow
									? (priceHistory[selectedRow.exchangeCode] ??
										[])
									: []
							}
							onClose={() => setSelectedRow(null)}
						/>
					)}
				</div>
			</main>
		</>
	);
}
