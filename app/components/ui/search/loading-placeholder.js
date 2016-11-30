// External dependencies
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Internal dependencies
import styles from './styles.scss';

const LoadingPlaceholder = ( { isStatic, text } ) => {
	return (
		<div className={ styles.searchLoading }>
			<svg className={ styles.loadingTelescope } width="155px" height="135px" viewBox="-1 -1 156 136">
				<g transform="translate(34, 87) rotate(-20) translate(-37, -87) translate(3, 73)">
					<path d="M12.0262,9.4552 L11.9862,8.3002 C11.9722,6.8032 13.1852,5.5672 14.6822,5.5532 L58.1212,5.1382 L58.3452,22.5502 L14.9052,22.9652 C13.4092,22.9792 12.1722,21.7662 12.1582,20.2692 L12.1182,19.1142 L12.0262,9.4552 Z" className={ styles.telescopeBody }></path>
					<path d="M12.0262,9.4552 L11.9862,8.3002 C11.9722,6.8032 13.1852,5.5672 14.6822,5.5532 L58.1212,5.1382 L58.3452,22.5502 L14.9052,22.9652 C13.4092,22.9792 12.1722,21.7662 12.1582,20.2692 L12.1182,19.1142 L12.0262,9.4552 Z"></path>
					<path d="M4.7838,10.5538 C2.1278,10.5788 -0.0252,11.7728 -0.0002,14.4288 C0.0258,17.0848 2.2198,18.2368 4.8758,18.2118 L12.1188,18.1138 L12.0258,10.4558 L4.7838,10.5538 Z"></path>
					<path d="M58.5269,22.2246 L58.5289,22.4506 C58.5539,25.0266 60.2339,27.1176 62.2629,27.0986 C64.2929,27.0796 65.9329,24.9556 65.9079,22.3806 L65.6949,4.7966 C65.6709,2.2216 63.9899,0.1296 61.9609,0.1486 C59.9319,0.1686 58.2919,2.2916 58.3159,4.8676 L58.3179,5.0936 L58.5269,22.2246 Z"></path>
					<path d="M51.7806,5.6306 L51.9106,16.2396"></path>
					<path d="M45.611,5.7087 L45.676,11.5117"></path>
				</g>
				<g transform="translate(17, 90)">
					<path d="M20.8095,11.6996 L20.8095,43.0206"></path>
					<path d="M20.8639,18.27 L41.1309,42.15"></path>
					<path d="M20.8095,18.27 L0.5425,42.15"></path>
					<path d="M11.2041,18.27 L30.5241,18.27"></path>
					<path d="M26.186,6.3232 C26.186,9.2922 23.779,11.6992 20.81,11.6992 C17.84,11.6992 15.433,9.2922 15.433,6.3232 C15.433,3.3542 17.84,0.9472 20.81,0.9472 C23.779,0.9472 26.186,3.3542 26.186,6.3232" className={ styles.telescopeTripodPivot }></path>
					<path d="M26.186,6.3232 C26.186,9.2922 23.779,11.6992 20.81,11.6992 C17.84,11.6992 15.433,9.2922 15.433,6.3232 C15.433,3.3542 17.84,0.9472 20.81,0.9472 C23.779,0.9472 26.186,3.3542 26.186,6.3232 Z"></path>
				</g>
				{ ! isStatic && (
					<g className={ styles.telescopeStars }>
						<g className={ styles.telescopeStar1 } transform="translate(114, 0)">
							<path d="M5.9678,0.0004 L5.9678,10.4484"></path>
							<path d="M0.7441,5.2242 L11.1921,5.2242"></path>
						</g>
						<g className={ styles.telescopeStar2 } transform="translate(98, 34)">
							<path d="M5.3072,0.7591 L5.3072,11.2071"></path>
							<path d="M0.0835,5.9828 L10.5315,5.9828"></path>
						</g>
						<g className={ styles.telescopeStar3 } transform="translate(142, 57)">
							<path d="M5.4331,0.9878 L5.4331,11.4358"></path>
							<path d="M0.2093,6.2116 L10.6573,6.2116"></path>
						</g>
						<g className={ styles.telescopeStar4 } transform="translate(71, 27)">
							<path d="M0.9196,0.933 L6.0926,6.106"></path>
							<path d="M0.9196,6.1064 L6.0926,0.9334"></path>
						</g>
						<g className={ styles.telescopeStar5 } transform="translate(103, 71)">
							<path d="M0.0683,0.0442 L5.2413,5.2172"></path>
							<path d="M0.0683,5.2176 L5.2413,0.0446"></path>
						</g>
					</g>
				) }
			</svg>

			{ text }
		</div>
	);
};

LoadingPlaceholder.propTypes = {
	isStatic: PropTypes.bool,
	text: PropTypes.string.isRequired,
};

export default withStyles( styles )( LoadingPlaceholder );
