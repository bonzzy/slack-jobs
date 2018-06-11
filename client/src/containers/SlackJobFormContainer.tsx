import React from 'react';
import { connect } from 'react-redux';
import NavigationComponent from '../components/NavigationComponent';
import SlackJobFormComponent from '../components/SlackJobForm/SlackJobFormComponent';
import { Dispatch } from 'redux';
import { SlackJobsForm } from '../interfaces/SlackJobsForm';
import { State } from '../interfaces/State';

const mapDispatchToProps = (dispatch: Dispatch<Promise<any>>): SlackJobsForm.DispatchMethods => {
  return {
    test: () => {
      console.log('Form Test');
    },

    createSlackJob: () => {

    },

    setFormIsValid: (): void => {

    },

    setFormIsInValid: (message: string): void => {

    },
  };
};

const mapStateToProps = (state: State, props: SlackJobsForm.Props): SlackJobsForm.StateProps => {
  return {
    loading: state.slackJobForm.loading,
    error: state.slackJobForm.error,
    data: state.slackJobForm.data,
  };
};

class SlackJobFormContainer extends React.Component<SlackJobsForm.Props, SlackJobsForm.State> {

  componentDidMount() {
    this.props.test();
  }

  render() {
    const { error, loading, data } = this.props;
    return (
      <div>
        <NavigationComponent/>
        <SlackJobFormComponent
          createSlackJob={() => { this.createSlackJob(); }}
          setFormIsInValid={() => this.setFormIsInValid.bind(this)}
          setFormIsValid={() => this.setFormIsValid.bind(this)}
          error={error}
          loading={loading}
          data={data}
        />
      </div>
    );
  }

  private createSlackJob() {
    console.log('called method createSlackJob');
  }

  private setFormIsValid() {
    console.log('form validation is valid');
  }

  private setFormIsInValid(message: string) {
    console.log('form validation not valid');
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlackJobFormContainer);
