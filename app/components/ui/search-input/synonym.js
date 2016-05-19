// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

class Synonym extends React.Component {

	constructor( props ) {
		super( props );

		this.onSynonymClickBound = this.onSynonymClick.bind( this );
	}

	onSynonymClick() {
		this.props.onSynonymClick( this.props.synonym );
	}

	render() {
		const { synonym } = this.props;
		return <li className={ styles.synonymsListItem } onClick={ this.onSynonymClickBound }>{ synonym }</li>;
	}
}

Synonym.propTypes = {
	synonym: PropTypes.string.isRequired
};

export default withStyles( styles )( Synonym );
