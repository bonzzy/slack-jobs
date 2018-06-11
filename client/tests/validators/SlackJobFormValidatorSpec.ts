import expect from 'expect';
import { SlackJobFormValidator } from '../../src/validators/SlackJobFormValidator';
import { SlackJobFormEntity } from '../../src/entities/SlackJobFormEntity';
import moment from 'moment';

describe('SlackJobFormValidator', () => {

  beforeAll(() => {
  });

  it('should return false when calling isMessageValid() and message is empty', () => {
    const slackJob = new SlackJobFormEntity({
      message: '',
      timestamp: (new Date()).getTime() + '',
    });
    const formValidator = new SlackJobFormValidator(slackJob);
    formValidator.validate();

    expect(formValidator.isMessageValid()).toEqual(false);
  });

  it('should return false when calling isMessageValid() and message has too little characters', () => {
    const slackJob = new SlackJobFormEntity({
      message: '12',
      timestamp: (new Date()).getTime() + '',
    });
    const formValidator = new SlackJobFormValidator(slackJob);
    formValidator.minMessageSize = 5;
    formValidator.validate();

    expect(formValidator.isMessageValid()).toEqual(false);
  });

  it('should return false when calling isMessageValid() and message has too many characters', () => {
    const slackJob = new SlackJobFormEntity({
      message: '12',
      timestamp: (new Date()).getTime() + '',
    });
    const formValidator = new SlackJobFormValidator(slackJob);
    formValidator.maxMessageSize = 1;
    formValidator.validate();

    expect(formValidator.isMessageValid()).toEqual(false);
  });

  it('should return true when calling isMessageValid() and message is valid', () => {
    const slackJob = new SlackJobFormEntity({
      message: '12',
      timestamp: (new Date()).getTime() + '',
    });
    const formValidator = new SlackJobFormValidator(slackJob);
    formValidator.maxMessageSize = 100;
    formValidator.minMessageSize = 1;
    formValidator.validate();

    expect(formValidator.isMessageValid()).toEqual(true);
  });

  it('should return false when calling isTimestampValid() and timestamp is old', () => {
    const slackJob = new SlackJobFormEntity({
      message: '12',
      timestamp: moment().subtract(1, 'minutes').toDate().getTime() + '',
    });
    const formValidator = new SlackJobFormValidator(slackJob);
    formValidator.validate();

    expect(formValidator.isTimestampValid()).toEqual(false);
  });

  it('should return false when calling isTimestampValid() and timestamp is not valid', () => {
    const slackJob = new SlackJobFormEntity({
      message: '12',
      timestamp: '',
    });
    const formValidator = new SlackJobFormValidator(slackJob);
    formValidator.validate();

    expect(formValidator.isTimestampValid()).toEqual(false);
  });

  it('should return true when calling isTimestampValid() and timestamp is valid', () => {
    const slackJob = new SlackJobFormEntity({
      message: '12',
      timestamp: moment().add(2, 'minutes').toDate().getTime() + '',
    });
    const formValidator = new SlackJobFormValidator(slackJob);
    formValidator.validate();

    expect(formValidator.isTimestampValid()).toEqual(true);
  });

});
