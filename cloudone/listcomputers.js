const util = require('./util.js');

module.exports = function(RED) {

    function ListComputers(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        node._cloudone = RED.nodes.getNode(config.cloudone);
        const streaming = false;    // todo: future streaming option
 
        node.on('input', function(msg) {
            node._cloudone.call(node, {
                method: "GET",
                uri: "https://workload.us-1.cloudone.trendmicro.com/api/computers?expand=applicationControl&expand=none&overrides=false",
                headers: {
                    'Api-Version': 'v1'
                }
            });
        }, null, function(body) {
            node.status({});
            console.log(body);
            if (streaming) {
                // foreach (computers) {
                //     node.send([computer]);
                // }
            } else {
                node.send(body);
            }
        });

    }
    RED.nodes.registerType("list computers", ListComputers);
};
