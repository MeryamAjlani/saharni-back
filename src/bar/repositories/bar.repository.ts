import { EntityRepository, Repository } from "typeorm";
import { Bar } from "../entities/bar.entity";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { isEmail } from "../../authentification/helpers";
import { Owner } from "src/authentification/entities/owner.entity";

@EntityRepository(Bar)
export class BarRepository extends Repository<Bar> {

  async findAll():Promise<Bar[]>{
    return Bar.find()
  }

  async findOneById(id: number):Promise<Bar>{
    return Bar.findOne(id)
  }

  async add(BarName:string,url:string,owner:Owner) :Promise<null>{

    let bar: Bar ;
    try {
      bar = new Bar( BarName,0,owner,url);
      await bar.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
    return;

  }


}
