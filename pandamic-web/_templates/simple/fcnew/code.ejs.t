---
to: src/components/<%= name %>/<%= name %>.tsx
---
import React from 'react';
import styles from "./<%= name %>.module.scss"

export interface Props
{

}

const <%= name %>:React.FC<Props> = (props:Props) =>
{

	return (
		null
	);
}

export default <%= name %>;
