const db = require("../database");
const correios = require('correios-rastreamento')

async function execute(whats, msg) {
  
  if (msg.body == "Mais detalhes"){
    await whats.sendText(msg.from, await db.get(`user_${msg.sender.id}.enco`))
    return await whats.sendButtons(msg.from, '*Rastreio 📰*', [
    {
      buttonText: {
        displayText: "Voltar ao menu"
      }
    }], 'Pressione pra voltar ao menu')
  
  }

  if (msg.body == "Voltar ao menu"){
    await whats.sendText(msg.from, '✅')
   return await db.set(`user_${msg.sender.id}`, {
      stage: 0
    });
  
  }
  
    var pay = "*📰Rastreio📰* \n"
    var status = '';
    const ras = await correios.sro.rastrearObjeto(msg.body)
    if (ras.status_list.length > 0) {
      for (let i = 0; i < ras.status_list.length ;i++) {
        pay += `🗯️${ras.status_list[i].status}
    📆${ras.status_list[i].data}
    ✈️${ras.status_list[i].origem?ras.status_list[i].origem:'Origem: -'}
    ✈️${ras.status_list[i].destino?ras.status_list[i].destino:'Destino: -'}
    📮${ras.status_list[i].local?ras.status_list[i].local:'Local: -'} \n\n` 
  
   
    }
  
    const info = ras.status_list[ras.status_list.length - 1].status
  
    switch (info) {
        case 'Status: Objeto recebido pelos Correios do Brasil':
          status = 'Sua encomenda chegou no brasil 😀✈️'
          break
        case 'Status: Objeto em trânsito - por favor aguarde':
          status = 'Sua encomenda está a caminho 😬🚗'
          break
        case 'Status: Objeto saiu para entrega ao destinatário':
          status = 'Sua encomenda está indo para sua casa 🤣🏠 '
          break
        case 'Status: Objeto entregue ao destinatário':
          status = 'Sua encomenda chegou 😁👌'
          break
        default:
          status = 'Veja Mais Detalhes ou Verifique o Codigo de Rastreio'
    }
  
    if (msg.body != "Mais detalhes") {
      await db.set(`user_${msg.sender.id}.enco`, pay)
    }
    
  
  
   return await whats.sendButtons(msg.from, '*Rastreio 📰*', [{
      buttonText: {
        displayText: `Mais detalhes`
      }
    },
    {
      buttonText: {
        displayText: "Voltar ao menu"
      }
    }], `Protudo: *${msg.body}*
  
  *------------------- RASTREIO -------------------*
  
  _*${status || "Falha no rastreio da sua encomenda, verifique o codigo de rastreio e tente novamente ou veja mais detalhes!"}*_
  
  *---------------------------------------------------------*
  
  _Pressione *'Mais detalhes'* para ver os detalhes do seu pedido_
  _Digite *'Voltar ao menu'* para voltar ao menu principal_
  `)
  
   
    
    } 
    

    await whats.sendButtons(msg.from, '*Rastreio 📰*', [
    {
      buttonText: {
        displayText: "Voltar ao menu"
      }
    }], `Protudo: *${msg.body}*
  
  *------------------- RASTREIO -------------------*
  
  _*${status || "Falha no rastreio da sua encomenda, verifique o codigo de rastreio e tente novamente!"}*_
  
  *---------------------------------------------------------*
  
  _Pressione *'Mais detalhes'* para ver os detalhes do seu pedido_
  _Digite *'Voltar ao menu'* para voltar ao menu principal_
  `)
   
}

exports.execute = execute;