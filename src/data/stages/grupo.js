const db = require("../database");
const crypto = require('crypto')

async function execute(client, user, msg, contato) {
  if (msg == '#') {
    let grupo = await db.get(`user_${user}.grup.id`)
    await client.sendText(grupo, '❌ATENDIMENTO CANCELADO!❌')
    await client.removeParticipant(grupo, user)
    await client.leaveGroup(grupo)
    await db.set(`user_${user}`, {
      stage:0
    })
    return ['✔️ATENDIMENTO CANCELADO COM SUCESSO!✔️']
  }

  if (msg == '@') {
    let link = await client.getGroupInviteLink(await db.get(`user_${user}.grup.id`))
    return [`Atendimento: ${link}`]
  }

  if(await db.get(`user_${user}.grup.id`)) {
    return ['Volte para seu atendimento ou cancele digitando: #']
  }
 
  let hex = crypto.randomBytes(4).toString('hex')

  const grup = await client.createGroup(`🔖 Atendimendo_${hex} 🔖`, [user])
  await db.set(`user_${user}.grup.id`, grup.gid._serialized)
  const userr = await db.get(`user_${user}`)
  client.sendText(userr.grup.id, `*🤔INFORMAÇÕES DO ATENDIMENTO🤔*

_☎️Nome do cliente: ${contato}_
_🤖Id Cliente: ${user}_
_😁Motivo do atentimento: ${userr.proble}_
_💢Código de rastreio: ${userr.cod}_
_🙄Descrição do problema: ${userr.desc}_

*❌ Digite "#" para cancelar a qualquer momento ❌*
*😉 Um(a) de nossos atendentes ira cuidar no seu caso em ate 24hrs aguarde!😉*`)
  client.sendText('120363044322820074@g.us', `🎫 NOVO ATENDIMENTO ABERTO 🎫
ID: ${userr.grup.id} `)
return ['*😊Você foi adicionado no seu chat de atendimento! Caso não digite "@" para pegar o link de acesso!😊*']
}

exports.execute = execute;