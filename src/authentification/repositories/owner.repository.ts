import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { LoginCredentialsDto } from "../dto/login-credentials.dto";
import { isEmail } from "../helpers";
import { Owner } from "../entities/owner.entity";
import { OwnerSignupCredentialsDto } from "../dto/owner-signup-credentials.dto";

@EntityRepository(Owner)
export class OwnerRepository extends Repository<Owner> {

  async signup(signupCredentialsDto: OwnerSignupCredentialsDto): Promise<Owner | null> {
    const {
      firstName,
      lastName,
      email,
      password,
    } = signupCredentialsDto;

    let user :Owner|null;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      user = new Owner(firstName, lastName, email, hashedPassword);

      await user.save();
    } catch (error) {
      if (error.code === "23505")
        throw new ConflictException("Email/Phone number already exists!");
      else throw new InternalServerErrorException();
    }

    return user;
  }


  async validateUserPassword(loginCredentialsDto: LoginCredentialsDto): Promise<Owner | null> {
    const { email, password } = loginCredentialsDto;

    let user: Owner | undefined;

    if (isEmail(email)){
      user = await this.findOne({ email : email });
    }else {
      return null;
    }

    if (user && await bcrypt.compare(password, user.password)) {

      return user;
    } else {
      return null;
    }

  }

}
