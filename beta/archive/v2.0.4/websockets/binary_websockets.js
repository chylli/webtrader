define(["reconnecting-websocket"],function(a){var b=null,c=null,d=new Promise(function(a){require(["js-cookie","token/token"],function(d,e){b=d,c=e,a()})});require(["js-cookie","token/token"]);var e=!1,f=function(){var b="wss://www.binary.com/websockets/v3?l=EN",c=new a(b,null,{debug:!1,timeoutInterval:2500});return c.addEventListener("open",n),c.addEventListener("close",g),c.addEventListener("message",o),c},g=function(){e=!1,require(["charts/chartingRequestMap"],function(a){Object.keys(a).forEach(function(b){var c=a[b],d=c&&c.chartIDs&&c.chartIDs[0]&&c.chartIDs[0].instrumentCode;c&&d&&u.send({ticks:d,passthrough:{instrumentCdAndTp:b}}).then(function(a){c.tickStreamingID=a.tick.id})["catch"](function(a){})})})},h={},i=[],j=[],k={},l={},m=function(){return p&&1===p.readyState},n=function(){for(;j.length>0;)p.send(JSON.stringify(j.shift()));for(;i.length>0;)i.shift()()},o=function(a){var b=JSON.parse(a.data);(h[b.msg_type]||[]).forEach(function(a){a(b)});var c=b.echo_req.passthrough&&b.echo_req.passthrough.uid,d=k[c];d&&(delete k[c],b.error?(b.error.echo_req=b.echo_req,d.reject(b.error)):d.resolve(b))},p=f();require(["websockets/tick_handler"]);var q=function(a){for(prop in{balance:1,statement:1,profit_table:1,portfolio:1,proposal_open_contract:1,buy:1,sell:1})if(prop in a)return!0;return!1},r=function(a){return a.passthrough=a.passthrough||{},a.passthrough.uid=(1e17*Math.random()).toString(),new Promise(function(b,c){k[a.passthrough.uid]={resolve:b,reject:c},m()?p.send(JSON.stringify(a)):j.push(a)})},s=function(a){var c=!1,d=JSON.stringify({authorize:a}),f=r({authorize:a});return f.then(function(g){return b.set("webtrader_token",a),e=!0,c=!0,l[d]=f,g})["catch"](function(a){throw c||(e=!1,b.remove("webtrader_token")),delete l[d],a})},t=function(a){if(e)return r(a);var d=r.bind(null,a);return b.get("webtrader_token")?s(b.get("webtrader_token")).then(d):c.getTokenAsync().then(s).then(d)},u={events:{on:function(a,b){(h[a]=h[a]||[]).push(b)}},execute:function(a){m()?setTimeout(a,0):i.push(a)},cached:{send:function(a){var b=JSON.stringify(a);return l[b]?l[b]:l[b]=u.send(a).then(function(a){return a},function(a){throw delete l[b],a})},authorize:function(){return d.then(function(){var a=b.get("webtrader_token"),d=JSON.stringify({token:a});return e&&a&&l[d]?l[d]:a?s(a):c.getTokenAsync().then(s)})}},send:function(a){return q(a)?d.then(function(){return t(a)}):r(a)}};return u});