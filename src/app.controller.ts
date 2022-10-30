import { Controller, Get, Post, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { nanoid } from 'nanoid';

import { Neo4jService } from './neo4j/neo4j.service';

@Controller()
export class AppController {
  constructor(private readonly neo4jService: Neo4jService) {}

  // Creates a node with additional state as 'Active' using versioner with the provided name
  @Post('/employee/:name')
  async createEmployeeNode(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const { name } = request.params;
    const empNode = await this.neo4jService
      .initQuery()
      .raw(
        `
          call graph.versioner.init('Employee', {id: '${nanoid()}', name: '${name}'}, { status: 'Active'})
          yield node
          return node
        `,
      )
      .run();
    return response.send({
      empNode,
      message: 'Employee node created successfully',
    });
  }

  // Returns employee nodes with other nodes created by version that are relational and state nodes
  @Get('/employee/:id/history')
  async getEmployeeHistory(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const empHistory = await this.neo4jService
      .initQuery()
      .raw(
        `match (emp: Employee {name: '${request.params.id}'})-[rel:HAS_STATE]->(s:State) return emp, s, rel`,
      )
      .run();
    return response.send(empHistory);
  }

  // Delete nodes for the passed id if it exists
  @Delete(':name')
  async deleteNode(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const node = await this.neo4jService
      .initQuery()
      .raw(`match (emp: Employee {name: '${request.params.name}'}) return emp`)
      .run();
    return response.send({ message: 'Node deleted successfully', node });
  }
}
