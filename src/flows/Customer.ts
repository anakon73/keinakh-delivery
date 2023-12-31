import idGenerator from '../lib/idGenerator'

import { type Order, OrderImpl } from '../entities/Order'

import { IOrderItems } from '../types'

export interface Customer {
  id: number
  phone: string
  name: string
  email: string
  adress: string
  history: Order[]
  balance: number
  order: Order

  createOrder(restrauntId: number, orderItems: IOrderItems[]): Order
  showHistory(): Order[]
  takeOrder(order: Order): void
  addOrderToHistroty(order: Order): void
}

export interface CustomerImpl extends Customer { }

export class CustomerImpl {
  id: number
  phone: string
  name: string
  email: string
  adress: string
  history: Order[]
  balance: number
  order: Order

  constructor(
    phone: string,
    name: string,
    email: string,
    adress: string,
    balance: number
  ) {
    this.phone = phone
    this.email = email
    this.name = name
    this.adress = adress
    this.id = idGenerator()
    this.balance = balance
    this.history = []
    this.order = new OrderImpl(0, 0)
  }

  createOrder(restrauntId: number, orderItems: IOrderItems[]): Order {
    const newOrder = new OrderImpl(this.id, restrauntId)
    orderItems.forEach((orderItem) => {
      newOrder.addItem(orderItem.item, orderItem.quantity)
    })

    if (this.balance >= newOrder.price) {
      this.order.restrauntId = restrauntId
      this.order = newOrder
      this.order.customerPaid()
      return newOrder
    } else {
      this.order.customerCancelled()
      throw new Error(`Not enough money on balance, need ${newOrder.price}, have ${this.balance}`)
    }
  }

  takeOrder(order: Order): void {
    if (order.getOrderStatus() === 'delivery_complete') {
      this.addOrderToHistroty(this.order)
    }
  }

  showHistory(): Order[] {
    return this.history
  }

  addOrderToHistroty(order: Order): void {
    this.history.push(order)
  }
}
