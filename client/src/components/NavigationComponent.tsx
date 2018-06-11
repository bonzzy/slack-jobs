import React from 'react';
import { Link } from 'react-router-dom';

export default class NavigationComponent extends React.Component {
  render() {
    return (
      <nav className={'navigation'}>
        <div className={'navigation__top'}>
          <Link to="/">
            <figure className={'navigation__logo-img'} />
          </Link>
        </div>
        <div className={'navigation__tabs'}>
          <Link to="/" className={'navigation__tabs-link'}>All jobs</Link>
          <Link to="/new" className={'navigation__tabs-link'}>Create new</Link>
        </div>
      </nav>
    );
  }
}
