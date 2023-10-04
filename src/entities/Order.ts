import idGenerator from '../lib/idGenerator'

import { orderStatus } from '../types'

import OrderItem from './OrderItem'

interface IOrder {
  addItem(item: OrderItem): void
}

export default class Order {
  id: number
  status: orderStatus
  customerId?: number
  restrauntId: number
  courierId?: number
  timestamp: Date
  itemsList: OrderItem[] = []

  constructor(
    customerId: number,
    restrauntId: number,
    courierId?: number,
  ) {
    this.courierId = courierId
    this.restrauntId = restrauntId
    this.customerId = customerId
    this.id = idGenerator()
    this.status = 'customer_created'
    this.timestamp = new Date()
  }
}