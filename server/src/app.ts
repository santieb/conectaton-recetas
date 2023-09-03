import ExpressConfig from './config/express.config';
import { PORT } from './config/config';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// configuracion de rutas

const moduleAlias = require('module-alias');
const path = require('path');
moduleAlias.addAliases({
  '@': path.resolve(__dirname),
});

const app = ExpressConfig();

// Configuracion para la inicializacion de swagger
const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Conectatón Receta Electrónica - Swagger Documentation',
      version: '1.0.0',
    },
    schemes: ['http', 'https'],
    servers: [{ url: 'http://111.100.100.10:3000/' }],
    components: {
      securitySchemes: {
        jwt: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
    // Agregar la anotación @swagger a la lista de anotaciones
    annotations: ['@swagger'],
  },
  // Rutas de los archivos que van a contener la documentaciones de para swaggger
  apis: [
    /*     `${__dirname}/api/auth/routes/auth.routes.ts`,
    './dist/api/auth/routes/auth.routes.ts',
    `${__dirname}/api/user/routes/users.routes.ts`,
    './dist/api/user/routes/users.routes.ts',
    `${__dirname}/api/person/routes/person.routes.ts`,
    './dist/api/person/routes/person.routes.ts', */
  ],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const test = require('./endpoints/test2');
app.use('/test', test);

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
