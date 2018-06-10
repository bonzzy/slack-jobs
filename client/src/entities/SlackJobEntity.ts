export interface SlackJobEntityAttributes {
  id: string;
  message: string;
  timestamp: string;
  sent: boolean;
}

export class SlackJobEntity {
  private _id: string;
  private _message: string;
  private _timestamp: string;
  private _sent: boolean;

  constructor(attributes: SlackJobEntityAttributes) {
    this._message = attributes.message;
    this._timestamp = attributes.timestamp;
    this._sent = attributes.sent;
    this._id = attributes.id;
  }

  get id(): string {
    return this._id;
  }

  get timestamp(): string {
    return this._timestamp;
  }

  get message(): string {
    return this._message;
  }

  get sent(): boolean {
    return this._sent;
  }
}
