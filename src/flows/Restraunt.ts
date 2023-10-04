import Order from '../entities/Order'
import RestrauntMenuItem from '../entities/RestrauntMenuItem'

import idGenerator from '../lib/idGenerator'

interface IRestraunt {
  acceptOrder(): void
  denyOrder(): void
  open(): void
  close(): void
  editMenu(): void
}

export default class Restraunt implements IRestraunt {
  id: number
  address: string
  status: 'open' | 'close'
  order: Order
  menu: RestrauntMenuItem[]

  constructor(address: string) {
    this.id = idGenerator()
    this.address = address
    this.status = 'close'
    this.menu = []
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

  editMenu(): void {

  }
}