import { Track } from '@/entities/track'
import { Faker } from '@faker-js/faker'
import { setSeederFactory} from 'typeorm-extension'


export const TrackFactory = setSeederFactory(Track, (faker:Faker) => {
    const hour = faker.number.int({ min: 1, max: 3 });
    const minute = faker.number.int({ min: 0, max: 59 });
    const track = new Track()
    track.name = faker.lorem.word()
    track.duration = `${hour}:${minute}`
    return track
})