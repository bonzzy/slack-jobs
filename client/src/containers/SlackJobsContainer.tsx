import { connect } from 'react-redux';
import * as React from 'react';
import NavigationComponent from '../components/NavigationComponent';
import SlackJobsComponent from '../components/SlackJobsComponent';
import { SlackJobsAction } from '../actions/SlackJobsAction';
import { State } from '../interfaces/State';
import { SlackJobs } from '../interfaces/SlackJobs';
import { DispatchResponse, DispatchResponseAttributes } from '../utils/DispatchResponse';

const mapDispatchToProps = (dispatch: any): SlackJobs.DispatchMethods => {
  return {
    getSlackJobs: () => {
      dispatch(SlackJobsAction.loading());

      dispatch(SlackJobsAction.getSlackJobs())
        .then((dispatchResponse: DispatchResponseAttributes<SlackJobs.State>) => {

          const dispatchResponseUtil = new DispatchResponse(dispatchResponse);

          if (dispatchResponseUtil.isValid() === false) {

            dispatch(SlackJobsAction.errorNetwork());
            return;
          }

          const response = dispatchResponseUtil.getPayload();

          if (response.error !== undefined) {
            dispatch(SlackJobsAction.errorGet(response));
            return;
          }

          dispatch(SlackJobsAction.successGet(response));
        }).catch((err: any) => {
          dispatch(SlackJobsAction.errorGet(err.message));
        });
    },
  };
};

const mapStateToProps = (state: State, props: SlackJobs.Props): SlackJobs.StateProps => {
  return {
    data: state.slackJobs.data,
    loading: state.slackJobs.loading,
    error: state.slackJobs.error,
  };
};

class SlackJobsContainer extends React.Component<SlackJobs.Props, SlackJobs.State> {

  componentDidMount() {
    this.props.getSlackJobs();
  }

  render(): JSX.Element  {
    const { data, loading, error } = this.props;

    return (
      <div>
        <NavigationComponent/>
        <div className={'container container--justify-center container--simple-padding-top'}>
          <SlackJobsComponent data={data} loading={loading} error={error}/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlackJobsContainer);
