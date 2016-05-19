// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';
import KeywordContainer from 'components/containers/keyword';

function Keywords( props ) {
	if ( ! Array.isArray( props.keywords ) ) {
		return null;
	}

	return <ul className={ styles.keywords }>
			{ props.keywords.map( ( keyword, index ) => <KeywordContainer
				key={ keyword.value + index }
				keyword={ keyword }
			/> ) }
	</ul>;
}

Keywords.propTypes = {
	keywords: PropTypes.arrayOf( PropTypes.shape( {
		value: PropTypes.string.isRequired,
		isSelected: PropTypes.bool.isRequired
	} ) ).isRequired
};

export default withStyles( styles )( Keywords );
