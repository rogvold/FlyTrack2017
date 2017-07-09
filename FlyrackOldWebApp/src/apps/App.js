/**
 * Created by sabir on 20.06.16.
 */

var React = require('react');
var assign = require('object-assign');
var ReactDOM = require('react-dom');

//router
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute;
var createHashHistory = require('history').createHashHistory;


//apps
var LoginApp = require('./guest/LoginApp');
var APIPlaygroundApp = require('./guest/APIPlaygroundApp');

var UserIndexApp = require('./user/UserIndexApp');
var DispatcherIndexApp = require('./user/DispatcherIndexApp');
var UserDocsApp = require('./user/UserDocsApp');

var DevApp = require('./DevApp');
var DevRealtimeApp = require('./DevRealtimeApp');
var APIApp = require('./APIApp');
var UserPageApp = require('./user/UserPageApp');
var UserNewsApp = require('./user/UserNewsApp');
var UserFriendsApp = require('./user/UserFriendsApp');


/*
 FLUX
 */
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
// stores
var UsersStore = require('../flux/stores/UsersStore');
var PusherStore = require('../flux/stores/PusherStore');
var SessionsStore = require('../flux/stores/SessionsStore');
// actions
var UsersActions = require('../flux/actions/UsersActions');
var PusherActions = require('../flux/actions/PusherActions');
var SessionsActions = require('../flux/actions/SessionsActions');
var PhotosActions = require('../flux/actions/PhotosActions');

var stores = {UsersStore: new UsersStore(),
                PusherStore: new PusherStore(),
    SessionsStore: new SessionsStore()

};


var actions = assign({}, UsersActions, PusherActions, SessionsActions, PhotosActions);
var flux = new Fluxxor.Flux(stores, actions);


//api
var UserAPI = require('../api/UserAPI');

//components
//var AlertsComponent = require('../components/alert/AlertsComponent');

flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
        console.log("[Dispatch]", type, payload);
    }
});


var App = React.createClass({
    mixins: [FluxMixin],

    getDefaultProps: function () {
        return {}
    },

    getInitialState: function () {
        return {}
    },

    componentWillReceiveProps: function (nextProps) {

    },

    componentStyle: {
        placeholder: {}
    },

    createFluxComponent: function(Component, props){
        return (
            <Component {...props} flux={flux} />
    );
    },


    getLoginContent: function(){
        return (
            <LoginApp />
        );
    },

    getGuestRoute: function(){
        return (
            <Router createElement={this.createFluxComponent} history={createHashHistory({queryKey: false})}>
                <Route useAutoKeys={false} path="/" component={LoginApp} >
                    <IndexRoute component={LoginApp} />
                </Route>

                <Route path="/login" component={LoginApp}>
                    <IndexRoute component={LoginApp} />
                </Route>

                <Route path="/api" component={APIApp}>
                    <IndexRoute component={APIApp} />
                </Route>

                <Route path="/dev" component={DevApp}>
                    <IndexRoute component={DevApp} />
                </Route>

                <Route path="/dev_realtime" component={DevRealtimeApp}>
                    <IndexRoute component={DevRealtimeApp} />
                </Route>

            </Router>
        );
    },

    getUserRoute: function(){
        return (
            <Router createElement={this.createFluxComponent} history={createHashHistory({queryKey: false})}>
                <Route useAutoKeys={false} path="/" component={UserIndexApp} >
                    <IndexRoute component={UserIndexApp} />
                </Route>

                <Route path="/docs" component={UserDocsApp}>
                    <IndexRoute component={UserDocsApp} />
                </Route>

                <Route path="/user/:userId" component={UserPageApp}/>

                <Route path="/news" component={UserNewsApp}>
                    <IndexRoute component={UserNewsApp} />
                </Route>

                <Route path="/friends" component={UserFriendsApp}>
                    <IndexRoute component={UserFriendsApp} />
                </Route>

                <Route path="/api" component={APIApp}>
                    <IndexRoute component={APIApp} />
                </Route>

                <Route path="/dev" component={DevApp}>
                    <IndexRoute component={DevApp} />
                </Route>

                <Route path="/dev_realtime" component={DevRealtimeApp}>
                    <IndexRoute component={DevRealtimeApp} />
                </Route>

            </Router>
        );

    },


    getAirfieldAdminRoute: function(){
        return (
            <Router createElement={this.createFluxComponent} history={createHashHistory({queryKey: false})}>

                <Route useAutoKeys={false} path="/" component={DispatcherIndexApp} >
                    <IndexRoute component={DispatcherIndexApp} />
                </Route>

                <Route path="/dev" component={DevApp}>
                    <IndexRoute component={DevApp} />
                </Route>

                <Route path="/api" component={APIApp}>
                    <IndexRoute component={APIApp} />
                </Route>


                <Route path="/dev_realtime" component={DevRealtimeApp}>
                    <IndexRoute component={DevRealtimeApp} />
                </Route>

            </Router>
        );
    },

    render: function(){
        var currentUser = UserAPI.getCurrentUser();
        var role = (currentUser == undefined) ? undefined : currentUser.role;
        var isLoggedIn = UserAPI.isLoggedIn();
        console.log('currentUser: ', currentUser);
        console.log('App: render: isLoggedIn = ', isLoggedIn);
        console.log('role = ', role);
        var content = null;

        if (isLoggedIn == true){
            //if (role == 'airfieldAdmin'){
            if (role == 'dispatcher'){
                content = this.getAirfieldAdminRoute();
            }
            if (role == 'user'){
                content = this.getUserRoute();
            }
        }else {
            //content = this.getLoginContent();
            content = this.getGuestRoute();
        }

        return (
            <div>
                {content}
            </div>
        );
    }

});

ReactDOM.render(
    (<App flux={flux} />),
    document.getElementById('main')
);