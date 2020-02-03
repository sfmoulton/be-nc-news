const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'

  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  development: {
    connection: {
      database: "nc_news",
      username: "pc",
      password: "password"
    }
  },
  test: {
    connection: {
      database: "nc_news_test",
      username: "pc",
      password: "password"
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
