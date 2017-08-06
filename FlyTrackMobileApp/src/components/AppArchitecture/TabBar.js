/**
 * Created by mityabeldii on 15.06.2017.
 */

import * as mvConsts from '../../constants/mvConsts'

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
class TabBar extends Component {

    iconDeterminator = (index) => {
        switch (index) {
            case 1:
                return require('../../../assets/Icons2/employee.png')
            case 2:
                return require('../../../assets/Icons2/maps-and-flags.png')
            case 3:
                return require('../../../assets/Icons2/chat.png')
            case 4:
                return require('../../../assets/Icons2/settings.png')
        }
    }

    radiusDeterminator = (index, corner) => {
        if ((index === 1) && (corner === 0))
            return mvConsts.littleRadius
        else
            if ((index === 4) && (corner === 1))
                return mvConsts.littleRadius
            else
                return 0;
    }

    colorDeterminator = (index) => {
        let { store, profiledata } = this.props;
        if (mvConsts.screens[index] === store.screenName)
            return mvConsts.selectedTabBackColor;
        else
            return mvConsts.tabBackColor;
    }

    render() {

        let { store, profiledata } = this.props;
        let iconSide = Dimensions.get('window').height * 0.08 * 0.63

        return (
            <View style={{width: '100%', height: '100%', backgroundColor: 'white', borderBottomLeftRadius: mvConsts.littleRadius, borderBottomRightRadius: mvConsts.littleRadius, alignItems: 'center', flexDirection: 'row', }}>
                {mvConsts.screens.map((screenNamem, index) => {
                    if ((index > 0) && (index < 5))
                        return (
                            <View style={{width: Dimensions.get('window').width / 4, height: '100%', backgroundColor: 'black', alignItems: 'center', borderBottomLeftRadius: this.radiusDeterminator(index, 0), borderBottomRightRadius: this.radiusDeterminator(index, 1) }} key={index} >
                                <TouchableOpacity style={{width: '100%', height: '100%', backgroundColor: this.colorDeterminator(index), alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: this.radiusDeterminator(index, 0), borderBottomRightRadius: this.radiusDeterminator(index, 1) }} onPress={() => {this.props.openSc(mvConsts.screens[index])}}>
                                    <Image
                                        style={{width: iconSide, height: iconSide,}}
                                        source={this.iconDeterminator(index)}
                                    />
                                </TouchableOpacity>
                            </View>
                        )
                })}
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
        openSc: (screenName) => {
            return dispatch({
                type: 'openSc',
                screenName: screenName
            })
        },
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(TabBar)