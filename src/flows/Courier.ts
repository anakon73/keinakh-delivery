import idGenerator from '../lib/idGenerator'

import { type Order, OrderImpl } from '../entities/Order'

export interface Courier {
  seeAvailableDeliveries(): Order[]
  addAvailableDeliveries(order: Order): void
  acceptOrder(order: Order): void
  completeDelivery(order: Order): void
  denyOrder(orde: Order): void
  startShift(): void
  endShift(): void
}

export interface CourierImpl extends Courier { }

export class CourierImpl {
  id: number
  phone: string
  status: 'working' | 'busy' | 'do_not_work'
  coordinates: number
  availableDeliveries: Order[]
  deliveryOrder: Order

  constructor(phone: string) {
    this.id = idGenerator()
    this.phone = phone
    this.coordinates = 0
    this.availableDeliveries = []
    this.status = 'do_not_work'
    this.deliveryOrder = new OrderImpl(0, 0)
  }

  addAvailableDeliveries(order: Order): void {
    this.availableDeliveries.push(order)
  }

  seeAvailableDeliveries(): Order[] {
    return this.availableDeliveries
  }

  acceptOrder(order: Order): void {
    if (order.status === 'kitchen_preparing') {
      order.status = 'delivery_pending'
      if (this.availableDeliveries.length > 0 && this.availableDeliveries.includes(order)) {
        this.deliveryOrder = order
        order.status = 'delivery_picking'
        this.status = 'busy'
        order.courierId = this.id
        const index = this.availableDeliveries.indexOf(order)
        this.availableDeliveries.splice(index, 1)
      } else {
        throw new Error('There is not available orders or order is took')
      }

      if (order.status === 'delivery_picking') {
        order.status = 'delivery_delivering'
      }
    }
  }

  denyOrder(order: Order): void {
    order.status = 'delivery_denied'
    order = new OrderImpl(0, 0)
    this.deliveryOrder = order
    this.status = 'working'
    if (order.status === 'delivery_denied') {
      order.status = 'delivery_refunded'
    }
  }

  completeDelivery(order: Order): void {
    order.status = 'delivery_complete'
    this.deliveryOrder = new OrderImpl(0, 0, this.id)
    this.status = 'working'
  }

  startShift(): void {
    this.status = 'working'
  }

  endShift(): void {
    this.status = 'do_not_work'
  }
}