import * as tasksRepository from "../repository/tasksRepository.js";

const TAMANHO_MAX_NOME = 100;

/*Regra para normalizar a paginacao*/

export const normalizarPaginacao = (page, limit) => {
    let pageNovo = parseInt(page, 10 ) || 1;
    let limitNovo = parseInt(limit, 10)
    if (isNaN(limitNovo)) limitNovo = 10;

    if (pageNovo < 1) pageNovo = 1
    if (limitNovo > 100) limitNovo = 100   
    if (limitNovo < 1) limitNovo = 1

    return {pageNovo, limitNovo}
}

export const listarTarefas = async (pageRecebido, limiteRecebido) => {
    const {pageNovo, limitNovo} = normalizarPaginacao(pageRecebido, limiteRecebido)
    return await tasksRepository.findAllTasks(pageNovo, limitNovo)
}

/*Regras de serviço para criar uma tarefa nova*/

export const ehEmail = (emailTeste) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const resposta = regexEmail.test(emailTeste)
    return resposta
}

export const EmailCadastrado = async (email_user) => {
    const encontrado = await tasksRepository.existsUser(email_user)

    if (encontrado.length === 0) {
        const erro = new Error("Usuario não encontrado")
        erro.status = 404
        throw erro
    }
}

export const testarNome = (task_name) => {
    if (!task_name || !task_name.trim()) {
        const erro = new Error("O Nome da tarefa esta invalido, por favor insira um nome valido!");
        erro.status = 400
        throw erro
    }

    if (task_name.length > TAMANHO_MAX_NOME) {
        const erro = new Error("Por favor, insira um nome de ATE 100 caracteres");
        erro.status = 400
        throw erro
    }
}

export const testarData = (task_date) => {
    if (!task_date || !task_date.trim()) {
        const erro = new Error("Não foi enviada uma data para a tarefa, por favor envia a data!");
        erro.status = 400
        throw erro
    }

    const data = new Date(task_date)
    if (isNaN(data.getTime())) {
        const erro = new Error("A data enviada é invalida!");
        erro.status = 400
        throw erro
    }

    if (data < new Date()) {
        const erro = new Error("Não é possivel agendar uma tarefa para o passado")
        erro.status = 400
        throw erro
    }
}

export const tarefaDuplicada = async (email_user, task_date) => {
    const resposta = await tasksRepository.duplicateTask(email_user, task_date)

    if (resposta.length > 0) {
        const erro = new Error("Ja existe uma tarefa marcada")
        erro.status = 409   
        throw erro
    } 
}

export const criarNovaTarefa = async (email_user, task_name, task_date) => {
    const resultadoEmail = ehEmail(email_user)
    if (!resultadoEmail) {
        const erro = new Error("O Email do usuario não é valido! Tente novamente inserindo um email valido")
        erro.status = 400
        throw erro
    }

    testarNome(task_name)
    testarData(task_date)

    await EmailCadastrado(email_user)
    await tarefaDuplicada(email_user, task_date)
    
    return await tasksRepository.createTask(email_user, task_name, task_date)
}