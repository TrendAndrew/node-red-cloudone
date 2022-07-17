'use strict';
const util = require('./util.js');

module.exports = function(RED) {

    function CloudOneService(config) {
        RED.nodes.createNode(this, config);
        var serverNode = this;
        const apikey = serverNode.credentials.apikey;
        const region = serverNode.region;
        const server = serverNode.server;

        serverNode.call = function(node, params, onError, onSuccess) {
            if (!apikey) {
                if (onError) {
                    return onError(new Error('Missing API Key'));
                }
                node.status({ fill:"red", shape:"ring", text:err.message });
                node.error(err);
                return;
            }

            // if (!region) {
            //     callback(new Error('Missing Region'));
            //     return;
            // }

            const callParams = Object.assign({}, params, {
                json: true,
                headers: Object.assign({}, params.headers || {}, {
                    'Authorization': 'ApiKey ' + apikey
                })
            })

            serverNode.debug(callParams);
            util.apicall(node, callParams, onError, onSuccess);
        }
    }

    RED.nodes.registerType("cloudone service", CloudOneService, {
        credentials: {
            apikey: { type:"password" }
        }
    });
};
