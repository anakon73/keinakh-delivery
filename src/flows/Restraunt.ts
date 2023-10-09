import { type Menu, MenuImpl } from '../entities/Menu'
import { type Order, OrderImpl } from '../entities/Order'
import RestrauntMenuItem from '../entities/RestrauntMenuItem'

import idGenerator from '../lib/idGenerator'

export interface Restraunt {
  id: number
  address: string
  status: 'open' | 'close'
  order: Order
  menu: Menu

  acceptOrder(order: Order): void
  denyOrder(order: Order): void
  startPrepearing(order: Order): void
  startDenied(order: Order): void
  open(): void
  close(): void
  editMenu(operation: 'add' | 'remove', itemName: RestrauntMenuItem): void
}

export interface RestrauntImpl extends Restraunt { }

export class RestrauntImpl {
  id: number
  address: string
  status: 'open' | 'close'
  order: Order
  menu: Menu

  constructor(address: string) {
    this.id = idGenerator()
    this.address = address
    this.status = 'close'
    this.menu = new MenuImpl()
    this.order = new OrderImpl(0, this.id)
  }

  acceptOrder(order: Order): void {
    order.kitchenAccepted()
    this.order = order
    this.startPrepearing(order)
  }

  denyOrder(order: Order): void {
    order.kitchenDenied()
    this.order = order
    this.startDenied(order)
  }

  startPrepearing(order: Order): void {
    if (order.getOrderStatus() === 'kitchen_accepted') {
      order.kitchenPreparing()
    }
  }

  startDenied(order: Order): void {
    if (order.getOrderStatus() === 'kitchen_denied') {
      order.kitchenRefunded()
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