"use strict";

const Record = require('@outlawdesigns/db-record');

class Request extends Record{

  static table = 'requests';
  static primaryKey = 'id';
  static get database(){
    return process.env.MODEL_DB || 'web_access_test';
  }

  constructor(id){
    super(Request.database,Request.table,Request.primaryKey,id);
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
      'referrer',
      'responseBytes'
    ];
  }
}

module.exports = Request;
