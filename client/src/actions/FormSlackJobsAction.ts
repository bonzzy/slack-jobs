import { SlackJobsApiService } from '../services/SlackJobsApiService';
import { ApiResponse } from '../interfaces/Api';
import { SlackJobFormEntity } from '../entities/SlackJobFormEntity';
import { FormSlackJobsActionTypes } from '../reducers/slackJobForm';

export class FormSlackJobsAction {

  public static saveSlackJob(
    slackJob: SlackJobFormEntity): {type: FormSlackJobsActionTypes, payload: Promise<ApiResponse<SlackJobFormEntity>>} {

    const slackJobApiService = new SlackJobsApiService();
    const request = slackJobApiService.create(slackJob);

    return {
      type: FormSlackJobsActionTypes.SAVE_SLACK_JOB,
      payload: request,
    };
  }
}
