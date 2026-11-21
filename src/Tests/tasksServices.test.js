import * as tasksServices from  "../services/tasksServices.js"
import * as tasksRepository from "../repository/tasksRepository.js"

jest.mock("../repository/tasksRepository.js")

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

describe("ehEmail?", () => {
    it("Deve validar o email e dizer se esta no formato padrão", (gi) => {
        expect(tasksServices.ehEmail("joshuaoliveira@gmail.com")).toEqual(true);
    })

    it("Deve falhar em caso de um email sem @", () => {
        expect(tasksServices.ehEmail("joshuaoliveiragmail.com")).toEqual(false);
    })

    it("Deve reportar que o inserido abaixo NÃO é um email", () => {
        expect(tasksServices.ehEmail("isso não é um email")).toEqual(false);
    })

    it("Deve reportar que o email abaixo não tem a extensão de dominio", () => {
        expect(tasksServices.ehEmail("joshuaoliveira@gmail")).toEqual(false);
    })
})

describe("EmailCadastrado", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("Deve lançar erro 404 quando o usuario não existe", async () => {
        tasksRepository.existsUser.mockResolvedValue([])

        await expect(() => tasksServices.EmailCadastrado("joshuaerbe@gmail.com")
            .rejects.toThrow("Usuario não encontrado"));
    })

    it("Não deve lançar erro quando o usuario existe", async () => {
        tasksRepository.existsUser.mockResolvedValue([{ id_user: 1 }])

        await expect(tasksServices.EmailCadastrado("joshuaoliveira@outlook.com"))
            .resolves.toBeUndefined()
    })
})

describe("testarNome", () => {
    it("Deve lançar um erro 400 quando o nome vem vazio", () => {
        expect(() => tasksServices.testarNome("")).toThrow("O Nome da tarefa esta invalido, por favor insira um nome valido!");
    })

    it("Deve lançar um erro 400 quando o nome ultrapassa os 100 caracteres", () => {
        const nomelongo = "a".repeat(101);
        expect(() => tasksServices.testarNome(nomelongo)).toThrow("Por favor, insira um nome de ATE 100 caracteres")
    })

    it("Não deve retornar nada quando o nome atende aos requisitos", () => {
        expect(tasksServices.testarNome("Fazer compra as 4 da tarde")).toBeUndefined();
    })
})

describe("testarData", () => {
    it("Deve retornar um erro quando a data não é enviada", () => {
        expect(() => tasksServices.testarData("")).toThrow("Não foi enviada uma data para a tarefa, por favor envia a data!")
    })

    it("Deve retornar um erro quando a data enviada esta invalida ou não foi enviada no formato correto", () => {
        expect(() => tasksServices.testarData("20-10-2021 14:16")).toThrow("A data enviada é invalida!")
    })

    it("Deve retornar um erro quando a data enviada para a tarefa é no passado, considerando a data atual do sistema", () => {
        expect(() => tasksServices.testarData("2026-11-03 12:41:00")).toThrow("Não é possivel agendar uma tarefa para o passado")
    })

    it("Não deve retornar nada se a data for valida conforme os requisitos", () => {
        expect(tasksServices.testarData("2026-11-22 12:41:00")).toBeUndefined()
    })
})

describe("tarefaDuplicada", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("Deve lançar um erro 409 quando a uma tarefa agendada para o mesmo horario", async () => {
        tasksRepository.duplicateTask.mockResolvedValue([{id_task: 2}])

        await expect(tasksServices.tarefaDuplicada("joshuaoliveira@outlook.com", "2026-11-22 12:41:00"))
            .rejects.toThrow("Ja existe uma tarefa marcada")
    })

    it("Não deve lançar erro quando não existe tarefa para aquele momento", async () => {
        tasksRepository.duplicateTask.mockResolvedValue([])

        await expect(tasksServices.tarefaDuplicada("joshuaoliveira@outlook.com", "2026-11-22 12:41:00"))
            .resolves.toBeUndefined();
    })
})