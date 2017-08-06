/**
 * Created by mityabeldii on 17.06.2017.
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
import MVButton from '../../ProfileSc/MVButton'


// Component
class CommentInput extends Component {

    state = {
        text: '',
    }

    render() {

        let { store, profiledata } = this.props;
        let buttonSide = window.height * 0.04;
        let numberOfLines = () => {
            let number = Math.trunc(this.state.text.length / 25) + 2;
            return (Math.min(number, 5))
        }

        return (
           <View style={{width: window.width * 0.84, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
               <View style={{width: window.width * 0.62, padding: window.height * 0.005, backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }}>
                   <TextInput
                       placeholder={store.dictionary.addcomment}
                       style={{width: window.width * 0.6, padding: '2%', fontSize: mvConsts.fontSizeMiddle * 0.9, fontFamily: mvConsts.fontFamilyRegular, color: mvConsts.fontColorMain, justifyContent: 'center', }}
                       multiline={true}
                       numberOfLines={numberOfLines()}
                       autoCapitalize={'sentences'}
                       keyboardAppearance={'dark'}
                       underlineColorAndroid={'white'}
                       placeholderTextColor={mvConsts.fontColorSecondary}
                       onFocus={() => {this.props.commentmode()}}
                       onEndEditing={() => {this.props.show()}}
                       onSubmitEditing={() => {this.props.show()}}
                       value={this.state.text}
                       onChangeText={(text) => {this.setState({text});}}
                   />
               </View>
               <TouchableOpacity style={{width: window.width * 0.2, height: mvConsts.fontSizeMiddle * 2, marginLeft: window.width * 0.02, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }}>
                   <MVButton text={store.dictionary.send} style={mvConsts.buttonStyles.accept} />
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
export default connect(mapStateToProps)(CommentInput)