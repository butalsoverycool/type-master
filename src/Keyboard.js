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

import { Ctx, songs } from './State';

const color = {
	'1': '#eefae8',
	'2': '#caebb9',
	'3': '#a3cf8c'
};

const Container = styled.div`
	width: 100%;
	max-width: 900px;
	text-align: center;
	margin: auto;

	display: flex;
	flex-direction: column;
	justify-content: stretch;
`;

const Overview = styled.div`
	background: #f6f6f6;
`;

const Material = styled.div`
	background: #888;
	color: #ddd;
	height: 60px;
	padding: 0;
`;

const Strip = styled.div`
	position: relative;
	height: 100%;
	background: #333;

	width: ${props => props.stripW}%;
	text-align: left;
	float: right;
`;

const Txt = styled.h3`
	height: 100%;
	line-height: 60px;
	margin: auto;
	position: absolute;
`;

const BoardContainer = styled.div`
	width: 100%;
	max-width: 700px;
	min-width: 450px;
	margin: auto;

	& .hg-button.active {
		border-bottom: none;
		border-top: 1px #e6e6e6 solid;
	}

	${props =>
		props.stress &&
		` 
		& .hg-button.stress-${props.stress} {
			background: ${color[props.stress]};
		}
	`};

	& .hg-button.space {
		flex: 18;
		${props => !props.gameOn && 'font-weight: 700'};
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
			(input === ' ' ? '{space}' : !input ? ' ' : input) + // pressed key
			(boardMode === 'shift' ? ' {shift} ' : '') + // inc shift/alt
			(boardMode === 'alt' ? ' {alt}' : '')
	},
	{
		class: `stress-${String(stress)}`,
		buttons: input === ' ' ? '{space}' : !input ? ' ' : input
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

let timer = null;

const Keyboard = props => {
	const { state, dispatch } = useContext(Ctx);
	const {
		boardMode,
		material,
		gameOn,
		input,
		stripW,
		count,
		p,
		stress,
		time
	} = state;

	const [allKeys, setAllKeys] = useState(null);

	let inputEl = useRef(null);

	const setInputRef = node => {
		inputEl = node;
	};

	let materialRef = useRef(null);

	const setMaterialRef = node => {
		if (!node) return;
		materialRef = node;

		console.log('material-width', materialRef.offsetWidth);
	};

	useEffect(() => {
		if (!material) return;

		if (material.length < 1 && gameOn) {
			alert(time + 's you Master!');
			exitGame();
		}
	}, [input, material]);

	const inputHandler = e => {
		// count action
		dispatch({ type: 'count', payload: count + 1 });

		// input = last inputted char
		let val = e.target.value[e.target.value.length - 1];
		// escape "
		if (val === '"') val = '\\' + val;

		if (!val || val === '') return;

		dispatch({ type: 'input', payload: val });

		// on type match
		if (val === material[0]) {
			// add point
			dispatch({ type: 'p', payload: p + 1 });

			// shorten material
			material.shift();
			dispatch({ type: 'material', payload: material });

			// shorten strip
			dispatch({
				type: 'stripW',
				payload: stripW - 20 >= 100 ? stripW - 20 : 100
			});
		}
	};

	const initHandler = () => {
		// map boardBtns in DOM
		const keys = document.querySelectorAll(
			'.react-simple-keyboard .hg-button'
		);
		setAllKeys(keys);
	};

	const tick = () => {
		dispatch({ type: 'time', payload: time + 1 });
	};

	const startGame = () => {
		console.log('Game started!');
		dispatch({ type: 'input', payload: '' });
		dispatch({ type: 'gameOn', payload: true });
	};

	const exitGame = () => {
		console.log('Game stopped!');
		dispatch({ type: 'input', payload: '{space}' });
		dispatch({ type: 'gameOn', payload: false });
		clearInterval(timer);
	};

	const downHandler = e => {
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
			case 'Tab':
				// keep focus on input while playing
				/* if (gameOn) didnt work... */ e.preventDefault();
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
		} else {
			dispatch({ type: 'input', payload: '' });
		}
	};

	useEffect(() => {
		if (gameOn) {
			inputEl.focus();

			timer = window.setInterval(() => {
				dispatch({ type: 'time' }); // <-- Change this line!
			}, 1000);
			return () => {
				window.clearInterval(timer);
				dispatch({ type: 'time', payload: 'reset' });
			};
		}
	}, [gameOn]);

	useEffect(() => {
		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);
	}, []);

	const songHandler = title => {
		const res = songs
			.filter(song => song.title === title)[0]
			.lyrics.split('');
		console.log(res);

		dispatch({ type: 'material', payload: res });
	};

	return (
		<Container>
			<Overview>
				<p>Time: {time}</p>
				<p>Keys pressed: {count}</p>
				<p>P: {p}</p>
				<p>Accuracy: {Math.round((p / count || 0).toFixed(2) * 100)}%</p>

				<p>Game status: {JSON.stringify(gameOn)}</p>

				{songs.map((song, nth) => (
					<button
						key={song.title + '-' + nth}
						onClick={() => songHandler(song.title)}
					>
						{song.title} ({song.artist})
					</button>
				))}

				<HiddenInput
					value={input}
					onChange={inputHandler}
					ref={setInputRef}
				/>
			</Overview>

			<Material ref={setMaterialRef}>
				<Strip /* ref={setStripRef} */ stripW={stripW}>
					<Txt>{gameOn ? `${material.join('')}` : ''}</Txt>
				</Strip>
			</Material>

			<BoardContainer
				className='Keyboard'
				gameOn={gameOn}
				stress={String(stress)}
			>
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
			</BoardContainer>
		</Container>
	);
};

export default Keyboard;
