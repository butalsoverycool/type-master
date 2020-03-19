import styled from 'styled-components';

const stressColors = {
	'1': '#eefae8',
	'2': '#caebb9',
	'3': '#a3cf8c'
};

export const Container = styled.div`
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
			background: ${stressColors[props.stress]};
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

export const HiddenInput = styled.input`
	opacity: 0;
	width: 0;
	height: 0;
	border: none;
	outline: none;
	margin: 0;
	padding: 0;
`;
