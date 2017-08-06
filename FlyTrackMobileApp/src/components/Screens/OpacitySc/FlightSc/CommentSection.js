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
import CommentInput from './CommentInput'
import Comment from './Comment'

// Component
class CommentSection extends Component {
    render() {

        let { store, profiledata } = this.props;
        let flight = stab.flights[store.opacityStack[store.opacityStack.length - 1].data.flightId];

        return (
            <TouchableWithoutFeedback>
                <View style={{width: '100%', padding: '2%', marginTop: '2%', backgroundColor: mvConsts.appBackgroundColor, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                    <CommentInput commentmode={() => {this.props.commentmode()}} show={() => {this.props.show(0)}} />
                    {flight.comments.map((comment, index) => {
                        return (
                            <View style={{width: '100%', borderRadius: mvConsts.littleRadius, alignItems: 'center', }} key={index} >
                                <Comment index={index} />
                            </View>
                        )
                    })}
                </View>
            </TouchableWithoutFeedback>
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
export default connect(mapStateToProps)(CommentSection)