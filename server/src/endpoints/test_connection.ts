import express, { NextFunction, Request, Response } from 'express';
import axios from '../config/axios';

const router = express.Router();
const options = () => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return options;
};
/**
 *
 * @swagger
 * /test/connection:
 *      get:
 *          summary: Realiza un test para ver si la conexion al servidor esta funcionando
 *          tags:
 *              - Conexion
 *          description: Realiza un test para ver si la conexion al servidor esta funcionando
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  text:
 *                                      type: string
 *                                      example: Retorna array con datos de la conexión!
 *              400:
 *                  description: Not found
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 *
 */

router.get(
  '/connection',
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await axios.get('/metadata', options());
      console.log(`print response - data ${JSON.stringify(response.data)}`);

      res.json(response.data);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /test/MedicationRequest:
 *   get:
 *     summary: Obtener una solicitud de medicación por identificador
 *     description: Obtener una solicitud de medicación por identificador con opciones de inclusión.
 *     parameters:
 *       - in: query
 *         name: identifier
 *         required: true
 *         schema:
 *           type: string
 *         description: El identificador de la solicitud de medicación.
 *       - in: query
 *         name: _include
 *         required: false
 *         schema:
 *           type: string
 *         description: Opciones de inclusión para la solicitud de medicación.
 *     responses:
 *       200:
 *         description: Respuesta exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                 data:
 *                   type: object
 *                   description: Datos de la solicitud de medicación.
 *       400:
 *         description: Error en la solicitud.
 */

router.get(
  '/MedicationRequest',
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      // Obtener los valores de los parámetros de consulta
      const identifier = _req.query.identifier as string | undefined;
      const include = _req.query._include as string | undefined;

      // Crear un objeto de opciones para la solicitud Axios
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          identifier,
          _include: include,
        },
      };

      const response = await axios.get('/MedicationRequest', options);
      console.log(`print response - data ${JSON.stringify(response.data)}`);

      res.json(response.data);
    } catch (err) {
      next(err);
    }
  }
);

export default router