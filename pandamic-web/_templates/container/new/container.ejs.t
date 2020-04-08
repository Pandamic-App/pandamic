---
to: src/components/<%= name %>/<%= name %>-container.tsx
---
import React from 'react';

export interface Props
{

}

export interface State
{

}

class <%= name %>Container extends React.Component<Props,State>
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

export default <%= name %>Container;
