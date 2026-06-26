import { PortfolioRow } from "./types";
import { SortConfig } from "./types";

export function sortRows(
	rows: PortfolioRow[],
	sort: SortConfig | null,
): PortfolioRow[] {
	if (!sort) return rows;

	const column = sort.column as keyof PortfolioRow;

	return [...rows].sort((a, b) => {
		const aVal = a[column];
		const bVal = b[column];

		// nulls always sort last, regardless of direction —
		// missing data shouldn't jump to the top just because direction flipped
		if (aVal === null) return 1;
		if (bVal === null) return -1;

		let comparison: number;
		if (typeof aVal === "string") {
			comparison = aVal.localeCompare(bVal as string);
		} else {
			comparison = (aVal as number) - (bVal as number);
		}

		return sort.direction === "asc" ? comparison : -comparison;
	});
}
