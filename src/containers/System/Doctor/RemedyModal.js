import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "../../../components/Input/DatePicker";
import * as actions from "../../../store/actions";
import "./RemedyModal.scss";
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from "../../../utils";
import { FormattedMessage } from "react-intl";
import Select from "react-select";

import { toast } from "react-toastify";
import _ from "lodash";
import moment, { lang } from "moment";
import LoadingOverlay from "react-loading-overlay";
import { CommonUtils } from "../../../utils";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import {
  getListPatientForDoctorService,
  postSendRemedy,
} from "../../../services/userService";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imageBase64: "",
    };
  }

  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  handleOnchangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };

  render() {
    let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props;

    return (
      <Modal
        className={"booking-modal-container"}
        isOpen={isOpenModal}
        size="lg"
        centered
        //backdrop={true}
      >
        <div className="modal-header">
          <h5 className="modal-title">Gui hoa don kham benh thanh cong</h5>
          <button
            className="close"
            type="button"
            aria-label="Close"
            onClick={closeRemedyModal}
          >
            <span aria-hidden="true">X</span>
          </button>
        </div>
        <ModalBody>
          <div className="row">
            <div className="col-6 form-group">
              <label>Email benh nhan: </label>
              <input
                className="form-control"
                type="email"
                value={this.state.email}
                onChange={(event) => this.handleOnchangeEmail(event)}
              />
            </div>
            <div className="col-6 form-group">
              <label>Chon file don thuoc: </label>
              <input
                className="form-control"
                type="file"
                onChange={(event) => this.handleOnChangeImage(event)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.handleSendRemedy()}>
            Send
          </Button>{" "}
          <Button color="secondary" onClick={closeRemedyModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
