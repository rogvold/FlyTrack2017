/**
 * Created by mityabeldii on 15.06.2017.
 */

import  * as mvConsts from '../../../../constants/mvConsts'
import * as stab from '../../../../../stab.json'
const window = Dimensions.get('window');

// React
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Dimensions,
    Animated,
    Text,
    View,
    WebView,
    TextInput,
    Image,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TouchableHighlight,
    TouchableNativeFeedback,
} from 'react-native';
import moment from 'moment'

// Redux
import { connect } from 'react-redux';

// Components

// Component
class FlightTab extends Component {

    componentDidMount () {

    }

    render() {

        let {store, profiledata, session, user} = this.props;
        let avatarSide = window.height * 0.08;
        if (session == undefined || user == undefined){
            return null;
        }

        return (
            <View style={{width: '100%', backgroundColor: 'black', borderRadius: mvConsts.littleRadius + 2, alignItems: 'center', flexDirection: 'row', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }}>
                <TouchableOpacity style={{width: '100%', padding: '2%',
                backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.littleRadius, alignItems: 'center',
                flexDirection: 'row',  }}
                                  onPress={() => {this.props.opacityPush(this.props.index)}} >

                    <View style={{width: '18%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                        <Image
                            style={{width: avatarSide, height: avatarSide, borderRadius: avatarSide /2 , }}
                            source={{uri: user.avatar}}
                        />
                    </View>
                    <View style={{width: '80%', borderRadius: mvConsts.littleRadius, alignItems: 'center', flexDirection: 'column' }}>
                        <View style={{width: '100%', borderRadius: mvConsts.littleRadius, alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{width: '60%', padding: '0%', borderRadius: mvConsts.littleRadius, justifyContent: 'center', }}>
                                <Text style={{fontFamily: 'segoeui', fontSize: mvConsts.fontSizeMiddle, color: mvConsts.fontColorMain, }} >{user.firstName} {user.lastName}</Text>
                            </View>
                            <View style={{width: '40%', padding: '0%', borderRadius: mvConsts.littleRadius, justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{fontFamily: 'segoeui', fontSize: mvConsts.fontSizeMiddle * 0.8, color: mvConsts.fontColorSecondary, }} >
                                    {moment(session.startTimestamp).format('DD.MM.YYYY')}
                                </Text>
                            </View>
                        </View>
                        <View style={{width: '100%', borderRadius: mvConsts.littleRadius, alignItems: 'center', flexDirection: 'row', }}>
                            <View style={{width: '80%', borderRadius: mvConsts.littleRadius,}}>
                                <Text style={{fontFamily: mvConsts.fontFamilySemiBold, fontSize: mvConsts.fontSizeMiddle * 0.9, color: mvConsts.fontColorMain, justifyContent: 'center' }} >{session.name}</Text>
                            </View>
                            <View style={{width: '18%', borderRadius: mvConsts.littleRadius, justifyContent: 'center' }}>
                                <Text style={{fontFamily: 'segoeui', fontSize: mvConsts.fontSizeMiddle * 0.8, color: mvConsts.fontColorMain, }} >{0}{store.dictionary.km}</Text>
                            </View>
                        </View>
                </View>
                </TouchableOpacity>
            </View>
        );
    }
}

let getSession = (state, sessionId) => {
    if (sessionId == undefined){
        return undefined;
    }
    return state.sessions.sessionsMap.get(sessionId);
}

let getSessionUser = (state, sessionId) => {
    let session = getSession(state, sessionId);
    if (session == undefined){
        return undefined;
    }
    return state.users.usersMap.get(session.userId);
}

let mapStateToProps = (state, ownProps) => {
    return {
        store: state.store,
        profiledata: state.profiledata,

        session: getSession(state, ownProps.sessionId),
        user: getSessionUser(state, ownProps.sessionId)

    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        opacityPush: (sessionId) => {
            return dispatch({
                type: 'opacityPush',
                layerName: mvConsts.opacityLayers.flightSc,
                data: {sessionId: sessionId, flightId: sessionId},
            })
        },
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(FlightTab)