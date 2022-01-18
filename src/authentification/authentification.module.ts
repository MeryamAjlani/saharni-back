import { Module } from '@nestjs/common';
import { AuthentificationController } from './authentification.controller';
import { AuthentificationService } from './authentification.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AuthentificationController],
  providers: [AuthentificationService],
  imports: []
})
export class AuthentificationModule {}
