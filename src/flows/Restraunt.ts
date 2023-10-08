import { type IMenu, Menu } from '../entities/Menu'
import { type IOrder, Order } from '../entities/Order'
import RestrauntMenuItem from '../entities/RestrauntMenuItem'

import idGenerator from '../lib/idGenerator'

export interface IRestraunt {
  id: number
  address: string
  status: 'open' | 'close'
  order: IOrder
  menu: IMenu

  acceptOrder(order: IOrder): void
  denyOrder(order: IOrder): void
  startPrepearing(order: IOrder): void
  startDenied(order: IOrder): void
  open(): void
  close(): void
  editMenu(operation: 'add' | 'remove', itemName: RestrauntMenuItem): void
}

export class Restraunt implements IRestraunt {
  id: number
  address: string
  status: 'open' | 'close'
  order: IOrder
  menu: IMenu

  constructor(address: string) {
    this.id = idGenerator()
    this.address = address
    this.status = 'close'
    this.menu = new Menu()
    this.order = new Order(0, this.id)
  }

  acceptOrder(order: IOrder): void {
    order.status = 'kitchen_accepted'
    this.order = order
    this.startPrepearing(order)
  }

  denyOrder(order: IOrder): void {
    order.status = 'kitchen_denied'
    this.order = order
    this.startDenied(order)
  }

  startPrepearing(order: IOrder): void {
    if (order.status === 'kitchen_accepted') {
      order.status = 'kitchen_preparing'
    }
  }

  startDenied(order: IOrder): void {
    if (order.status === 'kitchen_denied') {
      order.status = 'kitchen_refunded'
    }
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