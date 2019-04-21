# @eropple/typeorm-bunyan-logger #
This package provides a [TypeORM](https://typeorm.io/#/) logger adapter that
works with Bunyan.

## Usage ##
Just create a `TypeOrmLoggerAdapter` with your preferred logger and pass it
to the `logger` connection option. The logger will have a component name of
`TypeORM`.

It is set up to support the logging of slow queries and queries that error.
It will _not_ dump parameters for any query to the log.

## Configuration Example (ormconfig.ts) ##
```ts
import { ConnectionOptions } from "typeorm";
import * as Bunyan from "bunyan";
import { TypeOrmLoggerAdapter } from "@eropple/typeorm-bunyan-logger";

const ROOT_LOGGER = Bunyan.createLogger({ name: "mycoolapp", level: Bunyan.DEBUG });

const dbOptions: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  logging: true,
  logger: new TypeOrmLoggerAdapter(ROOT_LOGGER)
};

module.exports = dbOptions;
```
