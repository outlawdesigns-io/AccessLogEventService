const Tail = require('tail').Tail;
const AccessLogParser = require('outlawdesigns.io.accesslogparser');
const Host = require('./src/models/Host');
const Request = require('./src/models/Request');

global.config = require('./config');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

function _HisDate(dateObj){
  let date = dateObj.getFullYear() + '-' + (dateObj.getMonth()+1) + '-' + dateObj.getDate();
  let hours = (dateObj.getHours() < 10 ? '0' + dateObj.getHours():dateObj.getHours());
  let minutes =  (dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes():dateObj.getMinutes());
  let seconds = (dateObj.getSeconds() < 10 ? '0' + dateObj.getSeconds():dateObj.getSeconds());
  let time = hours + ':' + minutes + ':' + seconds;
  return date + ' ' + time;
}
function _mapRequest(host,port,lineData){
  let req = new Request();
  req.host = host;
  req.port = port;
  req.ip_address = lineData.ip_address;
  req.platform = lineData.operating_system_name.match('Unknown') ? 'NA':lineData.operating_system_name;
  req.browser = lineData.browser_name.match('Unknown') ? 'NA':lineData.browser_name;
  req.version = lineData.browser_version.match('Unknown') ? '-':lineData.browser_version;
  req.responseCode = lineData.responseCode || 999;
  req.requestDate = _HisDate(lineData.requestDate);
  req.requestMethod = lineData.requestMethod || 'KILL';
  req.query = lineData.query || 'NA';
  req.referrer = lineData.referrer || 'NA';
  req.responseBytes = lineData.responseSize || 0;
  return req;
}
function _handleRequest(host,port,lineData){
  let request = _mapRequest(host,port,AccessLogParser.parseLine(lineData));
  global.config.DEBUG ? console.log(request._buildPublicObj()): request._create();
}
function _registerHost(host){
  let logPath = global.config.DEBUG ? host.log_path.replace(global.config.LOGPREFIX,global.config.LOGPREFIX_REP):host.log_path;
  let tail = new Tail(logPath);
  tail.on('line',(lineData)=>{_handleRequest(host.label,host.port,lineData)});
  tail.on('error',console.error);
}

(async ()=>{
  let host = new Host();
  let hosts = await host.getAll();
  hosts.forEach(_registerHost);
})();
