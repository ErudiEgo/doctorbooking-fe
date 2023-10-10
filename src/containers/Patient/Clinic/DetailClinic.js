import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { LANGUAGES } from "../../../utils";
import "./DetailClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import {
  getDetailClinicByIdService,
  getAllCodeService,
} from "../../../services/userService";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailClinicByIdService({
        id: id,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];

        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  // handleOnChangeSelect = async (event) => {
  //   if (
  //     this.props.match &&
  //     this.props.match.params &&
  //     this.props.match.params.id
  //   ) {
  //     let id = this.props.match.params.id;
  //     let location = event.target.value;

  //     let res = await getAllDetailClinicByIdService({
  //       id: id,
  //       location: location,
  //     });

  //     if (res && res.errCode === 0) {
  //       let data = res.data;
  //       let arrDoctorId = [];

  //       if (res && !_.isEmpty(res.data)) {
  //         let arr = data.doctorSpecialty;
  //         if (arr && arr.length > 0) {
  //           arr.map((item) => {
  //             arrDoctorId.push(item.doctorId);
  //           });
  //         }
  //       }
  //       this.setState({
  //         dataDetailClinic: res.data,
  //         arrDoctorId: arrDoctorId,
  //       });
  //     }
  //   }
  // };

  render() {
    let { arrDoctorId, dataDetailClinic } = this.state;
    let { language } = this.props;

    console.log("Check state from DetailSpeicalty: ", this.state);
    console.log(
      "Check doctorIdFromParent from DetailSpeicalty: ",
      this.doctorIdFromParent
    );
    return (
      <React.Fragment>
        <div className="detail-specialty-container">
          <HomeHeader />
          <div className="detail-specialty-body">
            <div className="description-specialty">
              {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                <>
                  <div>{dataDetailClinic.name}</div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dataDetailClinic.descriptionHTML,
                    }}
                  ></div>
                </>
              )}
            </div>
            {/* <div className="search-sp-doctor">
              <select onChange={(event) => this.handleOnChangeSelect(event)}>
                {listProvince &&
                  listProvince.length > 0 &&
                  listProvince.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {""}
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div> */}
            {arrDoctorId &&
              arrDoctorId.length > 0 &&
              arrDoctorId.map((item, index) => {
                return (
                  <div className="each-doctor" key={index}>
                    <div className="dt-content-left">
                      <div className="profile-doctor">
                        <ProfileDoctor
                          doctorId={item}
                          isShowDescriptionDoctor={true}
                          isShowLinkDetail={true}
                          isShowPrice={false}
                          //dataTime={dataTime}
                        />
                      </div>
                    </div>
                    <div className="dt-content-right">
                      <div className="doctor-schedule">
                        <DoctorSchedule doctorIdFromParent={item} />
                      </div>
                      <div className="doctor-extra-infor">
                        <DoctorExtraInfor doctorIdFromParent={item} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
