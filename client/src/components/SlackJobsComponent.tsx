import * as React from 'react';
import { SlackJobs } from '../interfaces/SlackJobs';
import { SlackJobEntity } from '../entities/SlackJobEntity';

export default class SlackJobsComponent extends React.Component<SlackJobs.Props, SlackJobs.State> {

  public deleteRow(index: number) {
    this.props.deleteSlackJob(index, this.props.data);
  }
  render() {
    const { loading, error } = this.props;
    const data = this.props.data ? this.props.data : [];

    const loadingComponent = loading ? 'loading...' : '';
    const errorCssClassModifier = error.length > 0 ? 'slackJobsComponent__error--active' : '';

    return (
      <div className={'slackJobsComponent'}>
        <div className={'slack-table'}>
          <div className={'slack-table__header'}>
            <div>
              {this.props.data.length} Slack jobs
            </div>
            <div className={`slackJobsComponent__error ${errorCssClassModifier}`}>
              {error}
            </div>
          </div>
          <div className={'slack-table__row'}>
            <div className={'slack-table__column slack-table__column--4'}>
              Message
            </div>
            <div className={'slack-table__column slack-table__column--2'}>
              Time
            </div>
            <div className={'slack-table__column slack-table__column--2'}>
              Channel
            </div>
            <div className={'slack-table__column'}>
              Status
            </div>
            <div className={'slack-table__column'}>
              Remove
            </div>
          </div>
          {data.map((slackJob: SlackJobEntity, index: number) => {
            return (
              <div className={'slack-table__row slack-table__row--content'} key={slackJob.id}>
                <div className={'slack-table__column slack-table__column--4'}>
                  {slackJob.message}
                </div>
                <div className={'slack-table__column slack-table__column--2'}>
                  {slackJob.timestamp}
                </div>
                <div className={'slack-table__column slack-table__column--2'}>
                  {slackJob.channel}
                </div>
                <div className={'slack-table__column'}>
                  {slackJob.sent ? 'Not send' : 'Sent'}
                </div>
                <div className={'slack-table__column'}>
                  <button onClick={() => { this.deleteRow(index); }}> Remove </button>
                </div>
              </div>
            );
          })}
        </div>
        {loadingComponent}
      </div>
    );
  }
}
