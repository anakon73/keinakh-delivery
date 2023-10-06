import RestrauntMenuItem from '../entities/RestrauntMenuItem'

import idGenerator from '../lib/idGenerator'

const menu: RestrauntMenuItem[] = [
  {
    description: 'Pizza 30sm, with sausage',
    id: idGenerator(),
    name: 'Pizza',
    price: 100,
    restrauntId: 0
  },
  {
    description: 'set of 10 sushi, with red fish',
    id: idGenerator(),
    name: 'sushi',
    price: 200,
    restrauntId: 0
  },
  {
    description: 'Small Cola, 500ml',
    id: idGenerator(),
    name: 'Cola',
    price: 30,
    restrauntId: 0
  },
  {
    description: 'Ice creame with nuts',
    id: idGenerator(),
    name: 'Ice creame',
    price: 50,
    restrauntId: 0
  },
  {
    description: 'Pizza 45sm, with vegetables',
    id: idGenerator(),
    name: 'Pizza',
    price: 180,
    restrauntId: 0
  },
  {
    description: 'set of 20 sushi, with rice',
    id: idGenerator(),
    name: 'sushi',
    price: 200,
    restrauntId: 0
  },
  {
    description: 'Big Cola, 1000ml',
    id: idGenerator(),
    name: 'Cola',
    price: 50,
    restrauntId: 0
  },
  {
    description: 'Ice creame',
    id: idGenerator(),
    name: 'Ice creame',
    price: 30,
    restrauntId: 0
  }
]

export default menu