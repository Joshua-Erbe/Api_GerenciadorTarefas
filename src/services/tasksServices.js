import * as tasksRepository from "../repository/tasksRepository.js";

const normalizarPaginação = (page, limit) => {
    let pageNovo = parseInt(page, 10 ) || 1;
    let limitNovo = parseInt(limit, 10) || 10;

    if (pageNovo < 1) pageNovo = 1
    if (limitNovo > 100) limitNovo = 100   
    if (limitNovo < 1) limitNovo = 1

    return {pageNovo, limitNovo}
}

export const listarTarefas = async (pageRecebido, limiteRecebido) => {
    const {pageNovo, limitNovo} = normalizarPaginação(pageRecebido, limiteRecebido)
    return await tasksRepository.findAllTasks(pageNovo, limitNovo)
}