import { Expose } from 'class-transformer';

export class AlbumDto {
  @Expose() name!: string;

  @Expose() artist!: number;

  @Expose() year!: string;

  @Expose() image!: string;
}

