import { Expose } from 'class-transformer';

export class TrackDto {
  @Expose() name!: string;

  @Expose() albums!: number;

  @Expose() duration!: string;

}
