import idGenerator from '../lib/idGenerator'

import { orderStatus } from '../types'

import OrderItem from './OrderItem'
import RestrauntMenuItem from './RestrauntMenuItem'

export interface ChangeOrderStatus {
  customerCreated(): void
  customerPaid(): void
  customerCancelled(): void
  kitchenAccepted(): void
  kitchenDenied(): void
  kitchenRefunded(): void
  kitchenPreparing(): void
  deliveryPending(): void
  deliveryDenied(): void
  deliveryRefunded(): void
  deliveryPicking(): void
  deliveryDelivering(): void
  deliveryComplete(): void

  getOrderStatus(): orderStatus
}

export interface Order extends ChangeOrderStatus {
  id: number
  customerId?: number
  restrauntId: number
  courierId?: number
  timestamp: Date
  itemsList: OrderItem[]
  price: number

  addItem(item: RestrauntMenuItem, quantity: number): void
  removeItem(item: OrderItem): void
  showOrderItems(): OrderItem[]
}

export interface OrderImpl extends Order { }

export class OrderImpl {
  private status: orderStatus

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

  customerCreated(): void {
    this.status = 'customer_created'
  }
  customerPaid(): void {
    this.status = 'customer_paid'
  }
  customerCancelled(): void {
    this.status = 'customer_cancelled'
  }
  kitchenAccepted(): void {
    this.status = 'kitchen_accepted'
  }
  kitchenDenied(): void {
    this.status = 'kitchen_denied'
  }
  kitchenRefunded(): void {
    this.status = 'kitchen_refunded'
  }
  kitchenPreparing(): void {
    this.status = 'kitchen_preparing'
  }
  deliveryPending(): void {
    this.status = 'delivery_pending'
  }
  deliveryDenied(): void {
    this.status = 'delivery_denied'
  }
  deliveryRefunded(): void {
    this.status = 'delivery_refunded'
  }
  deliveryPicking(): void {
    this.status = 'delivery_picking'
  }
  deliveryDelivering(): void {
    this.status = 'delivery_delivering'
  }
  deliveryComplete(): void {
    this.status = 'delivery_complete'
  }

  getOrderStatus(): orderStatus {
    return this.status
  }
}

