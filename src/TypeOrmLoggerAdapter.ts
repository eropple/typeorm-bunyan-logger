import * as Bunyan from "bunyan";
import { Logger } from "typeorm";

export class TypeOrmLoggerAdapter implements Logger {
  private readonly _logger: Bunyan;

  constructor(logger: Bunyan) {
    this._logger = logger.child({ component: "TypeORM" });
  }

  logQuery(query: string, parameters?: any[] | undefined, queryRunner?: import("typeorm").QueryRunner | undefined) {
    this._logger.debug({ query }, "SQL query")
  }
  logQueryError(error: string, query: string, parameters?: any[] | undefined, queryRunner?: import("typeorm").QueryRunner | undefined) {
    this._logger.error({ query }, error);
  }
  logQuerySlow(time: number, query: string, parameters?: any[] | undefined, queryRunner?: import("typeorm").QueryRunner | undefined) {
    this._logger.warn({ time, query });
  }
  logSchemaBuild(message: string, queryRunner?: import("typeorm").QueryRunner | undefined) {
    this._logger.info({ schema: true }, message);
  }
  logMigration(message: string, queryRunner?: import("typeorm").QueryRunner | undefined) {
    this._logger.info({ migration: true }, message);
  }
  log(level: "log" | "info" | "warn", message: any, queryRunner?: import("typeorm").QueryRunner | undefined) {
    switch (level) {
      case "log":
      case "info":
        this._logger.info(message);
        break;
      case "warn":
        this._logger.warn(message);
        break;
    }
  }
}
