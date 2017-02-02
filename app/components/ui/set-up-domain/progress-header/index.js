// External dependencies
import { bindHandlers } from 'react-bind-handlers';
import i18n from 'i18n-calypso';
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import ProgressBar from 'components/ui/progress-bar';
import styles from './styles.scss';

class ProgressHeader extends React.Component {
	handleOnExitClick() {
		this.props.redirect( 'myDomains' );
	}

	render() {
		const { content, progress } = this.props;

		return <div className={ styles.headerContainer }>
			<div className={ styles.header }>
				<h1 className={ styles.headerText }>
					<span className={ styles.setUpLabel }>
						{ i18n.translate( 'Setup: ' ) }
					</span>
					{ content }
				</h1>
				<div>
					<ProgressBar progress={ progress } />
					<span onClick={ this.handleOnExitClick } className={ styles.exit }>Exit</span>
				</div>
			</div>
		</div>;
	}
}

ProgressHeader.propTypes = {
	content: PropTypes.string.isRequired,
	progress: PropTypes.number.isRequired,
	redirect: PropTypes.func.isRequired
};

export default withStyles( styles )( bindHandlers( ProgressHeader ) );
