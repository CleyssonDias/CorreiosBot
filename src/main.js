const venom = require('venom-bot')

venom.create({ session: 'Correios' }).then((client) => {
    client.onMessage((message) => {
       
        if( message.body == 'hi' ){
            client.sendText(message.from, 'lçadsjçlsajdlk');
        }
    })
})
  

