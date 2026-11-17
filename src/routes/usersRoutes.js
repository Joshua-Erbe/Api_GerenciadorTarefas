import express from 'express';
import * as UserController from '../controllers/usersController.js';

const user_routes = express.Router()

user_routes.get('/Users', UserController.getUsers)

/** 
 *  @swagger
 *      /Users:
 *        get:
 *          tags: [Users]
 *          summary: Lista todos os usuarios cadastrados na API
 *          description: retorna um objeto contendo as informações dos usuarios cadastrados na API
 *          responses:
 *              200:
 *                  description: 'retorna um objeto contendo usuarios com id do usuario, nome, o hash da senha, email e a data de criação e a ultima vez que aquele registro foi atualizado'
 *              500:
 *                  description: 'Erro no servidor, retorna {MessageSystem: "Erro ao visualizar os usuarios, por favor tente novamente ou verifique a conexão com o banco"}'
*/

user_routes.post('/RegisterUser', UserController.RegisterUser)

/** 
 *  @swagger
 *      /RegisterUser:
 *          post:
 *              tags: [Users]
 *              summary: Registra um novo usuario no sistema
 *              description: registra um novo usuario recebendo no corpo da requisição, o nome, a senha e o Email. (A Senha é transformada em hash e nunca é salva)
 *              requestBody:
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  user_name:
 *                                      type: string
 *                                      example: "Joshua"
 *                                  user_password:
 *                                      type: string
 *                                      example: "batatinha123"
 *                                  user_email:
 *                                      type: string
 *                                      example: "Joshua12@yahoo.com"
 *              responses: 
 *                  200:
 *                      description: 'Usuario cadastrado com sucesso, { MessageSystem: "Usuario Cadastrado com sucesso!"}'
 *                  400:
 *                      description: 'Não foi possivel criar o usuario, { MessageError: "Erro ao tentar criar um usuario! Tente novamente ou verifique as informações inseridas" }'
*/

user_routes.put('/UpdateUser', UserController.UpdateUser)

/** 
 * @swagger 
 * /UpdateUser:
 *   put:
 *      tags: [Users]
 *      summary: Atualiza as informações do usuario (nome, senha ou email)
 *      description: Permite atualizar as informações do usuario, enviando o ID do mesmo para trocar o nome, a senha ou o email. o ID deve ser enviado pela URL/Query e as informações devem ser enviadas no corpo
 *      parameters:
 *          - in: query
 *            name: id_user
 *            required: true
 *            description: Id do usuario a ser atualizado
 *            schema: 
 *              type: integer
 *              example: 1
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          newUser_name:
 *                             type: string
 *                             example: "Bruna"
 *                          newUser_password: 
 *                              type: string
 *                              example: "Repolho123"
 *                          newUser_email:
 *                              type: string
 *                              example: "joshuaoliveira@outlook.com"
 *      responses:
 *          200:
 *              description: 'Informações atualizadas, retorna { MessageSystem: "Usuario atualizado com sucesso!"}'
 *          400:
 *              description: 'Não foi possivel atualizar as informações do usuario, retorna { MessageError: "Erro ao tentar atualizar o usuario! Verifique os dados e tente novamente!"}'
*/

user_routes.delete('/DeleteUser', UserController.DeleteUser)

/** 
 *  @swagger
 *  /DeleteUser:
 *      delete:
 *          tags: [Users]
 *          summary: Deletar um usuario cadastrado
 *          description: Permite deletar um usuario cadastrado no banco de dados
 *          parameters: 
 *              - in: query
 *                name: id_user 
 *                required: true
 *                description: Id do usuario a ser deletado
 *                schema: 
 *                  type: integer
 *                  example: 1
 *          responses:
 *              200:
 *                  description: Usuario deletado com sucesso, retorna um objeto com uma mensagem de sucesso
 *              400:
 *                  description: Erro ao deletar o usuario, retorna um objeto com uma mensagem de erro. 
 * 
 * 
*/

export default user_routes