const db = require("../database");
const correios = require('correios-rastreamento')

async function execute(client, user, msg, contato) {
  if (msg == 'ok' || msg == 'Ok' || msg == 'oK') {
    return ["_*📰 Digite seu codigo de rastreio: 📰*_"]
  }
  var pay = "*📰Rastreio📰* \n"
  const ras = await correios.sro.rastrearObjeto(msg)
  for (let i = 0; i < ras.status_list.length ;i++) {

    pay += `🗯️${ras.status_list[i].status}
📆${ras.status_list[i].data}
✈️${ras.status_list[i].origem?ras.status_list[i].origem:'Origem: -'}
✈️${ras.status_list[i].destino?ras.status_list[i].destino:'Destino: -'}
📮${ras.status_list[i].local?ras.status_list[i].local:'Local: -'} \n\n`
  }

  await db.set(`user_${user}`, {
    stage:0
  })
  return [pay]
}

exports.execute = execute;