import { EntityRepository, Repository } from "typeorm";
import { Bar } from "../entities/bar.entity";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Owner } from "src/authentification/entities/owner.entity";
import { PartyCreationDto } from "../dto/party-creation.dto";
import { Party } from "../entities/party.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
@EntityRepository(Party)
export class PartyRepository extends Repository<Party>{
  constructor(
    @InjectRepository(Bar)
    private barsRepository : Repository<Bar>,
  ) {
    super();
  }
  async findAll(): Promise<Party[]>{
    return Party.find()
  }
  async add(partyCreationDto, bar): Promise<null> {

    const {
      name,
      description,
      price,
      url
    } = partyCreationDto;

    let party: Party;

    try {
      party = new Party(
        name,
        description,
        price,
        bar,
        url
      );
      await party.save();
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
    return;
  }
}
