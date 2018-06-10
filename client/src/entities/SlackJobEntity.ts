import { FormSlackJobEntity, FormSlackJobEntityAttributes } from './FormSlackJobEntity';

export interface SlackJobEntityAttributes extends FormSlackJobEntityAttributes{
  id: string;
  channel: string;
  sent: boolean;
}

export class SlackJobEntity extends FormSlackJobEntity{
  public id: string;
  public sent: boolean;
  public channel: string;

  constructor(attributes: SlackJobEntityAttributes) {
    super(attributes);

    this.channel = attributes.channel;
    this.sent = attributes.sent;
    this.id = attributes.id;
  }
}
