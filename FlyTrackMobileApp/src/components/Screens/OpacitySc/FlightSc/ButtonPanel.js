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
import ButtonForPanel from './ButtonForPanel'

// Component
class ButtonPanel extends Component {

    onEdit = () => {
        let {store} = this.props
        this.props.hide();
        setTimeout(() => {
            this.props.opacityPush(mvConsts.opacityLayers.sessionedit, {flightId: store.opacityStack[store.opacityStack.length - 1].data.flightId})
        }, mvConsts.animationOpcityScDuration)
    }

    render() {

        let { store, profiledata } = this.props;


        return (
            <View style={{width: '100%', backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.bigRadius, alignItems: 'center', flexDirection: 'row', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset,}}>
                <ButtonForPanel type={mvConsts.buttonPanel.like} panelType={this.props.panelType} data={1}  />
                <TouchableOpacity onPress={() => {this.props.onComment()}}>
                    <ButtonForPanel type={mvConsts.buttonPanel.comments} panelType={this.props.panelType} data={1} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.onEdit()}}>
                    <ButtonForPanel type={mvConsts.buttonPanel.edit} panelType={this.props.panelType} />
                </TouchableOpacity>
                <ButtonForPanel type={mvConsts.buttonPanel.share} panelType={this.props.panelType} />
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
        opacityPush: (layerName, data) => {
            return dispatch({
                type: 'opacityPush',
                layerName: layerName,
                data: data,
            })
        },
    }
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(ButtonPanel)