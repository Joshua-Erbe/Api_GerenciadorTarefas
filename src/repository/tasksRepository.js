import poolconnect from '../connect.js'

export const findAllTasks = async (page, limit) => {
    try {
        const offset = (page - 1) * limit

        const [logs] = await poolconnect.execute(
            `SELECT * FROM tasks ORDER BY created_at DESC, id_task DESC LIMIT ? OFFSET ?`, [limit, offset]
        )
        return logs
    } catch (error) {
        console.log(`Esse foi o erro encontrado ao pegar as tarefas: ${error}`)
        throw new Error('Erro ao buscar as tasks no banco do dados');
    }
}

export const existsUser = async (email_user) => {
    try {
        const [rows] = await poolconnect.execute(
            `SELECT * FROM users WHERE email_user = ?`, [email_user]
        )

        return rows
    } catch (error) {
        console.log(`Esse foi o erro encontrado: ${error}`)
        throw new Error("Erro ao buscar um usuario cadastrado com o email escolhido")
    }
}

export const duplicateTask = async (email_user, task_date) => {
    try {
        const [user_id] = await poolconnect.execute(
            `SELECT id_user FROM users WHERE email_user = ?`, [email_user]
        )
        const who_id = user_id[0].id_user

        const [tasks] = await poolconnect.execute(
            `SELECT id_task FROM tasks WHERE who_task = ? AND task_date = ?`, [who_id, task_date]
        )

        return tasks
    } catch (error) {
        console.log(`Esse foi o erro encontrado ao testar a task: ${error.message}`)
        throw new Error("Não foi possivel testar a existencia da task");
    }
}
 
export const createTask = async (emailuser, taskname, taskdate) => {
    try {
        const [user_id] = await poolconnect.execute(
            `SELECT id_user FROM users WHERE email_user = ?`, [emailuser]
        )
        const who_id = user_id[0].id_user

        const [response] = await poolconnect.execute(
            `INSERT INTO tasks(who_task, task_name, task_date)
            VALUES (?, ?, ?)`, [who_id, taskname, taskdate]
        )

        if (response.affectedRows === 0) {
            const erro = new Error('Erro ao registrar a tarefa, verifique as informações e tente novamente!')
            erro.status = 400
            throw erro
        } else {
            return {
                mensagem: 'Tarefa adicionada com sucesso!'
            }
        }
    } catch (error) {
        console.log(`Esse foi o erro encontrado ao registrar a tarefa: ${error}`)
        throw new Error('Erro ao registrar a tarefa! tente novamente')
    }
}

export const deleteTask = async (idtask) => {
    try {
        const [response] = await poolconnect.execute(
            'DELETE FROM tasks WHERE id_task = ?', [idtask]
        ) 

        if (response.affectedRows === 0) {
            throw new Error('Nenhuma tarefa foi deletada! Verifique as informações e tente novamente!')
        } else {
            return {
                MessageSystem: 'Tarefa deletada com sucesso'
            }
        }
    } catch (error) {
        console.log(`Esse foi o erro encontrado ao deletar a task: ${error}`)
        throw new Error('Erro ao deletar a tarefa')
    }
}

export const updateTask = async (idtask, newname, newdate) => {
    try {
        const [response] = await poolconnect.execute(
            `UPDATE tasks
            SET task_name = ?, task_date = ?
            WHERE id_task = ?`, [newname, newdate, idtask]
        )

        if (response.affectedRows === 0) {
            throw new Error('Não foi possivel atualizar a tarefa! Verifique as informações e tente novamente!')
        } 

        if (response.changedRows === 0) {
            return {
                MessageSystem: 'Informações inseridas são identicas as registradas, verifique as informações inseridas'
            }
        }

        return {
            MessageSystem: "Tarefa atualizada com sucesso!"
        }
    } catch (error) {
        console.log(`Esse foi o erro encontrado ao atualizar a tarefa: ${error}`)
        throw new Error('Erro ao atualizar tarefa! Verifique as informações e tente novamente')
    }
}