import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "../../../components/Input/DatePicker";
import * as actions from "../../../store/actions";
import "./ManagePatient.scss";
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from "../../../utils";
import { FormattedMessage } from "react-intl";
import Select from "react-select";

import { toast } from "react-toastify";
import _ from "lodash";
import moment, { lang } from "moment";
import LoadingOverlay from "react-loading-overlay";

import {
  getListPatientForDoctorService,
  postSendRemedyService,
} from "../../../services/userService";
import RemedyModal from "./RemedyModal";

class ManagePatient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowLoading: false,
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatientList: [],
      dataModal: {},
    };
  }

  componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();

    let res = await getListPatientForDoctorService({
      doctorId: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatientList: res.data,
      });
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
    }
  }

  handleOnChangeDataPicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };

  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });

    let res = await postSendRemedyService({
      imageBase64: dataChild.imageBase64,
      email: dataChild.email,

      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      patientName: dataModal.patientName,

      language: this.props.language,
    });

    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("Send remedy succeed~~");
      this.closeRemedyModal();
      await this.getDataPatient();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Something wrongs...");
      console.log("Send remedy ERROR: ", res);
    }
  };

  render() {
    let { dataPatientList, isOpenRemedyModal, dataModal } = this.state;
    let { language } = this.props;
    //console.log("Check state from ManagePatient: ", this.state);
    return (
      <React.Fragment>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading now...."
        >
          <div className="manage-patient-container">
            <div className="m-p-title">QUAN LY BENH NHAN KHAM BENH</div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label>Chon ngay kham</label>
                <DatePicker
                  className="form-group"
                  onChange={this.handleOnChangeDataPicker}
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-patient">
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>Thoi gian</th>
                      <th>Email</th>
                      <th>Ho va ten</th>
                      <th>Dia chi</th>
                      <th>Gioi tinh</th>
                      <th>Actions</th>
                    </tr>
                    {dataPatientList && dataPatientList.length > 0 ? (
                      dataPatientList.map((item, index) => {
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeTypeDataPatient.valueVi
                            : item.timeTypeDataPatient.valueEn;
                        let gender =
                          language === LANGUAGES.VI
                            ? item.patientData.genderData.valueVi
                            : item.patientData.genderData.valueEn;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.timeTypeDataPatient.valueVi}</td>
                            <td>{item.patientData.email}</td>
                            <td>{item.patientData.firstName}</td>
                            <td>{item.patientData.address}</td>
                            <td>{item.patientData.genderData.valueVi}</td>
                            <td>
                              <button
                                className="mp-btn-confirm"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                Xac nhan
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          There is no data now!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    user: state.user.userInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
