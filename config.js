process.env.NODE_ENV = process.env.NODE_ENV || 'production';

process.env.MYSQL_HOST = process.env.MYSQL_HOST || 'ubuntuserver.outlawdesigns.io';
process.env.MYSQL_USER = process.env.MYSQL_USER || 'root';
process.env.MYSQL_PASS = process.env.MYSQL_PASS || 'example';
process.env.MODEL_DB = process.env.MODEL_DB || 'web_access_test';

process.env.DEBUG = process.env.DEBUG === 'true';
process.env.LOGPREFIX = process.env.LOGPREFIX || '/tmp/log/';
process.env.LOGPREFIX_REP = process.env.LOGPREFIX_REP || '/tmp/log/';
