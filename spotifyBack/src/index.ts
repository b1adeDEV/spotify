import App from './app';
import logger from './middlewares/logger';
import cors from 'cors';
import { ArtistRoute } from '@/routes/artist.route';
import { AlbumRoute } from '@/routes/album.route';
import { TrackRoute } from '@/routes/track.route';
import { UserRoute } from '@/routes/user.route';
import { TrackHistoryRoute } from '@/routes/trackHistory.route';


const app = new App({
    port: 8000,
    middlewares: [logger(), cors()],
    controllers: [new ArtistRoute(), new AlbumRoute(), new TrackRoute(), new UserRoute(), new TrackHistoryRoute()],
});

app.listen();
