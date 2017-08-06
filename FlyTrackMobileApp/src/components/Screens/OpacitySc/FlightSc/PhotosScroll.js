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

// Component
class PhotosScroll extends Component {

    componentDidMount () {

    }

    render() {

        let { store, profiledata } = this.props;
        let photoWidth = window.width * 0.8;
        let photoHeight = window.height * 0.3;

        let openMap = () => {
            setTimeout(() => {
                this.props.opacityPush(mvConsts.opacityLayers.mapViewer, {flightId: store.opacityStack[store.opacityStack.length - 1].data.flightId})
            }, mvConsts.animationOpcityScDuration)
        }

        let openPhotos = (index) => {
            setTimeout(() => {
                this.props.opacityPush(mvConsts.opacityLayers.photoViewer, {flightId: store.opacityStack[store.opacityStack.length - 1].data.flightId, photo: index})
            }, mvConsts.animationOpcityScDuration)
        }

        return (
            <View style={{height: photoHeight, marginBottom: '2%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                <ScrollView
                    horizontal={true}
                    style={{width: window.width * 0.88, height: photoHeight }}
                    showsHorizontalScrollIndicator={false}
                >
                    <TouchableOpacity style={{width: photoWidth, height: photoHeight, marginLeft: window.width * 0.02, borderRadius: mvConsts.bigRadius, alignItems: 'center', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }} onPress={() => {openMap()}} >
                        <Image
                            style={{width: photoWidth, height: photoHeight, borderRadius: mvConsts.bigRadius, }}
                            source={{uri: stab.flights[store.opacityStack[store.opacityStack.length - 1].data.flightId].mapcover}}
                        />
                    </TouchableOpacity>

                    {
                        stab.flights[store.opacityStack[store.opacityStack.length - 1].data.flightId].photos.map((photo, index) => {
                            return(
                                <TouchableOpacity style={{width: photoWidth, height: photoHeight, marginLeft: window.width * 0.02, borderRadius: mvConsts.bigRadius, alignItems: 'center', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }} key={index} onPress={() => {openPhotos(index)}} >
                                    <Image
                                        style={{width: photoWidth, height: photoHeight, borderRadius: mvConsts.bigRadius, }}
                                        source={{uri: photo}}
                                    />
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(PhotosScroll)