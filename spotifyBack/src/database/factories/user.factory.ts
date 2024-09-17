import { User } from '@/entities/user'
import { Faker } from '@faker-js/faker'
import { setSeederFactory} from 'typeorm-extension'


export const UserFactory = setSeederFactory(User, async(faker:Faker) => {
    const user = new User()
    user.username = faker.internet.userName()
    user.password = "123"
    await user.hashPassword()
    return user
})