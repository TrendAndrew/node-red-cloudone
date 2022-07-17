const request = require('request');
const async = require('async');
const uuid = require('uuid').v4;

const constant = {
    hashType: {
        SHA1: "sha1",
        SHA256: "sha256"
    },

    trustLevel: {
        HIGH: 100,
        LOW: 0,

        convert: function(input) {
            return trustLevel.HIGH;
        }
    },

    baseUrl: {
        integrations: 'https://integrations.{{region}}.cloudone.trendmicro.com/api/',
        workload: 'https://workload.{{region}}.cloudone.trendmicro.com/api/'
    }
};

function makeCall(node, params, callback) {
    request(params, function (error, response, body) {
        if (error || (response.statusCode !== 200)) {
            return callback(error || new Error((body && body.message) || 'Request Error'));
        }
        node.log('response:', error, response, body);
        callback(null, body);
    });
}

function apicall(node, params, onError, onSuccess) {
    const startTime = new Date();
    const guid = uuid();

    node.debug('call (' + guid + ')', params);
    node.status({ fill:"blue", shape:"ring", text:"calling" });
    makeCall(node, params, function(err, body) {
        if (err) {
            if (onError) {
                return onError(err);
            }
            node.status({ fill:"red", shape:"ring", text:err.message });
            node.error(err);
            return;
        }
        if (onSuccess) {
            return onSuccess(body);
        }
        node.status({});
        node.warn(body);
        node.send([body]);
    });
}

module.exports = {
    hashType: constant.hashType,
    trustLevel: constant.trustLevel,
    baseUrl: constant.baseUrl,
    apicall: apicall
};