import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Party } from './entities/party.entity';
import { Repository } from 'typeorm';
import { Bar } from './entities/bar.entity';
import { Owner } from '../authentification/entities/owner.entity';
import { BarRepository } from './repositories/bar.repository';
import { PartyRepository } from './repositories/party.repository';
import { PartyCreationDto } from './dto/party-creation.dto';

@Injectable()
export class BarService {
  constructor(
    @InjectRepository(Party) private partyRepository: Repository<Party>,
    @InjectRepository(Bar) private barRepository: Repository<Bar>,
    @InjectRepository(BarRepository) private customBarRepository: BarRepository,
    @InjectRepository(PartyRepository) private customPartyRepository: PartyRepository,

  ) {}

  //add bar
  async addBar (barName :  string, imageUrl: string, owner : Owner) {
    let bar = new Bar(barName, 0,owner, imageUrl);
    this.barRepository.save(bar);
    owner.bar=bar;
    Owner.save(owner);
    return;
  }

  //add party
    async addParty(partyCreationDto : PartyCreationDto , bar: Bar){
      const party = await this.partyRepository.create(partyCreationDto);
      bar.parties.push(party);
      Party.save(party);
      return;
    }

  //list all bars
  async findAllBars():Promise<Bar[]>{
    return this.customBarRepository.findAll();
  }

  //find a bar by its id
  async findBarById(id: number):Promise<Bar>{
    return this.barRepository.findOne(id);
  }

  //find all parties
  async findAllParties():Promise<Party[]>{
    return this.customPartyRepository.findAll();
  }

  //find party by id
  async findPartyById(id: number): Promise<Party>{
    return this.partyRepository.findOne(id);
  }

  //find parties of a specific bar
  async getBarParties(idbar : number): Promise<Party[]>{
    let bar = await  Bar.findOne(idbar);
    return this.partyRepository.find({
      'bar': bar
    })
  }

  //remove bar
  async removeBar(id: number){
    return this.barRepository.softDelete(id);
  }

  // remove party
  async removeParty(id:number){
    return this.partyRepository.softDelete(id);
  }
}
