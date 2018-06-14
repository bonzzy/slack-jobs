import { SlackJobs } from '../interfaces/SlackJobs';
import State = SlackJobs.State;
import {SlackJobFormActionMessages} from "../actions/SlackJobFormAction";

export enum SlackJobFormActionTypes {
  SAVE_NETWORK_PROBLEM = 'SAVE_NETWORK_PROBLEM',
  SAVE_SLACK_JOB = 'SAVE_SLACK_JOB',
  SAVE_SLACK_JOB_SUCCESS = 'SAVE_SLACK_JOB_SUCCESS',
  SAVE_LOADING = 'SAVE_LOADING',
  SAVE_SLACK_JOB_ERROR_MESSAGE = 'SAVE_SLACK_JOB_ERROR_MESSAGE',
}
const slackJobForm = (state: SlackJobs.State, action: any): State => {

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
        error: SlackJobFormActionMessages.SAVED_SUCCESS,
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

    case SlackJobFormActionTypes.SAVE_NETWORK_PROBLEM:
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

export default slackJobForm;
