// External dependencies
import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from 'components/ui/form/styles.scss';

const ValidationError = ( { field } ) => {
	return (
		<ReactCSSTransitionGroup
			transitionName={ styles.emptySearchNotice }
			transitionEnterTimeout={ 500 }
			transitionLeaveTimeout={ 1 }>
			{ field.touched && field.error &&
				<div className={ styles.emptySearchNotice }>
					{ field.error }
				</div>
			}
		</ReactCSSTransitionGroup>
	);
};

ValidationError.propTypes = {
	field: PropTypes.object.isRequired
};

export default withStyles( styles )( ValidationError );
