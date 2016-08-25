// External dependencies
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

// Internal dependencies
import { focusField } from 'lib/form';

export const withErrorFocusable = Component => {
	class ErrorFocusable extends React.Component {
		constructor( props ) {
			super( props );
			this.saveRefBound = this.saveRef.bind( this );
		}

		saveRef( element ) {
			// call ErrorFocuser's elementRefSetter function
			if ( element && this.props.field && typeof this.context.elementRefSetter === 'function' ) {
				this.context.elementRefSetter( element, this.props.field.name );
			}
		}

		render() {
			return <Component { ...this.props } ref={ this.saveRefBound }/>;
		}
	}

	ErrorFocusable.propTypes = {
		field: PropTypes.object
	};

	ErrorFocusable.contextTypes = {
		elementRefSetter: React.PropTypes.func
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
				elementRefSetter: ( element, fieldName ) => {
					if ( element && fieldName ) {
						this.fieldElements.push( {
							name: fieldName,
							ref: element
						} );
					}
				}
			};
		}

		componentWillReceiveProps( nextProps ) {
			if ( nextProps.focusOnError && isEmpty( this.props.errors ) && ! isEmpty( nextProps.errors ) ) {
				const fieldElement = find( this.fieldElements, field => nextProps.errors[ field.name ] );
				const node = ReactDOM.findDOMNode( fieldElement.ref );
				if ( node ) {
					focusField( node );
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
		elementRefSetter: PropTypes.func
	};

	return ErrorFocuser;
};
