import { PortfolioRow, PricePoint } from "../lib/types";
import { sectorColor } from "../lib/sectorColors";
import { GainLossCell } from "./GainLossCell";
import { NumericCell } from "./NumericCell";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

interface Props {
	row: PortfolioRow;
	history: PricePoint[];
	onClose: () => void;
}

export const StockDetailPanel = ({ row, history, onClose }: Props) => {
	if (!row) return null;

	const chartData = history.map((point) => ({
		time: new Date(point.time).toLocaleTimeString("en-IN", {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		}),
		cmp: point.cmp,
	}));
	console.log("row.exchangeCode:", row.exchangeCode);
	console.log("history prop:", history);
	console.log("chartData:", chartData); // Debugging line

	return (
		<div
			className="fixed inset-0 z-50 flex justify-end"
			role="modal"
			aria-modal="true"
		>
			<div className="absolute inset-0 bg-black/50" onClick={onClose} />

			<div className="relative bg-surface border border-border w-full max-w-md h-full p-6 overflow-y-auto animate-in slide-in-from-right">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-muted hover:text-text"
				>
					X
				</button>

				<div
					className="w-2 h-8 rounded-full mb-3"
					style={{ backgroundColor: sectorColor(row.sector) }}
				/>
				<h2 className="font-display tex-2xl font-semibold mb-6">
					{row.stockName}
				</h2>
				<p className="text-muted font-mono text-sm mb-6">
					{row.exchangeCode} . {row.sector}
				</p>

				{/* Live CMP chart */}
				<div
					className="mb-6 bg-bg/40 rounded-lg p-3 border border-border"
					style={{ minHeight: 140 }}
				>
					<div className="text-muted text-xs uppercase tracking-wide mb-2">
						Live CMP
					</div>
					{row.cmp === null ? (
						<div className="h-[140px] flex items-center justify-center text-muted text-sm text-center px-4">
							Live price unavailable for this stock
						</div>
					) : chartData.length < 2 ? (
						<div className="h-[140px] flex items-center justify-center text-muted text-sm">
							Collecting price history…
						</div>
					) : (
						<ResponsiveContainer width="100%" height={140}>
							<LineChart data={chartData}>
								<XAxis dataKey="time" hide />
								<YAxis domain={["auto", "auto"]} hide />
								<Tooltip
									contentStyle={{
										background: "#131922",
										border: "1px solid #1F2733",
										borderRadius: 8,
									}}
									labelStyle={{ color: "#7C8798" }}
									formatter={(value) => [
										`₹${value?.toLocaleString("en-IN")}`,
										"CMP",
									]}
								/>
								<Line
									type="monotone"
									dataKey="cmp"
									stroke={sectorColor(row.sector)}
									strokeWidth={2}
									dot={false}
									isAnimationActive={false}
								/>
							</LineChart>
						</ResponsiveContainer>
					)}
				</div>

				<dl className="space-y-4">
					<Detail label="Purchase Price">
						<NumericCell value={row.purchasePrice} />
					</Detail>
					<Detail label="Quantity">{row.qty}</Detail>
					<Detail label="Investment">
						<NumericCell value={row.investment} />
					</Detail>
					<Detail label="Portfolio %">{row.portfolioPercent}</Detail>
					<Detail label="Current Market Price">
						<NumericCell value={row.cmp} />
					</Detail>
					<Detail label="Present Value">
						<NumericCell value={row.presentValue} />
					</Detail>
					<Detail label="Gain / Loss">
						<GainLossCell value={row.purchasePrice} size="lg" />
					</Detail>
					<Detail label="P/E Ratio">{row.peRatio ?? "-"}</Detail>
					<Detail label="Latest Earnings (EPS)">
						<NumericCell value={row.latestEarnings} />
					</Detail>
				</dl>
			</div>
		</div>
	);
};

function Detail({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex justify-between items-baseline border-b border-border/50 pb-3">
			<dt className="text-muted text-sm">{label}</dt>
			<dd className="font-mono">{children}</dd>
		</div>
	);
}
