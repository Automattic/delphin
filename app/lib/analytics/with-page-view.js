// External dependencies
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import omit from 'lodash/omit';
import React, { PropTypes } from 'react';

// Internal dependencies
import { getPath } from 'app/routes';
import { recordPageView } from 'actions/analytics';

export default ( WrappedComponent, slug, title ) => {
	class WithPageView extends React.Component {
		componentDidMount() {
			this.props.recordPageView( this.props.url, this.props.title );
		}

		render() {
			const props = omit( this.props, [ 'recordPageView', 'title', 'url' ] );

			return (
				<WrappedComponent {...props} />
			);
		}
	}

	WithPageView.propTypes = {
		recordPageView: PropTypes.func.isRequired,
		title: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired
	};

	return connect(
		() => ( {
			title,
			url: getPath( slug )
		} ),
		dispatch => bindActionCreators( {
			recordPageView
		}, dispatch )
	)( WithPageView );
};
