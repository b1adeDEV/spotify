import { Artist } from '@/entities/artist'
import { Faker } from '@faker-js/faker'
import { setSeederFactory} from 'typeorm-extension'


export const ArtistFactory = setSeederFactory(Artist, (faker:Faker) => {
    const artist = new Artist()
    artist.name = faker.internet.userName()
    artist.image = "9d0bb371-4ed1-4856-94fd-9efc0aff8fce.png";
    artist.information = faker.lorem.paragraph();
    return artist
})