import * as React from 'react';
import { SlackJobs } from '../interfaces/SlackJobs';
import { SlackJobEntity } from '../entities/SlackJobEntity';
import moment from 'moment';

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
        {loadingComponent}
        <div className={'slack-content-table'}>
          {
            data.map((slackJob: SlackJobEntity, index: number) => {
              return (
                <div className={'slack-content'}>
                  <section className={'slack-content__message slack-content__big-item'}>
                    <h3 className={'slack-content__section-title msg-title'}>Message</h3>
                    <p className={'slack-content__section-content'}>
                      {slackJob.message}
                    </p>
                  </section>
                  <section className={'slack-content__small-items'}>
                    <div className={'slack-content__time slack-content__small-item'}>
                      <h3 className={'slack-content__section-title'}>Time</h3>
                      <p className={'slack-content__section-content'}>
                        {moment(slackJob.timestamp).format('MM/DD/YYYY hh:mm')}
                      </p>
                    </div>
                    <div className={'slack-content__chanel slack-content__small-item'}>
                      <h3 className={'slack-content__section-title'}>Chanel</h3>
                      <p className={'slack-content__section-content'}>{slackJob.channel}</p>
                    </div>
                    <div className={'slack-content__status slack-content__small-item'}>
                      <h3 className={'slack-content__section-title'}>Status</h3>
                      <p className={'slack-content__section-content'}>
                        {(slackJob.sent) ? 'Sent' : 'Pending'}
                      </p>
                    </div>
                    <a href="#"
                       className={'slack-content__button'}
                       onClick={() => { this.deleteRow(index); }}>
                      <span className={'slack-content__button-text'}>&#x2715;</span>
                    </a>
                  </section>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}
