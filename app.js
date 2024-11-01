import express from 'express'
import usuarioRoutes from './routes/usuario.routes.js'

const app = express();
app.use(express.json());
app.use(usuarioRoutes);
app.listen(100);

export default app;