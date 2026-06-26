import {
	PortfolioRow,
	SectorSummary,
	SortColumn,
	SortConfig,
} from "../lib/types";
import { GainLossCell } from "./GainLossCell";
import { NumericCell } from "./NumericCell";
import { groupBySector } from "../lib/groupBySector";
import { sectorColor } from "../lib/sectorColors";
import { sortRows } from "@/lib/sortRows";
import { useState } from "react";
import { PortfolioFlashRow } from "./PortfolioRow";

interface Props {
	rows: PortfolioRow[];
	sectorSummaries: SectorSummary[];
	onRowClick: (row: PortfolioRow) => void;
}

const SORTED_COLUMNS: { key: SortColumn; label: string }[] = [
	{ key: "stockName", label: "Stock Name" },
	{ key: "purchasePrice", label: "Purchase Price" },
	{ key: "qty", label: "Qty" },
	{ key: "investment", label: "Investment" },
	{ key: "portfolioPercent", label: "Portfolio %" },
	{ key: "exchangeCode", label: "Exchange Code" },
	{ key: "cmp", label: "CMP" },
	{ key: "presentValue", label: "Present Value" },
	{ key: "gainLoss", label: "Gain/Loss" },
	{ key: "peRatio", label: "P/E Ratio" },
	{ key: "latestEarnings", label: "Earnings" },
];

export function PortfolioTable({ rows, sectorSummaries, onRowClick }: Props) {
	const [sort, setSort] = useState<SortConfig | null>(null);
	const [collapsedSectors, setCollapsedSectors] = useState<Set<string>>(
		new Set(),
	);

	function handleSort(column: SortColumn) {
		setSort((current) => {
			if (current?.column !== column) return { column, direction: "asc" };
			if (current.direction === "asc")
				return { column, direction: "desc" };
			return null; // third click clears sorting
		});
	}
	const sortedRows = sortRows(rows, sort);
	const groups = groupBySector(sortedRows, sectorSummaries);
	return (
		<div className="bg-[linear-gradient(135deg,rgba(30,41,59,0.85),rgba(15,23,42,0.9))] border border-border rounded-lg overflow-x-auto">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-border">
						{SORTED_COLUMNS.map((col) => (
							<th
								key={col.key}
								onClick={() => handleSort(col.key)}
								className="text-left font-body text-muted text-xs uppercase tracking-wide
                           px-3 py-3 whitespace-nowrap cursor-pointer hover:text-text select-none"
							>
								{col.label}
								{sort?.column === col.key && (
									<span className="ml-1">
										{sort.direction === "asc" ? "↑" : "↓"}
									</span>
								)}
							</th>
						))}
						<th className="px-3 py-3"></th>
					</tr>
				</thead>
				<tbody>
					{groups.map((group) => (
						<SectorGroup
							key={group.sector}
							group={group}
							collapsed={collapsedSectors.has(group.sector)}
							onToggle={() =>
								setCollapsedSectors((prev) => {
									const next = new Set(prev);
									next.has(group.sector)
										? next.delete(group.sector)
										: next.add(group.sector);
									return next;
								})
							}
							onRowClick={onRowClick}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}

function SectorGroup({
	group,
	collapsed,
	onToggle,
	onRowClick,
}: {
	group: ReturnType<typeof groupBySector>[number];
	collapsed: boolean;
	onToggle: () => void;
	onRowClick: (row: PortfolioRow) => void;
}) {
	const color = sectorColor(group.sector);
	console.log("Rendering SectorGroup for sector:", onRowClick); // Debugging line
	return (
		<>
			<tr
				style={{ borderLeft: `3px solid ${color}` }}
				onClick={onToggle}
				className="table-row bg-slate-800/40 border-b border-slate-700/30 cursor-pointer hover:bg-bg/60"
			>
				<td colSpan={10} className="font-display font-medium px-3 py-2">
					<span
						className="inline-block transition-transform"
						style={{
							transform: collapsed ? "rotate(-90deg)" : "none",
						}}
					>
						▾
					</span>{" "}
					{group.sector}{" "}
					<span className="text-muted text-xs">
						({group.rows.length})
					</span>
				</td>
				<td colSpan={2} className="text-right px-3 py-2">
					<GainLossCell value={group.summary.totalGainLoss} />
				</td>
			</tr>

			{!collapsed &&
				group.rows.map((row) => (
					<PortfolioFlashRow
						key={row.id}
						row={row}
						onClick={() => onRowClick(row)}
					/>
				))}
		</>
	);
}
