import React from 'react';
import styled from 'styled-components';
import CompoundTimer from 'react-compound-timer';
import { Table } from 'antd';

import { useRecoilState, useRecoilValue } from 'recoil';
import { atoms } from '../State';

const { Minutes, Seconds, Milliseconds } = CompoundTimer;

const timeUnits = [
	{
		title: 'min',
		dataIndex: 'min',
		key: 'min',
		align: 'center',
	},
	{
		title: 'sec',
		dataIndex: 'sec',
		key: 'sec',
		align: 'center',
	},
	{
		title: 'ms',
		dataIndex: 'ms',
		key: 'ms',
		align: 'center',
	},
];

const initialTime = {
	totalMs: 0,
	min: 0,
	sec: 0,
	ms: 0,
};

const Timer = () => {
	const [ticking, setTicking] = useRecoilState(atoms.tickingState);
	const [timePassed, setTimePassed] = useRecoilState(atoms.timePassedState);
	const [time, setTime] = React.useState(initialTime);

	const timeData = [
		{
			key: '1',
			min: <Minutes />,
			sec: <Seconds />,
			ms: <Milliseconds />,
		},
	];

	React.useEffect(() => {
		setTimePassed(time);
	}, [time]);

	const onStart = () => {
		setTicking(true);
	};

	const onResume = () => {
		setTicking(true);
	};
	const onPause = () => {
		setTicking(false);
		setTimePassed(time);
	};
	const onStop = () => {
		setTicking(false);
		setTimePassed(time);
	};

	const onReset = () => {
		setTimePassed(initialTime);
	};

	const timeHandler = ({ time, action, reset = false }) => {
		action();

		if (reset) return setTime(initialTime);

		const totalMs = Math.floor(time);
		const min = Math.round(totalMs / 1000 / 60);
		const sec = Math.floor(totalMs / 1000);
		const ms = totalMs - sec * 1000;

		setTime({
			totalMs,
			min,
			sec,
			ms,
		});
	};

	return (
		<div>
			<CompoundTimer
				initialTime={0}
				startImmediately={false}
				timeToUpdate={50}
				onStart={onStart}
				onResume={onResume}
				onPause={onPause}
				onStop={onStop}
				onReset={onReset}
			>
				{({
					start,
					resume,
					pause,
					stop,
					reset,
					getTimerState,
					getTime,
				}) => (
					<React.Fragment>
						<Table
							dataSource={timeData}
							columns={timeUnits}
							pagination={false}
						/>

						<br />
						<div>
							<button onClick={start}>Start</button>
							<button
								onClick={() =>
									timeHandler({ action: pause, time: getTime() })
								}
							>
								Pause
							</button>
							<button onClick={resume}>Resume</button>
							<button
								onClick={() =>
									timeHandler({ action: stop, time: getTime() })
								}
							>
								Stop
							</button>
							<button
								onClick={() =>
									timeHandler({ action: reset, reset: true })
								}
							>
								Reset
							</button>
						</div>
					</React.Fragment>
				)}
			</CompoundTimer>
		</div>
	);
};

export default Timer;
