import Menu from '../entities/Menu'
import Order from '../entities/Order'
import RestrauntMenuItem from '../entities/RestrauntMenuItem'

import idGenerator from '../lib/idGenerator'

interface IRestraunt {
  acceptOrder(order: Order): void
  denyOrder(order: Order): void
  open(): void
  close(): void
  editMenu(operation: 'add' | 'remove', itemName: RestrauntMenuItem): void
}

export default class Restraunt implements IRestraunt {
  id: number
  address: string
  status: 'open' | 'close'
  order: Order
  menu: Menu

  constructor(address: string) {
    this.id = idGenerator()
    this.address = address
    this.status = 'close'
    this.menu = new Menu()
    this.order = new Order(0, this.id)
  }

  acceptOrder(order: Order): void {
    order.status = 'kitchen_accepted'
    this.order = order
  }

  denyOrder(order: Order): void {
    order.status = 'kitchen_denied'
    order = new Order(0, 0)
    this.order = order
  }

  open(): void {
    this.status = 'open'
  }

  close(): void {
    this.status = 'close'
  }

  editMenu(operation: 'add' | 'remove', item: RestrauntMenuItem): void {
    if (operation === 'add') {
      this.menu.addItem(item)
    }
    else if (operation === 'remove') {
      this.menu.removeItem(item)
    }
  }
}