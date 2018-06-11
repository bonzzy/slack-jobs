import axios from 'axios';
import { ApiResponse, AxiosResponse } from '../interfaces/Api';
import { ApiRoutes } from './SlackJobsApiService';

export abstract class ApiService {

  protected getRequest<T>(apiUrl: string): Promise<ApiResponse<T>> {

    return new Promise((resolve, reject) => {
      axios(`${this.getBaseUrl()}${apiUrl}`).then((res: AxiosResponse<T>) => {
        if (res.status === 200) {
          resolve(res.data);
          return;
        }

        reject(res.data);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  protected postRequest<T>(apiUrl: ApiRoutes, body: T): Promise<ApiResponse<T>> {
    return new Promise((resolve, reject) => {
      const options = {
        body,
        headers: {
          accept: 'application/json',
          'content-type': 'application/x-www-form-urlencoded',
        },
      };

      axios.post(`${this.getBaseUrl()}${apiUrl}`, options).then((res: AxiosResponse<T>) => {
        if (res.status === 200) {
          resolve(res.data);
          return;
        }

        reject(res.data);
      });
    });
  }

  public getBaseUrl(): string {
    return 'http://localhost:8080/api';
  }

}
