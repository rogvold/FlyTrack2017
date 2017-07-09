/**
 * Created by sabir on 20.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var moment = require('moment');

var BackgroundImageContainer = require('../../image/BackgroundImageContainer');
var SessionPreviewImagePanel = require('../../sessions/panels/SessionPreviewImagePanel');
var SessionPreviewPanel = require('../../sessions/panels/SessionPreviewPanel');

var PlaySessionWrapper = require('../buttons/PlaySessionWrapper');

var SessionOptimizationPanel = require('../../migration/SessionOptimizationPanel');

var CalendarHelper = require('../../../helpers/CalendarHelper');

var Dialog = require('../../dialog/Dialog');

var EditSessionWrapper = require('../edit/EditSessionWrapper');

var SpaceSessionWrapper = require('../../3d/SpaceSessionWrapper');

var SessionItem = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('SessionsStore')],
    getDefaultProps: function(){
        return {
            sessionId: undefined,
            defaultAvatar: 'assets/images/empty_ava_pilot.jpg',

            debug: false,

            onEditClick: function(){

            }

        }
    },

    getStateFromFlux: function(){
        var flux = this.getFlux();
        var store = flux.store('SessionsStore');
        return {
            loading: store.loading,
            session: store.getSession(this.props.sessionId)
        }
    },

    getInitialState: function(){
        return {

        }
    },

    componentWillReceiveProps: function(nextProps){

    },

    componentDidMount: function(){

    },

    componentStyle: {
        placeholder: {
            position: 'relative'
        }
    },

    isMe: function(){
        var session = this.state.session;
        var userId = session.userId;
        var store = this.getFlux().store('UsersStore');
        return store.isMe(userId);
    },

    render: function(){
        var session = this.state.session;
        if (session == undefined){
            return null;
        }
        var user = session.user;
        if (user == undefined){
            return null;
        }
        var cl = 'session_card ';
        var images = session.photos.map(function(ph){return ph.compressedUrl});
        var avatar = (user.avatar == undefined) ? this.props.defaultAvatar : user.avatar;
        var distance = (session.distance == undefined) ? 0 : session.distance;
        distance = distance / 1000.0;
        var isMe = this.isMe();

        return (
            <div style={this.componentStyle.placeholder} className={cl} >

                <div className={'session_card_header'} >

                    <div className={'user_info'} >
                        <div className={'avatar_placeholder'} >
                            <div className={'avatar'} >
                                <BackgroundImageContainer image={avatar} style={{borderRadius: 1000}} />
                            </div>
                        </div>

                        <div className={'session_card_info'} >
                            <div className={'user_name'} >
                                {user.firstName} {user.lastName}
                            </div>
                            <div className={'date'}>
                                {moment().format('YYYY') == moment(session.startTimestamp).format('YYYY') ?
                                    <span>
                                    {moment(session.startTimestamp).format('D MMM HH:mm')}
                                </span> :
                                    <span>
                                    {moment(session.startTimestamp).format('D MMM YYYY HH:mm')}
                                </span>
                                }

                            </div>
                        </div>

                    </div>

                </div>

                <div className={'session_card_content'} >
                    {session.name == undefined || session.name.trim() == '' ? null :
                        <div className={'session_name'} >
                            <PlaySessionWrapper sessionId={session.id} >
                                {session.name}
                            </PlaySessionWrapper>
                        </div>
                    }

                    {session.description == undefined ? null :
                        <div className={'session_description'} >
                            <div dangerouslySetInnerHTML={{__html: session.description.replace(/\n/g, '<br/>')}}></div>
                        </div>
                    }

                    <div className={'session_preview_panel'} >
                        <SessionPreviewImagePanel session={session} images={images} />
                    </div>

                </div>

                <div className={'session_card_footer'} >
                    <div className={'controls_placeholder'} >

                        {isMe == true ?
                            <div className={'edit_placeholder'} >
                                <EditSessionWrapper sessionId={session.id} >
                                    <span className={'edit_span'} >
                                        <i className={'icon pencil'} ></i> редактировать
                                    </span>
                                </EditSessionWrapper>
                            </div>
                            :
                            <div className={'like_placeholder'} >
                                <i className={'icon empty heart'} ></i>
                            </div>
                        }



                        <div className={'distance_placeholder'} >
                            <i className={'icon expand'} ></i> {Math.floor(10.0 * distance) / 10.0} км
                        </div>

                        <div className={'duration_placeholder'} >
                            <i className={'icon time'} ></i> {CalendarHelper.getDurationString(session.duration)}
                        </div>

                        <div className={'three_d_placeholder'} >
                            <SpaceSessionWrapper sessionId={session.id} level={10000} >
                                <button className={'ui mini primary button'} style={{paddingTop: 5, paddingBottom: 5}} >
                                    3D
                                </button>
                            </SpaceSessionWrapper>
                        </div>


                        {this.props.debug == false ? null :
                            <div>
                                sessionId={session.id} ; startTimestamp={session.startTimestamp} ;
                                <br/>
                                userId={session.userId} ;
                                <br/>
                                lastChunkNumber={session.lastChunkNumber} ; cachePointsNumber={session.cachePointsNumber}
                                <br/>
                                distance={session.distance}
                                <br/>
                                duration={session.duration}
                                <SessionOptimizationPanel startTimestamp={session.startTimestamp} userId={session.userId} />
                            </div>
                        }
                    </div>

                </div>


            </div>
        );
    }

});

module.exports = SessionItem;