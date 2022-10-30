import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Neo4jModule } from './neo4j/neo4j.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    Neo4jModule.forRootAsync(),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
