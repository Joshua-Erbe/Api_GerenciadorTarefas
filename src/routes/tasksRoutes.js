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
*            responses:
*                201:
*                    description: Tarefa registrada com sucesso, retorna um objeto com uma mensagem de sucesso
*                400:
*                   description: Erro ao registrar a tarefa, retorna um objeto com uma mensagem de erro
*/

tasks_routes.delete('/DeleteTask', taskController.eraseTask)

/**
*    @swagger
*    /DeleteTask:
*        delete:
*            tags: [Tarefas]
*            summary: Deletar uma tarefa cadastrada
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
*            responses:
*                200:
*                    description: Tarefa atualizada com sucesso, retorna um objeto com uma mensagem de sucesso
*                400:  
*                    description: Erro ao atualizar a tarefa, retorna um objeto com uma mensagem de erro
*/

export default tasks_routes

