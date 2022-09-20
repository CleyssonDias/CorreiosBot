const db = require("../database");

async function execute(whats, msg) {

  if(msg.body == 'Opção: 1' || msg.body == 'Opção: 2' || msg.body == 'Opção: 3'){
    let FormatOp = msg.body.split(' ');

    if (FormatOp[1] == '1') await db.set(`user_${msg.from}.problems.why`, 'Problemas com encomendas/pedidos');
    if (FormatOp[1] == '2') await db.set(`user_${msg.from}.problems.why`, 'Problemas com cartas');
    if (FormatOp[1] == '3') await db.set(`user_${msg.from}.problems.why`, 'Atentimento Direto');

    await db.set(`user_${msg.sender.id}.stage`, 1.1)

    return await await whats.sendText(msg.from, `_Escreva *DETALHADAMENTE* o problema em questão, para que possa ser encaminhado para nossos atendentes_`);
  }

  await whats.sendText(msg.from, `_Parece que você está com problemas!_ 😖
*Selecione uma opção abaixo, para eu conseguir indentificar seu problema!*`);

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
    },
    {
      buttonText: {
        displayText: "Opção: 3"
      }  
    }
  ]

  await whats.sendButtons(msg.from, '*Selecione seu problema:*', buttons, `*1️⃣ - Problemas com encomendas/pedidos*
*2️⃣ - Problemas com cartas*
*3️⃣ - Atentimento Direto*`)

}

exports.execute = execute;