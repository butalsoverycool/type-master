import React, { createContext, useReducer, useRef } from 'react';

export const songs = [
	{
		title: 'Backseet Freestyle',
		artist: 'Kendrick Lamar',
		lyrics: `Martin had a dream. Martin had a dream. Kendrick have a dream! All my life I want money and power. Respect my mind or die from lead shower. I pray my dick get big as the Eiffel Tower. So I can fuck the world for seventy-two hours.`
	},
	{
		title: 'King Kunta',
		artist: 'Kendrick Lamar',
		lyrics: `Bitch where you when I was walkin? Now I run the game got the whole world talkin (King Kunta). Everybody wanna cut the legs off him (King Kunta) Kunta. Black man taking no losses. Bitch where you when I was walkin? Now I run the game, got the whole world talkin (King Kunta). Everybody wanna cut the legs off him.`
	},
	{
		title: 'Thinkin Bout You',
		artist: 'Frank Ocean',
		lyrics: `A tornado flew around my room before you came, excuse the mess it made, it usually doesn't rain in. Southern California, much like Arizona, my eyes don't shed tears, but boy, they bawl when I'm thinkin bout you (ooh no no no). I've been thinkin bout you (you know know know). I've been thinkin bout you. Do you think about me still? Do ya, do ya?`
	},
	{
		title: 'Solo',
		artist: 'Frank Ocean',
		lyrics: `Hand me a towel, I'm dirty dancing by myself Gone off tabs of that acid. Form me a circle, watch my Jagger. Might lose my jacket and hit a solo (one time). We too loud in public then police turned down the function. Now we outside and the timing's perfect. Forgot to tell you, gotta tell you how much I vibe with you. And we don't gotta be solo.`
	},
	{
		title: 'Hej jag heter Eddie',
		artist: 'Eddie',
		lyrics: `Jag heter faktiskt Eddie, och har skrivit detta själv med papper och penna, hej. Du vet, du vill känna mig så glatt. Du vet det är så här som jag fått ett skvatt. Kolla här nu, ja, jag kommer här och rappar, sitter hemma nu här kommer jag och nappar. Du vet att jag vet mycket i denna världen som inte jag som tycker. Det finns många våld hela tiden. Min farsa trodde jag... allt för given. När han kommer hem till mig och säger sånt som jag inte...`
	}
];

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

const Ctx = createContext(initialState);

const StateProvider = props => {
	const [state, dispatch] = useReducer(stateReducer, initialState);

	return (
		// sending the state and its updater-func with the provider-component wrapping App
		<Ctx.Provider value={{ state, dispatch }}>{props.children}</Ctx.Provider>
	);
};

export { Ctx, StateProvider };
