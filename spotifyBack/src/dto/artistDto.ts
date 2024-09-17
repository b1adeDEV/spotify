import { Expose } from 'class-transformer';

export class ArtistDto {
  @Expose() name!: string;

  @Expose() information!: string;

  @Expose() image!: string;
}
