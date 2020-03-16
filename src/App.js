import React from 'react';
import './App.css';
import Title from './Title';
import Keyboard from './Body';
import { StateProvider } from './State';

function App() {
	return (
		<StateProvider>
			<div className='App'>
				<header className='App-header'>
					<Title />
				</header>
				<div>
					<Keyboard />
				</div>
			</div>
		</StateProvider>
	);
}

export default App;
