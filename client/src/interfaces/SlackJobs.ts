import { SlackJobEntity } from '../entities/SlackJobEntity';

export namespace SlackJobs {

  export interface DispatchMethods {
    getSlackJobs?: () => void;
    deleteSlackJob?: (index: number, allSlackJobs: SlackJobEntity[]) => void;
  }

  export interface StateProps {
    data?: SlackJobEntity[];
    loading?: boolean;
    error?: string;
  }

  export interface Props extends DispatchMethods, StateProps {
  }

  export interface State {
    data: SlackJobEntity[];
    loading: boolean;
    error: string;
  }

}
