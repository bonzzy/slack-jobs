import { SlackJobFormEntity } from '../entities/SlackJobFormEntity';

export namespace SlackJobsForm {

  export interface State {
    data?: SlackJobFormEntity;
    loading?: boolean;
    error?: string;
  }

  export interface StateProps {
    loading?: boolean;
    error?: string;
    data?: SlackJobFormEntity;
  }

  export interface Props extends DispatchMethods, StateProps{
  }

  export interface DispatchMethods {
    test?: () => void;
    createSlackJob?: (slackJob: SlackJobFormEntity) => void;
    setFormIsValid?: () => void;
    setFormIsInValid?: (messsage: string) => void;
  }

}
