import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";

import { CommonUtils } from "../../../utils";
import { createNewSpecialtyService } from "../../../services/userService";
import "./ManageSpecialty.scss";

const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      previewImgURL: "",
      name: "",
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

  handleSaveNewSpecialty = async () => {
    let res = await createNewSpecialtyService(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new specialty succeeds!");
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Something wrongs...!");
    }
  };

  render() {
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">
          <FormattedMessage id="manage-specialty.title" />
        </div>

        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>
              <FormattedMessage id="manage-specialty.name-specialty" />
            </label>
            <input
              className="form-control"
              type="text"
              onChange={(event) => this.handleOnChangeInput(event, "name")}
              value={this.state.name}
            />
          </div>
          <div className="col-3 form-group">
            <label>
              <FormattedMessage id="manage-specialty.img-specialty" />{" "}
            </label>
            <input
              id="form-control-file"
              type="file"
              onChange={(event) => this.handleOnChangeImage(event)}
            />
          </div>
          <div className="col-3 form-group">
            <div
              className=" preview-image"
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
              className="btn-save-specialty"
              onClick={() => this.handleSaveNewSpecialty()}
            >
              <FormattedMessage id="manage-specialty.save" />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
