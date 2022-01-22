
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { Owner } from "../../authentification/entities/owner.entity";
import { Party } from "./party.entity";


@Entity()
export class Bar extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rate: number;


  @OneToOne(() => Owner, owner => owner.bar, { eager: true })
  @JoinColumn()
  owner: Owner;


  @Column()
  imageUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt: Date;

  @OneToMany(() => Party, party => party.bar)
  parties: Party[];


  constructor(
    name: string,
    rate: number,
    owner: Owner,
    imageUrl:string,
  ) {
    super();
    this.name = name;
    this.rate = rate;
    this.owner = owner;
    this.imageUrl=imageUrl;
  }
}
