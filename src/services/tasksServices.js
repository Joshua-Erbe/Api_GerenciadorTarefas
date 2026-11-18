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

export const listarTarefas = async (pageRecebido, limiteRecebido) => {
    const {pageNovo, limitNovo} = normalizarPaginacao(pageRecebido, limiteRecebido)
    return await tasksRepository.findAllTasks(pageNovo, limitNovo)
}