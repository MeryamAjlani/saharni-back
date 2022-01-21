import {
  IsNumber,
  IsString,
  MaxLength,
} from "class-validator";
import { IsNotBlank } from "../../custom-validators/isNotBlank.validator";

export class PartyCreationDto {

  @IsNotBlank()
  @IsString()
  @MaxLength(30, { message: "name must be at most 30 characters long." })
  name: string;


  @IsString()
  description: string;


  @IsString()
  imageUrl: string;

  @IsNumber()
  price: number;

  @IsNumber()
  barId: number


}
