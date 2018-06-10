import React from 'react';
import styles from './styles.scss';
import SlackJobsContainer from '../../containers/SlackJobsContainer';
import { Route } from 'react-router';
import SlackJobsFormContainer from '../../containers/SlackJobsFormContainer';

export default () => (
  <div className={styles.main}>
    <Route exact path="/" render={() => <SlackJobsContainer />} />
    <Route exact path="/new" render={() => <SlackJobsFormContainer/>} />
  </div>
);
