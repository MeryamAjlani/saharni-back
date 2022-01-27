import { Module } from '@nestjs/common';
import { AuthentificationController } from './authentification.controller';
import { AuthentificationService } from './authentification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientRepository } from './repositories/client.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guards/jwt.strategy';
import * as config from 'config';
import * as dotenv from 'dotenv';
import { OwnerRepository } from './repositories/owner.repository';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt-guard';

dotenv.config();

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientRepository, OwnerRepository]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthentificationController],
  providers: [AuthentificationService, JwtStrategy, RolesGuard, JwtAuthGuard],
  exports: [JwtStrategy, PassportModule],
})
export class AuthentificationModule { }
