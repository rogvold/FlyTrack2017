/**
 * Created by sabir on 25.09.16.
 */

var Fluxxor = require('fluxxor');
var constants = require('../FluxConstants');

var OrganizationsStore = Fluxxor.createStore({
    self: this,

    initialize: function(){
        this.loading = false;
        this.organizationsMap = {};

        this.bindActions(
            constants.LOAD_ORGANIZATION, this.startLoading,
            constants.LOAD_ORGANIZATION_FAIL, this.stopLoading,
            constants.LOAD_ORGANIZATION_SUCCESS, this.organizationLoaded,

            constants.LOAD_ALL_ORGANIZATIONS, this.startLoading,
            constants.LOAD_ALL_ORGANIZATIONS_FAIL, this.stopLoading,
            constants.LOAD_ALL_ORGANIZATIONS_SUCCESS, this.organizationsLoaded

        );
    },

    organizationsLoaded: function(payload){
        this.consumeOrganizations(payload.organizations);
        this.loading = false;
        this.emit('change');
    },

    organizationLoaded: function(payload){
        this.consumeOrganizations([payload.organization]);
        this.loading = false;
        this.emit('change');
    },

    consumeOrganizations: function(orgs){
        if (orgs == undefined){
            return;
        }
        for (var i in orgs){
            this.organizationsMap[orgs[i].id] = orgs[i];
        }
    },

    getAllOrganizations: function(){
        var map = this.organizationsMap;
        var arr = [];
        for (var key in map){
            arr.push(map[key]);
        }
        return arr;
    },

    startLoading: function(){
        this.loading = true;
        this.emit('change');
    },

    stopLoading: function(){
        this.loading = false;
        this.emit('change');
    },

    getOrganization: function(id){
        return this.organizationsMap[id];
    }

});

module.exports = OrganizationsStore;