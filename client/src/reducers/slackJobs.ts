import { SlackJobs } from '../interfaces/SlackJobs';

export enum SlackJobsActionTypes {
  GET_SLACK_JOBS = 'GET_SLACK_JOBS',
  GET_SLACK_JOBS_SUCCESS = 'GET_SLACK_JOBS_SUCCESS',
  LOADING = 'SLACK_JOBS_LOADING',
}
const slackJobs = (state: SlackJobs.State, action: any) => {

  switch (action.type) {
    case SlackJobsActionTypes.GET_SLACK_JOBS:

      return {
        ...state,
        loading: true,
      };

    case SlackJobsActionTypes.GET_SLACK_JOBS_SUCCESS:
      return {
        ...state,
        // slackJobs: action.payload.data.slackJobs,
        data: action.payload,
        loading: false,
      };

    case SlackJobsActionTypes.LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return {
        ...state,
      };
  }

};

export default slackJobs;
