/**
 * Created by mityabeldii on 23.06.2017.
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
    FlatList,
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
class Picker extends Component {

    state = {
        search: "",
        newVariant: "",
        searchtop: new Animated.Value(-window.height * 0.2),
        tabtop: new Animated.Value(window.height),

    }

    move = (variable, index, duration) => {
        if (duration === undefined) duration = 1
        Animated.timing(
            variable,
            {
                toValue: -window.height * index,
                duration: mvConsts.animationOpcityScDuration * duration,
            }
        ).start()
    }

    show = () => {
        setTimeout(() => {this.move(this.state.searchtop, 0, 2)}, mvConsts.animationOpcityScDuration)
        this.move(this.state.tabtop, 0, 1)
    }

    hide = () => {
        this.move(this.state.searchtop, 0.2, 1)
        this.move(this.state.tabtop, -1, 1)
    }

    capitalization = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    search = (word, dictionary) => {
        
        let inclusion = (first, second) => {
            let firstCap = this.capitalization(first)
            let secondCap = this.capitalization(second)
            for (let i in first) {
                if (firstCap[i] !== secondCap[i])
                    return false
            }
            return true
        }

        let output = []

        for (let i in dictionary) {
            if (inclusion(word, dictionary[i])) {
                output.push(dictionary[i])
            }
        }


        // if (output.length === 0) output = dictionary

        return output

    }

    componentDidMount () {
        this.show();
    }

    backStep = () => {

        this.hide()
        setTimeout(() => {this.props.unmount()}, mvConsts.animationOpcityScDuration)

    }

    render() {

        let { store } = this.props;
        let dictionary = store.opacityStack[store.opacityStack.length - 1].data.array;
        let data = this.search(this.state.search, dictionary);
        let scrollJustify = 'center'
        if (data.length > 6) {
            scrollJustify = 'flex-start'
        }
        
        return (
            <View style={{width: window.width, height: window.height, justifyContent: 'center', alignItems: 'center'}}>

                <TouchableWithoutFeedback onPress={() => {this.backStep()}}>
                    <View style={{width: window.width, height: window.height, top: 0, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 0, }}>
                    </View>
                </TouchableWithoutFeedback>

                <View style={{width: '80%', height: window.height, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>

                    {
                        this.props.search ?
                            <Animated.View style={{width: '100%', top: this.state.searchtop, padding: window.height * 0.02, marginTop: window.height * 0.05, backgroundColor: mvConsts.appBackgroundColor, borderRadius: mvConsts.bigRadius, justifyContent: 'center', }}>
                                <TextInput
                                    placeholder={store.dictionary.search}
                                    style={{height: mvConsts.fontSizeMiddle * 1.5, fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 1.2, color: mvConsts.fontColorSecondary, }}
                                    keyboardAppearance={'dark'}
                                    returnKeyType={'search'}
                                    returnKeyLabel={'search'}
                                    onChangeText={(text) => {this.setState({search: text})}}
                                    value={this.state.search}
                                />
                            </Animated.View>
                            : null
                    }

                    <Animated.ScrollView
                        style={{width: '100%', top: this.state.tabtop }}
                        showsVerticalScrollIndicator={false}
                    >
                        <TouchableOpacity style={{width: '100%', height: '200%', marginTop: window.height * 0.008, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: scrollJustify }} onPress={() => {this.backStep()}} >
                            {
                                data.map((data, index) => {
                                return(
                                    <TouchableOpacity style={{width: '100%', padding: window.height * 0.02, opacity: 0.8, marginBottom: window.height * 0.008, backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.bigRadius, justifyContent: 'center', }} key={index} onPress={() => {store.opacityStack[store.opacityStack.length - 1].data.func(data); this.backStep()}} >
                                        <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 1.2, color: mvConsts.fontColorSecondary, }} >{this.capitalization(data)}</Text>
                                    </TouchableOpacity>
                                )
                            })
                            }

                            {
                                store.opacityStack[store.opacityStack.length - 1].data.editable ?
                                    <View style={{width: '100%', padding: window.height * 0.02, marginTop: window.height * 0.008, backgroundColor: mvConsts.appBackgroundColor, borderRadius: mvConsts.bigRadius, justifyContent: 'center', }}>
                                        <TextInput
                                            placeholder={store.dictionary.addvariant}
                                            style={{height: mvConsts.fontSizeMiddle * 1.2, fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 1.2, color: mvConsts.fontColorSecondary, }}
                                            keyboardAppearance={'dark'}
                                            onChangeText={(text) => {this.setState({newVariant: text})}}
                                            value={this.state.newVariant}
                                            returnKeyType={'done'}
                                            returnKeyLabel={'done'}
                                            onSubmitEditing={() => {store.opacityStack[store.opacityStack.length - 1].data.func(this.state.newVariant); this.backStep()}}
                                        />
                                    </View>
                                    : null
                            }
                        </TouchableOpacity>

                    </Animated.ScrollView>

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
export default connect(mapStateToProps)(Picker)