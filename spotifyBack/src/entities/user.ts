import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import bcrypt from "bcrypt"
import { TrackHistory } from '@/entities/trackHistory';
import { UserRole } from '@/interfaces/IUser';

const SALT_WORK_FACTOR = 10;

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string

  @Column({nullable:true})
  token!: string

  @Column({default:UserRole.user})
  role!: string

  @OneToMany(() => TrackHistory, (history) => history.user)
  trackHistory!: TrackHistory;

  async comparePassword (password:string){
    return await bcrypt.compare(password, this.password)
  }

  async hashPassword() {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
}
  generateToken() {
    this.token = crypto.randomUUID()
  }

}
