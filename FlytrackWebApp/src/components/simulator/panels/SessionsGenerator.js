/**
 * Created by sabir on 20.06.17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class SessionsGenerator extends React.Component {

    static defaultProps = {}

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
            <div>

            </div>
        )
    }

}


const mapStateToProps = (state) => {
   return {

   }
}

const mapDispatchToProps = (dispatch) => {
   return {

   }
}

SessionsGenerator = connect(mapStateToProps, mapDispatchToProps)(SessionsGenerator)

export default SessionsGenerator