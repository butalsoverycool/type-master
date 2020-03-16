import React, {
	useState,
	useEffect,
	useRef,
	useReducer,
	useContext
} from 'react';
/* import keyboard from './resources/swedishKeyboardMac.png'; */
import styled from 'styled-components';

import Keys from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './index.css';

import { Ctx } from './State';

const color = {
	'1': '#eefae8',
	'2': '#caebb9',
	'3': '#a3cf8c'
};

const Container = styled.div`
	width: 100%;
	max-width: 700px;
	min-width: 450px;
	text-align: center;
	margin: auto;

	& .hg-button.active {
		border-bottom: none;
		border-top: 1px #e6e6e6 solid;
		color: red;
		background: red;
	}

	& .hg-button.active.stress-1 {
		background: ${color['1']};
	}

	& .hg-button.active.stress-2 {
		background: ${color['2']};
	}

	& .hg-button.active.stress-3 {
		background: ${color['3']};
	}

	& .hg-button.space {
		flex: 18;
	}

	& .hg-button.regular {
		max-width: 45px;
		max-height: 45px;
		flex: 1;
	}

	& .hg-button.empty {
		flex: 80;
		background: none;
		box-shadow: none;
		border: none;
	}

	& .hg-button.empty > span {
		width: 100%;
		text-align: left;
		opacity: 0.5;
		font-style: italic;
		font-size: 0.8em;
	}

	@media screen and (max-width 720px) {
		& .hg-button {
			font-size: 2vw;
		}

		& .hg-button.regular {
			max-width: 6%;
			max-height: 6%;
			flex: 1;
		}
	}
`;

const HiddenInput = styled.input`
	opacity: 0;
`;

const layout = {
	default: [
		'{esc} {empty}',
		'§ 1 2 3 4 5 6 7 8 9 0 + ´ {bksp}',
		'{tab} q w e r t y u i o p å ¨',
		"{lock} a s d f g h j k l ö ä ' {enter}",
		'{shift} < z x c v b n m , . - {shift}',
		'ctrl {alt} cmd {space} cmd {alt}'
	],
	shift: [
		'{esc} {empty}',
		'° ! " # € % & / ( ) = ? ` {bksp}',
		'{tab} Q W E R T Y U I O P Å ^',
		'{lock} A S D F G H J K L Ö Ä * {enter}',
		'{shift} > Z X C V B N M ; : _ {shift}',
		'ctrl {alt} cmd {space} cmd {alt}'
	],
	alt: [
		'{esc} {empty}',
		'¶ © @ £ $ ∞ § | [ ] ≈ ± ´ {bksp}',
		'{tab} • Ω é ® † µ ü ı œ π ˙ ~',
		'{lock}  ß ∂ ƒ ¸ ˛ √ ª ﬁ ø æ ™ {enter}',
		'{shift} ≤ (null) ≈ ç ‹ › ‘ ’ ‚ … – {shift}',
		'ctrl {alt} cmd {space} cmd {alt}'
	]
};

const btnClasses = ({ input, boardMode, stress }) => [
	{
		class: 'active',
		buttons:
			(input === ' ' ? '{space}' : input) + // pressed key
			(boardMode === 'shift' ? '{shift} ' : '') + // inc shift/alt
			(boardMode === 'alt' ? '{alt}' : '')
	},
	{
		class: `stress-${String(stress)}`,
		buttons: input || '{space}'
	},
	{
		class: 'space',
		buttons: '{space}'
	},
	{
		class: 'regular',
		buttons:
			'§ 1 2 3 4 5 6 7 8 9 0 + ´ q w e r t y u i o p å ¨ a s d f g h j k l ö ä < z x c v b n m , . - ° ! " # € % & / ( ) = ? ` Q W E R T Y U I O P Å ^ A S D F G H J K L Ö Ä * > Z X C V B N M ; : _ ¶ © @ £ $ ∞ § | [ ] ≈ ± ´ • Ω é ® † µ ü ı œ π ˙ ~  ß ∂ ƒ ¸ ˛ √ ª ﬁ ø æ ™ ≤ (null) ≈ ç ‹ › ‘ ’ ‚ … – {esc}' +
			"' "
	},
	{
		class: 'empty',
		buttons: '{empty}'
	}
];

const display = gameOn => ({
	'{bksp}': 'delete',
	'{enter}': 'enter',
	'{tab}': 'tab',
	'{shift}': 'shift',
	'{alt}': 'alt',
	'{space}': gameOn ? 'space' : 'Press spacebar to start',
	'{empty}': gameOn ? '<-- Press escape to stop game' : ' '
});

const getKey = char => {
	switch (char) {
		case 'Tab':
			return '{tab}';
		case 'CapsLock':
			return false; //'{lock}';
		case 'Enter':
			return '{enter}';
		case 'Shift':
			return '{shift}';
		case 'Control':
			return 'ctrl';
		case 'Alt':
			return '{alt}';
		case 'Meta':
			return 'cmd';
		case ' ':
			return '{space}';
		default:
			return char;
	}
};

const origMaterial = 'Hej jag heter Kim!';

let active = true;

/* const initialState = {
	boardMode: 'default'
};

const stateReducer = (state, action) => {
	// if update unnecessary, bail
	if (state[action.type] === action.payload) return state;

	console.log('REDUCER...');

	const newState = JSON.parse(JSON.stringify(state));

	switch (action.type) {
		case 'boardMode':
			newState[action.type] = action.payload;
			console.log(`changed ${action.type} to ${action.payload}`);
			return newState;
		default:
			return state;
	}
}; */

const Keyboard = props => {
	//const [state, dispatch] = useReducer(stateReducer, initialState);
	//const { boardMode } = state;

	//const [boardMode, setboardMode] = useState('default');
	const { state, dispatch } = useContext(Ctx);
	const { boardMode, material, gameOn, input } = state;

	const [allKeys, setAllKeys] = useState(null);

	const [count, setCount] = useState(0);
	const [points, setPoints] = useState(0);

	let inputEl = useRef(null);

	const setInputRef = node => {
		inputEl = node;
	};

	useEffect(() => {
		if (material.length < 1 && gameOn) {
			alert('Master!');
			exitGame();
		}
	}, [input, material]);

	const inputHandler = e => {
		/* if (!gameOn) {
			if (e.target.value !== ' ') {
				return;
			} else {
				setGameOn(true);
			}
		} */

		// count action
		setCount(count => count + 1);

		// input = last inputted char
		let val = e.target.value[e.target.value.length - 1];
		// escape "
		if (val === '"') val = '\\' + val;

		if (!val || val === '') return;

		dispatch({ type: 'input', payload: val });

		// on type match
		if (val === material[0]) {
			// add point
			setPoints(p => p + 1);

			// shorten material
			material.shift();
			dispatch({ type: 'material', payload: material });
		}

		/* // highlight key
		allKeys.forEach(el => {
			el.style.color = 'black';
		});

		const key = document.querySelector(
			`.react-simple-keyboard .hg-button[data-skbtn="${val}"]`
		);

		if (key) {
			key.style.color = 'red';
		} */
	};

	const initHandler = () => {
		// map boardBtns in DOM
		const keys = document.querySelectorAll(
			'.react-simple-keyboard .hg-button'
		);
		setAllKeys(keys);
	};

	const startGame = () => {
		console.log('Game started!');
		dispatch({ type: 'gameOn', payload: true });
	};

	const exitGame = () => {
		console.log('Game stopped!');
		dispatch({ type: 'input', payload: '{space}' });
		dispatch({ type: 'gameOn', payload: false });
	};

	const downHandler = e => {
		console.log('gmae sttatus', gameOn);
		switch (e.key) {
			case 'Shift':
				if (boardMode !== 'shift') {
					dispatch({ type: 'boardMode', payload: 'shift' });
				}
				break;
			case 'Alt':
				if (boardMode !== 'alt') {
					dispatch({ type: 'boardMode', payload: 'alt' });
				}
				break;
			case 'Escape':
				/* if (gameOn) didnt work... */ exitGame();
				break;
			case ' ':
				if (!gameOn) startGame();
				break;
			default:
				break;
		}
	};

	const upHandler = e => {
		if (
			e.key === 'Shift' ||
			e.key === 'Alt' /* && boardMode !== 'default' not working...*/
		) {
			dispatch({ type: 'boardMode', payload: 'default' });
		}
	};

	useEffect(() => {
		if (gameOn) {
			inputEl.focus();
		}
	}, [gameOn]);

	useEffect(() => {
		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);
	}, []);

	return (
		<Container className='Keyboard'>
			<p>Keys pressed: {count}</p>
			<p>Points: {points}</p>
			<p>Accuracy: {Math.round((points / count || 0).toFixed(2) * 100)}%</p>
			<h3>{gameOn ? `Type: ${material.join('')}` : ''}</h3>
			<p>Game status: {JSON.stringify(gameOn)}</p>

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
