import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { IsNotBlank } from '../../custom-validators/isNotBlank.validator';

export class ClientSignupCredentialsDto {
  @IsNotBlank()
  @IsString()
  @MinLength(4, { message: 'firstName must be at least 4 characters long.' })
  @MaxLength(20, { message: 'firstName must be at most 20 characters long.' })
  firstName: string;

  @IsNotBlank()
  @IsString()
  @MinLength(4, { message: 'lastName must be at least 4 characters long.' })
  @MaxLength(20, { message: 'lastName must be at most 20 characters long.' })
  lastName: string;

  @IsNotBlank({ message: "Email field can't be empty." })
  @IsEmail()
  email: string;

  @IsNotBlank({ message: "Password field can't be empty." })
  @IsString()
  @MinLength(6, { message: 'password must be at least 6 characters long!' })
  @MaxLength(20, { message: 'password must be at most 20 characters long!' })
  password: string;
}
