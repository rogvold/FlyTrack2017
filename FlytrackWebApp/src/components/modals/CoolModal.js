/**
 * Created by sabir on 11.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class CoolModal extends React.Component {

    static defaultProps = {
        onClose: () => {
            console.log('defaultProps: close occured');
        },
        level: 1000
    }

    static propTypes = {}

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    render = () => {

        return (
            <div className={'cool_modal'} style={{zIndex: this.props.level}} >

                <div className={'cool_modal_inner_placeholder'} >

                    <div className={'cool_modal_overlay'} >

                    </div>

                    <div className={'cool_modal_content_placeholder'} >

                        <div className={'cool_modal_left'} >

                        </div>

                        <div className={'cool_modal_middle'} >
                            {this.props.children}
                        </div>

                        <div className={'cool_modal_right'} >

                            <div className={'close_button_placeholder'} onClick={() => {this.props.onClose()}} >
                                <i className={'icon remove'} ></i>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        )
    }

}


//const mapStateToProps = (state) => {
//    return {
//        currentUserId: state.users.currentUserId,
//        loading: state.users.loading
//    }
//}

//const mapDispatchToProps = (dispatch) => {
//    return {
//        onLogout: (data) => {
//            dispatch(actions.logOut())
//        }
//    }
//}

//CoolModal = connect(mapStateToProps, mapDispatchToProps)(CoolModal)

export default CoolModal