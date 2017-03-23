const dev = {
  database: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 7000,
      user : 'example-dev',
      password : 'foobar',
      database : 'exampledb'
    }
  }
};

const production = {
  database: {
    client: 'pg',
    connection: {
      host : '128.420.123.666',
      port : 5432,
      user : 'example-prod',
      password : 'barfoo',
      database : 'exampledb'
    }
  }
};

module.exports = (stage: string) => {
  switch (stage) {
    case 'production':
      return production;
    default:
      return dev;
  }
};
