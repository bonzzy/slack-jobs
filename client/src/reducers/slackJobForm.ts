import { SlackJobs } from '../interfaces/SlackJobs';
import State = SlackJobs.State;

export enum FormSlackJobsActionTypes {
  SAVE_SLACK_JOB = 'SAVE_SLACK_JOB',
  SAVE_SLACK_JOB_SUCCESS = 'SAVE_SLACK_JOB_SUCCESS',
  SAVE_LOADING = 'SAVE_LOADING',
  SAVE_SLACK_JOB_ERROR_MESSAGE = 'SAVE_SLACK_JOB_ERROR_MESSAGE',
}
const slackJobForm = (state: SlackJobs.State, action: any): State => {

  switch (action.type) {
    case FormSlackJobsActionTypes.SAVE_SLACK_JOB:
      return {
        ...state,
        loading: true,
      };

    case FormSlackJobsActionTypes.SAVE_SLACK_JOB_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };

    case FormSlackJobsActionTypes.SAVE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case FormSlackJobsActionTypes.SAVE_SLACK_JOB_ERROR_MESSAGE:
      return {
        ...state,
        loading: false,
        error: state.error,
      };

    default:
      return {
        ...state,
      };
  }

};

export default slackJobForm;
