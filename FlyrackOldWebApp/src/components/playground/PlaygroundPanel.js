/**
 * Created by sabir on 06.09.16.
 */

var React = require('react');
var assign = require('object-assign');

var APIFunctionPanel = require('./panels/APIFunctionPanel');

var APIFactory = require('../../data/APIFactory');

var PlaygroundPanel = React.createClass({
    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentDidMount: function () {

    },

    componentStyle: {
        placeholder: {}
    },

    render: function () {
        var defaultHeaders = APIFactory.DEFAULT_HEADERS;

        return (
            <div style={this.componentStyle.placeholder}>

                <APIFunctionPanel name={APIFactory.SIGN_UP.name} description={APIFactory.SIGN_UP.description}
                                  parameters={APIFactory.SIGN_UP.parameters} headers={defaultHeaders.concat(APIFactory.SIGN_UP.headers)}
                    />

                <APIFunctionPanel name={APIFactory.SIGN_IN.name} description={APIFactory.SIGN_IN.description}
                                  parameters={APIFactory.SIGN_IN.parameters} headers={defaultHeaders.concat(APIFactory.SIGN_IN.headers)}
                    />

                <APIFunctionPanel name={APIFactory.GET_USER.name} description={APIFactory.GET_USER.description}
                                  parameters={APIFactory.GET_USER.parameters} headers={defaultHeaders.concat(APIFactory.GET_USER.headers)}
                    />


                <APIFunctionPanel name={APIFactory.UPDATE_USER.name} description={APIFactory.UPDATE_USER.description}
                                  parameters={APIFactory.UPDATE_USER.parameters} headers={defaultHeaders.concat(APIFactory.UPDATE_USER.headers)}
                    />

                <APIFunctionPanel name={APIFactory.GET_ALL_ORGANIZATIONS.name} description={APIFactory.GET_ALL_ORGANIZATIONS.description}
                                  parameters={APIFactory.GET_ALL_ORGANIZATIONS.parameters} headers={defaultHeaders.concat(APIFactory.GET_ALL_ORGANIZATIONS.headers)}
                    />

                <APIFunctionPanel name={APIFactory.CREATE_AIRCRAFT.name} description={APIFactory.CREATE_AIRCRAFT.description}
                                  parameters={APIFactory.CREATE_AIRCRAFT.parameters} headers={defaultHeaders.concat(APIFactory.CREATE_AIRCRAFT.headers)}
                    />

                <APIFunctionPanel name={APIFactory.UPDATE_AIRCRAFT.name} description={APIFactory.UPDATE_AIRCRAFT.description}
                                  parameters={APIFactory.UPDATE_AIRCRAFT.parameters} headers={defaultHeaders.concat(APIFactory.UPDATE_AIRCRAFT.headers)}
                    />

                <APIFunctionPanel name={APIFactory.DELETE_AIRCRAFT.name} description={APIFactory.DELETE_AIRCRAFT.description}
                                  parameters={APIFactory.DELETE_AIRCRAFT.parameters} headers={defaultHeaders.concat(APIFactory.DELETE_AIRCRAFT.headers)}
                    />

                <APIFunctionPanel name={APIFactory.LOAD_USER_AIRCRAFTS.name} description={APIFactory.LOAD_USER_AIRCRAFTS.description}
                                  parameters={APIFactory.LOAD_USER_AIRCRAFTS.parameters} headers={defaultHeaders.concat(APIFactory.LOAD_USER_AIRCRAFTS.headers)}
                    />


            </div>
        );
    }

});

module.exports = PlaygroundPanel;