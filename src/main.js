// ! Importando Lib's
const venom = require('venom-bot')

// ! Importando Data do Bot
const db = require('./data/database')
const stages = require('./data/stages')

const commands = ['Cancelar', 'Entrar', '/take', '/close']

// ! Função principal do Venom-Bot
venom.create({ session: 'Correios' }).then((whats) => {


    // ? Função para Ouvir as mensagens
    whats.onMessage(async (msg) => {

    if(await db.get(`user_${msg.sender.id}.problems.gid`) || msg.from == '120363044322820074@g.us') {
        try {
            var format = msg.body.split(' ')

            if (commands.indexOf(format[0]) != -1) {
                try {
                    return await stages.commands.obj.execute(
                        format[0],
                        whats,
                        msg,
                        format[1],
                        format[2]
                    )
                } catch (err) {
                    return console.log(err)
                }
            }
        } catch (err) {
            console.log(err)
        }
       
    }
       

        if (msg.chat.kind == 'chat') {
            await stages[await getStage(msg.from)].obj.execute(
                whats,
                msg
            )
        }
    })

})

// ! Função para pegar o estagio atual do cliente
async function getStage(user) {
    try {
        if (await db.get(`user_${user}`)) {
            return await db.get(`user_${user}.stage`)
        } else {
            await db.set(`user_${user}`, {
                stage: 0
            })
            return await db.get(`user_${user}.stage`)
        }
    } catch (err) {
        console.log(err)
    }
}


