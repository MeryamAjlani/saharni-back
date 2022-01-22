import { IsString } from "class-validator";
import { IsNotBlank } from "../../custom-validators/isNotBlank.validator";

export class LoginCredentialsDto{

  @IsString()
  @IsNotBlank({message : 'Email field can\'t be blank'})
  email : string;

  @IsString()
  @IsNotBlank({message : 'Password field can\'t be blank'})
  password : string;

}
