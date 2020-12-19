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
  async getAll(){
    let jobs = [];
    let ids = await this._getAll();
    for(let id in ids){
      let job = await new Job(ids[id][this.primaryKey])._build();
      jobs.push(job._buildPublicObj());
    }
    return jobs;
  }
}

module.exports = Host;
