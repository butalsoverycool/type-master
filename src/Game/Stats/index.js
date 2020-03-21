import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { songs } from '../state';
import { GameCtx } from '../index';

const Overview = styled.div`
	display: flex;
	justify-content: stretch;
	background: #f6f6f6;
`;

const Box = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: stretch;
	flex: 1;

	& > button {
		flex: 1;
		border: none;
		outline: none;
		margin: 5px;
		cursor: pointer;
	}
`;

const Stats = () => {
	// subscribe to game ctx
	const { state, funcs, dispatch } = useContext(GameCtx);
	const {
		gameOn,
		time,
		typeCount,
		p,
		input,
		material,
		typed,
		notTyped
	} = state;
	const { endGame } = funcs;

	// handle material pick
	const setNewMaterial = title => {
		const res = songs.filter(song => song.title === title)[0];

		dispatch({ type: 'material', payload: res });
	};

	// fx
	useEffect(() => {
		if (!material) return;
		if (!material.txt) return;

		if (gameOn && typed.length > 0 && notTyped.length < 1) {
			alert(time + 's you Master!');
			endGame();
		}
	}, [input, material]);

	// calculate average type accuracy
	const accuracy = Math.round((p / typeCount || 0).toFixed(2) * 100);

	return (
		<Overview>
			<Box>
				<p>Time: {time}</p>
				<p>Keys pressed: {typeCount}</p>
				<p>P: {p}</p>
				<p>Accuracy: {accuracy}%</p>

				<p>Typed: {typed.length}</p>
				<p>Not typed: {notTyped.length}</p>

				<p>Game status: {JSON.stringify(gameOn)}</p>

				<p>
					<i>
						<b>{material.txt}</b>
					</i>
				</p>
			</Box>

			<Box>
				<p>Pick a song</p>
				{songs.map((song, nth) => (
					<button
						key={song.title + '-' + nth}
						onClick={() => setNewMaterial(song.title)}
					>
						{song.title} ({song.artist})
					</button>
				))}
			</Box>
		</Overview>
	);
};

export default Stats;
