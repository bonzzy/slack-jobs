import React from 'react';
import { connect } from 'react-redux';
import NavigationComponent from '../components/NavigationComponent';
import SlackJobFormComponent from '../components/SlackJobForm/SlackJobFormComponent';
import { SlackJobsForm } from '../interfaces/SlackJobsForm';
import { State } from '../interfaces/State';
import { SlackJobFormAction } from '../actions/SlackJobFormAction';
import { SlackJobFormEntity } from '../entities/SlackJobFormEntity';
import { DispatchResponse, DispatchResponseAttributes } from '../utils/DispatchResponse';

const mapDispatchToProps = (dispatch: any): SlackJobsForm.DispatchMethods => {
  return {
    test: () => {
      console.log('Form Test!');
    },

    createSlackJob: (slackJobForm: SlackJobFormEntity) => {

      dispatch(SlackJobFormAction.loading());
      dispatch(SlackJobFormAction.saveSlackJob(slackJobForm))
        .then((dispatchResponse: DispatchResponseAttributes<SlackJobsForm.State>) => {
          const dispatchResponseUtil = new DispatchResponse<SlackJobsForm.State>(dispatchResponse);

          if (dispatchResponseUtil.isValid() === false) {

            dispatch(SlackJobFormAction.errorNetwork());
            return;
          }

          const response = dispatchResponseUtil.getPayload();

          if (response.error !== undefined) {
            dispatch(SlackJobFormAction.errorPost());
            return;
          }

          dispatch(SlackJobFormAction.successPost());
        });

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
        <div className={'container container--justify-center container--simple-padding-top'}>
          <SlackJobFormComponent
            createSlackJob={this.createSlackJob.bind(this)}
            setFormIsInValid={() => this.setFormIsInValid.bind(this)}
            setFormIsValid={() => this.setFormIsValid.bind(this)}
            error={error}
            loading={loading}
            data={data}
          />
        </div>
      </div>
    );
  }

  private createSlackJob(entity: SlackJobFormEntity) {
    this.props.createSlackJob(entity);
  }

  private setFormIsValid() {
    console.log('form validation is valid');
  }

  private setFormIsInValid(message: string) {
    console.log('form validation not valid');
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlackJobFormContainer);
