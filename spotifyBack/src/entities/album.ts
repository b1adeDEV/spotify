import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '@/entities/artist';
import { Track } from '@/entities/track';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  year!: string;

  @Column()
  image!: string;

  @OneToMany(() => Track, (track) => track.albums, {onDelete: 'CASCADE'})
  tracks!: Track[];

  @ManyToOne(() => Artist, (artist) => artist.albums, {onDelete:"CASCADE"})
  artist!: Artist;

  @Column({default:false})
  publish!:boolean
}
