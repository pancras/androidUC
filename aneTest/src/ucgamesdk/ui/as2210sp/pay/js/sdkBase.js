var JSON;JSON||(JSON={});
(function(){function l(a){return 10>a?"0"+a:a}function n(a){j.lastIndex=0;return j.test(a)?'"'+a.replace(j,function(a){var o=e[a];return"string"===typeof o?o:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function d(o,s){var k,e,i,p,g=c,m,f=s[o];f&&"object"===typeof f&&"function"===typeof f.toJSON&&(f=f.toJSON(o));"function"===typeof a&&(f=a.call(s,o,f));switch(typeof f){case "string":return n(f);case "number":return isFinite(f)?""+f:"null";case "boolean":case "null":return""+f;
case "object":if(!f)return"null";c+=b;m=[];if("[object Array]"===Object.prototype.toString.apply(f)){p=f.length;for(k=0;k<p;k+=1)m[k]=d(k,f)||"null";i=0===m.length?"[]":c?"[\n"+c+m.join(",\n"+c)+"\n"+g+"]":"["+m.join(",")+"]";c=g;return i}if(a&&"object"===typeof a){p=a.length;for(k=0;k<p;k+=1)"string"===typeof a[k]&&(e=a[k],(i=d(e,f))&&m.push(n(e)+(c?": ":":")+i))}else for(e in f)Object.prototype.hasOwnProperty.call(f,e)&&(i=d(e,f))&&m.push(n(e)+(c?": ":":")+i);i=0===m.length?"{}":c?"{\n"+c+m.join(",\n"+
c)+"\n"+g+"}":"{"+m.join(",")+"}";c=g;return i}}if("function"!==typeof Date.prototype.toJSON)Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+l(this.getUTCMonth()+1)+"-"+l(this.getUTCDate())+"T"+l(this.getUTCHours())+":"+l(this.getUTCMinutes())+":"+l(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()};var h=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
j=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,c,b,e={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},a;if("function"!==typeof JSON.stringify)JSON.stringify=function(o,e,k){var h;b=c="";if("number"===typeof k)for(h=0;h<k;h+=1)b+=" ";else"string"===typeof k&&(b=k);if((a=e)&&"function"!==typeof e&&("object"!==typeof e||"number"!==typeof e.length))throw Error("JSON.stringify");return d("",
{"":o})};if("function"!==typeof JSON.parse)JSON.parse=function(a,b){function e(a,p){var g,m,f=a[p];if(f&&"object"===typeof f)for(g in f)Object.prototype.hasOwnProperty.call(f,g)&&(m=e(f,g),void 0!==m?f[g]=m:delete f[g]);return b.call(a,p,f)}var c,a=""+a;h.lastIndex=0;h.test(a)&&(a=a.replace(h,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return c=eval("("+a+")"),"function"===typeof b?e({"":c},""):c;throw new SyntaxError("JSON.parse");}})();
(function(){var l,n;(function(){var d={};l=function(h){if(!d[h])throw"module "+h+" not found";if(d[h].factory){var h=d[h],j=h.factory;h.exports={};delete h.factory;j(l,h.exports,h);h=h.exports}else h=d[h].exports;return h};n=function(h,j){if(d[h])throw"module "+h+" already defined";d[h]={id:h,factory:j}};n.remove=function(h){delete d[h]}})();if("object"===typeof module&&"function"===typeof l)module.exports.require=l,module.exports.define=n;n("bridge",function(d,h,j){function c(a,g){var m=document.createEvent("Events");
m.initEvent(a,!1,!1);if(g)for(var f in g)g.hasOwnProperty(f)&&(m[f]=g[f]);return m}var b=d("bridge/channel"),e=document.addEventListener,a=document.removeEventListener,o=window.addEventListener,s=window.removeEventListener,k={},q={};document.addEventListener=function(a,g,m){var f=a.toLowerCase();"bridgeready"==f?b.onBridgeReady.subscribeOnce(g):"resume"==f?(b.onResume.subscribe(g),b.onResume.fired&&g instanceof Function&&g()):"pause"==f?b.onPause.subscribe(g):"undefined"!=typeof k[f]?k[f].subscribe(g):
e.call(document,a,g,m)};window.addEventListener=function(a,g,m){var f=a.toLowerCase();"undefined"!=typeof q[f]?q[f].subscribe(g):o.call(window,a,g,m)};document.removeEventListener=function(i,g,m){var f=i.toLowerCase();"undefined"!=typeof k[f]?k[f].unsubscribe(g):a.call(document,i,g,m)};window.removeEventListener=function(a,g,i){var f=a.toLowerCase();"undefined"!=typeof q[f]?q[f].unsubscribe(g):s.call(window,a,g,i)};if("undefined"===typeof window.console)window.console={log:function(){}};var i={define:n,
require:d,addWindowEventHandler:function(a,g){return q[a]=b.create(a,g)},addDocumentEventHandler:function(a,g){return k[a]=b.create(a,g)},removeWindowEventHandler:function(a){delete q[a]},removeDocumentEventHandler:function(a){delete k[a]},fireDocumentEvent:function(a,g){var i=c(a,g);"undefined"!=typeof k[a]?k[a].fire(i):document.dispatchEvent(i)},fireWindowEvent:function(a,i){var b=c(a,i);"undefined"!=typeof q[a]?q[a].fire(b):window.dispatchEvent(b)},shuttingDown:!1,UsePolling:!0,callbackId:0,callbacks:{},
callbackStatus:{NO_RESULT:0,OK:1,CLASS_NOT_FOUND_EXCEPTION:2,ILLEGAL_ACCESS_EXCEPTION:3,INSTANTIATION_EXCEPTION:4,MALFORMED_URL_EXCEPTION:5,IO_EXCEPTION:6,INVALID_ACTION:7,JSON_EXCEPTION:8,ERROR:9},callbackSuccess:function(a,g){console.log("callbackId is "+a);if(i.callbacks[a]){if(g.status==i.callbackStatus.OK)try{i.callbacks[a].success&&i.callbacks[a].success(g.message)}catch(b){console.log("Error in success callback: "+a+" = "+b)}g.keepCallback||delete i.callbacks[a]}},callbackError:function(a,
g){if(i.callbacks[a]){try{i.callbacks[a].fail&&i.callbacks[a].fail(g.message)}catch(b){console.log("Error in error callback: "+a+" = "+b)}g.keepCallback||delete i.callbacks[a]}}};j.exports=i});n("bridge/channel",function(d,h,j){var c=function(a,b){this.type=a;this.handlers={};this.guid=this.numHandlers=0;this.fired=!1;this.enabled=!0;this.events={onSubscribe:null,onUnsubscribe:null};if(b){if(b.onSubscribe)this.events.onSubscribe=b.onSubscribe;if(b.onUnsubscribe)this.events.onUnsubscribe=b.onUnsubscribe}},
b={join:function(a,b){for(var e=b.length,c=e,d=function(){--e||a()},i=0;i<c;i++)!b[i].fired?b[i].subscribeOnce(d):e--;e||a()},create:function(a,e){b[a]=new c(a,e);return b[a]},deviceReadyChannelsArray:[],deviceReadyChannelsMap:{},waitForInitialization:function(a){if(a){var b=null,b=this[a]?this[a]:this.create(a);this.deviceReadyChannelsMap[a]=b;this.deviceReadyChannelsArray.push(b)}},initializationComplete:function(a){(a=this.deviceReadyChannelsMap[a])&&a.fire()}},e=d("bridge/utils");c.prototype.subscribe=
function(a,b,c){if(!(null===a||void 0===a)){var d=a;"object"==typeof b&&a instanceof Function&&(d=e.close(b,a));c=c||d.observer_guid||a.observer_guid||this.guid++;d.observer_guid=c;a.observer_guid=c;this.handlers[c]=d;this.numHandlers++;this.events.onSubscribe&&this.events.onSubscribe.call(this);return c}};c.prototype.subscribeOnce=function(a,b){if(!(null===a||void 0===a)){var c=null,d=this,h=function(){a.apply(b||null,arguments);d.unsubscribe(c)};this.fired?("object"==typeof b&&a instanceof Function&&
(a=e.close(b,a)),a.apply(this,this.fireArgs)):c=this.subscribe(h);return c}};c.prototype.unsubscribe=function(a){if(!(null===a||void 0===a)){if(a instanceof Function)a=a.observer_guid;this.handlers[a]=null;delete this.handlers[a];this.numHandlers--;this.events.onUnsubscribe&&this.events.onUnsubscribe.call(this)}};c.prototype.fire=function(a){if(this.enabled){var b=!1;this.fired=!0;for(var c in this.handlers){var e=this.handlers[c];e instanceof Function&&(e=!1===e.apply(this,arguments),b=b||e)}this.fireArgs=
arguments;return!b}return!0};b.create("onDOMContentLoaded");b.create("onNativeReady");b.create("onBridgeCoreReady");b.create("onBridgeReady");b.create("onResume");b.create("onPause");b.create("onDestroy");b.waitForInitialization("onBridgeCoreReady");j.exports=b});n("bridge/exec",function(d,h,j){var c=d("bridge");j.exports=function(b,e,a,d,h){try{var k=a+c.callbackId++;if(b||e)c.callbacks[k]={success:b,fail:e};var j=prompt(JSON.stringify(h||{}),"gap:"+JSON.stringify([a,d,k,!0]));if(0<j.length){eval("var v="+
j+";");if(v.status===c.callbackStatus.OK){if(b){try{b(v.message)}catch(i){console.log("Error in success callback: "+k+" = "+i)}v.keepCallback||delete c.callbacks[k]}return v.message}if(v.status===c.callbackStatus.NO_RESULT)v.keepCallback||delete c.callbacks[k];else{console.log("Error: Status="+v.status+" Message="+v.message);if(e){try{e(v.message)}catch(p){console.log("Error in error callback: "+k+" = "+p)}v.keepCallback||delete c.callbacks[k]}return null}}}catch(g){console.log("Error: "+g)}}});n("bridge/execapi",
function(d,h,j){var c=d("bridge/exec");j.exports=function(b,e,a,d){try{return c(d,function(a){console.log("ERROR:in bridge/execapi,MSG="+a)},b,e,a)}catch(h){console.log("ERROR:in bridge/execapi;Exeception="+h)}}});n("bridge/platform",function(d,h,j){j.exports={id:"android",initialize:function(){var c=d("bridge/channel"),b=d("bridge"),e=d("bridge/plugin/android/callback"),a=d("bridge/plugin/android/polling"),h=d("bridge/exec");c.onDestroy.subscribe(function(){b.shuttingDown=!0});console.log("3---1---Start listening for XHR callbacks");
setTimeout(function(){if(b.UsePolling)a();else{var i=prompt("usePolling","gap_callbackServer:");b.UsePolling=i;"true"==i?(b.UsePolling=!0,a()):(b.UsePolling=!1,e())}},1);b.addDocumentEventHandler("backbutton",{onSubscribe:function(){1===this.numHandlers&&h(null,null,"App","overrideBackbutton",{override:!0})},onUnsubscribe:function(){0===this.numHandlers&&h(null,null,"App","overrideBackbutton",{override:!1})}});b.addDocumentEventHandler("menubutton");b.addDocumentEventHandler("searchbutton");console.log("3---2---Figure out if we need to shim-in localStorage and WebSQL");
var j=d("bridge/plugin/android/storage");if("undefined"==typeof window.openDatabase)window.openDatabase=j.openDatabase;else{var k=window.openDatabase;window.openDatabase=function(a,b,c,e){var f=null;try{f=k(a,b,c,e)}catch(u){if(18===u.code)f=null;else throw u;}return null===f?j.openDatabase(a,b,c,e):f}}console.log("3---4---Patch localStorage if necessary");if("undefined"==typeof window.localStorage||null===window.localStorage){console.log("3---4---window.localStorage set");var l=new j.DIYLocalStorage;
window.localStorage=l;window.localStorage1=l;console.log("3---4---new storage.DIYLocalStorage( result="+window.localStorage)}else console.log("3---4---window.localStorage already exists");console.log("3---5---Let native code know we are all done on the JS side.");c.join(function(){console.log("onBridgeCoreReady");prompt("","gap_init:")},[c.onBridgeCoreReady])},objects:{bridge:{children:{JSCallback:{path:"bridge/plugin/android/callback"},JSCallbackPolling:{path:"bridge/plugin/android/polling"}}},navigator:{children:{app:{path:"bridge/plugin/android/app"}}}}}});
n("bridge/plugin/android/app",function(d,h,j){var c=d("bridge/exec");j.exports={clearCache:function(){c(null,null,"App","clearCache",null)},loadUrl:function(b,e){c(null,null,"App","loadUrl",{url:b,props:e})},cancelLoadUrl:function(){c(null,null,"App","cancelLoadUrl",null)},clearHistory:function(){c(null,null,"App","clearHistory",null)},backHistory:function(){c(null,null,"App","backHistory",null)},overrideBackbutton:function(b){c(null,null,"App","overrideBackbutton",{override:b})},exitApp:function(){return c(null,
null,"App","exitApp",null)}}});n("bridge/plugin/android/callback",function(d,h,j){var c=null,b=null,e=d("bridge"),a=d("bridge/plugin/android/polling"),o=function(){if(!e.shuttingDown)if(e.UsePolling)a();else{var d=new XMLHttpRequest;d.onreadystatechange=function(){if(4===d.readyState&&!e.shuttingDown)if(200===d.status){var b=decodeURIComponent(d.responseText);setTimeout(function(){try{eval(b)}catch(a){console.log("JSCallback: Message from Server: "+b),console.log("JSCallback Error: "+a)}},1);setTimeout(o,
1)}else 404===d.status?setTimeout(o,10):403===d.status?console.log("JSCallback Error: Invalid token.  Stopping callbacks."):503===d.status?console.log("JSCallback Server Closed: Stopping callbacks."):400===d.status?console.log("JSCallback Error: Bad request.  Stopping callbacks."):(console.log("JSCallback Error: Request failed."),e.UsePolling=!0,a())};null===c&&(c=prompt("getPort","gap_callbackServer:"));null===b&&(b=prompt("getToken","gap_callbackServer:"));d.open("GET","http://127.0.0.1:"+c+"/"+
b,!0);d.send()}};j.exports=o});n("bridge/plugin/android/polling",function(d,h,j){var c=d("bridge"),b=function(){if(!c.shuttingDown)if(c.UsePolling){var e=prompt("","gap_poll:");e?(setTimeout(function(){try{eval(""+e)}catch(a){console.log("JSCallbackPolling: Message from Server: "+e),console.log("JSCallbackPolling Error: "+a)}},1),setTimeout(b,1)):setTimeout(b,50)}else d("bridge/plugin/android/callback")()};j.exports=b});n("bridge/plugin/android/storage",function(d,h,j){var c=d("bridge/utils"),b=d("bridge/exec");
channel=d("bridge/channel");var e={},a=function(){this.resultSet=[];this.length=0};a.prototype.item=function(a){return this.resultSet[a]};var o=function(){this.rows=new a},l=function(a){this.id=c.createUUID();e[this.id]=this;this.resultSet=[];this.tx=a;this.tx.queryList[this.id]=this;this.errorCallback=this.successCallback=null},k=function(){this.id=c.createUUID();this.errorCallback=this.successCallback=null;this.queryList={}};k.prototype.queryComplete=function(a){delete this.queryList[a];if(this.successCallback){var a=
0,b;for(b in this.queryList)this.queryList.hasOwnProperty(b)&&a++;if(0===a)try{this.successCallback()}catch(c){console.log("Transaction error calling user success callback: "+c)}}};k.prototype.queryFailed=function(a,b){this.queryList={};if(this.errorCallback)try{this.errorCallback(b)}catch(c){console.log("Transaction error calling user error callback: "+c)}};k.prototype.executeSql=function(a,c,d,m){"undefined"===typeof c&&(c=[]);var f=new l(this);f.sql=a;e[f.id]=f;f.successCallback=d;f.errorCallback=
m;b(null,null,"Storage","executeSql",{query:a,params:c,tx_id:f.id})};var n=function(){};n.prototype.transaction=function(a,b,c){var e=new k;e.successCallback=c;e.errorCallback=b;try{a(e)}catch(d){if(console.log("Transaction error: "+d),e.errorCallback)try{e.errorCallback(d)}catch(u){console.log("Transaction error calling user error callback: "+d)}}};d=function(){console.log("7 ---- CupcakeLocalStorage");channel.waitForInitialization("cupcakeStorage");try{this.db=openDatabase("localStorage","1.0",
"localStorage",2621440);var a={};this.length=0;var b=function(a){this.length=a;if(localStorage)localStorage.length=a};this.db.transaction(function(c){c.executeSql("CREATE TABLE IF NOT EXISTS storage (id NVARCHAR(40) PRIMARY KEY, body NVARCHAR(65535))");c.executeSql("SELECT * FROM storage",[],function(c,e){for(var d=0;d<e.rows.length;d++)a[e.rows.item(d).id]=e.rows.item(d).body;b(e.rows.length);console.log("7 ---- initializationComplete cupcakeStorage");channel.initializationComplete("cupcakeStorage")})},
function(a){c.alert(a.message)});this.setItem=function(b,c){"undefined"==typeof a[b]&&this.length++;a[b]=c;this.db.transaction(function(a){a.executeSql("CREATE TABLE IF NOT EXISTS storage (id NVARCHAR(40) PRIMARY KEY, body NVARCHAR(65535))");a.executeSql("REPLACE INTO storage (id, body) values(?,?)",[b,c])})};this.getItem=function(b){return a[b]};this.removeItem=function(b){delete a[b];this.length--;this.db.transaction(function(a){a.executeSql("CREATE TABLE IF NOT EXISTS storage (id NVARCHAR(40) PRIMARY KEY, body NVARCHAR(65535))");
a.executeSql("DELETE FROM storage where id=?",[b])})};this.clear=function(){a={};this.length=0;this.db.transaction(function(a){a.executeSql("CREATE TABLE IF NOT EXISTS storage (id NVARCHAR(40) PRIMARY KEY, body NVARCHAR(65535))");a.executeSql("DELETE FROM storage",[])})};this.key=function(b){var c=0,e;for(e in a){if(c==b)return e;c++}return null}}catch(e){alert(e),c.alert("Database error "+e+".")}};j.exports={openDatabase:function(a,c,e,d){b(null,null,"Storage","openDatabase",{name:a,version:c,displayName:e,
size:d});return new n},CupcakeLocalStorage:d,DIYLocalStorage:d,failQuery:function(a,b){var c=e[b];if(c)try{delete e[b];var d=c.tx;if(d&&d.queryList[b]){d.queryList={};try{"function"===typeof c.errorCallback&&c.errorCallback(c.tx,a)}catch(f){console.log("executeSql error calling user error callback: "+f)}d.queryFailed(b,a)}}catch(u){console.log("executeSql error: "+u)}},completeQuery:function(a,b){var c=e[a];if(c)try{delete e[a];var d=c.tx;console.log("method=completeQuery:query.tx"+c.sql);if(d&&d.queryList[a]){var f=
new o;f.rows.resultSet=b;f.rows.length=b.length;try{"function"===typeof c.successCallback&&c.successCallback(c.tx,f)}catch(u){console.log("executeSql error calling user success callback: "+u)}d.queryComplete(a)}}catch(h){console.log("executeSql error: "+h)}}}});n("bridge/utils",function(d,h,j){function c(b){for(var a="",c=0;c<b;c++){var d=parseInt(256*Math.random(),10).toString(16);1==d.length&&(d="0"+d);a+=d}return a}var b={clone:function(c){if(!c)return c;var a,d;if(c instanceof Array){a=[];for(d=
0;d<c.length;++d)a.push(b.clone(c[d]));return a}if(c instanceof Function||!(c instanceof Object)||c instanceof Date)return c;a={};for(d in c)if(!(d in a)||a[d]!=c[d])a[d]=b.clone(c[d]);return a},close:function(b,a,c){return"undefined"===typeof c?function(){return a.apply(b,arguments)}:function(){return a.apply(b,c)}},createUUID:function(){return c(4)+"-"+c(2)+"-"+c(2)+"-"+c(2)+"-"+c(6)},extend:function(){var b=function(){};return function(a,c){b.prototype=c.prototype;a.prototype=new b;a.__super__=
c.prototype;a.prototype.constructor=a}}(),alert:function(b){alert?alert(b):console&&console.log&&console.log(b)}};j.exports=b});window.bridge=l("bridge");(function(){var d=l("bridge/channel");d.onNativeReady.subscribeOnce(function(){console.log("1---boot");document.addEventListener("DOMContentLoaded",function(){console.log("2---DOMContentLoaded fire in boot");d.onDOMContentLoaded.fire()},!1);"complete"==document.readyState&&(console.log("2---DOMContentLoaded fire in boot document.readyState == 'complete'"),
d.onDOMContentLoaded.fire());d.join(function(){var h=l("bridge/platform");console.log("3--- platform.initialize()");h.initialize();console.log("4--- channel.onBridgeCoreReady.fire()");d.onBridgeCoreReady.fire();d.join(function(){console.log(" channel.onBridgeReady.fire()");bridge.exec=l("bridge/execapi");d.onBridgeReady.fire()},d.deviceReadyChannelsArray)},[d.onDOMContentLoaded,d.onNativeReady])});window._nativeReady&&d.onNativeReady.fire()})(window)})();function sdkBase(){this.servType={APP:"APP_SERV",COMMON:"COMMON_SERV",LOGIN:"LOGIN_SERV",PAY:"PAY_SERV",BBS:"BBS_SERV",SDKSERVER:"SDK_SERVER_SERV"};this.actions={HISTORY_BACK:"HISTORY_BACK",LOAD_URL:"LOAD_URL",URL_HASH_CHANGE:"URL_HASH_CHANGE",CLEAR_HISTORY:"CLEAR_HISTORY",GET_SDK_INFO:"GET_SDK_INFO",GET_GAME_INFO:"GET_GAME_INFO",GET_CURR_USER:"GET_CURR_USER",SET_SETTING:"SET_SETTING",GET_SETTING:"GET_SETTING",GET_NETWORK_INFO:"GET_NETWORK_INFO",START_APP:"START_APP",SET_PAGE_PARAMS:"SET_PAGE_PARAMS",
GET_PAGE_PARAMS:"GET_PAGE_PARAMS",STAT:"STAT",SIGN:"SIGN",GET_PHONE:"GET_PHONE",VERIFY_SIGN:"VERIFY_SIGN",GET_SOURCE_PAGE_INFO:"GET_SOURCE_PAGE_INFO",JUMP_TO_NATIVE_PAGE:"JUMP_TO_NATIVE_PAGE",SET_UI_STYLE:"SET_UI_STYLE",JUMP_TO_SDKPAGE:"JUMP_TO_SDKPAGE",GET_LOGIN_CONFIG:"GET_LOGIN_CONFIG",GET_LOGIN_HISTORY:"GET_LOGIN_HISTORY",DELETE_LOGIN_HISTORY:"DELETE_LOGIN_HISTORY",LOGIN:"LOGIN",REGISTER:"REGISTER",LOGIN_AFTER_REGISTER:"LOGIN_AFTER_REGISTER",LOGIN_EXIT_SDK:"LOGIN_EXIT_SDK",LOGIN_NOTIFY_CP:"LOGIN_NOTIFY_CP",
LOGOUT:"LOGOUT",CHANGE_PASSWORD:"CHANGE_PASSWORD",GET_PAYMENT_INFO:"GET_PAYMENT_INFO",EXIT_SDK:"EXIT_SDK",GET_PAY_WAY:"GET_PAY_WAY",GET_PAY_WAY_USAGE:"GET_PAY_WAY_USAGE",CMCCPAY:"CMCCPAY",UDPAY:"UDPAY",CARDPAY:"CARDPAY",PAY_EXIT_SDK:"PAY_EXIT_SDK",PAY_NOTIFY_CP:"PAY_NOTIFY_CP",ALI_PAY:"ALI_PAY",CMCC_GAME_PAY:"CMCC_GAME_PAY",CALL_SDK_SERVER:"CALL_SDK_SERVER"}}
(function(l){l.prototype.hooks={extend:function(a,b){i[a]||(i[a]=[]);i[a].push(b);try{b.initialize()}catch(c){throw Error("Undefined initialize function");}}};l.prototype.request=function(e,g,h,i,j,l,x,t){function A(a){!b(w)&&0!=w&&clearTimeout(w);B||(b(a)||s(a)?z(a):!b(a.success)&&!a.success?z(a):C(a))}function C(c){!b(i)&&a(i)&&i.apply(this,[c]);q.success(y)}function z(c){!b(j)&&a(j)&&j.apply(this,[c]);q.fail(y)}var y=0,w=0,B=!1,r={};0<=o(m,g)&&(l=!0);if(!b(f[g])&&(r=k(this.sdkVersion(),f[g]),!1===
r||0>r))if(r={success:!1,msg:"\u63a5\u53e3\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u8054\u7cfb\u6211\u4eec"},l)z(r);else return r;y=q.start(e,g,h,l,t);l=!b(l)?l:!1;h=!b(h)&&!s(h)?h:{};x=!b(x)&&"[object Number]"===Object.prototype.toString.call(x)?x:1;t=!p[e]?!1:!b(d[p[e]])&&a(d[p[e]])?d[p[e]]:n;if(!t)return!1;t=t.apply(this,[g]);if(!t)return!1;!b(w)&&!s(w)&&clearTimeout(w);w=setTimeout(c(function(){B=!0;!b(j)&&a(j)&&j.apply(this,[{success:!1,msg:"\u8bf7\u6c42\u8d85\u65f6\uff0c\u8bf7\u91cd\u65b0\u518d\u8bd5"}]);
q.timeout(y)},this),1E3*x);if(l)t.apply(this,[h,A,e,g]);else return r=t.apply(this,[h,null,e,g]),A(r),r};l.prototype.isCmwap=function(){return this.request(this.servType.COMMON,this.actions.GET_NETWORK_INFO)};l.prototype.sdkInfo=function(){return this.request(this.servType.COMMON,this.actions.GET_SDK_INFO)};l.prototype.sdkVersion=function(){var a=this.sdkInfo();return a.success?a.data.ve:null};l.prototype.osVersion=function(){var a=k(this.sdkVersion(),"2.1.0");return!1!==a&&0<=a?(a=this.sdkInfo(),
a.success?a.data.androidSdkVer:null):null};var n=function(c){return!g[c]?!1:!b(j[g[c]])&&a(j[g[c]])?j[g[c]]:h},d={SdkServerService:function(a){if(!g[a])return!1;this.callSdkServer=j.callSdkServer;return this[g[a]]}},h=function(a,c,d,e){if(b(c)||null==c)return!d||!e?{success:!1}:bridge.exec(p[d],g[e],a);(!d||!e)&&c.apply(this,[{success:!1}]);bridge.exec(p[d],g[e],a,c)},j={callSdkServer:function(a,c,d,e){if(b(a)||b(a.api))throw Error('A "api" attribute is required');var f=a.api;delete a.api;bridge.exec(p[d],
g[e],{service:f,data:a},c)}},c=function(c,b){if("string"===typeof b)var d=c[b],b=c,c=d;if(a(c)){var e=Array.prototype.slice.call(arguments,2);return function(){return c.apply(b,e.concat(Array.prototype.slice.call(arguments)))}}},b=function(a){return void 0===a},e=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},a=function(a){return"[object Function]"===Object.prototype.toString.call(a)},o=function(a,c){if(null===a)return-1;if(Array.prototype.indexOf&&a.indexOf===
Array.prototype.indexOf)return a.indexOf(c);for(var b=0,d=a.length;b<d;b++)if(b in a&&a[b]===c)return b;return-1},s=function(a){if(null===a)return!0;if(e(a)||"[object String]"===Object.prototype.toString.call(a))return 0===a.length;for(var c in a)if(Object.prototype.hasOwnProperty.call(a,c))return!1;return!0},k=function(a,c){if(!a||!c)return!1;var b=a.split("."),d=c.split(".");if(3>b.length||3>d)return!1;b=100*parseInt(b[0])+10*parseInt(b[1])+parseInt(b[2]);d=100*parseInt(d[0])+10*parseInt(d[1])+
parseInt(d[2]);return b>d?1:b==d?0:-1},q=new function(){this._lastId=0;this._requestPool=[];this._events=[];this.start=function(a,d,e,f,g){g=!b(g)?g:{};this._requestPool.push(++this._lastId);if(i.request)for(var h=this._lastId,j=0;j<i.request.length;j++){var k=setTimeout,l=c;i.request[j].start({id:h,service:a,action:d,param:e,isAsyn:f,option:g});k(l(void 0,this),1)}return this._lastId};this.success=function(a){if(i.request)for(var b=0;b<i.request.length;b++){var d=setTimeout,e=c;i.request[b].success({id:a});
d(e(void 0,this),1)}};this.fail=function(a){if(i.request)for(var b=0;b<i.request.length;b++){var d=setTimeout,e=c;i.request[b].fail({id:a});d(e(void 0,this),1)}};this.timeout=function(a){if(i.request)for(var b=0;b<i.request.length;b++){var d=setTimeout,e=c;i.request[b].timeout({id:a});d(e(void 0,this),1)}};return this},i={},p={APP_SERV:"App",COMMON_SERV:"CommonService",LOGIN_SERV:"LoginService",PAY_SERV:"PayService",SDK_SERVER_SERV:"SdkServerService"},g={HISTORY_BACK:"backHistory",LOAD_URL:"loadUrl",
URL_HASH_CHANGE:"urlHashChange",CLEAR_HISTORY:"clearHistory",GET_SDK_INFO:"getSdkInfo",GET_GAME_INFO:"getGameInfo",GET_CURR_USER:"getCurrUser",SET_SETTING:"setSetting",GET_SETTING:"getSetting",GET_NETWORK_INFO:"getNetworkInfo",START_APP:"startOrDownloadApp",SET_PAGE_PARAMS:"setPageParams",GET_PAGE_PARAMS:"getPageParams",STAT:"stat",SIGN:"sign",GET_PHONE:"getPhoneInfo",VERIFY_SIGN:"verifySign",GET_SOURCE_PAGE_INFO:"getNativeSourcePageInfo",JUMP_TO_NATIVE_PAGE:"jumpToNativePage",SET_UI_STYLE:"setNativeUIStyle",
JUMP_TO_SDKPAGE:"jumpToSdkPage",GET_LOGIN_CONFIG:"getLoginConfig",GET_LOGIN_HISTORY:"getLoginHistory",DELETE_LOGIN_HISTORY:"deleteLoginHistory",LOGIN:"login",REGISTER:"register",LOGIN_AFTER_REGISTER:"doLoginForRegister",LOGIN_EXIT_SDK:"exitSdk",LOGIN_NOTIFY_CP:"loginNotifyCp",LOGOUT:"logout",CHANGE_PASSWORD:"changePassword",GET_PAYMENT_INFO:"getPaymentInfo",EXIT_SDK:"exitSdk",GET_PAY_WAY:"getPayWay",GET_PAY_WAY_USAGE:"getPayWayUsage",CMCCPAY:"cmccPay",UDPAY:"udPay",CARDPAY:"cardPay",PAY_EXIT_SDK:"exitSdk",
PAY_NOTIFY_CP:"payNotifyCp",ALI_PAY:"alixPay",CMCC_GAME_PAY:"cmccGamePay",CALL_SDK_SERVER:"callSdkServer"},m="LOGIN,REGISTER,CHANGE_PASSWORD,GET_LOGIN_HISTORY,GET_PAY_WAY,GET_PAY_WAY_USAGE,CMCCPAY,UDPAY,CARDPAY,SIGN,VERIFY_SIGN,CALL_SDK_SERVER,CMCC_GAME_PAY,ALI_PAY".split(","),f={SIGN:"2.1.0",GET_PHONE:"2.1.0",VERIFY_SIGN:"2.1.0",ALI_PAY:"2.1.0",CMCC_GAME_PAY:"2.1.0",GET_SOURCE_PAGE_INFO:"2.1.0",JUMP_TO_NATIVE_PAGE:"2.1.0",SET_UI_VISIBILITY:"2.1.0"}})(sdkBase);