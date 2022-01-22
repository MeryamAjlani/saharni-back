import {
  Body,
  Controller, Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { hasRoles } from '../authentification/decorators/roles.decorator';
import { UserRole } from '../authentification/entities/roles.enum';
import { JwtAuthGuard } from '../authentification/guards/jwt-guard';
import { RolesGuard } from '../authentification/guards/roles.guard';
import { BarService } from './bar.service';
import { GetUser } from '../authentification/decorators/get-user.decorator';
import { Owner } from '../authentification/entities/owner.entity';
import { Bar } from './entities/bar.entity';
import { PartyCreationDto } from './dto/party-creation.dto';
import { Party } from './entities/party.entity';

@Controller('bar')
@hasRoles(UserRole.OWNER, UserRole.CLIENT, UserRole.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class BarController {
  constructor(private barService : BarService) {
  }

  @Post('addBar')
  addBar(@Body() barDetails,@GetUser() owner: Owner ): Promise<void>{
    return this.barService.addBar(barDetails.name , barDetails.imageUrl , owner);
  }

  @Post('addParty')
  async addParty(@Body(ValidationPipe) partyCreationDto : PartyCreationDto , bar :Bar,@GetUser() owner: Owner ) : Promise<void>{
    if(!bar || bar.owner.id!= owner.id )
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      else return this.barService.addParty(partyCreationDto, bar);
  }

  @Get('getAllParties')
  async getAllParties():Promise<Party[]>{
    return await this.barService.findAllParties();
  }
  @Get('getAllBars')
  async getAllBars(): Promise<Bar[]>{
    return await this.barService.findAllBars();
  }

  @Get('getBar/:idBar')
  async getBar(@Param('idBar') idBar):Promise<Bar>{
    return await this.barService.findBarById(idBar);
  }

  @Get('getParty/:idParty')
  async getParty(@Param('idParty') idParty):Promise<Party>{
    return await this.barService.findPartyById(idParty);
  }

  @Get('getBarParties/:idBar')
  async getBarParties(@Param('idBar') idBar):Promise<Party[]>{
    return await this.barService.getBarParties(idBar);
  }

  @Delete('removeBar/:idBar')
   removeBar(@Param('idBar') idBar){
    this.barService.removeBar(idBar);
  }
  @Delete('removeParty/:idParty')
   async removeParty(@Param('idParty') idParty,@GetUser() owner: Owner){
    let party =await this.barService.findPartyById(idParty);
    let bar = await this.barService.findBarById(party.bar.id)
    if(!bar || bar.owner.id!= owner.id )
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    else this.barService.removeParty(idParty);
  }


}
