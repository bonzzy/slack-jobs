import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { SlackJobsAction } from '../../src/actions/SlackJobsAction';
import { ApiRoutes, SlackJobsApiService } from '../../src/services/SlackJobsApiService';
import MockAdapter from 'axios-mock-adapter';
import axios from'axios';
import { SlackJobsActionTypes } from '../../src/reducers/slackJobs';
import { ApiResponse } from '../../src/interfaces/Api';
import { SlackJobEntity } from '../../src/entities/SlackJobEntity';
import { SlackJobFormEntity } from '../../src/entities/SlackJobFormEntity';

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

    mockAxios.onGet(`${apiService.getBaseUrl()}${ApiRoutes.ALL_JOBS}`).reply(200, {
      data: simpleDataResponse,
    });
  });

  it('should create GET_SLACK_JOBS when calling getSlackJobs action', (done) => {
    const store = mockStore({ foo: {} });

    store.dispatch(SlackJobsAction.getSlackJobs()).payload.then(() => {
      const actions = store.getActions();

      expect(actions[0].type).toEqual(SlackJobsActionTypes.GET_SLACK_JOBS);
      done();
    });
  });

  it('should create LOADING when calling loading action', () => {
    const store = mockStore({ foo: {} });

    store.dispatch(SlackJobsAction.loading());
    const actions = store.getActions();

    expect(actions[0].type).toEqual(SlackJobsActionTypes.LOADING);
  });

  it('should create GET_SLACK_JOBS_SUCCESS when calling successGet action', () => {
    const store = mockStore({ foo: {} });
    const mockedApiResponse: ApiResponse<SlackJobEntity[]> = {
      data: simpleDataResponse,
    };
    store.dispatch(SlackJobsAction.successGet(mockedApiResponse));
    const actions = store.getActions();

    expect(actions[0].type).toEqual(SlackJobsActionTypes.GET_SLACK_JOBS_SUCCESS);
  });

  it('should create NETWORK_PROBLEM when calling errorNetwork action', () => {
    const store = mockStore({ foo: {} });

    store.dispatch(SlackJobsAction.errorNetwork());

    const actions = store.getActions();

    expect(actions[0].type).toEqual(SlackJobsActionTypes.NETWORK_PROBLEM);
  });

  it('should get valid response from API /jobs/ when calling getSlackJobs action', (done) => {
    const store = mockStore({ foo: {} });

    store.dispatch(SlackJobsAction.getSlackJobs()).payload.then((response: ApiResponse<SlackJobEntity[]>) => {
      expect(response.data).toEqual(simpleDataResponse);
      done();
    });
  });
});
