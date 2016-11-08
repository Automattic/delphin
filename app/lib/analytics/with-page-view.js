// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import omit from 'lodash/omit';
import React, { PropTypes } from 'react';

// Internal dependencies
import { recordPageView, recordTracksEvent } from 'actions/analytics';

export default ( WrappedComponent, title ) => {
	class WithPageView extends React.Component {
		componentDidMount() {
			const { location: { query }, privateProps } = this.props;

			if ( query && query.utm_source && query.utm_campaign ) {
				// If these params are present, this is a landing page from a SEM campaign
				privateProps.recordTracksEvent( 'delphin_landing_page_view', {
					pathname: window.location.pathname,
					title,
					utm_source: query.utm_source,
					utm_campaign: query.utm_campaign
				} );
			}

			privateProps.recordPageView( window.location.pathname, title );
		}

		render() {
			const newProps = omit( this.props, 'privateProps' );

			return (
				<WrappedComponent { ...newProps } />
			);
		}
	}

	WithPageView.propTypes = {
		location: PropTypes.object.isRequired,
		privateProps: PropTypes.shape( {
			recordPageView: PropTypes.func.isRequired,
			recordTracksEvent: PropTypes.func.isRequired
		} ).isRequired
	};

	return connect(
		undefined,
		dispatch => bindActionCreators( {
			recordPageView,
			recordTracksEvent
		}, dispatch ),
		( stateProps, dispatchProps, ownProps ) => {
			return Object.assign( {}, ownProps, stateProps, { privateProps: dispatchProps } );
		}
	)( WithPageView );
};
