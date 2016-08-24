// External dependencies
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import isEmpty from 'lodash/isEmpty';

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
			if ( element && typeof this.context.elementRefSetter === 'function' ) {
				this.context.elementRefSetter( element, this.props );
			}
		}

		render() {
			return <Component { ...this.props } ref={ this.saveRefBound }/>;
		}
	}

	ErrorFocusable.contextTypes = {
		elementRefSetter: React.PropTypes.func
	};

	return ErrorFocusable;
};

export const withErrorFocuser = FieldGroup => {
	class ErrorFocuser extends React.Component {
		constructor( props ) {
			super( props );
			this.fieldElementsList = [];
			this.fieldElements = {};
		}

		getChildContext() {
			return {
				elementRefSetter: ( element, parentProps ) => {
					if ( element && parentProps && parentProps.field ) {
						this.fieldElementsList.push( parentProps.field.name );
						this.fieldElements[ parentProps.field.name ] = element;
					}
				}
			};
		}

		componentWillReceiveProps( nextProps ) {
			if ( nextProps.focusOnError && isEmpty( this.props.errors ) && ! isEmpty( nextProps.errors ) ) {
				const fieldName = this.fieldElementsList.find( name => nextProps.errors[ name ] );
				const node = ReactDOM.findDOMNode( this.fieldElements[ fieldName ] );
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
