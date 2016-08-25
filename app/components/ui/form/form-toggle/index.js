/**
 * External dependencies
 */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import { bindHandlers } from 'react-bind-handlers';
import { withErrorFocusable } from 'components/ui/form/error-focuser';

/**
 * Internal dependencies
 */
import styles from './styles.scss';

var idNum = 0;

class FormToggle extends React.Component {
	handleKeyDown( event ) {
		if ( ! this.props.disabled ) {
			if ( event.key === 'Enter' || event.key === ' ' ) {
				event.preventDefault();
				this.props.onChange();
			}
		}
		if ( this.props.onKeyDown ) {
			this.props.onKeyDown( event );
		}
	}

	handleChange( event ) {
		if ( this.props.onChange ) {
			event.target.name = this.props.name;
			event.target.value = ! this.props.checked;
			this.props.onChange( event );

			if ( typeof this.props.trackChange === 'function' ) {
				this.props.trackChange( event.target.value );
			}
		}
	}

	render() {
		const id = this.props.id || 'toggle-' + idNum++,
			toggleClasses = classNames( {
				[ styles.formToggle ]: true,
				[ styles.isToggling ]: this.props.toggling
			} );

		return (
			<span>
				<input
					type="checkbox"
					readOnly={ true }
					className={ toggleClasses }
					checked={ this.props.checked }
					disabled={ this.props.disabled }
					/>
				<label className={ styles.label } htmlFor={ id }>
					<span className={ styles.switch }
						id={ id }
						role="checkbox"
						name={ this.props.name }
						onClick={ this.handleChange }
						onKeyDown={ this.handleKeyDown }
						aria-checked={ this.props.checked }
						aria-label={ this.props[ 'aria-label' ] }
						disabled={ this.props.disabled }
						tabIndex={ this.props.disabled ? -1 : 0 }
						></span>
					{ this.props.children }
				</label>
			</span>
		);
	}
}

FormToggle.propTypes = {
	'aria-label': React.PropTypes.string,
	checked: React.PropTypes.bool,
	children: React.PropTypes.node,
	disabled: React.PropTypes.bool,
	id: React.PropTypes.string,
	name: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func,
	onKeyDown: React.PropTypes.func,
	toggling: React.PropTypes.bool,
	trackChange: React.PropTypes.func
};

FormToggle.defaultProps = {
	checked: false,
	disabled: false
};

export default withErrorFocusable( withStyles( styles )( bindHandlers( FormToggle ) ) );
