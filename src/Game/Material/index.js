import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	background: #888;
	color: #ddd;
	height: 60px;
	padding: 0;
`;

const Strip = styled.div`
	position: relative;
	height: 100%;
	background: ${props => (props.gameOn ? '#333' : '#f6f6f6')};

	width: ${props => props.stripW}%;
	text-align: left;
	float: right;

	overflow: hidden;
`;

const Txt = styled.h3`
	height: 100%;
	line-height: 60px;
	margin: auto;
	position: absolute;
`;

const Material = () => {
	return null;
};

export default Material;
