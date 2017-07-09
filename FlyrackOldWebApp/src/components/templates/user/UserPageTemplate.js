/**
 * Created by sabir on 22.02.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');

var CurrentUserMenu = require('./CurrentUserMenu');

var UserNameSpan = require('../../profile/UserNameSpan');

var UserAPI = require('../../../api/UserAPI');

var UserPageTemplate = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('UsersStore')],
    getDefaultProps: function(){
        return {
            logo: 'assets/images/flytrack-logo.png',
            content: undefined,
            contentStyle: {

            },

            centerLinksContent: null,
            defaultAvatar: 'assets/images/empty_ava_pilot.jpg'

        }
    },


    getInitialState: function(){
        return {

        }
    },

    getStateFromFlux: function(){
        var store = this.getFlux().store('UsersStore');
        return {
            loading: store.loading
        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {

        },

        headerPlaceholder: {
            height: 40,
            //backgroundColor: '#564a41'
            backgroundColor: 'white',
            borderBottom: '1px solid #EFF0F1',
            position: 'fixed',
            zIndex: 10,
            width: '100%',
            top: 0,
        },

        header: {

        },

        logoPlaceholder: {
            position: 'absolute',
            top: 0,
            left: 0
        },

        logo: {
            height: 32,
            //width: 132,
            width: 128,
            marginTop: 4,
            display: 'inline-block',
            cursor: 'pointer'
        },

        linksPlaceholder: {
            position: 'absolute',
            top: 0,
            right: 0
        },

        content: {
            //width: 960,
            width: 800,
            height: '100%',
            maxHeight: '100%',
            //paddingTop: 40,
            margin: '0 auto',
            overflowY: 'auto',
            display: 'inline-block',
            verticalAlign: 'top'
        },

        currentUserMenu: {

        },

        sidebar: {
            display: 'inline-block',
            verticalAlign: 'top',
            width: 145,
            marginRight: 15
        }

    },

    onLogoClick: function(){

    },

    onLogOutClick: function(){
        this.getFlux().actions.logOut();
    },



    getNameComponent: function(){
        var currentUser = UserAPI.getCurrentUser();
        var avatar = (currentUser == undefined || currentUser.avatar == undefined) ? this.props.defaultAvatar : currentUser.avatar;

        return (
            <div style={{display: 'inline-block'}} className={'user_name_component'} >


                    <span className={'user_profile_name'} >
                        <UserNameSpan />
                    </span>

                    {currentUser == undefined ? null :
                        <div className={'avatar_profile_circle'} >
                            <BackgroundImageContainer style={{borderRadius: 1000}} image={avatar}  />
                        </div>
                    }
            </div>
        );
    },

    render: function(){
        var contentStyle = assign({}, this.componentStyle.content);
        //contentStyle = assign({}, contentStyle, this.props.contentStyle);


        return (
            <div style={this.componentStyle.placeholder} >

                <div style={this.componentStyle.headerPlaceholder}>

                    <div style={assign({}, this.componentStyle.header)} className={'template_header'} >

                        <div style={this.componentStyle.logoPlaceholder}>
                            <div style={this.componentStyle.logo} onClick={this.onLogoClick} >
                                <BackgroundImageContainer image={this.props.logo} />
                            </div>
                        </div>

                        <div style={{marginLeft: 200}} >
                            {true == true ? null :
                                <span>{this.props.centerLinksContent}</span>
                            }
                        </div>

                        <div style={this.componentStyle.linksPlaceholder}>

                            {true == true ? null :
                                <div style={this.componentStyle.currentUserMenu}>
                                    <CurrentUserMenu />
                                </div>
                            }

                            <div style={{display: 'inline-block'}} >
                                {this.getNameComponent()}
                            </div>

                            {true == true ? null :
                                <div className={'topHeaderLink '} style={{marginRight: 0}} onClick={this.onLogOutClick} >
                                    <i className={'icon sign out'} ></i>
                                    Выход
                                </div>
                            }


                        </div>

                    </div>

                </div>

                <div style={{display: 'block', width: 960, margin: '0 auto', marginTop: 40}} >

                    <div style={this.componentStyle.sidebar}>
                        {this.props.sidebar}
                    </div>

                    <div style={contentStyle} >
                        {this.props.content}
                    </div>
                </div>

            </div>
        );
    }

});

module.exports = UserPageTemplate;