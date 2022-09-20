const db = require("../database");

async function execute(whats, msg) {

  if (msg.body == 'Opção: 1') {
    let FormatOp = msg.body.split(' ');
    
    await db.set(`user_${msg.sender.id}.stage`, FormatOp[1])

    return await whats.sendButtons(msg.from, 'Precione "Ok" Para continuar', [{
      buttonText: {
        displayText: "OK"
      }
    }], `Pressione abaixo`)

  }

  if (msg.body == 'Opção: 2') {
    let FormatOp = msg.body.split(' ');
    
    await db.set(`user_${msg.sender.id}.stage`, FormatOp[1])

    return await whats.sendText(msg.from, '_*Digite seu código de rastreio*_')
  }




  await whats.sendText(msg.from, `*Olá ${msg.sender.pushname || "Cliente"}*, _Sou uma inteligencia artificial feita para lhe ajudar!_ 
Logo abaixo terá um menu, selecione uma das opções para continuar!
  `)


  let buttons = [
    {
      buttonText: {
        displayText: "Opção: 1"
      }
    },
    {
      buttonText: {
        displayText: "Opção: 2"
      }
    }
  ]

  await whats.sendButtons(msg.from, '*Selecione uma das opções abaixo:*', buttons, `*1️⃣ - Problemas*
*2️⃣ - Rastreio de encomendas*`)


}

exports.execute = execute;