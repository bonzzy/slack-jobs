export interface DispatchResponseAttributes<T> {
  error: boolean;
  payload: T;
  type: string;
}

export class DispatchResponse<T> {

  constructor(private response: DispatchResponseAttributes<T>) {
  }

  public isValid(): boolean {
    return !(this.response.error === true);
  }

  public getPayload(): T {
    return this.response.payload;
  }
}
