---
to: src/components/<%= name %>.tsx
---
import React from 'react';
import { StyleSheet,View } from 'react-native';

export interface Props
{

}

const <%= name %>:React.FC<Props> = (props) =>
{

	return (
		null
	);
}

export default <%= name %>;

const styles = StyleSheet.create({
	container: {

	},
});
