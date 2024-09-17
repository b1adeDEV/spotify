import { DataSource, DataSourceOptions } from 'typeorm';
import { Album } from '@/entities/album';
import { Artist } from '@/entities/artist';
import { Track } from '@/entities/track';
import { User } from '@/entities/user';
import { TrackHistory } from '@/entities/trackHistory';
import { SeederOptions } from 'typeorm-extension';
import { UserFactory } from '@/database/factories/user.factory';
import { ArtistFactory } from '@/database/factories/artist.factory';
import { AlbumFactory } from '@/database/factories/album.factory';
import MainSeeder from '@/database/seeds/main.seeds';
import { TrackFactory } from '@/database/factories/track.factory';


const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'homework',
    synchronize: true,
    schema: '7hw',
    entities: [Artist, Album, Track, User,TrackHistory],
    factories: [UserFactory, ArtistFactory, AlbumFactory, TrackFactory],
    seeds:[MainSeeder]
}

export const appDataSource = new DataSource(options)
