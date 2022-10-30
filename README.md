## About
A NestJs project that uses the neo4j driver to allow to consume raw cypher query and it's usage.

## Prerequisite(s)
1. Used node.js version is - v16.15.1
2. Neo4J must be installed

## Steps to use
1. Clone the repo
2. Run `npm install`
3. Run `copy .env.example .env`
4. Set the appropriate DB env variable value
5. Run `npm build`
6. To start the app without debug mode: run `npm start`
7. To start the app with debug mode: run `npm run start:debug`

**Outcome:** Service must be accessible at 3001.

## API Specs:
1. Create employee node:
  ```curl --location --request POST 'http://localhost:3001/employee/Vikash'
2. Get employee history node:
  ```curl --location --request GET 'http://localhost:3001/employee/Vikash/history'

## Disclaimer
This is the initial version that focuses only to the "cypher query builder" integration. The upcoming version will include the structuring the code base with any specific pattern, detailed explanation of used `versioner` procedure
