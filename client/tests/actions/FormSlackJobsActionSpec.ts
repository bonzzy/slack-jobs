import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { ApiRoutes, SlackJobsApiService } from '../../src/services/SlackJobsApiService';
import MockAdapter from 'axios-mock-adapter';
import axios from'axios';
import { SlackJobsActionTypes } from '../../src/reducers/slackJobs';
import { SlackJobEntity } from '../../src/entities/SlackJobEntity';
import { SlackJobFormEntity } from '../../src/entities/SlackJobFormEntity';
import { FormSlackJobsAction } from '../../src/actions/FormSlackJobsAction';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);

describe('SlackJobsActions', () => {

  const simpleSlackJob: SlackJobEntity = {
    id: '2740fdbb-26c8-44ac-a560-92fc78cfeb89',
    timestamp: '0000000000000',
    channel: 'SOME_CHANNEL',
    message: 'Some message',
    sent: false,
  };

  const simpleFormSlackJob: SlackJobFormEntity = {
    timestamp: '0000000000000',
    message: 'Some message',
  };

  const simpleDataResponse: SlackJobEntity[] = [
    {
      id: '2740fdbb-26c8-44ac-a560-92fc78cfeb89',
      timestamp: '0000000000000',
      channel: 'SOME_CHANNEL',
      message: 'Some message',
      sent: false,
    },
  ];

  beforeAll(() => {
    const apiService = new SlackJobsApiService();

    mockAxios.onPost(`${apiService.getBaseUrl()}${ApiRoutes.CREATE_JOB}`).reply(200, {
      data: simpleFormSlackJob,
    });
  });

  it('should create SAVE_SLACK_JOB when calling saveSlackJob action', (done) => {
    const store = mockStore({ foo: {} });

    store.dispatch(FormSlackJobsAction.saveSlackJob(simpleFormSlackJob)).payload.then(() => {
      const actions = store.getActions();

      expect(actions[0].type).toEqual(SlackJobsActionTypes.SAVE_SLACK_JOB);
      done();
    }).catch((err) => {
      console.log('err', err);
    });
  });
});
