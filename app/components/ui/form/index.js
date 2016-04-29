// External dependencies
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const Form = ( { onSubmit, noticeArea, fieldArea, submitArea } ) => (
	<form onSubmit={ onSubmit } className={ styles.form }>
		{ noticeArea && <div className={ styles.noticeArea }>{ noticeArea }</div> }
		<div className={ styles.fieldArea }>{ fieldArea }</div>
		<div className={ styles.submitArea }>{ submitArea }</div>
	</form>
);

export default withStyles( styles )( Form );
