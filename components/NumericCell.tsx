interface Props {
	value: number | null;
	prefix?: string;
}

export const NumericCell = ({ value, prefix = "₹" }: Props) => {
	if (value === null) {
		return <span className="font-mono text-muted">-</span>;
	}
	return (
		<span className="font-mono tabular-nums">
			{prefix}
			{value.toLocaleString()}
		</span>
	);
};
