import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import AppContainer from './src/screens/AppContainer';

export default function App()
{
	try {
		return (
			<Provider store={store}>
				<AppContainer/>
			</Provider>
		);
	} catch (ex)
	{
	return (<Text style={{marginTop:100,color:"black"}}>{JSON.stringify(ex)} - exception occured.</Text>);
	}
}
