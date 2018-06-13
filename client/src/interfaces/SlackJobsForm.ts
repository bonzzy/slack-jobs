import { SlackJobFormEntity } from '../entities/SlackJobFormEntity';
import * as moment from 'moment';

export namespace SlackJobsForm {

  export interface State {
    data?: SlackJobFormEntity;
    loading?: boolean;
    error?: string;
    momentTime?: moment.Moment;
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
