import React, { createContext, useReducer, useEffect } from 'react';
import stateUpdater, { initialState } from './state';

// ctx
const GameCtx = createContext(initialState);

/* const Timer = props => {
    const {state, dispatch} = useContext(GameCtx);

    const [timer, setTimer] = 
    
    if(props.start) timer = window.setInterval(() => {
				dispatch({
					type: 'time'
				});
	}, 1000);

    useEffect(() => {

    },[timer])
    return (

    )
} */

// provider
// sharing state and updater-func with lower components
// since no explicit consumer, they subscribe through the useContext-hook
export const GameStateProvider = props => {
	const [state, dispatch] = useReducer(stateUpdater, initialState);

	const { timer } = state;

	// start game
	const startGame = () => {
		console.log('Game started!');
		dispatch({
			type: 'input',
			payload: ''
		});
		dispatch({
			type: 'gameOn',
			payload: true
		});

		// init/start timer
		/* dispatch({
			type: 'timer',
			payload: window.setInterval(() => {
				dispatch({
					type: 'time'
				});
			}, 1000)
		}); */

		// on game stop, stop/reset timer
		/* return () => {
			window.clearInterval(timer);
			dispatch({
				type: 'timer',
				payload: null
			});
			dispatch({
				type: 'time',
				payload: 'reset'
			});
		}; */
	};

	// end game
	const endGame = () => {
		console.log('Game stopped!');
		dispatch({
			type: 'input',
			payload: '{space}'
		});
		dispatch({
			type: 'gameOn',
			payload: false
		});
		//clearInterval(timer);
	};

	const funcs = {
		startGame,
		endGame,
		timer
	};

	return (
		<GameCtx.Provider
			value={{
				state,
				funcs,
				dispatch
			}}
		>
			{props.children}
		</GameCtx.Provider>
	);
};

export default GameCtx;
