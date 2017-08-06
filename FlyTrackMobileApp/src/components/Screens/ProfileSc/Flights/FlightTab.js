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

        let { store, profiledata } = this.props;
        let avatarSide = window.height * 0.08;
        id = 0;

        return (
            <View style={{width: '100%', backgroundColor: 'black', borderRadius: mvConsts.littleRadius + 2, alignItems: 'center', flexDirection: 'row', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }}>
                <TouchableOpacity style={{width: '100%', padding: '2%', backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.littleRadius, alignItems: 'center', flexDirection: 'row',  }} onPress={() => {this.props.opacityPush(this.props.index)}} >
                    <View style={{width: '18%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                        <Image
                            style={{width: avatarSide, height: avatarSide, borderRadius: avatarSide /2 , }}
                            source={{uri: stab.users[id].uri}}
                        />
                    </View>
                    <View style={{width: '80%', borderRadius: mvConsts.littleRadius, alignItems: 'center', flexDirection: 'column' }}>
                        <View style={{width: '100%', borderRadius: mvConsts.littleRadius, alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{width: '60%', padding: '0%', borderRadius: mvConsts.littleRadius, justifyContent: 'center', }}>
                                <Text style={{fontFamily: 'segoeui', fontSize: mvConsts.fontSizeMiddle, color: mvConsts.fontColorMain, }} >{stab.users[id].name} {stab.users[id].surname}</Text>
                            </View>
                            <View style={{width: '40%', padding: '0%', borderRadius: mvConsts.littleRadius, justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{fontFamily: 'segoeui', fontSize: mvConsts.fontSizeMiddle * 0.8, color: mvConsts.fontColorSecondary, }} >{moment(stab.flights[this.props.index].startDate).format('DD.MM.YYYY')}</Text>
                            </View>
                        </View>
                        <View style={{width: '100%', borderRadius: mvConsts.littleRadius, alignItems: 'center', flexDirection: 'row', }}>
                            <View style={{width: '80%', borderRadius: mvConsts.littleRadius,}}>
                                <Text style={{fontFamily: mvConsts.fontFamilySemiBold, fontSize: mvConsts.fontSizeMiddle * 0.9, color: mvConsts.fontColorMain, justifyContent: 'center' }} >{stab.flights[this.props.index].name}</Text>
                            </View>
                            <View style={{width: '18%', borderRadius: mvConsts.littleRadius, justifyContent: 'center' }}>
                                <Text style={{fontFamily: 'segoeui', fontSize: mvConsts.fontSizeMiddle * 0.8, color: mvConsts.fontColorMain, }} >{stab.flights[this.props.index].distance}{store.dictionary.km}</Text>
                            </View>
                        </View>
                </View>
                </TouchableOpacity>
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

let mapDispatchToProps = (dispatch) => {
    return {
        opacityPush: (index) => {
            return dispatch({
                type: 'opacityPush',
                layerName: mvConsts.opacityLayers.flightSc,
                data: {flightId: index},
            })
        },
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(FlightTab)