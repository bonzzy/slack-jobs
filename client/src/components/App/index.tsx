import React from 'react';
import SlackJobsContainer from '../../containers/SlackJobsContainer';
import { Route } from 'react-router';
import SlackJobsFormContainer from '../../containers/SlackJobFormContainer';

export default () => (
  <div>
    <div className={'slackJobsContainer'}>
      <Route exact path="/" render={() => <SlackJobsContainer />} />
    </div>
    <div className={'slackJobFormContainer'}>
      <Route exact path="/new" render={() => <SlackJobsFormContainer/>} />
    </div>
  </div>
);
