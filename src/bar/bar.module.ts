import { Module } from '@nestjs/common';
import { BarController } from './bar.controller';
import { BarService } from './bar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartyRepository } from './repositories/party.repository';
import { BarRepository } from './repositories/bar.repository';
import { ClientRepository } from '../authentification/repositories/client.repository';
import { Bar } from './entities/bar.entity';
import { Party } from './entities/party.entity';
import { RolesGuard } from '../authentification/guards/roles.guard';
import { JwtAuthGuard } from '../authentification/guards/jwt-guard';
import { OwnerRepository } from '../authentification/repositories/owner.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    PartyRepository,
    BarRepository,
    ClientRepository,
    OwnerRepository,
    Party,
    Bar
  ])],
  controllers: [BarController],
  providers: [
    BarService,
    RolesGuard,
    JwtAuthGuard]
})
export class BarModule {}
