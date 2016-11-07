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
			const { location: { query } } = this.props;

			if ( query && query.utm_source && query.utm_campaign ) {
				// If these params are present, this is a landing page from
				// a SEM campaign
				this.props.recordTracksEvent( 'delphin_landing_page_view', {
					pathname: window.location.pathname,
					title,
					utm_source: query.utm_source,
					utm_campaign: query.utm_campaign
				} );
			}

			this.props.recordPageView( window.location.pathname, title );
		}

		render() {
			let newProps = omit( this.props, [ 'needsRecordTracksEvent', 'recordPageView' ] );

			if ( ! this.props.needsRecordTracksEvent ) {
				newProps = omit( newProps, 'recordTracksEvent' );
			}

			return (
				<WrappedComponent { ...newProps } />
			);
		}
	}

	WithPageView.propTypes = {
		location: PropTypes.object.isRequired,
		needsRecordTracksEvent: PropTypes.bool.isRequired,
		recordPageView: PropTypes.func.isRequired,
		recordTracksEvent: PropTypes.func.isRequired
	};

	return connect(
		( state, ownProps ) => ( {
			needsRecordTracksEvent: !! ownProps.recordTracksEvent
		} ),
		dispatch => bindActionCreators( {
			recordPageView,
			recordTracksEvent
		}, dispatch )
	)( WithPageView );
};
