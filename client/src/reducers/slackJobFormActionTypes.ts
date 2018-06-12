import { SlackJobs } from '../interfaces/SlackJobs';
import State = SlackJobs.State;

export enum SlackJobFormActionTypes {
  SAVE_SLACK_JOB = 'SAVE_SLACK_JOB',
  SAVE_SLACK_JOB_SUCCESS = 'SAVE_SLACK_JOB_SUCCESS',
  SAVE_LOADING = 'SAVE_LOADING',
  SAVE_SLACK_JOB_ERROR_MESSAGE = 'SAVE_SLACK_JOB_ERROR_MESSAGE',
}
const formSlackJobsActionTypes = (state: SlackJobs.State, action: any): State => {

  switch (action.type) {
    case SlackJobFormActionTypes.SAVE_SLACK_JOB:
      return {
        ...state,
        loading: true,
      };

    case SlackJobFormActionTypes.SAVE_SLACK_JOB_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };

    case SlackJobFormActionTypes.SAVE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SlackJobFormActionTypes.SAVE_SLACK_JOB_ERROR_MESSAGE:
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

export default formSlackJobsActionTypes;
