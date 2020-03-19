import React, { useContext, useRef, useEffect } from 'react';
import Keys from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import { display, getKey, layout, btnClasses } from './config';

import { GameCtx } from '../index';
import { Container, HiddenInput } from './style';

const Keyboard = () => {
	// subscribe to game ctx
	const { state, funcs, dispatch } = useContext(GameCtx);
	const { boardMode, gameOn, stress, typeCount, p, material, input } = state;
	const { startGame, endGame } = funcs;

	// on keyboard init
	const initHandler = () => {
		// ...
	};

	// input ref
	let inputEl = useRef(null);
	const setInputRef = node => {
		inputEl = node;
	};

	// on gameOn-change
	useEffect(() => {
		// on game started
		if (gameOn) {
			// focus on hidden input to get typed
			if (inputEl) inputEl.focus();
		}
	}, [gameOn]);

	// type handler
	const inputHandler = e => {
		// update typeCount
		dispatch({ type: 'typeCount', payload: typeCount + 1 });

		// input = last inputted char
		let input = e.target.value[e.target.value.length - 1];

		// input not inputid(?) bail
		if (input || input === '') return;

		// escape < " >
		if (input === '"') input = '\\' + input;

		dispatch({ type: 'input', payload: input });

		// on type match
		if (input === material[0]) {
			// add point
			dispatch({ type: 'p', payload: p + 1 });

			// shorten material
			material.substring(1);
			dispatch({ type: 'material', payload: material });
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
				if (!gameOn) startGame();
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
	}, []);

	return (
		<Container className='Keyboard' gameOn={gameOn} stress={String(stress)}>
			<HiddenInput value={input} onChange={inputHandler} ref={setInputRef} />

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
