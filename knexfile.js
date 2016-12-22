// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/galvanize_messages_dev'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/galvanize_messages_test'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
