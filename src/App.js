import React from 'react';
import styled from 'styled-components';
import './App.css';
import Title from './Title';

import Game from './Game';

const AppHeader = styled.header``;

function App() {
	return (
		<div className='App'>
			<AppHeader className='App-header'>
				<Title />
			</AppHeader>

			<Game />
		</div>
	);
}

export default App;
