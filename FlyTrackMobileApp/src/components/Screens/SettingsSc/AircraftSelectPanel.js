/**
 * Created by sabir on 06.08.17.
 */
/**
 * Created by mityabeldii on 05.07.2017.
 */

import * as mvConsts from '../../../constants/mvConsts'
import * as dictionary from '../../../constants/dictionary'
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
import MVPicker from './MVPicker'

// Component
class AircraftSelectPanel extends Component {
    render() {

        let { store, profiledata } = this.props;
        let language = undefined
        for (let i in mvConsts.languages) {
            if (dictionary.dictionary(mvConsts.languages[i]) === store.dictionary) {
                language = mvConsts.languages[i]
            }
        }

        return (
            <View style={{width: '100%', padding: '2%', marginBottom: window.height * 0.02, backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }}>
                <View style={{width: '100%',padding: '2%', borderRadius: mvConsts.littleRadius, justifyContent: 'center', }}>
                    <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.fontColorMain, }} >{store.dictionary.aircraft}</Text>
                </View>
                <View style={{width: '100%',padding: '2%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                    <MVPicker
                        placeholder={store.dictionary.language}
                        defaultValue={language}
                        array={mvConsts.languages}
                        returnValue={(value) => {this.props.setLanguage(value)}}
                        editable={false}
                        search={false}
                    />
                </View>
            </View>
        );
    }
}

// Redux Store
let mapStateToProps = (state) => {
    return {
        store: state.store,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        setLanguage: (language) => {
            return dispatch({
                type: 'setLanguage',
                language: language,
            })
        },
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(AircraftSelectPanel)