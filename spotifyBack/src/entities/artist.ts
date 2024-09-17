import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '@/entities/album';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  image!: string;

  @Column()
  information!: string;

  @OneToMany(() => Album, (album) => album.artist, {onDelete:"CASCADE"})
  albums!: Album;

  @Column({default:false})
  publish!:boolean
}
