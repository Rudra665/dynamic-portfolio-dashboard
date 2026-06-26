interface Props {
	value: number | null;
	size?: "sm" | "lg";
}

export const GainLossCell = ({ value, size = "sm" }: Props) => {
	if (value === null) {
		return <span className="text-gray-500">-</span>;
	}

	const isGain = value >= 0;
	const textSizeClass =
		size === "sm"
			? "text-sm"
			: size === "lg"
				? "text-2xl font-semibold"
				: "text-md";
	return (
		<span
			className={`font-mono tabular-nums ${textSizeClass} ${isGain ? "text-gain" : "text-loss"}`}
		>
			{isGain ? "+" : ""}₹
			{Math.abs(value).toLocaleString("en-IN", {
				maximumFractionDigits: 0,
			})}
		</span>
	);
};
