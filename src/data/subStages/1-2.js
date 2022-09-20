const db = require("../database");

async function execute(whats, msg) {
  if (msg.body == 'Não tenho o codigo' || msg.body == 'Continuar') {
    await db.set(`user_${msg.sender.id}.stage`, 10);

    return await whats.sendButtons(msg.from, 'Precione "Ok" Para continuar', [{
      buttonText: {
        displayText: "OK"
      }
    }], `Pressione abaixo`)
    
  }

  await db.set(`user_${msg.sender.id}.problems.cod`, msg.body)

  let buttons = [
    {
      buttonText: {
        displayText: "Continuar"
      }  
    }
  ]

  await whats.sendButtons(msg.from, '*🟢 Confirmação! 🟢*', buttons, `O codigo do seu problema é:

----------- Seu Codigo -----------

*${msg.body}*

---------------------------------------------

🔰 Pressione *'Continuar'* para prosseguir ou *digite novamente* caso tenha algum erro! 🔰`)

}

exports.execute = execute;