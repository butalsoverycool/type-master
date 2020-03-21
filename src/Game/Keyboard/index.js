import React, { useContext, useRef, useEffect } from 'react';
import Keys from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import { display, getKey, layout, btnClasses } from './config';

import { GameCtx } from '../index';
import { Container, HiddenInput } from './style';

const Keyboard = () => {
	// subscribe to game ctx
	const { state, funcs, dispatch } = useContext(GameCtx);
	const {
		boardMode,
		gameOn,
		stress,
		typeCount,
		p,
		material,
		typed,
		notTyped,
		input
	} = state;
	const { startGame, endGame } = funcs;

	// on keyboard init
	const initHandler = () => {
		// ...
	};

	// input ref
	let inputEl = useRef(null);

	useEffect(() => {
		console.log('curr game status', gameOn);
	}, [gameOn]);

	// type handler
	const inputHandler = e => {
		if (!gameOn) return;

		// update typeCount
		dispatch({ type: 'typeCount', payload: typeCount + 1 });

		// input = last inputted char
		let input = e.target.value[e.target.value.length - 1];

		// input not inputid(?) bail
		if (input || input === '') return;

		// escape < " >
		if (input === '"') input = '\\' + input;

		dispatch({ type: 'input', payload: input });

		console.log('input', input);
		// on type match
		if (input === notTyped[0]) {
			console.log('match!');
			// add point
			dispatch({ type: 'p', payload: p + 1 });

			//update typed-state
			dispatch({ type: 'typed', payload: typed + input });

			// shorten material
			dispatch({ type: 'notTyped', payload: material.txt.substring(1) });
		}
	};

	// keyboard listener
	const downHandler = e => {
		switch (e.key) {
			// shift board mode
			case 'Shift':
				if (boardMode !== 'shift') {
					dispatch({ type: 'boardMode', payload: 'shift' });
				}
				break;
			// alt board mode
			case 'Alt':
				if (boardMode !== 'alt') {
					dispatch({ type: 'boardMode', payload: 'alt' });
				}
				break;
			// escape stops game
			case 'Escape':
				/* if (gameOn) didnt work... */ endGame();
				break;
			// space starts game (if !gameOn)
			case ' ':
				if (state.gameOn === false) {
					inputEl.current.focus();
					startGame();
				}
				break;
			// prevent tabbing away from hidden input
			case 'Tab':
				// keep focus on input while playing
				/* if (gameOn) didnt work... */ e.preventDefault();
				break;
			default:
				break;
		}
	};

	// keyboard listener
	const upHandler = e => {
		// default board mode
		if (
			e.key === 'Shift' ||
			e.key === 'Alt' /* && boardMode !== 'default' not working...*/
		) {
			dispatch({ type: 'boardMode', payload: 'default' });
		}
		// clear input (temp***?)
		else {
			dispatch({ type: 'input', payload: '' });
		}
	};

	// on "mount/unmount"
	useEffect(() => {
		// listen to keyboard
		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);

		return () => {
			window.removeEventListener('keydown', downHandler);
			window.removeEventListener('keyup', upHandler);
		};
	}, [state]);

	return (
		<Container className='Keyboard' gameOn={gameOn} stress={String(stress)}>
			<HiddenInput value={input} onChange={inputHandler} ref={inputEl} />

			<Keys
				layout={layout}
				layoutName={boardMode}
				display={display(gameOn)}
				mergeDisplay={true}
				onRender={initHandler}
				buttonTheme={btnClasses(state)}
			/>

			<p>
				<i>Board: mac ({boardMode})</i>
			</p>
		</Container>
	);
};

export default Keyboard;
