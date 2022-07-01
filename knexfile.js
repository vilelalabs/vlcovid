
module.exports = {
    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: './data/development.db3'
        },
        //6h to load data locally with sqlite3
        acquireConnectionTimeout: 1000 * 60 * 60 * 6,
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations'
        }
    }
}