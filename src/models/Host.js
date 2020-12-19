"use strict";

const Record = require('outlawdesigns.io.noderecord');

class Host extends Record{

  constructor(id){
    const database = 'web_access';
    const table = 'hosts';
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
  async getAll(){
    let objs = [];
    let ids = await this._getAll();
    for(let id in ids){
      let obj = await new Host(ids[id][this.primaryKey])._build();
      objs.push(obj._buildPublicObj());
    }
    return objs;
  }
}

module.exports = Host;
