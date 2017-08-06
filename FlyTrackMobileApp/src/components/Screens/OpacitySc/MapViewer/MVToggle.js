/**
 * Created by mityabeldii on 01.07.2017.
 */

import * as mvConsts from '../../../../constants/mvConsts'
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
class MVToggle extends Component {

    // Require:
    //  - defaultToggle(bool)
    //  - onTrue  = () => {}
    //  - onFalse = () => {}

    static defaultProps = {
        value: false,
    };

    state = {
        color: new Animated.Value(0),
        left: new Animated.Value(0),
    }

    animation = (variable, value) => {
        Animated.timing(
            variable,
            {
                toValue: value,
                duration: mvConsts.animationOpcityScDuration * 0.75,
            }
        ).start()
    }

    changeToggle = () => {
        if (this.props.value) {
            this.props.onFalse()
        } else {
            this.props.onTrue()
        }

    }

    componentWillReceiveProps (newProps) {
        if (newProps.value) {
            this.animation(this.state.color, 1)
            this.animation(this.state.left, mvConsts.bigRadius * 3.5 )
        } else {
            this.animation(this.state.color, 0)
            this.animation(this.state.left, mvConsts.bigRadius * 0.5 )
        }
    }

    componentDidMount () {
        if (this.props.value) {
            this.animation(this.state.color, 1)
            this.animation(this.state.left, mvConsts.bigRadius * 3.5 )
        } else {
            this.animation(this.state.color, 0)
            this.animation(this.state.left, mvConsts.bigRadius * 0.5 )
        }
    }

    render() {

        let { store, profiledata } = this.props;

        let color = this.state.color.interpolate({
            inputRange: [0, 1],
            outputRange: [mvConsts.appBackgroundColor, mvConsts.buttonAcceptColor]
        });

        return (
            <TouchableWithoutFeedback onPress={() => {this.changeToggle()}} >
                <Animated.View style={{width: mvConsts.bigRadius * 6, height: mvConsts.bigRadius * 3, backgroundColor: color, borderRadius: mvConsts.bigRadius * 1.5, alignItems: 'center', justifyContent: 'center', }}>
                    <Animated.View style={{width: mvConsts.bigRadius * 2, height: mvConsts.bigRadius * 2, left: this.state.left, backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.littleRadius * 2, alignItems: 'center', justifyContent: 'center', position: 'absolute', }}>

                    </Animated.View>
                </Animated.View>
            </TouchableWithoutFeedback>
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
export default connect(mapStateToProps)(MVToggle)