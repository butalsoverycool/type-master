import React, { createContext, useReducer } from 'react';

const materialStr = 'Hej jag heter Eddy, jag har skrivit detta själv.';

export const initialState = {
	boardMode: 'default',
	material: materialStr.split(''),
	gameOn: false,
	stress: 1,
	input: ' '
};

// State updater
const stateReducer = (state, action) => {
	// deep clone
	let newState = JSON.parse(JSON.stringify(state));

	// update state according to given action type/payload
	newState[action.type] = action.payload;
	console.log(action.type + ' is now ' + action.payload);
	return newState;

	/* switch (action.type) {
		case 'boardMode':
			newState[action.type] = action.payload;
			console.log('NEW STATE', newState);
			return newState;
		case 'material':

		default:
			return state; 
	}*/
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
