/**
 * Created by mityabeldii on 15.06.2017.
 */

import * as mvConsts from '../../../constants/mvConsts'
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

// Redux
import { connect } from 'react-redux';

// Components
import MVButton from '../ProfileSc/MVButton'
import MVPicker from './MVPicker'
import MapViewButtons from './MapViewButtons'
import RadiusSetters from './RadiusSetters'
import LanguageSetter from './LanguageSetter'

import * as usersActions from '../../../redux/actions/UsersActions'

import CurrentUserGPSPanel from '../../gps/panels/CurrentUserGPSPanel'

// Component
class SettingsSc extends Component {

    state = {
        mapType: this.props.session.mapType,
    }

    goTo = (value) => {
        this.refs.ScrollView.scrollTo({x: 0, y: window.height * value, animated: true})
    }

    openPicker = () => {
        this.props.opacityPush(mvConsts.mapTypes, (value) => {this.setState({mapType: value}); this.props.changeMapType(value);})
    }

    componentDidMount () {

    }

    render() {

        let { store, session, user, currentAircraft} = this.props;

        let MapType = (
            <View style={{width: '100%', padding: '2%', marginBottom: window.height * 0.02, backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }}>
                <View style={{width: '100%',padding: '2%', borderRadius: mvConsts.littleRadius, justifyContent: 'center', }}>
                    <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.fontColorMain, }} >{store.dictionary.maptype}</Text>
                </View>
                <View style={{width: '100%',padding: '2%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                    <MVPicker placeholder={store.dictionary.maptype} defaultValue={this.state.mapType} array={mvConsts.mapTypes} returnValue={(value) => {this.setState({mapType: value}); this.props.changeMapType(value)}} editable={false} search={false} />
                </View>
            </View>
        )

        let SignOut = (
            <TouchableOpacity style={{width: '100%', height: window.height * 0.1, marginBottom: window.height * 0.02, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }} onPress={() => {this.props.logout()}} >
                <MVButton text={store.dictionary.signout} style={mvConsts.buttonStyles.reject} />
            </TouchableOpacity>
        )
        return (
            <View style={{width: '100%', height: '100%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                <ScrollView
                    style={{width: '100%', height: '100%', borderRadius: mvConsts.littleRadius, }}
                    showsVerticalScrollIndicator={false}
                    ref="ScrollView"
                >

                    <View style={{width: '100%', padding: '2%', marginBottom: window.height * 0.02, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{fontFamily: mvConsts.fontFamilySemiBold, fontSize: mvConsts.fontSizeMiddle * 1.5, color: mvConsts.fontColorMain, }} >{store.dictionary.settings}</Text>
                    </View>

                    {MapType}

                    <MapViewButtons goTo={(value) => {this.goTo(value)}} />

                    <RadiusSetters/>

                    <LanguageSetter />

                    <View style={{paddingTop: 5, paddingBottom: 5, flexDirection: 'row'}} >
                        <Text style={{flex: 1, textAlign: 'center'}} >
                            {user.firstName} {user.lastName}
                        </Text>
                        <Text style={{fontWeight: 'bold', flex: 1, textAlign: 'center'}} >
                            {user.email}
                        </Text>
                    </View>
                    {currentAircraft == undefined ? null :
                        <View style={{paddingTop: 5, paddingBottom: 5, flexDirection: 'row'}} >
                            <Text style={{flex: 1, textAlign: 'center'}} >
                                {currentAircraft.name} | {currentAircraft.callName} | {currentAircraft.number} | {currentAircraft.aircraftType}
                            </Text>
                        </View>
                    }

                    {SignOut}

                    <CurrentUserGPSPanel />

                </ScrollView>
            </View>
        );
    }
}

// Redux Store
let mapStateToProps = (state) => {
    return {
        store: state.store,
        session: state.session,

        user: state.users.usersMap.get(state.users.currentUserId),
        currentAircraft: state.aircrafts.aircraftsMap.get(state.aircrafts.selectedAircraftId)

    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            return dispatch(usersActions.logOut())
            // return dispatch({
            //     type: 'logout'
            // })
        },
        opacityPush: (array, func) => {
            return dispatch({
                type: 'opacityPush',
                layerName: 'picker',
                data: {array, func, editable: true, search: true,},

            })
        },
        changeMapType: (mapType) => {
            return dispatch({
                type: 'changeMapType',
                mapType: mapType,
            })
        },
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(SettingsSc)