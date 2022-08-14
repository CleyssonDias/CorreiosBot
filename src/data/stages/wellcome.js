const db = require("../database");

async function execute(client, user, msg, contato) {

    // Obtem a hora atual do PC para definir se vai ser Bom dia, tarde ou noite.
    stamp = new Date();
    hours = stamp.getHours();
    if (hours >= 18 && hours < 24) {
        time = "Boa noite"
    } else if (hours >= 12 && hours < 18) {
        time = "Boa tarde"
    } else if (hours >= 0 && hours < 12) {
        time = "Bom dia"
    }

    if(msg == '1' || msg == '2' || msg == '3' || msg == '4' || msg == '5' || msg == '6') {
      await db.set(`user_${user}`, {
        stage:Number(msg)
      })
      return ["Opção selecionada! Digite 'Ok' para continuar"]
    }

    return [`*_${time} ${contato}😉!!, sou um assistente virtual dos correios feito para lhe ajudar🙃!_* 
*👇 Veja meu menu de opções: 👇* 

*🌟 MENU 🌟*
_*1 -* Problemas com pedidos/encomendas_
_*2 -* Problemas com cartas/boletos_
_*3 -* Entrar em contato direto com um atendente_
_*4 -* Rastrear minha encomenda_
_*5 -* Verificar se meu pedido/encomenda está no CDD_`];

}

exports.execute = execute;