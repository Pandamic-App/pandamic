import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import AppContainer from './src/screens/AppContainer';

export default function App()
{
	return (
		<Provider store={store}>
			<AppContainer/>
		</Provider>
	);
}
