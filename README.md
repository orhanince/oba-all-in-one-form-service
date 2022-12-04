## FoodStyles Todo Api

## How to start

It has to be an `.env` file. Sample: `.env-sample`

Copy `.env-sample` to `.env` file on terminal.

```bash
cp -r .env-sample .env
```

### Define your env variables.

```bash
# App running port.
PORT=8080

# Jwt auth token constants.
JWT_EXPIRES_IN=
JWT_SECRET=
JWT_ISSUER=
USER_PASSWORD_SECRET=

# Db development constants.
DEVELOPMENT_DB_HOST=
DEVELOPMENT_DB_PORT=
DEVELOPMENT_DB_USERNAME=
DEVELOPMENT_DB_PASSWORD=
DEVELOPMENT_DB_NAME=

# Db production constants.
PRODUCTION_DB_HOST=
PRODUCTION_DB_PORT=
PRODUCTION_DB_USERNAME=
PRODUCTION_DB_PASSWORD=
PRODUCTION_DB_NAME=

# Db specifications.
DB_DIALECT=mysql
DB_POOL_MIN=5
DB_POOL_MAX=50
DB_POOL_IDLE=10000
```

### Installing packages

```bash
npm install
```

### Prepare husky git hooks.

Install git hooks.

```bash
npm run prepare
```

### Create database via terminal

This command will create a new database with .env database configuration
variables.

```bash
sequelize:create:db
```

### Start server

```bash
npm run start # listens via port number in local .env file
# or
npm run dev
```

## Documentation

Swagger api documentation.

[http://localhost:8080/api-docs](http://localhost:8080/api-docs)

## Migrations

### How to create a migration

```bash
npm run migration:add -- --name="$migrationName"
```

### How to run migrations

```bash
npm run migration:up
```

### How to undo migration

```bash
npm run migration:down
```

## Test

### How to run unit test

```bash
npm run test:unit
```

### How to run integration test

```bash
npm run test:integration
```
