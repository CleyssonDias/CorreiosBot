const db = require("../database");

async function execute(client, user, msg, contato) {
  const format = msg.split(' ')

  if (format[0] == '/cod') {
    await db.set(`user_${user}.cod`, format[1]) 
    return ['*🆗Codigo Adicionado com sucesso!🆗*']
  } else if (format[0] == '/desc') {
    let resf = msg.split('/desc')
    await db.set(`user_${user}.desc`, resf) 
    return ['*🆗Descrição Adicionada com sucesso🆗*']
  } 
  if (msg == "#") {
    await db.set(`user_${user}`, {
      stage:0
    })
    return ['*Cancelado com sucesso!😥*']
  }
  if (msg == "@") {
    let userConfirm = await db.get(`user_${user}`)
    if (!userConfirm.cod || !userConfirm.desc) {
      return ['*😁Siga as intruções para continuar!😁*']
    }
    await db.set(`user_${user}.proble`, "Problemas com cartas/boletos")
    await db.set(`user_${user}.stage`,9999)
    return ['*Digite "Ok" para continuar*']

  }
  
  return [`🧐 Instruções 🧐

_*👉Digite: /cod {Seu codigo de rastreio}*_  
    *Caso não tenha digite /cod -*
_*👉Digite: /desc {Sua descrição do problema}*_
    *Caso não tenha digite /desc -*

_🟩 Para continuar digite: @ 🟩_
_❌ Para cancelar digite: # ❌_

*🔎OBS: VOCÈ SÓ IRA PROSSEGUIR QUANDO SEGUIR AS INSTRUÇÕES!🔎*
`]
}

exports.execute = execute;