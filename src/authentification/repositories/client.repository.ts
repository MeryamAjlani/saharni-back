import { EntityRepository, Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import * as bcrypt from 'bcrypt';
import { ClientSignupCredentialsDto } from '../dto/client-signup-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginCredentialsDto } from '../dto/login-credentials.dto';
import { isEmail } from '../helpers';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  async signup(
    signupCredentialsDto: ClientSignupCredentialsDto,
  ): Promise<Client | null> {
    const { firstName, lastName, email, password } = signupCredentialsDto;

    let user: Client | null;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      user = new Client(firstName, lastName, email, hashedPassword);
      await user.save();
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('Email already exists!');
      else throw new InternalServerErrorException();
    }

    return user;
  }

  async validateUserPassword(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<Client | null> {
    const { email, password } = loginCredentialsDto;

    let user: Client | undefined;

    if (isEmail(email)) {
      user = await this.findOne({ email: email });
    } else {
      return null;
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      return null;
    }
  }
}
