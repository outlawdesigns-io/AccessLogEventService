"use strict";

const Record = require('outlawdesigns.io.noderecord');

class Host extends Record{

  constructor(id){
    const database = 'web_access';
    const table = 'requests';
    const primaryKey = 'id';
    super(database,table,primaryKey,id);
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
