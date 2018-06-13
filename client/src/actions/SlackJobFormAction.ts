import { SlackJobsApiService } from '../services/SlackJobsApiService';
import { ApiResponse } from '../interfaces/Api';
import { SlackJobFormEntity } from '../entities/SlackJobFormEntity';
import { SlackJobFormActionTypes } from '../reducers/slackJobFormActionTypes';

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
}
