import idGenerator from '../lib/idGenerator'

import Order from '../entities/Order'

interface ICourier {
  seeAvailableDeliveries(): Order[]
  acceptOrder(order: Order): void
  completeDelivery(): void
  startShift(): void
  endShift(): void
}

export default class Courier implements ICourier {
  id: number
  phone: string
  status: ''
  coordinates: number
  availableDeliveries: Order[]
  deliveryOrder: Order
  shift: boolean

  constructor(phone: string) {
    this.id = idGenerator()
    this.phone = phone
    this.coordinates = 0
    this.availableDeliveries = []
    this.shift = false
  }

  addAvailableDeliveries(order: Order) {
    this.availableDeliveries.push(order)
  }

  seeAvailableDeliveries(): Order[] {
    return this.availableDeliveries
  }

  acceptOrder(order: Order): void {
    this.deliveryOrder = order
  }

  completeDelivery(): void {

  }

  startShift(): void {
    this.shift = false
  }

  endShift(): void {
    this.shift = false
  }
}