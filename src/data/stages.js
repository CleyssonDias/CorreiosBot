const stages = {
  0:{
    obj: require('./stages/wellcome')
  },
  1:{
    obj: require('./stages/probPedidos')
  },
  2:{
    obj: require('./stages/probCartas')
  },
  3:{
    obj: require('./stages/atendente')
  },
  4:{
    obj: require('./stages/rastreio')
  },
  5:{
    obj: require('./stages/veCDD')
  },
  9999: {
    obj: require('./stages/grupo')
  }
}

module.exports = stages