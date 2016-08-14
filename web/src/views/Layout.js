import React from "react";
import { connect } from 'react-redux';

const Layout = React.createClass({
  displayName: 'layout',
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    common: React.PropTypes.object.isRequired
  },
  render: function () {
    return (
      <div>
        Hello React!
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    common: state.common
  }
}

export default connect(mapStateToProps)(Layout);
