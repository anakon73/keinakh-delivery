import idGenerator from '../lib/idGenerator'

import { type IOrder, Order } from '../entities/Order'

export interface ICourier {
  seeAvailableDeliveries(): IOrder[]
  addAvailableDeliveries(order: IOrder): void
  acceptOrder(order: IOrder): void
  completeDelivery(order: IOrder): void
  denyOrder(orde: IOrder): void
  startShift(): void
  endShift(): void
}

export class Courier implements ICourier {
  id: number
  phone: string
  status: 'working' | 'busy' | 'do_not_work'
  coordinates: number
  availableDeliveries: IOrder[]
  deliveryOrder: IOrder

  constructor(phone: string) {
    this.id = idGenerator()
    this.phone = phone
    this.coordinates = 0
    this.availableDeliveries = []
    this.status = 'do_not_work'
    this.deliveryOrder = new Order(0, 0)
  }

  addAvailableDeliveries(order: IOrder): void {
    this.availableDeliveries.push(order)
  }

  seeAvailableDeliveries(): IOrder[] {
    return this.availableDeliveries
  }

  acceptOrder(order: IOrder): void {
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

  denyOrder(order: IOrder): void {
    order.status = 'delivery_denied'
    order = new Order(0, 0)
    this.deliveryOrder = order
    this.status = 'working'
    if (order.status === 'delivery_denied') {
      order.status = 'delivery_refunded'
    }
  }

  completeDelivery(order: IOrder): void {
    order.status = 'delivery_complete'
    this.deliveryOrder = new Order(0, 0, this.id)
    this.status = 'working'
  }

  startShift(): void {
    this.status = 'working'
  }

  endShift(): void {
    this.status = 'do_not_work'
  }
}