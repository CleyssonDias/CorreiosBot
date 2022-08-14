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
      return [`*🤔 Está Separada? 🤔*
      
_⛳Minha encomenda já está pronta pra retirada?:_ *SIM*
_😉Horario para retirada:_ *13:00h ás 16:00h*`]
    } else {
      db.set(`user_${user}`, {
        stage:0
      })
      return [`*🤔 Está Separada? 🤔*
      
      _⛳Minha encomenda já está pronta pra retirada?:_ *NÃO*
      _😉Horario para retirada:_ *13:00h ás 16:00h*`]
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