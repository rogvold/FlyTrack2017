/**
 * Created by mityabeldii on 17.06.2017.
 */

// Shadow props
// shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset,

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

// Component
class UpperTab extends Component {
    render() {

        let { store, profiledata } = this.props;
        let avatarSide = window.height * 0.08;
        let flight = stab.flights[store.opacityStack[store.opacityStack.length - 1].data.flightId]
        let duration = (flight.endDate - flight.startDate)/60000;
        let hours = Math.trunc(duration / 60);
        let minutes = duration % 60;
        if (minutes === 0) minutes = '00';
        let innerTabData = [
            flight.distance,
            hours + ':' + minutes,
            {
                type: mvConsts.aircraftTypes.plane,
                model: 'ICARUS C63B'
            }
        ]
        let id = 0;

        return (
            <View style={{width: '100%', padding: '2%', marginBottom: '2%', backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.bigRadius, alignItems: 'center', flexDirection: 'column', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }}>
                <View style={{width: '100%', marginLeft: '2%', borderRadius: mvConsts.bigRadius, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', }}>
                    <Image
                        style={{width: avatarSide, height: avatarSide, borderRadius: avatarSide / 2 }}
                        source={{uri: stab.users[id].uri }}
                    />
                    <View style={{width: '80%', marginLeft: '2%', borderRadius: mvConsts.bigRadius, justifyContent: 'center',}}>
                        <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.fontColorMain, }} >{flight.name}</Text>
                    </View>
                </View>
                <View style={{width: '100%', marginTop: '2%', borderRadius: mvConsts.bigRadius, alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{width: window.width * 0.8 / 3, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                        <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 1.2, color: mvConsts.fontColorMain, }} >{innerTabData[0]}{store.dictionary.km}</Text>
                    </View>
                    <View style={{width: window.width * 0.8 / 3, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                        <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 1.2, color: mvConsts.fontColorMain, }} >{innerTabData[1]}</Text>
                    </View>
                    <View style={{width: window.width * 0.8 / 3, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                        <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 0.8, color: mvConsts.fontColorMain, textAlign: 'center', }} >{innerTabData[2].model}</Text>
                    </View>
                </View>
                <View style={{width: '100%', borderRadius: mvConsts.bigRadius, alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{width: window.width * 0.8 / 3, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                        <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 0.7, color: mvConsts.fontColorSecondary, }} >{store.dictionary.distance}</Text>
                    </View>
                    <View style={{width: window.width * 0.8 / 3, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                        <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 0.7, color: mvConsts.fontColorSecondary, }} >{store.dictionary.duration}</Text>
                    </View>
                    <View style={{width: window.width * 0.8 / 3, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                        <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 0.7, color: mvConsts.fontColorSecondary, }} >{innerTabData[2].type}</Text>
                    </View>
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
    }
};

// let mapDispatchToProps = (dispatch) => {
//     return {
//         Authorize: () => {
//             return dispatch({
//                 type: 'Authorize'
//             })
//         },
//     }
// }

// Export
export default connect(mapStateToProps)(UpperTab)