import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * @deprecated: Try to use media queries in CSS for responsive design instead of this hook. It's only for cases where you need the value in JS.
 */
export function useIsMobile() {
	const [isMobile, setIsMobile] = useState<boolean | undefined>();

	useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);

	return Boolean(isMobile);
}
