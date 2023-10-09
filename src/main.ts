import Logger from './lib/Logger'

import { type Courier, CourierImpl } from './flows/Courier'
import { type Customer, CustomerImpl } from './flows/Customer'
import { type Restraunt, RestrauntImpl } from './flows/Restraunt'

import { type Order, OrderImpl } from './entities/Order'

import menu from './db/menu'

import { IOrderItems } from './types'

const logger = new Logger()

class Application {
  restraunt: Restraunt
  customer: Customer
  courier: Courier
  order: Order

  constructor() {
    this.restraunt = new RestrauntImpl('')
    this.order = new OrderImpl(0, 0, 0)
    this.courier = new CourierImpl('')
    this.customer = new CustomerImpl('', '', '', '', 0)
  }

  createRestraunt() {
    this.restraunt = new RestrauntImpl('14th St New York')
  }

  createMenu() {
    menu.forEach((item) => {
      item.restrauntId = this.restraunt.id
      this.restraunt.editMenu('add', item)
    })
  }

  createCustomer() {
    this.customer = new CustomerImpl('+380', 'Nazar', '@gmail.com', 'Zubra', 500)
  }

  createCourier() {
    this.courier = new CourierImpl('+380')
  }

  start() {
    this.createRestraunt()
    logger.info('Restraunt created')
    this.createMenu()
    logger.info('Menu created')
    this.createCustomer()
    logger.info('Customer created')

    const currentMenu = this.restraunt.menu.showMenu()

    const orderItems: IOrderItems[] = [
      {
        item: currentMenu[0],
        quantity: 1
      },
      {
        item: currentMenu[2],
        quantity: 2
      },
      {
        item: currentMenu[3],
        quantity: 2
      },
      {
        item: currentMenu[4],
        quantity: 1
      },
    ]

    try {
      const newOrder = this.customer.createOrder(this.restraunt.id, orderItems)
      this.order = newOrder
      this.order.customerId = this.customer.id
    } catch (error) {
      orderItems.pop()
      const newOrder = this.customer.createOrder(this.restraunt.id, orderItems)
      this.order = newOrder
      this.order.customerId = this.customer.id
    }

    logger.info('Order created')


    this.restraunt.acceptOrder(this.order)
    this.order.restrauntId = this.restraunt.id

    if (this.order.getOrderStatus() === 'kitchen_refunded') return

    this.createCourier()
    logger.info('Courier created')

    this.courier.startShift()
    logger.info('Courier start shift')

    this.courier.addAvailableDeliveries(this.order)
    logger.info('Order added to available orders')

    this.courier.acceptOrder(this.order)
    logger.info('Courier accepted order')

    this.courier.completeDelivery(this.order)
    logger.info('Delivery complete')

    this.customer.takeOrder(this.order)

    return
  }
}

const app = new Application()
app.start()