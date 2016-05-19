// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import i18n from 'i18n-calypso';

// Internal dependencies
import styles from './styles.scss';
import Synonym from './synonym';

function Synonyms( props ) {
	//TODO: fetch it from somewhere
	const synonyms = [ 'hello', 'yes', 'this', 'is', 'dog' ];

	return <div className={ styles.synonyms }>

		<h3>{ i18n.translate( 'Try one of these instead of {{keyword/}}:', {
			components: {
				context: 'keyword is a word a user entered to which we will display synonyms to follow',
				keyword: <strong>{ props.target.value }</strong>
			}
		} ) }</h3>
		<ul className={ styles.synonymList }>
			{ synonyms.map( synonym => <Synonym key={ synonym } synonym={ synonym } onSynonymClick={ props.replace } /> ) }
		</ul>
	</div>;
}

Synonyms.propTypes = {
	target: PropTypes.shape( { value: PropTypes.string.isRequired, isSelected: PropTypes.bool.isRequired } ).isRequired,
	replace: PropTypes.func.isRequired
};

export default withStyles( styles )( Synonyms );
