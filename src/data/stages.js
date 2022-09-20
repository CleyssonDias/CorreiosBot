const stages = {
  0:{
    obj: require('./stages/0')
  },
  1:{
    obj: require('./stages/1')
  },
  2:{
    obj: require('./stages/2')
  },
  1.1: {
    obj: require('./subStages/1-1')
  },
  1.2: {
    obj: require('./subStages/1-2')
  },
  10: {
    obj: require('./stages/10')
  },
  commands: {
    obj: require('./verifyMessages')
  }
}

module.exports = stages