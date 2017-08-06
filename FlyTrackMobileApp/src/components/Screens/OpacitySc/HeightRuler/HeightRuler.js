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
import Ruler from './Ruler'

// Component
class HeightRuler extends Component {

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
        setTimeout(() => {this.props.unmount()}, mvConsts.animationOpcityScDuration)
    }

    componentDidMount () {
        this.show()
    }

    render() {

        let { store, session } = this.props;

        let aircraftsInRuler = () => {
            let array = []
            array = mvConsts.aircraftsInRadius(session.aircrafts, session.myAircraftNumber, session.visibleRadius)

            let aircraftsInRuler1 = []
            let aircraftsInRuler2 = []
            let aircraftsInRuler3 = []
            let aircraftsInRuler4 = []

            for (let i in array) {
                let delta = array[i].altitude - session.aircrafts[session.myAircraftNumber].altitude
                    if ((delta < 100) && (delta >= 50)) {
                        aircraftsInRuler1.push(array[i])
                    }
                    if ((delta < 50) && (delta >= 0)) {
                        aircraftsInRuler2.push(array[i])
                    }
                    if ((delta < 0) && (delta >= -50)) {
                        aircraftsInRuler3.push(array[i])
                    }
                    if ((delta < -50) && (delta >= -100)) {
                        aircraftsInRuler4.push(array[i])
                    }
                }

            aircraftsInRuler1 = aircraftsInRuler1.sort((a, b) => {
                if ((a.altitude - session.aircrafts[session.myAircraftNumber].altitude) > (b.altitude - session.aircrafts[session.myAircraftNumber].altitude)) {
                    return 1
                } else {
                    return -1
                }
            })
            aircraftsInRuler2 = aircraftsInRuler2.sort((a, b) => {
                if ((a.altitude - session.aircrafts[session.myAircraftNumber].altitude) > (b.altitude - session.aircrafts[session.myAircraftNumber].altitude)) {
                    return 1
                } else {
                    return -1
                }
            })
            aircraftsInRuler3 = aircraftsInRuler3.sort((a, b) => {
                if ((a.altitude - session.aircrafts[session.myAircraftNumber].altitude) > (b.altitude - session.aircrafts[session.myAircraftNumber].altitude)) {
                    return -1
                } else {
                    return 1
                }
            })
            aircraftsInRuler4 = aircraftsInRuler4.sort((a, b) => {
                if ((a.altitude - session.aircrafts[session.myAircraftNumber].altitude) > (b.altitude - session.aircrafts[session.myAircraftNumber].altitude)) {
                    return -1
                } else {
                    return 1
                }
            })


            let aircraftsInRuler = [aircraftsInRuler1, aircraftsInRuler2, aircraftsInRuler3, aircraftsInRuler4,]
            
            return aircraftsInRuler
        }

        return (
            <Animated.View style={{width: window.width, height: window.height, opacity: this.state.opacity, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', }}>
                
                <View style={{width: window.width * 0.9, height: window.height * 0.9, borderRadius: mvConsts.littleRadius, justifyContent: 'center', }}>
                    <Ruler backStep={() => {this.backStep()}} />
                </View>

                    <ScrollView
                        style={{height: window.height * 0.8, top: window.height * 0.05, borderRadius: mvConsts.littleRadius, position: 'absolute', zIndex: 2, }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{height: window.height * 0.8, marginLeft: window.width * 0.15, borderRadius: mvConsts.littleRadius, justifyContent: 'center', }}>

                            {
                                aircraftsInRuler().map((array, index) => {
                                    return(
                                        <View style={{height: window.height * 0.2 - 1, marginBottom: 1, borderRadius: mvConsts.littleRadius, flexDirection: 'row', }} key={index} >
                                            {
                                                array.map((aircraft, index) => {
                                                    if (aircraft.number !== session.aircrafts[session.myAircraftNumber].number) {
                                                        let delta = aircraft.altitude - session.aircrafts[session.myAircraftNumber].altitude
                                                        let top = window.height * 0.12 * Math.abs((delta % 50) / 50)
                                                        if (delta >= 0) {
                                                            delta = "+" + delta
                                                            top = window.height * 0.12 - top - window.height * 0.018
                                                        }
                                                        return(
                                                            <View style={{top: top, height: window.height * 0.07,  backgroundColor: mvConsts.tabBackColor, padding: window.height * 0.01, margin: window.height * 0.01, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }} key={index} >
                                                                <Text style={{fontFamily: mvConsts.fontFamilySemiBold, fontSize: mvConsts.fontSizeMiddle * 1.2, color: mvConsts.fontColorMain, }} >{aircraft.name.toUpperCase()}</Text>
                                                                <View style={{padding: window.height * 0.008, marginLeft: window.width * 0.008, backgroundColor: mvConsts.selectedTabBackColor, borderRadius: mvConsts.littleRadius, alignItems: 'center', justifyContent: 'center',  }}>
                                                                    <Text style={{fontFamily: mvConsts.fontFamilyRegular, fontSize: mvConsts.fontSizeMiddle * 1.2, color: mvConsts.fontColorMain, }} >{delta}</Text>
                                                                </View>
                                                            </View>
                                                        )
                                                    }
                                                })
                                            }
                                        </View>
                                    )
                                })
                            }

                        </View>
                    </ScrollView>
                    
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
export default connect(mapStateToProps)(HeightRuler)