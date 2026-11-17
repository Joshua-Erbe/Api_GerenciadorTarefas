import express from 'express';
import * as taskController from '../controllers/tasksController.js';

const tasks_routes = express.Router()

tasks_routes.get('/Tasks', taskController.getAllTasks)

/** 
*    @swagger
*    /Tasks:
*        get:
*            tags: [Tarefas]
*            summary: Lista todas as tarefas cadastradas
*            responses:
*                200:
*                    description: Tarefas listadas com sucesso, retorna um array de objetos com as tarefas cadastradas
*                500:
*                    description: Erro no servidor, retorna um objeto com uma mensagem de erro
*/

tasks_routes.post('/RegisterTask', taskController.RegisterTask)

/**
*    @swagger
*    /RegisterTask:
*        post:
*            tags: [Tarefas]
*            summary: Cadastrar uma nova tarefa
*            description: Permite cadastrar uma nova tarefa no banco de dados, é necessário informar o email do usuário que está cadastrando a tarefa, o nome da tarefa e a data da tarefa
*            parameters:
*               - in: query
*                 name: email_user
*                 required: true
*                 description: Email do usuário que está cadastrando a tarefa
*                 schema:
*                   type: string
*                   example: "usuario@example.com"
*            requestBody:
*                required: true
*                content:
*                   application/json:
*                    schema:
*                       type: object
*                       properties:
*                          task_name:
*                               type: string
*                               example: "Estudar 2 horas por dia"
*                          task_date:
*                               type: string
*                               example: "2026-11-16 20:00:00"
*            responses:
*                201:
*                    description: 'Tarefa registrada com sucesso, retorna { "MessageSystem": "Tarefa adicionada com sucesso!" }'
*                400:
*                   description: 'Erro ao registrar a tarefa, retorna { "ErrorMessage": "Erro ao registrar a tarefa! Verifique as informações e tente novamente" }'
*/

tasks_routes.delete('/DeleteTask', taskController.eraseTask)

/**
*    @swagger
*    /DeleteTask:
*        delete:
*            tags: [Tarefas]
*            summary: Deletar uma tarefa cadastrada
*            description: Permite deletar uma tarefa cadastrada no banco de dados, é necessario informar o id da tarefa que deseja deletar
*            parameters:
*               - in: query
*                 name: id_task
*                 required: true
*                 description: Id da tarefa a ser deletada
*                 schema:
*                   type: integer
*                   example: 1                      
*            responses:
*                200:
*                    description: Tarefa deletada com sucesso, retorna um objeto com uma mensagem de sucesso
*                400:
*                    description: Erro ao deletar a tarefa, retorna um objeto com uma mensagem de erro
*/

tasks_routes.put('/UpdateTask', taskController.attTask)

/**
*    @swagger
*    /UpdateTask:
*        put:
*            tags: [Tarefas]   
*            summary: Atualizar uma tarefa cadastrada
*            description: Permite atualizar uma tarefa cadastrada no banco de dados, é necessário informar o id da tarefa que deseja atualizar, o novo nome da tarefa e a nova data da tarefa
*            parameters:
*               - in: query
*                 name: id_task
*                 required: true
*                 description: Id da tarefa a ser atualizada
*                 schema:
*                   type: integer
*                   example: 1
*            requestBody:
*               required: true
*               content: 
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               new_name:
*                                   type: string
*                                   example: "Passear com o cachorro"
*                               new_date:
*                                   type: string
*                                   example: "2026-11-16 20:00:00"
*            responses:
*                200:
*                    description: Tarefa atualizada com sucesso, retorna um objeto com uma mensagem de sucesso
*                400:  
*                    description: Erro ao atualizar a tarefa, retorna um objeto com uma mensagem de erro
*/

export default tasks_routes

