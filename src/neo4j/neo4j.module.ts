import { DynamicModule, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'cypher-query-builder';

import { ConnectionWithDriver, Neo4jConfig } from './neo4j-config.interface';
import { NEO4J_CONFIG, NEO4J_CONNECTION } from './neo4j-constants';
import { createDatabaseConfig, ConnectionError } from './neo4j-utils';
import { Neo4jService } from './neo4j.service';

@Module({
  providers: [Neo4jService],
})
export class Neo4jModule {
  static forRootAsync(customConfig?: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      imports: [ConfigModule],
      global: true,
      providers: [
        {
          provide: NEO4J_CONFIG,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return createDatabaseConfig(configService, customConfig);
          },
        },
        {
          provide: NEO4J_CONNECTION,
          inject: [NEO4J_CONFIG],
          useFactory: async (config: Neo4jConfig) => {
            try {
              const { scheme, host, port, username, password } = config;
              const connection = new Connection(`${scheme}://${host}:${port}`, {
                username,
                password,
              }) as any;

              await connection.driver.verifyConnectivity();
              Logger.log(`Connected to Neo4j database`, Neo4jModule.name);
              return connection;
            } catch (error) {
              throw new ConnectionError(error);
            }
          },
        },
      ],
      exports: [Neo4jService],
    };
  }
}
