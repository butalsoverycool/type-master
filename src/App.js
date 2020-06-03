import React from 'react';
import styled from 'styled-components';
import './App.css';

import State from './State';
import Title from './Title';

import Timer from './Timer';

//import Game from './Game';

const AppHeader = styled.header``;

function App() {
	return (
		<State>
			<div className='App'>
				<AppHeader className='App-header'>
					<Title />
				</AppHeader>

				<div className='game-container'>
					<Timer />
				</div>
				{/* <Game /> */}
			</div>
		</State>
	);
}

export default App;
