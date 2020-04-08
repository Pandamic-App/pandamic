---
to: src/components/<%= name %>/<%= name %>.tsx
---
import React from 'react';
import styles from "./<%= name %>.module.scss"

export interface Props
{

}

export interface State
{

}

class <%= name %> extends React.Component<Props,State>
{
	constructor(props:Props)
	{
		super(props);

		this.state = {

		};
	}

	render(){
		return (
			null
		);
	}
}

export default <%= name %>;
