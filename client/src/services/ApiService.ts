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
    const queryArr: string[] = [];

    for (const key in body) {
      const value = body[key];
      queryArr.push(`${key}=${value}`);
    }

    return new Promise((resolve, reject) => {
      axios.post(`${this.getBaseUrl()}${apiUrl}`, queryArr.join('&')).then((res: AxiosResponse<T>) => {
        if (res.status === 201) {
          resolve(res.data);
          return;
        }

        reject(res.data);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public getBaseUrl(): string {
    return 'http://localhost:8080/api';
  }

}
