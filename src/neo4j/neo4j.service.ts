import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Connection } from 'cypher-query-builder';
import { NEO4J_CONNECTION } from './neo4j-constants';

@Injectable()
export class Neo4jService implements OnApplicationShutdown {
  constructor(
    @Inject(NEO4J_CONNECTION)
    private readonly connection: Connection,
  ) {}

  onApplicationShutdown() {
    this.connection.close();
  }

  initQuery() {
    return this.connection.query();
  }
}
