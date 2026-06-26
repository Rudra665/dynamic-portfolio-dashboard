import { PortfolioRow } from "../lib/types";
import { useFlashOnChange } from "../customHooks/useFlashOnChange";
import { GainLossCell } from "./GainLossCell";
import { NumericCell } from "./NumericCell";

interface Props {
	row: PortfolioRow;
	onClick: () => void;
}

export function PortfolioFlashRow({ row, onClick }: Props) {
	const cmpFlash = useFlashOnChange(row.cmp);

	return (
		<tr
			onClick={onClick}
			className="table-row border-b border-slate-800/30 cursor-pointer"
		>
			<td className="px-3 py-2.5 font-medium">{row.stockName}</td>
			<td className="px-3 py-2.5">
				<NumericCell value={row.purchasePrice} />
			</td>
			<td className="px-3 py-2.5 font-mono tabular-nums">{row.qty}</td>
			<td className="px-3 py-2.5">
				<NumericCell value={row.investment} />
			</td>
			<td className="px-3 py-2.5 font-mono tabular-nums text-muted">
				{row.portfolioPercent.toFixed(2)}%
			</td>
			<td className="px-3 py-2.5 font-mono text-muted">
				{row.exchangeCode}
			</td>
			<td
				className={`px-3 py-2.5 ${cmpFlash ? "animate-flash motion-reduce:animate-none" : ""}`}
			>
				<NumericCell value={row.cmp} />
			</td>
			<td className="px-3 py-2.5">
				<NumericCell value={row.presentValue} />
			</td>
			<td className="px-3 py-2.5">
				<GainLossCell value={row.gainLoss} />
			</td>
			<td className="px-3 py-2.5 font-mono tabular-nums text-muted">
				{row.peRatio?.toFixed(1) ?? "–"}
			</td>
			<td className="px-3 py-2.5">
				<NumericCell value={row.latestEarnings} />
			</td>
		</tr>
	);
}
