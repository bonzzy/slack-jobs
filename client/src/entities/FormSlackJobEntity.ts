export interface FormSlackJobEntityAttributes {
  message: string;
  timestamp: string;
}

export class FormSlackJobEntity {
  public message: string;
  public timestamp: string;

  constructor(attributes: FormSlackJobEntityAttributes) {
    this.message = attributes.message;
    this.timestamp = attributes.timestamp;
  }

}
