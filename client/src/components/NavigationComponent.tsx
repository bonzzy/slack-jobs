import React from 'react';
import { Link } from 'react-router-dom';

export default class NavigationComponent extends React.Component {
  render() {
    return (
      <nav>
        <span><Link to="/">All jobs</Link></span>
        <span><Link to="/new">Create new</Link></span>
      </nav>
    );
  }
}
