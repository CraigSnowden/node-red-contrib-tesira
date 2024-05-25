// to provide the module access to the Node-RED runtime API
module.exports = function (RED) {
    // tesira node
    function tesiraNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        node.server = RED.nodes.getNode(config.server);
        node.on('input', function (msg, send, done) {
            node.server.tesira.send(msg.payload).then((ok) => {
                msg.payload = ok
                send(msg);
            }).catch((err) => {
                done(err);
            })
        })
    }
    // to register the tesiraNode function as a node
    RED.nodes.registerType("tesira", tesiraNode, {});
}