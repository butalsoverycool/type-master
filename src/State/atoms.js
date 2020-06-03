import { atom } from 'recoil';

// temp
export const userState = atom({
	key: 'userState',
	default: {
		_id: 1,
		email: 'example@example.com',
		username: 'Example Exampleson',
	},
});

export const tickingState = atom({
	key: 'tickingState',
	default: false,
});

export const timePassedState = atom({
	key: 'timePassedState',
	default: {
		totalMs: 0,
		min: 0,
		sec: 0,
		ms: 0,
	},
});

export const textState = {
	key: 'textState',
	default: null,
};

export const typeIndexState = atom({
	key: 'typeIndexState',
	default: 0,
});

export const typosState = atom({
	key: 'typosState',
	default: [],
});

export const typedState = {
	key: 'typedState',
	default: '',
};
