"use strict";

const Record = require('@outlawdesigns/db-record');

class Host extends Record{

  static table = 'hosts';
  static primaryKey = 'id';
  static get database(){
    return process.env.MODEL_DB || 'web_access_test';
  }

  constructor(id){
    super(Host.database,Host.table,Host.primaryKey,id);
    this.publicKeys = [
      'id',
      'label',
      'friendlyLabel',
      'port',
      'log_path'
    ];
  }
}

module.exports = Host;
