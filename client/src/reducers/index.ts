import { combineReducers } from 'redux';
import slackJobs from './slackJobs';
import formSlackJobsActionTypes from './slackJobFormActionTypes';

export default combineReducers({
  slackJobs,
  slackJobForm: formSlackJobsActionTypes,
});
