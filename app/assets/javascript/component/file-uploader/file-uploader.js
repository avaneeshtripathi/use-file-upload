import React from 'react';
import styles from './file-uploader.scss';

class FileUploader extends React.Component {
  state = {
    fileInfo: null,
    isDragOver: false,
    errorMsg: '',
  };

  fileInput;

  getFileExtension = (fileName = '') => {
		const parts = fileName.split('.');
		return (parts[parts.length - 1] && parts[parts.length - 1].toLowerCase()) || '';
  };

  handleFileUploadChange = (ev) => {
    ev.preventDefault();
    const { expectedFileTypes, fileTypeError, noFileError } = this.props;
    const fileInfo = this.fileInput.files && this.fileInput.files[0];

    if (fileInfo) {
			const uploadedFileType = this.getFileExtension(fileInfo.name);
      const errorMsg = uploadedFileType
        ? (!expectedFileTypes.includes(uploadedFileType) && fileTypeError)
        : noFileError;

      this.setState({
        fileInfo,
        errorMsg,
        isDragOver: false,
      });
    }
  };

  uploadFile = (ev) => {
    ev.preventDefault();
    const { fileInfo } = this.state;
    const { noFileError, fileTypeError, expectedFileTypes } = this.props;
		const uploadedFileType = this.getFileExtension(fileInfo.name);

    if (expectedFileTypes.includes(uploadedFileType)) {
      this.props.onUpload(fileInfo);
    } else {
      this.setState({
        errorMsg: !expectedFileTypes.includes(uploadedFileType)
          ? fileTypeError : noFileError,
      });
    }
  };

  render() {
    const { errorMsg, fileInfo, isDragOver } = this.state;
    const { headerLabel, inputLabel, buttonLabel } = this.props;
    return (
      <div className={styles.container}>
        <h2 className={styles.uploaderHead}>{headerLabel}</h2>
        <div className={styles.uploaderBody}>
          <form className={styles.uploadForm} onSubmit={this.uploadFile}>
            <div className={styles.contentWrapper}>
              <label
                htmlFor="fileUpload"
                className={isDragOver ? styles.isDragOver : ''}
              >
                <span>{fileInfo ? fileInfo.name : inputLabel}</span>
                <input
                  ref={(ref) => (this.fileInput = ref)}
                  id="fileUpload"
                  type="file"
                  onChange={this.handleFileUploadChange}
                  onDragOver={() => this.setState({ isDragOver: true })}
                  onDragLeave={() => this.setState({ isDragOver: false })}
                />
              </label>
            </div>
            <div className={styles.buttonWrapper}>
              <button>{buttonLabel}</button>
            </div>
          </form>
          <div className={styles.messageWrapper}>
            {errorMsg &&
            <span className={styles.errorMessage}>{errorMsg}</span>}
          </div>
        </div>
      </div>
    );
  }
}

export default FileUploader;
