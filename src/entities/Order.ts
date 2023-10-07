import idGenerator from '../lib/idGenerator'

import menu from '../db/menu'

import { orderStatus } from '../types'

import OrderItem from './OrderItem'
import RestrauntMenuItem from './RestrauntMenuItem'

interface IOrder {
  addItem(item: RestrauntMenuItem, quantity: number): void
  removeItem(item: OrderItem): void
  showOrderItems(): OrderItem[]
}

export default class Order implements IOrder {
  id: number
  status: orderStatus
  customerId?: number
  restrauntId: number
  courierId?: number
  timestamp: Date
  itemsList: OrderItem[]
  price: number

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
    this.itemsList = []
    this.price = 0
  }

  addItem(item: RestrauntMenuItem, quantity: number): void {
    const newOrderItem = new OrderItem(item, quantity)
    this.price += newOrderItem.price * newOrderItem.quantity

    this.itemsList.push(newOrderItem)
  }

  removeItem(item: OrderItem): void {
    const index = this.itemsList.indexOf(item)

    if (index !== -1) {
      this.itemsList.splice(index, 1)
    }
  }

  showOrderItems(): OrderItem[] {
    return this.itemsList
  }
}

