import { Module } from '@nestjs/common';
import { BarController } from './bar.controller';
import { BarService } from './bar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartyRepository } from './repositories/party.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    PartyRepository,

  ])],
  controllers: [BarController],
  providers: [BarService]
})
export class BarModule {}
