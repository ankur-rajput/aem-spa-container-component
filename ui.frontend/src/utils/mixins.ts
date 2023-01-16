import { css } from 'styled-components';
import { BREAKPOINTS } from './constants';

type cssParams = Parameters<typeof css>;
const breakpointKeys = Object.keys(BREAKPOINTS) as Array<keyof typeof BREAKPOINTS>;

const respondTo = breakpointKeys.reduce((accumulator, label) => {
			accumulator[label] = (...args: cssParams) => css`
				@media (min-width: ${BREAKPOINTS[label]}) {
					${css(...args)};
				}
			`;
			return accumulator;
		}, {} as Record<keyof typeof BREAKPOINTS, Function>);

export default respondTo;
