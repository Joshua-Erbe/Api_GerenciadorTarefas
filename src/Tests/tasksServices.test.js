import * as tasksServices from  "../services/tasksServices.js"

describe("normalizarPaginação", () => {
    it("Deve manter a pagina sempre acima de 1", () => {
        expect(tasksServices.normalizarPaginacao("0", "10")).toEqual({pageNovo: 1, limitNovo: 10});
    })

    it("Deve manter o limite de itens da pagina abaixo de 100", () => {
        expect(tasksServices.normalizarPaginacao("1", "500")).toEqual({pageNovo: 1, limitNovo: 100});
    })

    it ("Deve manter o limite de itens acima de 1", () => {
        expect(tasksServices.normalizarPaginacao("1", "0")).toEqual({pageNovo: 1, limitNovo: 1});
    })

    it ("Deve devolver a paginação como numeral sem alterar os numeros escolhidos", () => {
        expect(tasksServices.normalizarPaginacao("2", "20")).toEqual({pageNovo: 2, limitNovo: 20})
    })
})