export const display = gameOn => ({
	'{bksp}': 'delete',
	'{enter}': 'enter',
	'{tab}': 'tab',
	'{shift}': 'shift',
	'{alt}': 'alt',
	'{space}': gameOn ? 'space' : 'Press spacebar to start',
	'{empty}': gameOn ? '<-- Press escape to stop game' : ' '
});

export const getKey = char => {
	switch (char) {
		case 'Tab':
			return '{tab}';
		case 'CapsLock':
			return false; //'{lock}';
		case 'Enter':
			return '{enter}';
		case 'Shift':
			return '{shift}';
		case 'Control':
			return 'ctrl';
		case 'Alt':
			return '{alt}';
		case 'Meta':
			return 'cmd';
		case ' ':
			return '{space}';
		default:
			return char;
	}
};

export const layout = {
	default: [
		'{esc} {empty}',
		'§ 1 2 3 4 5 6 7 8 9 0 + ´ {bksp}',
		'{tab} q w e r t y u i o p å ¨',
		"{lock} a s d f g h j k l ö ä ' {enter}",
		'{shift} < z x c v b n m , . - {shift}',
		'ctrl {alt} cmd {space} cmd {alt}'
	],
	shift: [
		'{esc} {empty}',
		'° ! " # € % & / ( ) = ? ` {bksp}',
		'{tab} Q W E R T Y U I O P Å ^',
		'{lock} A S D F G H J K L Ö Ä * {enter}',
		'{shift} > Z X C V B N M ; : _ {shift}',
		'ctrl {alt} cmd {space} cmd {alt}'
	],
	alt: [
		'{esc} {empty}',
		'¶ © @ £ $ ∞ § | [ ] ≈ ± ´ {bksp}',
		'{tab} • Ω é ® † µ ü ı œ π ˙ ~',
		'{lock}  ß ∂ ƒ ¸ ˛ √ ª ﬁ ø æ ™ {enter}',
		'{shift} ≤ (null) ≈ ç ‹ › ‘ ’ ‚ … – {shift}',
		'ctrl {alt} cmd {space} cmd {alt}'
	]
};

export const btnClasses = ({ input, boardMode, stress }) => [
	{
		class: 'active',
		buttons:
			(input === ' ' ? '{space}' : !input ? ' ' : input) + // pressed key
			(boardMode === 'shift' ? ' {shift} ' : '') + // inc shift/alt
			(boardMode === 'alt' ? ' {alt}' : '')
	},
	{
		class: `stress-${String(stress)}`,
		buttons: input === ' ' ? '{space}' : !input ? ' ' : input
	},
	{
		class: 'space',
		buttons: '{space}'
	},
	{
		class: 'regular',
		buttons:
			'§ 1 2 3 4 5 6 7 8 9 0 + ´ q w e r t y u i o p å ¨ a s d f g h j k l ö ä < z x c v b n m , . - ° ! " # € % & / ( ) = ? ` Q W E R T Y U I O P Å ^ A S D F G H J K L Ö Ä * > Z X C V B N M ; : _ ¶ © @ £ $ ∞ § | [ ] ≈ ± ´ • Ω é ® † µ ü ı œ π ˙ ~  ß ∂ ƒ ¸ ˛ √ ª ﬁ ø æ ™ ≤ (null) ≈ ç ‹ › ‘ ’ ‚ … – {esc}' +
			"' "
	},
	{
		class: 'empty',
		buttons: '{empty}'
	}
];
