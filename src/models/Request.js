"use strict";

const Record = require('outlawdesigns.io.noderecord');

class Request extends Record{

  constructor(id){
    const database = process.env.NODE_ENV == 'production' ? 'web_access':'web_access_test';
    const table = 'requests';
    const primaryKey = 'id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'id',
      'host',
      'port',
      'ip_address',
      'platform',
      'browser',
      'version',
      'responseCode',
      'requestDate',
      'requestMethod',
      'query',
      'referrer'
    ];
  }
}

module.exports = Request;
