import React, { createContext, useReducer, useEffect } from 'react';
import styled from 'styled-components';

import stateUpdater, { initialState } from './state';
import Stats from './Stats';
import Material from './material';
import Keyboard from './Keyboard';
import Timer from 'react-compound-timer';

// ctx
export const GameCtx = createContext(initialState);

const Container = styled.div``;

const Game = () => {
	const [state, dispatch] = useReducer(stateUpdater, initialState);

	let timer = null;

	// start game
	const startGame = () => {
		console.log('Game started...');

		dispatch({
			type: 'input',
			payload: '',
		});

		dispatch({
			type: 'gameOn',
			payload: true,
		});

		dispatch({
			type: 'time',
			payload: 'reset',
		});

		timer = setInterval(() => {
			dispatch({
				type: 'time',
			});
		}, 1000);
	};

	// end game
	const endGame = () => {
		console.log('Game stopped!');
		dispatch({
			type: 'input',
			payload: '{space}',
		});
		dispatch({
			type: 'gameOn',
			payload: false,
		});

		clearInterval(timer);
	};

	const funcs = {
		startGame,
		endGame,
		timer,
	};

	return (
		/* <GameCtx.Provider
			value={{
				state,
				funcs,
				dispatch,
			}}
		> */
		<Container className='Game'>
			{/* <Stats />
				<Material />
				<Keyboard /> */}
		</Container>
		/* </GameCtx.Provider> */
	);
};

export default Game;
