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

// Redux
import { connect } from 'react-redux';

// Components
import InnerTab from './InnerTab'
import MVButton from '../MVButton'

// Component
class MainTab extends Component {

    componentDidMount () {
        // this.props.goToPage(this.props.store.profileTab)
    }

    changeTab = (index) => {
        this.props.hide();
        setTimeout(() => {this.props.changeProfileTab(index)}, mvConsts.animationOpcityScDuration )
        setTimeout(this.props.show, mvConsts.animationOpcityScDuration)
    }

    render() {

        let {store, profiledata, user} = this.props;
        let avatarSide = Dimensions.get('window').height * 0.10;
        let innerTabWidth = window.width * 0.92 / mvConsts.profileTabs.length;
        let id = 0;
        let dataDeterminator = (index) => {
            let data = 0;
            for (let i in stab.users) {
                if (index === 0)
                    if (stab.users[i].following)
                        data++;
                if (index === 1)
                    if (stab.users[i].follower)
                        data++;
            }
            for (let i in stab.flights)
                if (index === 2)
                        data++;
            return data;
        }

        return (
            <View style={{width: '100%', padding: '2%', marginBottom: '2%', height: '30%', backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }}>
                <View style={{width: '100%', height: '49%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <View style={{width: '30%', height: '100%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            style={{width: avatarSide, height: avatarSide, borderRadius: avatarSide / 2,  }}
                            source={{uri: user.avatar}}
                        />
                    </View>
                    <View style={{width: '70%', height: '100%', borderRadius: mvConsts.littleRadius, justifyContent: 'center', flexDirection: 'column' }}>
                        <View style={{width: '100%', height: '60%', borderRadius: mvConsts.littleRadius, justifyContent: 'center', }}>
                            <Text style={{fontFamily: mvConsts.fontFamilySemiBold, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.fontColorMain, }} >{user.firstName} {user.lastName}</Text>
                        </View>
                        <View style={{width: '50%', height: '40%', backgroundColor: 'black', borderRadius: mvConsts.littleRadius + 2, alignItems: 'center', justifyContent: 'center', }}>
                            <TouchableOpacity style={{width: '100%', height: '100%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                                <MVButton text={store.dictionary.editprofile} style={mvConsts.buttonStyles.unpushed} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{width: '100%', height: '49%', marginTop: '2%', borderRadius: mvConsts.littleRadius, alignItems: 'center', flexDirection: 'row' }}>
                    {mvConsts.profileTabs.map((tab, index) => {
                        return (
                            <View style={{width: (window.width * 0.90 - 4) / mvConsts.profileTabs.length, marginRight: 2, height: '100%', backgroundColor: 'black', borderRadius: mvConsts.littleRadius + 7, alignItems: 'center', justifyContent: 'center' }} key={index}>
                                <TouchableOpacity style={{width: '100%', height: '100%', }} onPress={() => {this.changeTab(index)}}>
                                    <InnerTab index={index} data={dataDeterminator(index)}/>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            </View>
        );
    }
}

// Redux Store
let mapStateToProps = (state) => {
    return {
        store: state.store,
        profiledata: state.profiledata,

        user: state.users.usersMap.get(state.users.currentUserId)

    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        changeProfileTab: (index) => {
            return dispatch({
                type: 'changeProfileTab',
                index: index,
            })
        },
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(MainTab)