import React from 'react';
import { Link, browserHistory } from 'react-router';

export default function Root( { children } ) {
  return (
    <div>
      <header>
        Links:
        {' '}
        <Link to="/">Home</Link>
        {' '}
        <Link to="/about">About</Link>
        {' '}
        <Link to="/search">Search</Link>
      </header>
      <div style={{ marginTop: '1.5em' }}>{ children }</div>
    </div>
  )
}
