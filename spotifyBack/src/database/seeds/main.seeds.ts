import { Album } from "@/entities/album";
import { Artist } from "@/entities/artist";
import { Track } from "@/entities/track";
import { User } from "@/entities/user";
import { UserRole } from "@/interfaces/IUser";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export default class MainSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const userFactory = factoryManager.get(User)
        const artistFactory = factoryManager.get(Artist)
        const albumFactory = factoryManager.get(Album)
        const trackFactory = factoryManager.get(Track)
        await userFactory.saveMany(10)

        const artists = await artistFactory.saveMany(5);

        const admin = await userFactory.make({ username: 'admin', password: 'admin', role: UserRole.administrator });
        await admin.hashPassword();
        await userFactory.save(admin);

        for (const artist of artists) {
            const albums = await albumFactory.saveMany(5, { artist });
            for (const album of albums) {
                await trackFactory.saveMany(5, { albums: album });
            }
        }
    }
}


