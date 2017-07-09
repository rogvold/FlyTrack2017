/**
 * Created by sabir on 25.09.16.
 */

var constants = require('../FluxConstants');
var ParseAPI = require('../../api/ParseAPI');

var OrganizationsActions = {

    loadOrganization: function(id, callback){
        if (id == undefined){
            return;
        }
        this.dispatch(constants.LOAD_ORGANIZATION, {id: id});
        ParseAPI.runCloudFunction("loadOrganization", {id: id}, function(org){
            this.dispatch(constants.LOAD_ORGANIZATION_SUCCESS, {organization: org});
        }.bind(this), function(err){
            this.dispatch(constants.LOAD_ORGANIZATION_FAIL, {error: err});
        }.bind(this));
    },

    loadAllOrganizations: function(){
        this.dispatch(constants.LOAD_ALL_ORGANIZATIONS, {});
        ParseAPI.runCloudFunction("getAllOrganizations", {}, function(orgs){
            this.dispatch(constants.LOAD_ALL_ORGANIZATIONS_SUCCESS, {organizations: orgs});
        }.bind(this), function(err){
            this.dispatch(constants.LOAD_ALL_ORGANIZATIONS_FAIL, {error: err});
        }.bind(this));
    }

};

module.exports = OrganizationsActions;