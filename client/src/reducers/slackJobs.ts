import { SlackJobs } from '../interfaces/SlackJobs';
import State = SlackJobs.State;

export enum SlackJobsActionTypes {
  SAVE_SLACK_JOB = 'SAVE_SLACK_JOB',
  NETWORK_PROBLEM = 'NETWORK_PROBLEM',
  GET_SLACK_ERROR_MESSAGE = 'GET_SLACK_ERROR_MESSAGE',
  GET_SLACK_JOBS = 'GET_SLACK_JOBS',
  GET_SLACK_JOBS_SUCCESS = 'GET_SLACK_JOBS_SUCCESS',
  LOADING = 'SLACK_JOBS_LOADING',
}
const slackJobs = (state: SlackJobs.State, action: any): State => {

  switch (action.type) {
    case SlackJobsActionTypes.GET_SLACK_JOBS:

      return {
        ...state,
        loading: true,
      };

    case SlackJobsActionTypes.GET_SLACK_JOBS_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };

    case SlackJobsActionTypes.LOADING:
      return {
        ...state,
        loading: true,
      };

    case SlackJobsActionTypes.GET_SLACK_ERROR_MESSAGE:
      return {
        ...state,
        loading: false,
        error: state.error,
      };

    case SlackJobsActionTypes.NETWORK_PROBLEM:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return {
        ...state,
      };
  }

};

export default slackJobs;
