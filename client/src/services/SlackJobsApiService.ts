import { ApiService } from './ApiService';
import { SlackJobEntity } from '../entities/SlackJobEntity';
import { ApiResponse } from '../interfaces/Api';
import { SlackJobFormEntity } from '../entities/SlackJobFormEntity';

export enum ApiRoutes {
  CREATE_JOB = '/jobs/',
  ALL_JOBS = '/jobs/',
  DELETE_JOB = '/jobs/',
}

export class SlackJobsApiService extends ApiService {

  getAll(): Promise<ApiResponse<SlackJobEntity[]>> {
    return this.getRequest<SlackJobEntity[]>(ApiRoutes.ALL_JOBS);
  }

  create(slackJobForm: SlackJobFormEntity) {
    return this.postRequest<SlackJobFormEntity>(ApiRoutes.CREATE_JOB, slackJobForm);
  }

  delete(slackJobEntity: SlackJobEntity) {
    return this.deleteRequest<SlackJobEntity[]>(ApiRoutes.DELETE_JOB, slackJobEntity.id);
  }
}
