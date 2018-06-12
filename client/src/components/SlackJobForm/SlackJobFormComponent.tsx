import React from 'react';
import { SlackJobsForm } from '../../interfaces/SlackJobsForm';
import { SlackJobFormValidator } from '../../validators/SlackJobFormValidator';
import { SlackJobFormEntity } from '../../entities/SlackJobFormEntity';
import moment from 'moment';
import Datetime from 'react-datetime';

export default class SlackJobFormComponent extends React.Component<SlackJobsForm.Props, SlackJobsForm.State> {
  public message: string = '';
  public timestamp: string = '';

  constructor(props: SlackJobsForm.Props) {
    super(props);

    this.state = {
      error: '',
    };
  }

  public createSlackJob() {

  }

  public handleMessageChange(event: any) {
    this.message = event.target.value;
  }

  public handleDateChange(event: any) {
  }

  public handleSubmit(event: any) {
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

    this.setState({
      error: '',
    });
  }

  public render() {
    const { loading, data } = this.props;
    return (
      <div className={'slackJobFormComponent'}>
        {this.state.error}
        <form className={'slackJobFormComponent__form'}>

          <h2 className={'slackJobFormComponent__h2'}>
            Create a new scheduled Slack message
          </h2>
          <div className={'input-container'}>
            <Datetime />
          </div>
          <textarea className={'slackJobFormComponent__input'}
                    placeholder="Hi there! Write here a message you want to sent..."
                    rows={7}
                    onChange={this.handleMessageChange.bind(this)} name="message">
          </textarea>

          <div className={'input-container'}>
            <input
              className={'slackJobFormComponent__submit'}
              type="submit"
              onClick={this.handleSubmit.bind(this)}
              value="Create Job" />
          </div>

        </form>
      </div>
    );
  }
}
