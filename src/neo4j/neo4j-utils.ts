import { ConfigService } from '@nestjs/config';
import { Neo4jConfig } from './neo4j-config.interface';

export const createDatabaseConfig = (
  configService: ConfigService,
  customConfig: Neo4jConfig,
): Neo4jConfig => {
  return (
    customConfig || {
      host: configService.get('DATABASE_HOST'),
      port: configService.get('DATABASE_PORT'),
      scheme: configService.get('DATABASE_SCHEME'),
      username: configService.get('DATABASE_USERNAME'),
      password: configService.get('DATABASE_PASSWORD'),
    }
  );
};

export class ConnectionError extends Error {
  public details: string;
  constructor(oldError: Error) {
    super();
    this.message = 'Could not connect to Neo4j database';
    this.name = 'Database Connection Error';
    this.stack = oldError.stack;
    this.details = oldError.message;
  }
}
