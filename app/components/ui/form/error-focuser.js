// External dependencies
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import reject from 'lodash/reject';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

// Internal dependencies
import { focusField } from 'lib/form';

export const withErrorFocusable = Component => {
	class ErrorFocusable extends React.Component {
		constructor( props ) {
			super( props );

			this.saveRef = ( element ) => {
				const fieldName = this.props.field ? this.props.field.name : this.props.name;

				if ( fieldName && 'function' === typeof this.context.setElementRef ) {
					this.context.setElementRef( fieldName, element );
				}
			};
		}

		render() {
			return <Component { ...this.props } ref={ this.saveRef } />;
		}
	}

	ErrorFocusable.propTypes = {
		field: PropTypes.object,
		name: PropTypes.string
	};

	ErrorFocusable.contextTypes = {
		setElementRef: React.PropTypes.func
	};

	return ErrorFocusable;
};

export const withErrorFocuser = FieldGroup => {
	class ErrorFocuser extends React.Component {
		constructor( props ) {
			super( props );

			this.fieldElements = [];
		}

		getChildContext() {
			return {
				setElementRef: ( fieldName, element ) => {
					if ( element ) {
						this.fieldElements.push( {
							name: fieldName,
							ref: element
						} );
					} else {
						this.fieldElements = reject( this.fieldElements, { name: fieldName } );
					}
				}
			};
		}

		componentWillReceiveProps( nextProps ) {
			if ( nextProps.focusOnError && isEmpty( this.props.errors ) && ! isEmpty( nextProps.errors ) ) {
				const fieldElement = find( this.fieldElements, field => nextProps.errors[ field.name ] );

				if ( fieldElement && fieldElement.ref ) {
					const node = ReactDOM.findDOMNode( fieldElement.ref );

					if ( node ) {
						focusField( node );
					}
				}
			}
		}

		render() {
			return (
				<FieldGroup { ...this.props } >
					{ this.props.children }
				</FieldGroup>
			);
		}
	}

	ErrorFocuser.propTypes = {
		children: PropTypes.oneOfType( [
			PropTypes.arrayOf( React.PropTypes.node ),
			PropTypes.node
		] ).isRequired,
		errors: PropTypes.object,
		focusOnError: PropTypes.bool
	};

	ErrorFocuser.childContextTypes = {
		setElementRef: PropTypes.func
	};

	return ErrorFocuser;
};
