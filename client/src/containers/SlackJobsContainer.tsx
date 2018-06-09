import { connect } from 'react-redux';
import * as React from 'react';
import NavigationComponent from '../components/NavigationComponent';
import SlackJobsComponent from '../components/SlackJobsComponent';
import { SlackJobsAction } from '../actions/SlackJobsAction';
import { State } from '../interfaces/State';
import { SlackJobs } from '../interfaces/SlackJobs';

const mapDispatchToProps = (dispatch: any): SlackJobs.DispatchMethods => {
  return {
    getSlackJobs: () => {
      dispatch(SlackJobsAction.loading());
      const a = dispatch(SlackJobsAction.getSlackJobs());
      a.then((response: any) => {

        if (!response.error) {
          dispatch(SlackJobsAction.successGet(response.payload));
        }
      });
    },
  };
};

const mapStateToProps = (state: State, props: SlackJobs.Props): SlackJobs.StateProps => {
  return {
    data: state.slackJobs.data,
    loading: state.slackJobs.loading,
  };
};

class SlackJobsContainer extends React.Component<SlackJobs.Props, SlackJobs.State> {

  componentDidMount() {
    this.props.getSlackJobs();
  }

  render(): JSX.Element  {
    const { data, loading } = this.props;

    return (
      <div>
        <NavigationComponent/>
        <SlackJobsComponent data={data} loading={loading}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlackJobsContainer);
