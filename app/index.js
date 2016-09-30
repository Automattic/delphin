// External dependencies
import React, { PropTypes } from 'react';
import { Router } from 'react-router';

// Internal dependencies
import DocumentTitle from 'components/ui/document-title';
import i18n from 'i18n-calypso';
import { routes } from 'routes';

const App = React.createClass( {
	propTypes: {
		history: PropTypes.object.isRequired
	},

	componentWillMount() {
		i18n.stateObserver.on( 'change', this.reRender );
	},

	getInitialState() {
		return {
			key: 1
		};
	},

	reRender() {
		this.setState( {
			key: Math.random()
		} );
	},

	render() {
		return (
			<DocumentTitle key={ this.state.key }>
				<Router history={ this.props.history } routes={ routes } />
			</DocumentTitle>
		);
	}
} );

export default App;
