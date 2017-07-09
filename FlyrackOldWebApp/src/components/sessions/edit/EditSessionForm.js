/**
 * Created by sabir on 25.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var DeleteButton = require('../../button/DeleteButton');

var EditSessionForm = React.createClass({
    getDefaultProps: function () {
        return {
            name: undefined,
            description: undefined,

            onSubmit: function(data){
                console.log('onSubmit default');
            },

            onDelete: function(){
                console.log('onDelete default');
            }

        }
    },

    getInitialState: function () {
        return {
            name: this.props.name,
            description: this.props.description
        }
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },


    onSubmit: function(){
        this.props.onSubmit({
            name: this.state.name,
            description: this.state.description
        });
    },

    onNameChange: function(evt){
        this.setState({
            name: evt.target.value
        });
    },

    onDescriptionChange: function(evt){
        this.setState({
            description: evt.target.value
        });
    },

    render: function () {

        return (
            <div style={this.componentStyle.placeholder}>

                <div className={'ui form'} >
                    <div className={'field'} >
                        <label>Название полета</label>
                        <input
                            placeholder={'Название полета'}
                            value={this.state.name} onChange={this.onNameChange} />
                    </div>

                    <div className={'field'} >
                        <label>Описание полета</label>
                        <textarea
                            placeholder={'Описание полета'}
                            value={this.state.description} onChange={this.onDescriptionChange} ></textarea>
                    </div>
                </div>

                <div className={'submit_button_placeholder'} style={{marginTop: 10}} >
                    <buton className={'ui button primary'} onClick={this.onSubmit} >
                        <i className={'icon save'} ></i> Сохранить
                    </buton>

                    <DeleteButton buttonClassName={'ui inverted red button'}
                                  confirmationText={'Вы уверены?'}
                                  okButtonName={'Да'}
                                  noButtonName={'Нет'}
                                  buttonText={'Удалить полет'}
                        onDelete={this.props.onDelete} />

                </div>

            </div>
        );
    }

});

module.exports = EditSessionForm;