import { SectorGroup, PortfolioRow, SectorSummary } from "./types";

export function groupBySector(
	rows: PortfolioRow[],
	sectorSummaries: SectorSummary[],
): SectorGroup[] {
	const sectorMap = new Map(
		sectorSummaries.map((summary) => [summary.sector, summary]),
	);

	const grouped = new Map<string, PortfolioRow[]>();
	for (const row of rows) {
		const existing = grouped.get(row.sector) || [];
		existing.push(row);
		grouped.set(row.sector, existing);
	}

	return Array.from(grouped.entries()).map(([sector, rows]) => ({
		sector,
		rows,
		summary: sectorMap.get(sector) || {
			sector,
			totalInvestment: 0,
			totalPresentValue: 0,
			totalGainLoss: 0,
		},
	}));
}
