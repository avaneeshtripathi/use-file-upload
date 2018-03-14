import React from 'react';
import FileUploader from '../component/file-uploader'

export default class Container extends React.Component {
	uploadFile = (fileData) => {
		const formData = new FormData();
		formData.append('file', fileData);
		console.log(formData.get('file'));
	};

	render() {
		return (
			<FileUploader
				onUpload={this.uploadFile}
				expectedFileTypes={['csv']}
				fileTypeError="Select a valid file format"
				noFileError="Select a file to upload"
				headerLabel="Upload file"
				inputLabel="Choose a file or Drag and drop here"
				buttonLabel="Upload"
			/>
		);
	}
};
