export interface PortfolioRow {
	id: number;
	stockName: string;
	sector: string;
	purchasePrice: number;
	qty: number;
	exchangeCode: string;
	investment: number;
	portfolioPercent: number;
	cmp: number | null;
	presentValue: number | null;
	gainLoss: number | null;
	peRatio: number | null;
	latestEarnings: number | null;
}

export interface SectorSummary {
	sector: string;
	totalInvestment: number;
	totalPresentValue: number;
	totalGainLoss: number;
}

export interface PortfolioResponse {
	rows: PortfolioRow[];
	sectorSummaries: SectorSummary[];
	totalInvestment: number;
	totalPresentValue: number;
	totalGainLoss: number;
}

export interface SectorGroup {
	sector: string;
	rows: PortfolioRow[];
	summary: SectorSummary;
}
export type SortColumn =
	| "stockName"
	| "purchasePrice"
	| "qty"
	| "investment"
	| "portfolioPercent"
	| "exchangeCode"
	| "cmp"
	| "presentValue"
	| "gainLoss"
	| "peRatio"
	| "latestEarnings";

export type SortDirection = "asc" | "desc";

export interface SortConfig {
	column: SortColumn;
	direction: SortDirection;
}

export interface PricePoint {
	time: number; // epoch ms
	cmp: number;
}
