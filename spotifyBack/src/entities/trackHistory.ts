import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@/entities/user';
import { Track } from '@/entities/track';

@Entity()
export class TrackHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.trackHistory)
  user!: User;

  @ManyToOne(() => Track, (track) => track.trackHistory)
  track!: Track;

  @CreateDateColumn()
  date!: Date;
  
}
//