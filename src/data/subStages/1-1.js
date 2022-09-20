const db = require("../database");

async function execute(whats, msg) {


  if(msg.body == 'Continuar') {
    await db.set(`user_${msg.sender.id}.stage`, 1.2)
    let ops = [
      {
        buttonText: {
          displayText: "Não tenho o codigo"
        }  
      }
    ]
    return await whats.sendButtons(msg.from, '*🟢 Codigo de Rastreio! 🟢*', ops, `Digite seu codigo de rastreio para facilita seu atentimento!
Lembrando o Padrão correios consiste em: 4 letras e 9 numeros EX: *SS*123456789*SS*
*❗ CASO NÃO TENHA O CODIGO DE RASTREIO PRESSIONE _'Não tenho o codigo'_ ❗*`)
  }



  await db.set(`user_${msg.sender.id}.problems.desc`, msg.body)

  let buttons = [
    {
      buttonText: {
        displayText: "Continuar"
      }  
    }
  ]

  await whats.sendButtons(msg.from, '*🟢 Confirmação! 🟢*', buttons, `A descrição do seu problema é:

----------- Sua Descrição -----------

*${msg.body}*

------------------------------------------------

🔰 Pressione *'Continuar'* para prosseguir ou *digite novamente* caso tenha algum erro! 🔰`)


}

exports.execute = execute;