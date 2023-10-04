import idGenerator from '../lib/idGenerator'

import RestrauntMenuItem from './RestrauntMenuItem'

export default class OrderItem {
  id: number
  price: number
  quantity: number
  restrauntMenuItem: RestrauntMenuItem

  constructor(
    id: number,
    price: number,
    quantity: number,
    restrauntMenuItem: RestrauntMenuItem
  ) {
    this.id = idGenerator()
    this.price = price
    this.quantity = quantity
    this.restrauntMenuItem = restrauntMenuItem
  }
}