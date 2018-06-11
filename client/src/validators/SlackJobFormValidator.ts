import { SlackJobFormEntity } from '../entities/SlackJobFormEntity';
import moment from 'moment';

export class SlackJobFormValidator {

  private messageValidation = {
    valid: true,
    message: '',
  };

  private timestampValidation = {
    valid: true,
    message: '',
  };

  public maxMessageSize = 100;
  public minMessageSize = 5;

  constructor(private slackJobFormEntity: SlackJobFormEntity) {
  }

  public validate(): void {
    this.validateMessage();
    this.validateTimestamp();
  }

  public isMessageValid(): boolean {
    return this.messageValidation.valid;
  }

  public isTimestampValid(): boolean {
    return this.timestampValidation.valid;
  }

  getMessageError(): string {
    return this.messageValidation.message;
  }

  getTimestampError(): string {
    return this.timestampValidation.message;
  }

  private validateMessage() {
    if (this.slackJobFormEntity.message.length < this.minMessageSize) {
      this.messageValidation.valid = false;
      this.messageValidation.message = `Message should have at least ${this.minMessageSize}!`;

      return;
    }

    if (this.slackJobFormEntity.message.length > this.maxMessageSize) {
      this.messageValidation.valid = false;
      this.messageValidation.message = `Message should have less than ${this.maxMessageSize}!`;

      return;
    }

    this.messageValidation.valid = true;
    this.messageValidation.message = ``;
  }

  private validateTimestamp() {
    const timestamp = parseInt(this.slackJobFormEntity.timestamp, 0);

    if (moment(timestamp).isValid() === false) {
      this.timestampValidation.valid = false;
      this.timestampValidation.message = `Date is not valid!`;

      return;
    }

    if (moment(timestamp).isAfter(moment()) === false) {
      this.timestampValidation.valid = false;
      this.timestampValidation.message = `Date should be in the future!`;

      return;
    }

    this.timestampValidation.valid = true;
    this.timestampValidation.message = ``;
  }
}
