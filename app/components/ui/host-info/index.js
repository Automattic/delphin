// External dependencies
import i18n from 'i18n-calypso';
import randomWords from 'random-words';
import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

class HostInfo extends React.Component {
	render() {
		return <section>
			Requested host: { this.props.hostName }
		</section>;
	}
}

export default withStyles( styles )( HostInfo );
