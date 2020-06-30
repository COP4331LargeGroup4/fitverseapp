import * as React from 'react';
import { TextInput } from 'react-native-paper';

const Input = () => {
	const [text, setText] = React.useState('');

	return (
		<TextInput
			label="Test"
			value={text}
			onChangeText={text => setText(text)}
			mode="outlined"
		/>
	);
};

export default MyComponent;