import express from 'express';
import {getAllLogs} from '../controllers/logController.js';

const log_route = express.Router()

log_route.get('/Logs', getAllLogs)

/** 
 *  @swagger
 *  /Logs:
 *   get:
 *     tags: [Logs]
 *     summary: Lista todos os logs do sistema
 *     description: Permite listar todos os logs registrados no sistema
 *     responses:
 *       200:
 *         description: Logs listados com sucesso, retorna um array de objetos com os logs registrados
 *       400:
 *         description: Erro no servidor, retorna um objeto com uma mensagem de erro
 */

export default log_route