/**
 * Created by mityabeldii on 03.07.2017.
 */

import * as mvConsts from '../../../../constants/mvConsts'
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
import MVButton from '../../ProfileSc/MVButton'

// Component
class Ruler extends Component {

    state = {
        opacity: new Animated.Value(0)
    }

    show = () => {
        mvConsts.animationaction(this.state.opacity, 1, 1)
    }

    hide = () => {
        mvConsts.animationaction(this.state.opacity, 0, 1)
    }

    backStep = () => {
        this.hide()
        this.props.backStep()
    }

    componentDidMount () {
        this.show()
    }

    render() {

        let { store, profiledata } = this.props;

        return (
            <Animated.View style={{width: '100%', height: '100%', backgroundColor: 'transparent', opacity: this.state.opacity, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>

                <View style={{width: window.width * 0.8, height: 1, top: ((window.height * 0.8) - 1) * 0, backgroundColor: 'white', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', position: 'absolute', }} />
                <View style={{width: window.width * 0.6, height: 1, top: ((window.height * 0.8) - 1) * 0.25, backgroundColor: 'white', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', position: 'absolute', }} />
                <View style={{width: window.width * 0.8, height: 1, top: ((window.height * 0.8) - 1) * 0.5, backgroundColor: 'white', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', position: 'absolute', }} />
                <View style={{width: window.width * 0.6, height: 1, top: ((window.height * 0.8) - 1) * 0.75, backgroundColor: 'white', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', position: 'absolute', }} />
                <View style={{width: window.width * 0.8, height: 1, top: ((window.height * 0.8) - 1) * 1, backgroundColor: 'white', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', position: 'absolute', }} />

                <Text style={{left: window.width * 0.01, top: ((window.height * 0.8) - 1) * 0, fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: 'white', position: 'absolute', }} >+100</Text>
                <Text style={{left: window.width * 0.01, top: ((window.height * 0.8) - 1) * 0.25 - mvConsts.fontSizeMiddle * 0.8, fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: 'white', position: 'absolute', }} >+50</Text>
                <Text style={{left: window.width * 0.01, top: ((window.height * 0.8) - 1) * 0.5 - mvConsts.fontSizeMiddle * 1.5, fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: 'white', position: 'absolute', }} >0</Text>
                <Text style={{left: window.width * 0.01, top: ((window.height * 0.8) - 1) * 0.75 - mvConsts.fontSizeMiddle * 0.8, fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: 'white', position: 'absolute', }} >-50</Text>
                <Text style={{left: window.width * 0.01, top: ((window.height * 0.8) - 1) * 1 - mvConsts.fontSizeMiddle * 1.5, fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: 'white', position: 'absolute', }} >-100</Text>

                <TouchableOpacity style={{width: window.width * 0.95, height: window.height * 0.12, top: window.height * 0.82, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', position: 'absolute', }} onPress={() => {this.backStep()}} >
                    <MVButton text={store.dictionary.close} style={mvConsts.buttonStyles.reject} fontsizeK={2} />
                </TouchableOpacity>

            </Animated.View>
        );
    }
}

// Redux Store
let mapStateToProps = (state) => {
    return {
        store: state.store,
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
export default connect(mapStateToProps)(Ruler)