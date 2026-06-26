import { SectorSummary } from "@/lib/types";
import { sectorColor } from "@/lib/sectorColors";

interface Props {
	sectorSummaries: SectorSummary[];
	totalInvestment: number;
}

export function SectorAllocation({ sectorSummaries, totalInvestment }: Props) {
	return (
		<div className="bg-[linear-gradient(135deg,rgba(30,41,59,0.85),rgba(15,23,42,0.9))] border-b border-slate-700/30 rounded-lg p-4 h-fit">
			<h2 className="font-display text-lg font-medium mb-4">
				Sector Allocation
			</h2>

			<div className="space-y-4">
				{sectorSummaries.map((s) => {
					const percent =
						totalInvestment === 0
							? 0
							: (s.totalInvestment / totalInvestment) * 100;
					const color = sectorColor(s.sector);

					return (
						<div key={s.sector}>
							<div className="flex justify-between text-sm mb-1.5">
								<span className="flex items-center gap-2">
									<span
										className="w-2 h-2 rounded-full"
										style={{ backgroundColor: color }}
									/>
									{s.sector}
								</span>
								<span className="font-mono tabular-nums text-muted">
									{percent.toFixed(2)}%
								</span>
							</div>
							<div className="h-1.5 bg-border rounded-full overflow-hidden">
								<div
									className="h-full rounded-full transition-all duration-500"
									style={{
										width: `${percent}%`,
										backgroundColor: color,
									}}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
