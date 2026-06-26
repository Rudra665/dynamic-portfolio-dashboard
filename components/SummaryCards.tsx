import { PortfolioRow } from "../lib/types";
import { GainLossCell } from "./GainLossCell";

interface Props {
	totalInvestment: number;
	totalPresentValue: number;
	totalGainLoss: number;
	topPerformer: PortfolioRow | null;
}

export const SummaryCards = ({
	totalInvestment,
	totalPresentValue,
	totalGainLoss,
	topPerformer,
}: Props) => {
	const gainPercent =
		totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
			<Card label="Total Investment">
				<span className="font-mono tabular-nums text-2xl font-semibold">
					${totalInvestment.toLocaleString("en-IN")}
				</span>
			</Card>

			<Card label="Total Present Value">
				<span className="font-mono tabular-nums text-2xl font-semibold">
					${totalPresentValue.toLocaleString("en-IN")}
				</span>
			</Card>

			<Card label="Total Gain/Loss">
				<div className="flex flex-col items-left gap-2">
					<GainLossCell value={totalGainLoss} size="lg" />
					<span className={`font-mono text-sm text-muted`}>
						{gainPercent.toFixed(2)}%
					</span>
				</div>
			</Card>

			<Card label="Top Performer">
				<span className="font-display text-lg font-semibold">
					{topPerformer ? topPerformer.stockName : "-"}
				</span>
			</Card>
		</div>
	);
};

function Card({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className="bg-[linear-gradient(135deg,rgba(30,41,59,0.85),rgba(15,23,42,0.9))] border border-border rounded-md p-4">
			<span className="text-muted text-xs font-body uppercase tracking-wide mb-2">
				{label}
			</span>
			<span className="block mt-1">{children}</span>
		</div>
	);
}
