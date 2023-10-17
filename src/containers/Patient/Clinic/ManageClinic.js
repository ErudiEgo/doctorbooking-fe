import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";
import "./ManageClinic.scss";

import { CommonUtils } from "../../../utils";
import { createNewClinicService } from "../../../services/userService";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      previewImgURL: "",

      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        imageBase64: base64,
        previewImgURL: objectUrl,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveNewClinic = async () => {
    let res = await createNewClinicService(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new clinic succeed~~");
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Something is wrongs....");
    }
  };

  render() {
    return (
      <div className="manage-clinic-container">
        <div className="ms-title">
          <FormattedMessage id="manage-clinic.title" />
        </div>

        <div className="add-new-clinic row form-group">
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="manage-clinic.name-clinic" />
            </label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            />
            <br />
            <label>
              <FormattedMessage id="manage-clinic.address-clinic" />
            </label>
            <textarea
              className="form-control"
              type="text"
              value={this.state.address}
              onChange={(event) => this.handleOnChangeInput(event, "address")}
            />
          </div>

          <div className="col-3 form-group">
            <label>
              <FormattedMessage id="manage-clinic.img-clinic" />
            </label>
            <input
              id="form-control-file"
              type="file"
              onChange={(event) => this.handleOnChangeImage(event)}
            />
          </div>

          <div className="col-3 form-group">
            <div
              className="preview-image"
              style={{
                backgroundImage: `url(${this.state.previewImgURL})`,
              }}
              onClick={() => this.openPreviewImage()}
            ></div>
          </div>

          <div className="col-12 my-2">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12 my-2">
            <button
              className="btn-save-clinic"
              onClick={() => this.handleSaveNewClinic()}
            >
              <FormattedMessage id="manage-clinic.save" />
            </button>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
