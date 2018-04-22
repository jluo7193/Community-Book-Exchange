import React, { Component } from 'react';

export class BackButton extends Component {
  static contextTypes = {
    router: () => true, // replace with PropTypes.object if you use them
  }

  render() {
    return (
      <a class="btn" onClick={this.context.router.history.goBack}>
        <i class="fa fa-chevron-left"></i> Back
      </a>
    )
  }
}