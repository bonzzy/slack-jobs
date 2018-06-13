import { combineReducers } from 'redux';
import slackJobs from './slackJobs';
import formSlackJobsActionTypes from './slackJobForm';

export default combineReducers({
  slackJobs,
  slackJobForm: formSlackJobsActionTypes,
});
