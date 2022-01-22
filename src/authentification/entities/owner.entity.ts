import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from "./roles.enum";
import { Bar } from '../../bar/entities/bar.entity';


@Entity()
export class Owner extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({nullable:false, unique : true})
  email: string;

  @Column('boolean', { default: false })
  validated_email: boolean;

  @Column()
  password: string;


  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.OWNER,
  })
  role: UserRole;


  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  UpdatedAt: Date;

  @OneToOne(() => Bar,bar=>bar.owner)
  @JoinColumn()
  bar: Bar;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = UserRole.OWNER;
  }
}
