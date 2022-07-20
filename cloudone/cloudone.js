'use strict';
const Mustache = require('mustache');
const util = require('./util.js');

module.exports = function(RED) {

    function CloudOneService(config) {
        RED.nodes.createNode(this, config);
        var serverNode = this;
        const apikey = serverNode.credentials.apikey;
        const region = serverNode.region || 'us-1';
        const server = serverNode.server;

        const proxyAddress = serverNode.proxyAddress;
        const proxyProtocol = serverNode.proxyProtocol || 'https';
        const proxyPort = serverNode.proxyPort || '80';
        const proxyUsername = serverNode.credentials.proxyUsername;
        const proxyPassword = serverNode.credentials.proxyPassword;


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
            
            params.uri.region = params.uri.region || region;
            const uri = Mustache.render(
                (server && (server.length > 0) ? server : 'https://{{service}}.{{region}}.cloudone.trendmicro.com/api/') + '{{{path}}}',
                params.uri // allow the caller to override things (including the region)
            );

            const callParams = Object.assign({}, params, {
                uri: uri,
                json: true,
                headers: Object.assign({}, params.headers || {}, {
                    'Authorization': 'ApiKey ' + apikey//,
                    //'Content-Type': 'application/vnd.api+json'
                })
            });

            if (proxyAddress) {
                callParams.proxy = Mustache.render('{{protocol}}://{{username}}:{{password}}@{{address}}:{{port}}', {
                    protocol: proxyProtocol,
                    address: proxyAddress,
                    username: proxyUsername,
                    password: proxyPassword,
                    port: proxyPort
                });
            }

            console.log(callParams);
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
