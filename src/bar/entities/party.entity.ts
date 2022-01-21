import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bar } from "./bar.entity";


@Entity()
export class Party extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


  @Column()
  description: string;


  @Column()
  price: number;


  @Column()
  imageUrl: string;



  @ManyToOne(() => Bar, bar => bar.parties, { eager: true ,onDelete:'CASCADE'})
  bar: Bar;



  constructor(
    name: string,
    description:string,
    price:number,
    bar:Bar,
    imageUrl:string,
  ) {
    super();
    this.name=name;
    this.description=description;
    this.price=price;
    this.bar=bar;
    this.imageUrl=imageUrl;
  }
}
