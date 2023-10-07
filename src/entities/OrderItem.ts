import idGenerator from '../lib/idGenerator'

import RestrauntMenuItem from './RestrauntMenuItem'

export default class OrderItem {
  id: number
  price: number
  quantity: number
  restrauntMenuItem: RestrauntMenuItem

  constructor(
    restrauntMenuItem: RestrauntMenuItem,
    quantity: number,
  ) {
    this.id = idGenerator()
    this.quantity = quantity
    this.restrauntMenuItem = restrauntMenuItem
    this.price = quantity * restrauntMenuItem.price
  }
}
