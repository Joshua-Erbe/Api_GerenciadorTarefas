import * as tasksRepository from "../repository/tasksRepository.js";

export const normalizarPaginacao = (page, limit) => {
    let pageNovo = parseInt(page, 10 ) || 1;
    let limitNovo = parseInt(limit, 10)
    if (isNaN(limitNovo)) limitNovo = 10;

    if (pageNovo < 1) pageNovo = 1
    if (limitNovo > 100) limitNovo = 100   
    if (limitNovo < 1) limitNovo = 1

    return {pageNovo, limitNovo}
}

export const Ehemail = (emailTeste) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const resposta = regexEmail.test(emailTeste)
    return resposta
}

export const listarTarefas = async (pageRecebido, limiteRecebido) => {
    const {pageNovo, limitNovo} = normalizarPaginacao(pageRecebido, limiteRecebido)
    return await tasksRepository.findAllTasks(pageNovo, limitNovo)
}

export const criarNovaTarefa = async (email_user, task_name, task_date) => {
    const resultadoEmail = Ehemail(email_user)
    if (!resultadoEmail) {
        const erro = new Error("O Email do usuairo não é valido! Tente novamente inserindo um email valido")
        erro.status = 400
        throw erro
    }
    if (!task_name.trim()) {
        const erro = new Error("O Nome da tarefa não é valido! Tente novamente inserindo um nome valido")
        erro.status = 400
        throw erro
    }
    return await tasksRepository.createTask(email_user, task_name, task_date)
}