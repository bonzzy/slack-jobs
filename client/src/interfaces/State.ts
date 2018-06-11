import { SlackJobs } from './SlackJobs';
import { SlackJobsForm } from './SlackJobsForm';

export interface State {
  slackJobs: SlackJobs.State;
  slackJobForm: SlackJobsForm.State;
}
