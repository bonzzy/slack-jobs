import * as React from 'react';

export namespace Loading {
  export interface props {
    className?: string;
  }
}
export default class LoadingComponent extends React.Component<Loading.props> {

  render() {
    const className = (this.props.className) ? this.props.className : '';

    return (
      <div className="loadingComponent">
        <figure className={`loadingComponent__figure ${className}`} />
      </div>
    );
  }
}
