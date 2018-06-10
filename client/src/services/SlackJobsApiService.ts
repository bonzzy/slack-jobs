import { ApiService } from './ApiService';
import { SlackJobEntity } from '../entities/SlackJobEntity';
import { ApiResponse } from '../interfaces/Api';

export enum ApiRoutes {
  CREATE_JOB = '',
  ALL_JOBS = 'jobs/',
}

export class SlackJobsApiService extends ApiService<SlackJobEntity> {

  getAll(): Promise<ApiResponse<SlackJobEntity[]>> {
    return this.getRequest(ApiRoutes.ALL_JOBS);
  }

  create(slackJob: SlackJobEntity) {
    return this.postRequest(ApiRoutes.CREATE_JOB, slackJob);
  }
}
