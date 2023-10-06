import Menu from '../entities/Menu'
import Order from '../entities/Order'
import RestrauntMenuItem from '../entities/RestrauntMenuItem'

import idGenerator from '../lib/idGenerator'

interface IRestraunt {
  acceptOrder(): void
  denyOrder(): void
  open(): void
  close(): void
  editMenu(operation: 'add' | 'remove', itemName: RestrauntMenuItem): void
}

export default class Restraunt implements IRestraunt {
  id: number
  address: string
  status: 'open' | 'close'
  order: Order | null = null
  menu: Menu

  constructor(address: string) {
    this.id = idGenerator()
    this.address = address
    this.status = 'close'
    this.menu = new Menu()
  }

  acceptOrder(): void {

  }

  denyOrder(): void {

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