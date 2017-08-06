/**
 * Created by mityabeldii on 28.06.2017.
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

// Component
class MVPicker extends Component {

    // this.props:
    //  - array
    //  - returnValue()
    //  - editable
    //  - search
    //  - 1placeholder


    state = {
        text: this.props.defaultValue,
    }

    openPicker = () => {
        this.props.opacityPush(this.props.array, (value) => {this.setState({text: value});  this.props.returnValue(value);}, this.props.editable, this.props.search)
    }

    render() {

        let { store, profiledata } = this.props;
        let inputHeight = mvConsts.fontSizeMiddle * 1.2;

        return (
            <View style={{width: '100%', height: mvConsts.fontSizeMiddle * 2.2, borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
                <TouchableOpacity style={{width: '80%', height: '100%', paddingLeft: '2%', borderWidth: 1, borderColor: mvConsts.fontColorSecondary, borderRadius: mvConsts.bigRadius, justifyContent: 'center', }} onPress={() => {this.openPicker()}} >
                    <TextInput
                        placeholder={this.props.placeholder}
                        placeholderTextColor={mvConsts.fontColorSecondary}
                        multiline={false}
                        numberOfLines={1}
                        underlineColorAndroid={'transparent'}
                        style={{width: '98%', height: inputHeight, color: mvConsts.fontColorMain, fontSize: mvConsts.fontSizeMiddle * 0.9, }}
                        keyboardAppearance={'dark'}
                        keyboardType={'default'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({text: text,})}
                        value={this.state.text}
                        editable={false}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{width: '18%', height: '100%', marginLeft: '2%', borderWidth: 1, borderColor: mvConsts.fontColorSecondary, borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center', }} onPress={() => {this.openPicker()}} >
                    <Image
                        style={{width: inputHeight * 0.8, height: inputHeight * 0.8, }}
                        source={require('../../../../assets/Icons2/down-arrow.png')}
                    />
                </TouchableOpacity>
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
        opacityPush: (array, func, editable, search) => {
            return dispatch({
                type: 'opacityPush',
                layerName: 'picker',
                data: {array, func, editable: editable, search: search,},

            })
        },
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(MVPicker)