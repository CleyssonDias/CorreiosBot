// ! Importando Lib's
const venom = require('venom-bot')

// ! Importando Data do Bot
const db = require('./data/database')
const stages = require('./data/stages')

// ! Função principal do Venom-Bot
venom.create({ session: 'Correios' }).then((client) => {
    // ? Função para Ouvir as mensagens
    client.onMessage(async (message) => {
        if(message.chat.id == '120363044322820074@g.us') {

            var format = message.body.split(' ')

            if (format[0] == '/close') {
                let grupo = await db.get(`user_${format[1]}.grup.id`)
                await client.sendText(grupo, '😁Seu atendimento fechado com sucesso😁')
                await client.removeParticipant(grupo, format[1])
                await client.leaveGroup(grupo)
                await db.set(`user_${format[1]}`, {
                stage:0
                })
                return await client.sendText('120363044322820074@g.us', '✅ATENDIMENTO FECHADO COM SUCESSO!✅')
            } else if (format[0] == '/add') {
                await db.set(`banco_CDD_${format[1]}`, {
                    ok:true
                })
                return await client.sendText('120363044322820074@g.us', '✅CÓDIGO ADICIONADO PARA CLIENTE VIM RETIRAR✅')
            
            } else if (format[0] == '/link') {
            var linkkk = await client.getGroupInviteLink(format[1])
            return await client.sendText('120363044322820074@g.us', `_*🎫 Link do atendimento ${format[1]}: 🎫*_ \n\n${linkkk}`)
        }
        } else if (message.chat.kind == "chat") {
            const stage = await stages[await getStage(message.from)].obj.execute(
                client,
                message.from,
                message.body,
                message.sender.pushname
            )
    
            // ? Fazendo um loop para enviar as mensagens do array
            for (let messagee = 0; messagee < stage.length; messagee++) {
                const messageSend = stage[messagee]
                client.sendText(message.from, messageSend)
            }
        }
       
    })
   
})

// ! Função para pegar o estagio atual do cliente
async function getStage(user) {
    try {
        if(await db.get(`user_${user}`)) {
            return await db.get(`user_${user}.stage`)
        } else {
            await db.set(`user_${user}`, {
                stage:0
            })
            return await db.get(`user_${user}.stage`)
        }
    } catch (err) {
        console.log(err)
    }
    
}
  

