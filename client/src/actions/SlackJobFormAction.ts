import { SlackJobsApiService } from '../services/SlackJobsApiService';
import { ApiResponse } from '../interfaces/Api';
import { SlackJobFormEntity } from '../entities/SlackJobFormEntity';
import { SlackJobFormActionTypes } from '../reducers/slackJobForm';
import { SlackJobsActionTypes } from '../reducers/slackJobs';

export class SlackJobFormAction {

  public static saveSlackJob(
    slackJob: SlackJobFormEntity): {type: SlackJobFormActionTypes, payload: Promise<ApiResponse<SlackJobFormEntity>>} {

    const slackJobApiService = new SlackJobsApiService();
    const request = slackJobApiService.create(slackJob);

    return {
      type: SlackJobFormActionTypes.SAVE_SLACK_JOB,
      payload: request,
    };
  }

  public static loading() {
    return {
      payload: '',
      type: SlackJobFormActionTypes.SAVE_LOADING,
    };
  }

  public static successPost() {
    return {
      payload: new SlackJobFormEntity({
        message: '',
        timestamp: new Date().getTime() + '',
      }),
      type: SlackJobFormActionTypes.SAVE_SLACK_JOB_SUCCESS,
    };
  }

  static errorPost() {
    return {
      payload: '',
      type: SlackJobsActionTypes.POST_SLACK_ERROR_MESSAGE,
    };
  }

  static errorNetwork() {
    return {
      payload: SlackJobFormActionTypes.SAVE_NETWORK_PROBLEM,
      type: SlackJobFormActionTypes.SAVE_NETWORK_PROBLEM,
    };
  }
}
