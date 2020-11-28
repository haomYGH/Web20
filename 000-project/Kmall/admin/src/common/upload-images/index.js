/*
* @Author: Chen
* @Date:   2020-08-06 15:07:13
* @Last Modified by:   Chen
* @Last Modified time: 2020-08-07 17:04:09
*/
import React,{ Component,Fragment } from 'react'
import { Upload, Icon, Modal } from 'antd'

class UploadImages extends Component{
	constructor(props){
		super(props)
		this.state = {
		    previewVisible: false,
		    previewImage: '',
		    fileList: [],
		}

		this.handleCancel = this.handleCancel.bind(this)
		this.handlePreview = this.handlePreview.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	static getDerivedStateFromProps(props, state){
		if(props.fileList.length > 0 && state.fileList.length == 0){
			return {
				fileList:props.fileList
			}
		}
		return null
	}
	handleCancel(){
		this.setState({ previewVisible: false });
	}
  	handlePreview(file){
	    this.setState({
			previewImage: file.url || file.preview,
			previewVisible: true,
	    });
	}
	handleChange({ fileList }){
		this.setState({ fileList },()=>{
			this.props.getFileList(fileList.map(file=>{
				if(file.response){
					return file.response.url
				}
			}).join(','))
		})
	}
	render(){
		const { previewVisible, previewImage, fileList } = this.state;
	    const uploadButton = (
	      <div>
	        <Icon type="plus" />
	        <div className="ant-upload-text">Upload</div>
	      </div>
	    )
	    const { action,max } = this.props;
	    // console.log(action)
		return (
			<div className="clearfix">
		        <Upload
		          action={action}
		          listType="picture-card"
		          withCredentials={true}
		          fileList={fileList}
		          onPreview={this.handlePreview}
		          onChange={this.handleChange}
		        >
		          {fileList.length >= max ? null : uploadButton}
		        </Upload>
		        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
		          <img alt="example" style={{ width: '100%' }} src={previewImage} />
		        </Modal>
		    </div>
		)
	}
}
export default UploadImages;