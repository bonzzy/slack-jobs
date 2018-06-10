import React from 'react';
import { SlackJobsForm } from '../../interfaces/SlackJobsForm';
import { SlackJobFormValidator } from '../../validators/SlackJobFormValidator';
import { SlackJobFormEntity } from '../../entities/SlackJobFormEntity';
import DatePicker from 'react-datepicker';
import moment from 'moment';

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
    console.log(event.target.value);
    // this.timestamp = new Date(parseInt(event.target.value, 0)).getTime() + '';
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
      <div>
        {this.state.error}
        <form>
          <input type="text" onChange={this.handleMessageChange.bind(this)} name="message" />
          <input type="text" onChange={this.handleDateChange.bind(this)} name="timestamp" />
          <DatePicker
            onChange={this.handleDateChange.bind(this)}
            minTime={moment()}
            maxTime={moment().hours(20).minutes(30)}
            minDate={moment()}
            showTimeSelect
            timeIntervals={1}
          />
          <input type="submit" onClick={this.handleSubmit.bind(this)} value="Create Job" />
        </form>
        <button onClick={this.createSlackJob.bind(this)}>Create</button>
      </div>
    );
  }
}
