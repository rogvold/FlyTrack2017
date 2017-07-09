/**
 * Created by sabir on 25.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var XHRHelper = require('../../../helpers/XHRHelper');

var ImageUploadPanel = React.createClass({
    getDefaultProps: function () {
        return {

            onFileUploaded: function(data){
                console.log('file uploaded: data = ', data);
            },

            onUploadingStart: function(){

            },

            onUploadingError: function(){

            },

            labelName: 'Загрузить фото'

        }
    },

    getInitialState: function () {
        return {
            file: undefined,
            loading: false,
            progress: 0,
            uploadedData: undefined
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {

        },

        formPlaceholder: {
            textAlign: 'center'
        },

        topPlaceholder: {
            textAlign: 'center'
        },

        submitPlaceholder: {
            textAlign: 'center',
            marginTop: 10
        }


    },

    onChange: function(event){
        var file = event.target.files[0];
        console.log('file = ', file);

        //this.setState({
        //    file: event.target.files[0],
        //    uploadedUrl: undefined,
        //    loading: false,
        //    progress: 0
        //});
        this.onSubmit(file);
    },

    getCuteSize: function(){
        var file = this.state.file;
        if (file == undefined){
            return '';
        }
        var size = Math.round(file.size * 10.0 / (1000 * 1000.0)) / 10.0
        return (size + ' MB');
    },

    onSubmit: function(file){
        if (file == undefined){
            file = this.state.file;
        }
        this.setState({
            loading: true,
            progress: 0,
            file: file,
            uploadedData: undefined
        });
        this.props.onUploadingStart();
        XHRHelper.uploadImage(file, function(data){
            this.props.onFileUploaded(data);
            this.setState({
                progress: 100,
                loading: false,
                uploadedData: data
            });
        }.bind(this), function(e){
            this.props.onUploadingError();
            this.setState({
                loading: false,
                uploadedData: undefined
            });
            alert('error occured during file uploading');
        }.bind(this), function(p){
            this.setState({
                loading: true,
                progress: p,
                uploadedData: undefined
            });
        }.bind(this));
    },

    render: function () {
        var file = this.state.file;
        var isImage = (file == undefined) ? false : (file.type.indexOf('image') != -1);
        var isVideo = (file == undefined) ? false : (file.type.indexOf('video') != -1);

        return (
            <div style={this.componentStyle.placeholder}>

                {this.state.loading == true ? null :
                    <div style={this.componentStyle.formPlaceholder}>
                        <div className={'ui form'} ref={'fInput'} >
                            <input id={'file'} name={'file'} accept="image/*"
                                   type={'file'} onChange={this.onChange} className={'file_upload_input'} />
                            <label htmlFor="file">{this.props.labelName}</label>
                        </div>
                    </div>
                }

                {this.state.loading == false ? null :
                    <div className="ui progress success" style={{marginTop: 5, marginBottom: 5}} >

                        {this.state.progress == 100 ? null :
                            <div className="bar" style={{transitionDuration: '300ms', width: this.state.progress + '%'}}>
                                <div className="progress">{this.state.progress}%</div>
                            </div>
                        }

                    </div>
                }

            </div>
        );
    }

});

module.exports = ImageUploadPanel;