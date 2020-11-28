import React 			from 'react';
import 'simditor/styles/simditor.scss';
import Simditor 		from 'simditor';

import './index.scss';

// 通用富文本编辑器, 依赖jQuery
class RichEditor extends React.Component {
	constructor (props) {
		super(props);
	}
	componentDidMount () {
		this.loadRichEditor()
	}
	componentWillReceiveProps (nextProps) {
		if (this.props.defaultDetail !== nextProps.defaultDetail)
		this.simditor.setValue(nextProps.defaultDetail)
	}
	// 加载富文本编辑器
	loadRichEditor () {
		let element = this.refs['textarea'];
		this.simditor = new Simditor({
		  	textarea: $(element),
		  	defaultValue: this.props.placeholder || '请输入',
		  	upload: {
		  		url: '/manage/product/richtext_img_upload.do', // 富文本的图片上传
		  		defaultImage: '',
		  		fileKey: 'upload_file' // 对应后台接口的name,例如:后端图片接口require: <input type="file" name="upload_file">
		  	}
		});
		this.bindEditorChange();
	}
	// 把结果暴露给父组件
	bindEditorChange () {
		// this.simditor.on() 和 this.simditor.getValue()都是simditor提供的方法
		this.simditor.on('valuechanged' , () => {
			this.props.onValueChange(this.simditor.getValue())
		})
	}
	render () {
		return (
			<div className="rich-editor">
				<textarea ref="textarea"></textarea>
			</div>
		);
	}
}

export default RichEditor;