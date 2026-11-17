import express from 'express';
import { checkHealth } from '../controllers/healthController.js';

const health_route = express.Router();

health_route.get('/health', checkHealth);

/** 
 *  @swagger
 *  /health:
 *      get:
 *          tags: [Health]
 *          summary: Retorna o status atual da API
 *          description: Verificar se a API esta funcionando
 *          responses:
 *              200: 
 *                  description: 'API funcionando normalmente, retorna { status: "ok", banco: "ok" }'
 *              503:
 *                  description: 'API não esta online, retorna { status: "erro", banco: "erro" }'
 * 
*/

export default health_route;