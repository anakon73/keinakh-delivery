import idGenerator from '../lib/idGenerator'

import Order from '../entities/Order'
import RestrauntMenuItem from '../entities/RestrauntMenuItem'

type IOrderItems = { item: RestrauntMenuItem, quantity: number }

interface ICustomer {
  createOrder(restrauntId: number, orderItems: IOrderItems[]): Order
  showHistory(): Order[]
}

export default class Customer implements ICustomer {
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
    this.order = new Order(0, 0)
  }

  createOrder(restrauntId: number, orderItems: IOrderItems[]): Order {
    const newOrder = new Order(this.id, restrauntId)
    orderItems.forEach((orderItem) => {
      newOrder.addItem(orderItem.item, orderItem.quantity)
    })

    if (this.balance >= newOrder.price) {
      this.order.restrauntId = restrauntId
      this.order = newOrder
      return newOrder
    } else {
      throw new Error('Not enough money on balance')
    }
  }
  showHistory(): Order[] {
    return this.history
  }
}
