## Description

Cinema admin backend application

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations

After changing data structure run this script to create DB migrations
```bash
$ npm run migration:generate -- src/db/migrations/<migration name>
```

To apply migrations to database run
```bash
$ npm run migration:run
```
