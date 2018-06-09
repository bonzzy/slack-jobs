import React from 'react';
import { connect } from 'react-redux';
import NavigationComponent from '../components/NavigationComponent';
import SlackJobsFormComponent from '../components/SlackJobsForm/SlackJobsFormComponent';
import { Dispatch } from 'redux';
import { SlackJobsForm } from '../interfaces/SlackJobsForm';
import { State } from '../interfaces/State';

const mapDispatchToProps = (dispatch: Dispatch<Promise<any>>): SlackJobsForm.DispatchMethods => {
  return {
    test: () => {
      console.log('Form Test');
    },
  };
};

const mapStateToProps = (state: State, props: SlackJobsForm.Props): SlackJobsForm.StateMethods => {
  return {
    slackJobs: state.slackJobs,
  };
};

class SlackJobsFormContainer extends React.Component<SlackJobsForm.Props, SlackJobsForm.State> {

  componentDidMount() {
    this.props.test();
  }

  render() {
    return (
      <div>
        <NavigationComponent/>
        <SlackJobsFormComponent/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlackJobsFormContainer);
