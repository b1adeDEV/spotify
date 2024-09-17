import { Album } from '@/entities/album'
import { Faker } from '@faker-js/faker'
import { setSeederFactory} from 'typeorm-extension'


export const AlbumFactory = setSeederFactory(Album, (faker:Faker) => {
    const album = new Album()
    album.name = faker.lorem.word()
    album.year = faker.number.int({min:2000, max: 2025}).toString()
    album.image = "13f1954f-d4f6-4f03-a9a8-98cb6bfbe7dd.jpg"
    return album
})