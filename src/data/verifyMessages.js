const db = require("./database");

async function execute(CommandName,whats, msg, pay, pay2) {
    switch(CommandName) {
        case 'Cancelar':
            let grupo = await db.get(`user_${msg.sender.id}.problems.gid`)
            await whats.sendText(grupo, '❌ATENDIMENTO CANCELADO!❌')
            await whats.removeParticipant(grupo, msg.sender.id)
            await whats.leaveGroup(grupo)
            await db.set(`user_${msg.sender.id}`, {
                stage:0
            })
            whats.sendText(msg.sender.id, '✅ Atendimento Cancelado ✅')
            break
        case 'Entrar':
            let link = await whats.getGroupInviteLink(await db.get(`user_${msg.from}.problems.gid`))
            whats.sendText(msg.from, `Link de acesso ao atendimento: ${link}`)
            break
        case '/take':
            if (!pay || !pay2) {
                return await whats.sendText('msg.from', 'Argumentos invalidos')
            }
            var c = await db.get(`correiosdb.atendimentos`)
            if(!c) c = []
            var ok = false
            c.forEach(async (element, index, array) => {
                if (element.protocolAtendimento == pay) {
                   ok = true
                }
            })
            if (ok) {
                whats.sendText(msg.from, "Atendimendo ja foi Pegado!")
            }
            
           if (!ok) {
            await db.push(`correiosdb.atendimentos`, {
                nameAtendente: msg.sender.pushname,
                protocolAtendimento: pay,
                data: new Date()
            })
            let linkk = await whats.getGroupInviteLink(await db.get(`user_${pay2}.problems.gid`))

            whats.sendText(msg.from, `*${msg.sender.pushname} pegou o atendimento ${pay}!*            
Link de acesso ao atendimento: ${linkk}`)
           }
            break
        case '/close':
            if (!pay) {
                return await whats.sendText('msg.from', 'Argumentos invalidos')
            }
            let grupooo = await db.get(`user_${pay}.problems.gid`)
            await whats.sendText(grupooo, '😁O Atendente Fechou o atendimento :)😁')
            await whats.removeParticipant(grupooo, pay)
            await whats.leaveGroup(grupooo)
            await db.set(`user_${pay}`, {
            stage:0
            })
            return await whats.sendText('120363044322820074@g.us', '✅ATENDIMENTO FECHADO COM SUCESSO!✅')
            break
    }
}

exports.execute = execute;