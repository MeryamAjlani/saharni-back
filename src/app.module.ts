import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthentificationModule } from './authentification/authentification.module';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    AuthentificationModule,
    TypeOrmCoreModule.forRoot(
      {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [],
        synchronize: true,
      }
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
