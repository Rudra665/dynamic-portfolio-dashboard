export const SECTOR_COLORS: Record<string, string> = {
	"Financial Sector": "#6c5ce7",
	"Tech Sector": "#00b894",
	Consumer: "#ff7a59",
	Power: "#ffc53d",
	"Pipe Sector": "#36b37e",
	Others: "#ff5c93",
};

export function sectorColor(sector: string): string {
	return SECTOR_COLORS[sector] || "#7c8798"; // Default color if sector not found
}
