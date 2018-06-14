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
    return {
      payload: SlackJobsActionMessages.NETWORK_PROBLEM,
      type: SlackJobsActionTypes.NETWORK_PROBLEM,
    };
  }

  static deleteSlackJob(index: number, slackJobs: SlackJobEntity[]) {

    const slackJobApiService = new SlackJobsApiService();
    const payload = slackJobApiService.delete(slackJobs[index]);

    return {
      payload,
      type: SlackJobsActionTypes.DELETE_SLACK_JOB,
    };
  }

  static successDelete(index: number, slackJobs: SlackJobEntity[]) {
    const slackJobsClone: SlackJobEntity[] = [...slackJobs]; // make a separate copy of the array
    slackJobsClone.splice(index, 1);

    return {
      payload: slackJobsClone,
      type: SlackJobsActionTypes.SUCCESS_DELETE_SLACK_JOB,
    };
  }
}
