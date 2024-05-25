module.exports = function(RED) {
    function TesiraServerNode(n) {
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.port = n.port;

        const ttp = require("tesirattp-client");
        this.tesira = new ttp();
        this.tesira.connect({
            host: this.host,
            port: this.port
        }).then(() => {
            this.status({fill:"green",shape:"dot",text:"connected"});
        }).catch(() => {
            this.status({fill:"red",shape:"ring",text:"disconnected"});
        });

        this.on('close', (done) => {
            this.tesira.destroy().then(() => done());
        })
    }
    RED.nodes.registerType("tesira-server",TesiraServerNode);
}