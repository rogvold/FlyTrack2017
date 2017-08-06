/**
 * Created by mityabeldii on 04.07.2017.
 */

import * as stab from '../../../../../stab.json'
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
import MVBackButton from '../../OpacitySc/FlightSc/MVBackButton'
import MVButton from '../../ProfileSc/MVButton'
import MVToggle from '../MapViewer/MVToggle'

// Component
class SessionEdit extends Component {

    state = {
        top: new Animated.Value(-window.height),
        name: this.props.name,
        closable: false,
    }

    show = () => {
        mvConsts.animationaction(this.state.top, 0, 1)
    }

    hide = () => {
        mvConsts.animationaction(this.state.top, -window.height, 1)
    }

    backStep = () => {
        this.hide()
        setTimeout(() => {this.props.unmount()}, mvConsts.animationOpcityScDuration)
    }

    componentDidMount() {
        this.show()
        let {store} = this.props
        if (store.opacityStack[store.opacityStack.length - 1].data.flightId !== undefined) {
            this.setState({
                closable: true,
                name: stab.flights[store.opacityStack[store.opacityStack.length - 1].data.flightId].name,
            })
        }
    }

    render() {

        let { store, session } = this.props;

        let duration = undefined
        let distance = undefined
        let photos

        if (store.opacityStack[store.opacityStack.length - 1].data.flightId !== undefined) {
            let flight = stab.flights[store.opacityStack[store.opacityStack.length - 1].data.flightId]
            duration = ((flight.endDate - flight.startDate)/60000).toFixed(0);
            distance = flight.distance
            photos = flight.photos
        } else {
            duration = ((session.endDate - session.startDate)/60000).toFixed(0);
            distance = mvConsts.trackDistane(session.aircrafts[session.myAircraftNumber].track).toFixed(2)
            photos = session.photos
        }

        let avatarSide = window.height * 0.08;
        let hours = Math.trunc(duration / 60);
        let minutes = duration % 60;
        if (minutes === 0) minutes = '00';
        let innerTabData = [
            distance,
            hours + ':' + minutes,
            {
                type: mvConsts.aircraftTypes.plane,
                model: 'ICARUS C63B'
            }
        ]
        let id = 0;
        let photoWidth = window.width * 0.8;
        let photoHeight = window.height * 0.3;
        let iconSide = window.height * 0.04;

        return (
            <Animated.View style={{width: '100%', height: '100%', top: this.state.top, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>

                {
                    this.state.closable ?
                        <MVBackButton backStep={() => {this.backStep()}} hidemode={!this.state.closable}/>
                        : null
                }

                {
                    this.state.closable ?
                        <TouchableWithoutFeedback onPress={() => {this.backStep()}} >
                            <View style={{width: '100%', height: '100%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 0, }}>

                            </View>
                        </TouchableWithoutFeedback>
                        : null
                }

                <View style={{width: window.width * 0.9, padding: window.height * 0.01, backgroundColor: mvConsts.appBackgroundColor, borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center', }}>

                    <View style={{width: '100%', padding: '2%', marginBottom: '2%', backgroundColor: mvConsts.tabBackColor, borderRadius: mvConsts.bigRadius, alignItems: 'center', flexDirection: 'column', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }}>
                        <View style={{width: '100%', marginLeft: '2%', borderRadius: mvConsts.bigRadius, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', }}>
                            <Image
                                style={{width: avatarSide, height: avatarSide, borderRadius: avatarSide / 2 }}
                                source={{uri: stab.users[id].uri }}
                            />
                            <View style={{width: '80%', marginLeft: '2%', borderWidth: 1, borderColor: mvConsts.fontColorSecondary, borderRadius: mvConsts.bigRadius, justifyContent: 'center',}}>
                                <TextInput
                                    placeholder={store.dictionary.enternameoftheflight}
                                    style={{height: mvConsts.fontSizeMiddle * 2, padding: window.height * 0.01, fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle, color: mvConsts.fontColorMain, }}
                                    keyboardAppearance={"dark"}
                                    multiline={false}
                                    underlineColorAndroid={'rgba(255, 255, 255, 0)'}
                                    value={this.state.name}
                                    onChangeText={(text) => {this.setState({name: text});}}
                                />
                            </View>
                        </View>
                        <View style={{width: '100%', marginTop: '2%', borderRadius: mvConsts.bigRadius, alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{width: window.width * 0.8 / 3, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                                <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 1.2, color: mvConsts.fontColorMain, }} >{innerTabData[0]}{store.dictionary.km}</Text>
                            </View>
                            <View style={{width: window.width * 0.8 / 3, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                                <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 1.2, color: mvConsts.fontColorMain, }} >{innerTabData[1]}</Text>
                            </View>
                            <View style={{width: window.width * 0.8 / 3, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                                <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 0.8, color: mvConsts.fontColorMain, textAlign: 'center', }} >{innerTabData[2].model}</Text>
                            </View>
                        </View>
                        <View style={{width: '100%', borderRadius: mvConsts.bigRadius, alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{width: window.width * 0.8 / 3, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                                <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 0.7, color: mvConsts.fontColorSecondary, }} >{store.dictionary.distance}</Text>
                            </View>
                            <View style={{width: window.width * 0.8 / 3, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                                <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 0.7, color: mvConsts.fontColorSecondary, }} >{store.dictionary.duration}</Text>
                            </View>
                            <View style={{width: window.width * 0.8 / 3, borderRadius: mvConsts.bigRadius, alignItems: 'center', }}>
                                <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 0.7, color: mvConsts.fontColorSecondary, }} >{innerTabData[2].type}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{height: photoHeight, marginBottom: '2%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                        <ScrollView
                            horizontal={true}
                            style={{width: window.width * 0.88, height: photoHeight }}
                            showsHorizontalScrollIndicator={false}
                        >

                            <TouchableOpacity style={{width: photoWidth, height: photoHeight, marginLeft: window.width * 0.02, borderRadius: mvConsts.bigRadius, alignItems: 'center', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }} onPress={() => {}} >
                                <Image
                                    style={{width: photoWidth, height: photoHeight, borderRadius: mvConsts.bigRadius, }}
                                    source={{uri: "https://pp.userapi.com/c840133/v840133090/bc3f/QjxDt6Se2Ms.jpg"}}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={{width: photoWidth, height: photoHeight, backgroundColor: mvConsts.selectedTabBackColor, marginLeft: window.width * 0.02, borderRadius: mvConsts.bigRadius, alignItems: 'center', justifyContent: 'center', shadowColor: mvConsts.shadowColor, shadowRadius: mvConsts.shadowRadius, shadowOpacity: mvConsts.shadowOpacity, shadowOffset: mvConsts.shadowOffset, }} onPress={() => {}} >
                                <Image
                                    style={{width: window.width * 0.3, height: window.width * 0.3, borderRadius: mvConsts.bigRadius, }}
                                    source={require('../../../../../assets/Icons2/picture.png')}
                                />
                            </TouchableOpacity>

                            {
                                photos.map((photo, index) => {
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

                    <View style={{width: '100%', borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
                        <TouchableOpacity style={{width: '78%', height: window.height * 0.08, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }} onPress={() => {this.backStep()}} >
                            <MVButton style={mvConsts.buttonStyles.accept} text={store.dictionary.save} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: '20%', height: window.height * 0.08, marginLeft: '2%', backgroundColor: mvConsts.buttonRejectColor, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }} onPress={() => {this.backStep()}} >
                            <Image
                                style={{width: iconSide, height: iconSide, }}
                                source={require('../../../../../assets/Icons2/rubbish.png')}
                            />
                        </TouchableOpacity>
                    </View>

                </View>

            </Animated.View>
        );
    }
}

// Redux Store
let mapStateToProps = (state) => {
    return {
        store: state.store,
        session: state.session,
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
export default connect(mapStateToProps)(SessionEdit)