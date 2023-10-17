import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          <FormattedMessage id="homepage.about" />
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="85%%"
              height="350px"
              src="https://www.youtube.com/embed/7tiR7SI4CkI"
              title="BookingCare trên VTV1 ngày 21/02/2018 - Chương trình Cà phê khởi nghiệp"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              Từ nay, người bệnh có thể đặt lịch tại Trung tâm Khám sức khỏe
              định kỳ, Bệnh viện Trung ương Quân đội 108 thông qua hệ thống đặt
              khám BookingCare:
            </p>
            <p>
              <li>
                *Giảm thời gian chờ đợi: Không phải xếp hàng làm thủ tục khám và
                ưu tiên khám trước
              </li>
              <li>
                *Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt
                lịch)
              </li>
              <li>
                *Lựa chọn gói khám từ cơ bản đến chuyên sâu theo nhu cầu *Được
                lựa chọn khám với Bác sĩ Chuyên khoa
              </li>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
