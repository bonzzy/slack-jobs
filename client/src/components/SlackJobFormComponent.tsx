import React from 'react';
import { SlackJobsForm } from '../interfaces/SlackJobsForm';
import { SlackJobFormValidator } from '../validators/SlackJobFormValidator';
import { SlackJobFormEntity } from '../entities/SlackJobFormEntity';
import moment from 'moment';
import Datetime from 'react-datetime';
import LoadingComponent from './LoadingComponent';

export default class SlackJobFormComponent extends React.Component<SlackJobsForm.Props, SlackJobsForm.State> {
  public message: string = '';
  public timestamp: string = '';

  constructor(props: SlackJobsForm.Props) {
    super(props);

    this.state = {
      error: '',
      momentTime: moment().add(5, 'minutes'),
    };

    this.timestamp = this.state.momentTime.toDate().getTime() + '';
  }

  public componentDidMount() {
    const { error } = this.props;

    this.setState({
      error,
    });
  }

  public render() {
    const { loading } = this.props;

    const loadingComponent = (loading) ?  (<figure className={'slackJobFormComponent__submit__loading'} />) : '';
    const outputError = this.getNotificationMessage();

    return (
      <div className={'slackJobFormComponent'}>
        <form className={'slackJobFormComponent__form'}>
          <span className={'slackJobFormComponent__error-message'}>
            {outputError}
          </span>
          <h2 className={'slackJobFormComponent__h2'}>
            Create a new scheduled Slack message
          </h2>
          <div className={'input-container'}>
            <Datetime
              value={this.state.momentTime}
              onChange={this.handleDateChange.bind(this)}
              isValidDate={this.getValidDates.bind(this)}
              closeOnSelect={true}
              disableOnClickOutside={false}
            />
          </div>
          <textarea className={'slackJobFormComponent__input'}
                    placeholder="Hi there! Write here a message you want to sent..."
                    rows={7}
                    onChange={this.handleMessageChange.bind(this)} name="message">
          </textarea>

          <div className={'input-container slackJobFormComponent__submit-container'}>
            <input
              className={'slackJobFormComponent__submit'}
              type="submit"
              onClick={this.handleSubmit.bind(this)}
              value={loading ? '' : 'Create Job'}
              disabled={loading}
            />
            {(loading) ? <LoadingComponent/> : ''}
          </div>

        </form>
      </div>
    );
  }

  private createSlackJob() {
    const formEntity = this.getFormEntity();

    this.props.createSlackJob(formEntity);
  }

  private getNotificationMessage(): string {
    const { error } = this.props;
    const message = (this.state.error.length === 0) ? error : this.state.error;

    return message;
  }

  private handleMessageChange(event: any) {
    this.message = event.target.value;
    this.resetErrorMessages();
  }

  private handleDateChange(currentDate: moment.Moment) {
    this.resetErrorMessages();

    this.timestamp = currentDate.toDate().getTime() + '';
    this.setState({
      momentTime: currentDate,
    });
  }

  private handleSubmit(event: any) {
    event.preventDefault();

    const slackJob = new SlackJobFormEntity({
      message: this.message,
      timestamp: this.timestamp,
    });
    const validator = new SlackJobFormValidator(slackJob);

    validator.validate();

    if (validator.isMessageValid() === false) {
      this.setState({
        error: validator.getMessageError(),
      });

      return;
    }

    if (validator.isTimestampValid() === false) {
      this.setState({
        error: validator.getTimestampError(),
      });

      return;
    }

    this.createSlackJob();
  }

  private getFormEntity():SlackJobFormEntity {
    return new SlackJobFormEntity({
      timestamp: this.timestamp,
      message: this.message,
    });
  }

  private getValidDates(currentDate: moment.Moment, selectedDate?: moment.Moment) {
    const timestamp = moment(currentDate)
      .add(1, 'days')
      .toDate()
      .getTime() + '';

    const slackJob = new SlackJobFormEntity({
      timestamp,
      message: this.message,
    });

    const validator = new SlackJobFormValidator(slackJob);
    validator.validate();

    return validator.isTimestampValid();
  }

  private resetErrorMessages() {
    if (this.state.error.length > 0) {
      this.setState({
        error: '',
      });
    }
  }
}
