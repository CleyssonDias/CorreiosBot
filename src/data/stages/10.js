const db = require("../database");
const crypto = require('crypto')

async function execute(whats, msg) {
  const atendd = await db.get(`user_${msg.sender.id}.problems.gid`)

  if(atendd) {
    let opss = [
      {
        buttonText: {
          displayText: "Cancelar"
        }  
      }
    ]
    return await whats.sendButtons(msg.from, 'Atendimento em Aberto!', opss, `Ue? Parece que você está em um atendimento!
Volte pro seu atendimento ou pressione *'Cancelar'* para fecha seu atendimento`)
  }
 
  
  try {
  let Protocol = crypto.randomBytes(4).toString('hex')

  const atend = await whats.createGroup(`🔖 Atendimendo_${Protocol} 🔖`, [msg.from])
  // atend.gid._serialized
  await db.set(`user_${msg.sender.id}.problems.gid`, atend.gid._serialized)
  await db.set(`user_${msg.sender.id}.problems.protocol`, Protocol)

  let ops = [
    {
      buttonText: {
        displayText: "Cancelar"
      }  
    }
  ]
  const atenddd = await db.get(`user_${msg.sender.id}.problems`)
    await whats.sendText(atend.gid._serialized,  `*Atendimento aberto ✅*`)
    await whats.sendText(atend.gid._serialized,  `_*Um dos nossos atendentes iria lhe atender em ate 24 horas aguarde!*_`)
    await whats.sendButtons(atend.gid._serialized, '*ℹ️ Informaçôes ℹ️*', ops, `*Algumas informaçôes do seu atendimento:*
_Seu nome:_ *${msg.sender.pushname}*
_Protocolo do atendimento:_ *${Protocol}*
_Motivo do atendimento:_ *${atenddd.why}*
_Cod. de Rastreio:_ *${atenddd.cod || "Sem Codigo"}*
_Descrição do problema:_ *${atenddd.desc}*

⚠️ Cancele seu atentimento a qualquer momento pressionando *'Cancelar'* ⚠️`)

let opsss = [
  {
    buttonText: {
      displayText: `/take ${Protocol} ${msg.sender.id}`
    }  
  },
  {
    buttonText: {
      displayText: `/close ${msg.sender.id}`
    }  
  }
]

await whats.sendButtons('120363044322820074@g.us', '*ℹ️ Atendimento ℹ️*', opsss, `*Informaçôes do atendimento ${Protocol}:*
_Nome do cliente:_ *${msg.sender.pushname}*
_Protocolo do atendimento:_ *${Protocol}*
_Motivo do atendimento:_ *${atenddd.why}*
_Cod. de Rastreio:_ *${atenddd.cod || "Sem Codigo"}*
_Descrição do problema:_ *${atenddd.desc}*`)


let opss = [
  {
    buttonText: {
      displayText: "Cancelar"
    }  
  },
  {
    buttonText: {
      displayText: "Entrar"
    }  
  }
]

    await whats.sendText(msg.from,  `*Atendimento aberto ✅*`)
    await whats.sendText(msg.from,  `_*Olhe na sua lista de conversas no whatsapp para continuar com seu atendimento!*_`)
    await whats.sendButtons(msg.from,  '*😀 Atendimento 😀*', opss, `Pressione *'Cancelar'* para cancelar seu Atendimento
Caso você não tenha sido adicionado no grupo de atendimento pressione 'Entrar'`)
  } catch(err) {
    console.log(err)
  }
  
}

exports.execute = execute;