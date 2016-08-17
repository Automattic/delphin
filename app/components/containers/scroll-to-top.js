// External dependencies
import React from 'react';

const scrollToTop = WrappedComponent => class Scroller extends React.Component {
	componetDidMount() {
		// because that method invoked only on the client, no additional check required
		// https://facebook.github.io/react/docs/component-specs.html#mounting-componentdidmount
		window.scrollTo( 0, 0 );
	}

	render() {
		return <WrappedComponent {...this.props}></WrappedComponent>;
	}
};

export default scrollToTop;
