import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import something_wrong from "../../../assets/something-wrong.jpg";
import "./ManageHandbook.scss";

class ManageHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    return (
      <div className="manage-handbook-container">
        <div className="ms-title">
          <FormattedMessage id="manage-handbook.title" />
        </div>
        <div className="manage-handbook-body">
          <div className="col-12 form-group">
            <img className="somthing-wrong" src={something_wrong}></img>
          </div>
          <div className="col-12 form-group">
            <h3>Tính năng này đang được nâng cấp. Hãy quay trở lại sau~</h3>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
