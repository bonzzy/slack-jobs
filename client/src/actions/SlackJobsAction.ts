import { SlackJobsActionTypes } from '../reducers/slackJobs';
import { SlackJobEntity } from '../entities/SlackJobEntity';
import { SlackJobsApiService } from '../services/SlackJobsApiService';
import { ApiResponse } from '../interfaces/Api';

export enum SlackJobsActionMessages {
  NETWORK_PROBLEM = 'Problem with network!',
}

export class SlackJobsAction {

  public static successGet(payload: ApiResponse<SlackJobEntity[]>) {

    return {
      payload,
      type: SlackJobsActionTypes.GET_SLACK_JOBS_SUCCESS,
    };
  }

  public static getSlackJobs(): {type: SlackJobsActionTypes, payload: Promise<ApiResponse<SlackJobEntity[]>>} {
    const slackJobApiService = new SlackJobsApiService();
    const request = slackJobApiService.getAll();

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

  static errorGet(response: ApiResponse<SlackJobEntity[]>) {
    return {
      payload: response,
      type: SlackJobsActionTypes.GET_SLACK_ERROR_MESSAGE,
    };
  }

  static errorNetwork() {
    console.log(SlackJobsActionMessages.NETWORK_PROBLEM);

    return {
      payload: SlackJobsActionMessages.NETWORK_PROBLEM,
      type: SlackJobsActionTypes.NETWORK_PROBLEM,
    };
  }
}
