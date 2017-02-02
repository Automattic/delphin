// External dependencies
import i18n from 'i18n-calypso';
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import { getPath } from 'routes';
import ProgressBar from 'components/ui/progress-bar';
import { redirect } from 'actions/routes';
import styles from './styles.scss';

class ProgressHeader extends Component {
	onExitClick() {
		console.log(1);
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
					<span onClick={ this.onExitClick } className={ styles.exit }>Exit</span>
				</div>
			</div>
		</div>;
	}
}

ProgressHeader.propTypes = {
	content: PropTypes.string.isRequired,
	progress: PropTypes.number.isRequired
};

export default withStyles( styles )( ProgressHeader );
