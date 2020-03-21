export const songs = [
	{
		title: 'Backseet Freestyle',
		artist: 'Kendrick Lamar',
		txt: `Martin had a dream. Martin had a dream. Kendrick have a dream! All my life I want money and power. Respect my mind or die from lead shower. I pray my dick get big as the Eiffel Tower. So I can fuck the world for seventy-two hours.`
	},
	{
		title: 'King Kunta',
		artist: 'Kendrick Lamar',
		txt: `Bitch where you when I was walkin? Now I run the game got the whole world talkin (King Kunta). Everybody wanna cut the legs off him (King Kunta) Kunta. Black man taking no losses. Bitch where you when I was walkin? Now I run the game, got the whole world talkin (King Kunta). Everybody wanna cut the legs off him.`
	},
	{
		title: 'Thinkin Bout You',
		artist: 'Frank Ocean',
		txt: `A tornado flew around my room before you came, excuse the mess it made, it usually doesn't rain in. Southern California, much like Arizona, my eyes don't shed tears, but boy, they bawl when I'm thinkin bout you (ooh no no no). I've been thinkin bout you (you know know know). I've been thinkin bout you. Do you think about me still? Do ya, do ya?`
	},
	{
		title: 'Solo',
		artist: 'Frank Ocean',
		txt: `Hand me a towel, I'm dirty dancing by myself Gone off tabs of that acid. Form me a circle, watch my Jagger. Might lose my jacket and hit a solo (one time). We too loud in public then police turned down the function. Now we outside and the timing's perfect. Forgot to tell you, gotta tell you how much I vibe with you. And we don't gotta be solo.`
	},
	{
		title: 'Hej jag heter Eddie',
		artist: 'Eddie',
		txt: `Jag heter faktiskt Eddie, och har skrivit detta själv med papper och penna, hej. Du vet, du vill känna mig så glatt. Du vet det är så här som jag fått ett skvatt. Kolla här nu, ja, jag kommer här och rappar, sitter hemma nu här kommer jag och nappar. Du vet att jag vet mycket i denna världen som inte jag som tycker. Det finns många våld hela tiden. Min farsa trodde jag... allt för given. När han kommer hem till mig och säger sånt som jag inte...`
	}
];

// pick rand material
const pickMaterial = library => {
	// if input not correct, bail
	if (typeof library !== 'object' || !library.length)
		return void console.log('Can only pick material from arr-library');

	// rand index
	const rand = Math.floor(Math.random() * library.length, library.length - 1);

	// return random material if str
	return typeof library[rand].txt === 'string'
		? library[rand]
		: () => {
				console.log("Chosen material object didn't contain a txt-str.");
				return null;
		  };
};

// set here cuz notTyped depends on material
const material = pickMaterial(songs, 'txt');
const notTyped = material.txt;

// initial game state
export const initialState = {
	boardMode: 'default',
	material,
	typed: '',
	notTyped,
	gameOn: false,
	input: ' ',
	typeCount: 0,
	p: 0,
	stress: 1,
	timer: null,
	time: 0
};

// State updater / reducer
const stateUpdater = (state, action) => {
	// curr state deep clone
	let newState = JSON.parse(JSON.stringify(state));

	//return updated state
	switch (action.type) {
		case 'time':
			if (action.payload === 'reset') {
				newState.time = 0;
			} else {
				newState.time += 1;
			}
			return newState;
		case 'material':
			newState[action.type] = action.payload;
			newState.typed = '';
			newState.notTyped = action.payload.txt;
		default:
			newState[action.type] = action.payload;
			return newState;
	}
};

export default stateUpdater;
