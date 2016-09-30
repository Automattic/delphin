// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import React, { PropTypes } from 'react';
import { Router } from 'react-router';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import i18n from 'i18n-calypso';
import { routes } from 'routes';

class App extends React.Component {
	constructor( props ) {
		super( props );

		this.state = { key: new Date().getTime() };
	}

	componentWillMount() {
		// The entire app must re-render when the language changes.
		// `forceUpdate` was causing some components in the render tree to
		// return stale markup, so we're forcing an update with `setState`
		// here.
		i18n.stateObserver.on( 'change', this.handleUpdate );
	}

	handleUpdate() {
		this.setState( { key: new Date().getTime() } );
	}

	render() {
		return (
			<DocumentTitle key={ this.state.key }>
				<Router history={ this.props.history } routes={ routes } />
			</DocumentTitle>
		);
	}
}

App.propTypes = {
	history: PropTypes.object.isRequired,
};

export default bindHandlers( App );
