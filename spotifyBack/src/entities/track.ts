import {Column, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Album } from '@/entities/album';
import { TrackHistory } from '@/entities/trackHistory';

@Entity() 
export class Track {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Album, (album) => album.tracks, {onDelete: 'CASCADE'})
  albums!: Album;

  @Column()
  duration!: string;

  @Column({default:false})
  publish!:boolean

  @Column()
  @Generated('increment')
  number!: number;

  @OneToMany(() => TrackHistory, (history) => history.track)
  trackHistory!: TrackHistory

  
}
