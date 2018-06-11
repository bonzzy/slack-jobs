import { combineReducers } from 'redux';
import slackJobs from './slackJobs';
import slackJobForm from './slackJobForm';

export default combineReducers({
  slackJobs,
  slackJobForm,
});
