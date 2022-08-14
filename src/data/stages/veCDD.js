const db = require("../database");

async function execute(client, user, msg, contato) {
  const format = msg.split(' ')

  if (format[0] == '/cod') {
    await db.set(`user_${user}.cod`, format[1]) 
    return ['*🆗Codigo Adicionado com sucesso!🆗*']
  } 

  if (msg == "#") {
    await db.set(`user_${user}`, {
      stage:0
    })
    return ['*Cancelado com sucesso!😥*']
  }
  if (msg == "@") {
    let userConfirm = await db.get(`user_${user}`)
    if (!userConfirm.cod) {
      return ['*😁Siga as intruções para continuar!😁*']
    }
    
    const p = await db.get(`banco_CDD_${await db.get(`user_${user}.cod`)}`)
    if (p) {
      db.set(`user_${user}`, {
        stage:0
      })
      return ['*Sua encomenda está com a gente!*', '*Você pode vim retirar no CDD das 13h até as 16*']
    } else {
      db.set(`user_${user}`, {
        stage:0
      })
      return ['*😥Sua encomenda ainda não está com a gente😥*']
    }
    

  }
  
  return [`🧐 Instruções 🧐

_*👉Digite: /cod {Seu codigo de rastreio}*_  

_🟩 Para continuar digite: @ 🟩_
_❌ Para cancelar digite: # ❌_

*🔎OBS: VOCÈ SÓ IRA PROSSEGUIR QUANDO SEGUIR AS INSTRUÇÕES!🔎*
`]
}

exports.execute = execute;