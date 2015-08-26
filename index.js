var schemas = require('./commands');
var Client = require('node-rest-client').Client;
var pjson = require('./package.json');


var service = {
    "name": "webhook"
    , "label": "WebHook"
    , "description": "This integration gets a JSON webhook"
    , "version": pjson.version
    , "private": true
    , "form_options": null
    , "is_oauth": false
    , "logo": "//linchpin-web-assets.s3.amazonaws.com/v1/integrations/webhook/logos/www.png"
    , "server_integration": true
    , "frontend_integration": true
    , "supports_webhook": false
};

module.exports = function(options) {
    var lpis = this;

    options = lpis.util.deepextend({
    },options);

    lpis.add({lpi:'webhook',cmd:'about'},about);
    lpis.add({lpi:'webhook',cmd:'list'},list);
    lpis.add({lpi:'webhook',cmd:'get'},get);

    return {
        name:'webhook'
    };

    function about (args, done ){
        return done(null,service);
    }

    function list (args, done){
        return done(null, schemas);
    }

    function get(args,done){
        var url = args.config.webhook.url;

        var client = new Client();

        var req = client.get(url, function(data, response){
            done(null, data);
        });

        req.on('requestTimeout',function(req){
            console.log('request has expired');
            req.abort();
            done(new Error("Request Timeout"));
        });

        req.on('responseTimeout',function(res){
            console.log('response has expired');
            done(new Error("Response Timeout"));
        });

        // avoid socket hang up errors on request timeouts
        req.on('error', function(err){
            console.log('request error',err);
            done(err);
        });

    }
};