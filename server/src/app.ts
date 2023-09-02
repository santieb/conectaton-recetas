import ExpressConfig from './config/express.config';
import { PORT } from './config/config';

const app = ExpressConfig();

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
