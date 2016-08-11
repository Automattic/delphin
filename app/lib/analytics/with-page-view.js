// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import omit from 'lodash/omit';
import React, { PropTypes } from 'react';

// Internal dependencies
import { recordPageView } from 'actions/analytics';

export default ( WrappedComponent, title ) => {
	class WithPageView extends React.Component {
		componentDidMount() {
			if ( process.env.BROWSER ) {
				this.props.recordPageView( window.location.pathname, title );
			}
		}

		render() {
			const props = omit( this.props, [ 'recordPageView' ] );

			return (
				<WrappedComponent { ...props } />
			);
		}
	}

	WithPageView.propTypes = {
		recordPageView: PropTypes.func.isRequired
	};

	return connect(
		undefined,
		dispatch => bindActionCreators( {
			recordPageView
		}, dispatch )
	)( WithPageView );
};
