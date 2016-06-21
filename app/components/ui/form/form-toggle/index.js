/**
 * External dependencies
 */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import styles from './styles.scss';

var idNum = 0;

class FormToggle extends React.Component {
	constructor( props ) {
		super( props );

		this._onKeyDownBound = this._onKeyDown.bind( this );
		this._onChangeBound = this._onChange.bind( this );
	}

	_onKeyDown( event ) {
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

	_onChange( event ) {
		if ( this.props.onChange ) {
			event.target.name = this.props.name;
			event.target.value = ! this.props.checked;
			this.props.onChange( event );
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
						onClick={ this._onChangeBound }
						onKeyDown={ this._onKeyDownBound }
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
	children: React.PropTypes.node,
	onChange: React.PropTypes.func,
	onKeyDown: React.PropTypes.func,
	checked: React.PropTypes.bool,
	disabled: React.PropTypes.bool,
	id: React.PropTypes.string,
	name: React.PropTypes.string.isRequired,
	toggling: React.PropTypes.bool
};

FormToggle.defaultProps = {
	checked: false,
	disabled: false
};

export default withStyles( styles )( FormToggle );
