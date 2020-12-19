const Tail = require('tail').Tail;
const AccessLogParser = require('outlawdesigns.io.accesslogparser');
const Host = require('./src/models/Host');
const Request = require('./src/models/Request');

global.config = require('./config');

function _HisDate(dateObj){
  let date = dateObj.getFullYear() + '-' + (dateObj.getMonth()+1) + '-' + dateObj.getDate();
  let time = dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();
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
  req.requestDate = lineData.requestDate;
  req.requestMethod = lineData.requestMethod || 'KILL';
  req.query = lineData.query || 'NA';
  req.referrer = lineData.referrer;
  return req;
}
function _handleRequest(host,port,lineData){
  let request = _mapRequest(host,port,AccessLogParser.parseLine(lineData));
  console.log(request._buildPublicObj());
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



// targetFiles.forEach((file)=>{
//   let tail = new Tail(file);
//   tail.on('line',(lineData)=>{_handleRequest(host,port,lineData)});
//   tail.on('line',_handleRequest);
//   tail.on('error',console.error);
// });

// tail = new Tail(targetFile);
// tail.on("line", function(data) {
//   console.log(request);
// });
// tail.on("error", function(error) {
//   console.log('ERROR: ', error);
// });
