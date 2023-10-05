import Order from '../entities/Order'

import idGenerator from '../lib/idGenerator'

interface ICustomer {
  createOrder(restrauntId: number): Order
  showHistory(): void
}

export default class Customer implements ICustomer {
  id: number
  phone: number
  name: string
  email: string
  adress: string
  history: Order[] = []
  balance: number

  constructor(
    phone: number,
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
  }

  createOrder(restrauntId: number): Order {
    return new Order(this.id, restrauntId)
  }
  showHistory(): void { }
}