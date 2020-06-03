import { selector } from 'recoil';
import * as atoms from './atoms';

export const gameStats = selector({
	key: 'gameStats',
	get: ({ get }) => {
		const text = get(atoms.textState);
		const typeIndex = get(atoms.typeIndexState);
		const typosCount = get(atoms.typosState.length);
		const timePassed = get(atoms.timePassedState);

		const passedText = text.substring(0, typeIndex);
		const notTyped = text.substring(typeIndex);
		const accuracy = typosCount / text.length;

		// 1p = 4 correct chars in 1 sec, (later, make several difficulties)
		const points = passedText.length / (4 * timePassed.s);

		return {
			passedText,
			notTyped,
			typosCount,
			accuracy,
			points,
		};
	},
});
