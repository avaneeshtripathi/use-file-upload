import React from 'react';
import FileUploader from '../component/file-uploader'

export default class Container extends React.Component {
	uploadFile = (fileData) => {
		const formData = new FormData();
		formData.append('file', fileData); // FormData can be sent to the server to store file.

		const reader = new FileReader();
		reader.readAsDataURL(formData.get('file')); // Read the file as DataURL, Text, ArrayBuffer or BinaryString.
		reader.onload = this.loadHandler; // To be called once the file is loaded.
	};

	loadHandler = (event) => {
		const file = event.target.result;
		this.processData(file);
	};

	processData = (data) => {
		console.log(data); // Data can be accessed here if needed on the frontend.
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
