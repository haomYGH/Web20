import React from 'react'
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Item from 'antd/lib/list/Item';

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}

class UploadImgs extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			previewVisible: false,//默认隐藏<Modal />当图片在网页成功显示时,再隐藏<Upload /> 显示<Modal />
			previewImage: '',
			previewTitle: '',
			fileList: [],//图片(格式参考官网)
		};
		// console.log(this.state.id)
	}
	
	static getDerivedStateFromProps(props, state){
		console.log(props.fileList);
		if(props.fileList.length > 0 && state.fileList == 0){
			console.log(props.fileList);
			return {
				fileList:props.fileList,
			}
		}
		return null;
	}
	componentWillUnmount(){
		this.setState({
			
		})
	}
	/*
	componentWillReceiveProps (nextProps) {
		if (this.props.defaultDetail !== nextProps.defaultDetail)
		this.simditor.setValue(nextProps.defaultDetail)
		console.log('xxx');
	}
	*/
	handleCancel = () => this.setState({ previewVisible: false });

	handlePreview = async file => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		this.setState({
			previewImage: file.url || file.preview,
			previewVisible: true,
			previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),//?
		});
	};
	//无论上传还是删除都会触发onChange={handleChange
	// handleChange = ({ fileList }) => this.setState({ fileList });
	handleChange = ({ fileList }) => this.setState({ fileList },()=>{
		this.props.getFileList(fileList.map(file=>{
			if(file.response){
				return file.response.url
			}
		}).join(','))
	});

	render() {
		const { previewVisible, previewImage, fileList, previewTitle } = this.state;//其中fileList不应该直接从props上拿吗?答：不能,会影响编辑页面
		// const { previewVisible, previewImage, previewTitle } = this.state;
		// const { fileList } = this.props;
		const { action,max } = this.props;
		const uploadButton = (
			<div>
				<PlusOutlined />
				<div className="ant-upload-text">Upload</div>
			</div>
		);
		// console.log(fileList)
		return (
			<div className="clearfix">
				<Upload
					action={action}
					method={'post'}
					listType="picture-card"
					fileList={fileList}
					withCredentials	={true}
					onPreview={this.handlePreview}
					onChange={this.handleChange}
				>
					{fileList.length >= max ? null : uploadButton}
				</Upload>
				<Modal
					visible={previewVisible}
					title={previewTitle}
					footer={null}	
					onCancel={this.handleCancel}
				>
					<img alt="example" style={{ width: '100%' }} src={previewImage} />
				</Modal>
			</div>
		);
	}
}

export default UploadImgs