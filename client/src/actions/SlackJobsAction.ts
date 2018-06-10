import { SlackJobsActionTypes } from '../reducers/slackJobs';
import { SlackJobEntity } from '../entities/SlackJobEntity';

export class SlackJobsAction {
  public static successGet(payload: any) {

    return {
      payload,
      type: SlackJobsActionTypes.GET_SLACK_JOBS_SUCCESS,
    };
  }

  public static getSlackJobs(): {type: string, payload: Promise<SlackJobEntity[]>} {
    const request = new Promise<SlackJobEntity[]>((resolve, reject) => {
      setTimeout(() => {
        const slackJob = new SlackJobEntity({
          id: 'HGKS-23SGJR',
          message: 'This is a message',
          timestamp: '000000000',
          sent: false,
        });

        resolve([slackJob]);
      }, 2500);
    });

    return {
      type: SlackJobsActionTypes.GET_SLACK_JOBS,
      payload: request,
    };
  }

  public static loading() {
    return {
      payload: '',
      type: SlackJobsActionTypes.LOADING,
    };
  }
}
