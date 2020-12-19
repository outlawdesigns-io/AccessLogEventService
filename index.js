const Tail = require('tail').Tail;
const AccessLogParser = require('outlawdesigns.io.accesslogparser');
const Host = require('./src/models/Host');
const Request = require('./src/models/Request');

global.config = require('./config');

function _mapRequest(lineData){
  let req = new Request();
  req.host = '';
  req.port = '';
  req.ip_address = lineData.ip_address;
  req.platform = lineData.operating_system_name;
  req.browser = lineData.browser_name;
  req.version = lineData.browser_version;
  req.responseCode = lineData.responseCode;
  req.requestDate = lineData.requestDate;
  req.requestMethod = lineData.requestMethod;
  req.query = lineData.query;
  req.referrer = lineData.referrer;
  return req;
}
function _handleRequest(lineData){
  let request = _mapRequest(AccessLogParser.parseLine(lineData));
  console.log(request._buildPublicObj());
}

let targetFiles = [
  '/var/www/html/log/LOEService.access.log',
  '/var/www/html/log/RandomWord.access.log'
];

targetFiles.forEach((file)=>{
  let tail = new Tail(file);
  tail.on('line',_handleRequest);
  tail.on('error',console.error);

});

// tail = new Tail(targetFile);
// tail.on("line", function(data) {
//   console.log(request);
// });
// tail.on("error", function(error) {
//   console.log('ERROR: ', error);
// });
