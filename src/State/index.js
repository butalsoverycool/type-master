import React, { createContext, useReducer } from 'react';

const rand = Math.floor(Math.random() * songs.length, songs.length - 1);

export const initialState = {
	boardMode: 'default',
	material: songs[rand].lyrics.split(''),
	gameOn: false,
	input: ' ',
	stripW: 100,
	count: 0,
	p: 0,
	stress: 1,
	time: 0
};

// State updater
const stateReducer = (state, action) => {
	// deep clone
	let newState = JSON.parse(JSON.stringify(state));

	switch (action.type) {
		case 'time':
			if (action.payload === 'reset') {
				newState.time = 0;
			} else {
				newState.time += 1;
			}
			return newState;

		default:
			newState[action.type] = action.payload;
			return newState;
	}
};

const gameCtx = createContext(initialState);

export const gameStateProvider = props => {
	const [state, dispatch] = useReducer(stateReducer, initialState);

	return (
		// sending the state and its updater-func with the provider-component wrapping App
		<gameCtx.Provider value={{ state, dispatch }}>
			{props.children}
		</gameCtx.Provider>
	);
};

export const withGameState = Component => props => (
	<gameCtx.Consumer>
		{(state, dispatch) => (
			<Component {...props} state={state} dispatch={dispatch} />
		)}
	</gameCtx.Consumer>
);

export default gameCtx;
