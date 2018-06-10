import * as React from 'react';
import { SlackJobs } from '../interfaces/SlackJobs';
import { SlackJobEntity } from '../entities/SlackJobEntity';

export default class SlackJobsComponent extends React.Component<SlackJobs.Props, SlackJobs.State> {

  render() {
    const loading = this.props.loading;
    const data = this.props.data ? this.props.data : [];

    const loadingComponent = loading ? 'loading...' : '';

    return (
      <div>
        {loadingComponent}
        {data.map((slackJob: SlackJobEntity) => {
          return (
            <div key={slackJob.id}>
              {slackJob.message}
            </div>
          );
        })}
      </div>
    );
  }
}
