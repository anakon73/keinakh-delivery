import idGenerator from '../lib/idGenerator'

import { type IOrder, Order } from '../entities/Order'

import { IOrderItems } from '../types'

export interface ICustomer {
  id: number
  phone: string
  name: string
  email: string
  adress: string
  history: IOrder[]
  balance: number
  order: IOrder

  createOrder(restrauntId: number, orderItems: IOrderItems[]): IOrder
  showHistory(): IOrder[]
  takeOrder(order: IOrder): void
  addOrderToHistroty(order: IOrder): void
}

export class Customer implements ICustomer {
  id: number
  phone: string
  name: string
  email: string
  adress: string
  history: IOrder[]
  balance: number
  order: IOrder

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
    this.order = new Order(0, 0)
  }

  createOrder(restrauntId: number, orderItems: IOrderItems[]): IOrder {
    const newOrder = new Order(this.id, restrauntId)
    orderItems.forEach((orderItem) => {
      newOrder.addItem(orderItem.item, orderItem.quantity)
    })

    if (this.balance >= newOrder.price) {
      this.order.restrauntId = restrauntId
      this.order = newOrder
      this.order.status = 'customer_paid'
      return newOrder
    } else {
      this.order.status = 'customer_cancelled'
      throw new Error(`Not enough money on balance, need ${newOrder.price}, have ${this.balance}`)
    }
  }

  takeOrder(order: IOrder): void {
    if (order.status === 'delivery_complete') {
      this.addOrderToHistroty(this.order)
    }
  }

  showHistory(): IOrder[] {
    return this.history
  }

  addOrderToHistroty(order: IOrder): void {
    this.history.push(order)
  }
}
