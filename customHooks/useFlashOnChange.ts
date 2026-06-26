import { useEffect, useRef, useState } from "react";

export const useFlashOnChange = (value: number | null) => {
	const [flash, setFlash] = useState(false);
	const prevValueRef = useRef(value);

	useEffect(() => {
		if (prevValueRef.current !== value && prevValueRef.current !== null) {
			setFlash(true);
			const timeout = setTimeout(() => setFlash(false), 800);
			prevValueRef.current = value;
			return () => clearTimeout(timeout);
		}
		prevValueRef.current = value;
	}, [value]);

	return flash;
};
