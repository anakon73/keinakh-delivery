import Logger from './lib/Logger'

import Courier from './flows/Courier'
import Customer from './flows/Customer'
import Restraunt from './flows/Restraunt'

import Order from './entities/Order'

import menu from './db/menu'

import { IOrderItems } from './types'

const logger = new Logger()



class Application {
  restraunt: Restraunt
  customer: Customer
  courier: Courier
  order: Order

  constructor() {
    this.restraunt = new Restraunt('')
    this.order = new Order(0, 0, 0)
    this.courier = new Courier('')
    this.customer = new Customer('', '', '', '', 0)
  }

  createRestraunt() {
    this.restraunt = new Restraunt('14th St New York')
    this.order = new Order(0, 0, 0)
    this.courier = new Courier('')
    this.customer = new Customer('', '', '', '', 0)
  }

  createMenu() {
    menu.forEach((item) => {
      if (this.restraunt !== null) {
        item.restrauntId = this.restraunt.id
        this.restraunt.editMenu('add', item)
      }
    })
  }

  createCustomer() {
    this.customer = new Customer('+380', 'Nazar', '@gmail.com', 'Zubra', 500)
  }

  createCourier() {
    this.courier = new Courier('+380')
  }

  start() {
    this.createRestraunt()
    logger.info('Restraunt created')
    this.createMenu()
    logger.info('Menu created')
    this.createCustomer()
    logger.info('Customer created')

    const currentMenu = this.restraunt!.menu.showMenu()

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

    if (this.customer !== null) {
      try {
        const newOrder = this.customer?.createOrder(this.restraunt!.id, orderItems)
        this.order = newOrder
        this.order.customerId = this.customer!.id
      } catch (error) {
        orderItems.pop()
        const newOrder = this.customer?.createOrder(this.restraunt!.id, orderItems)
        this.order = newOrder
        this.order.customerId = this.customer!.id
      }
    }

    logger.info('Order created')

    if (this.order !== null) {
      this.restraunt?.denyOrder(this.order)
      this.order.restrauntId = this.restraunt!.id
      if (this.order.status === 'kitchen_denied') {
        this.order!.status = 'kitchen_refunded'
      } else {
        this.order!.status = 'kitchen_preparing'
      }
    }

    if (this.order.status === 'kitchen_preparing') {
      this.order.status = 'delivery_pending'
    }

    this.createCourier()
    logger.info('Courier created')

    this.courier?.startShift()
    logger.info('Courier start shift')

    this.courier?.addAvailableDeliveries(this.order)
    logger.info('Order added to available orders')

    this.courier?.acceptOrder(this.order)

    if (this.order.status === 'delivery_picking') {
      this.order.status = 'delivery_delivering'
    } else if (this.order.status === 'delivery_denied') {
      this.order.status = 'delivery_refunded'
    }

    this.courier.completeDelivery(this.order)
    logger.info('Delivery complete')

    if (this.order.status === 'delivery_complete') {
      this.customer.addOrderToHistroty(this.order)
    }

    return
  }
}

const app = new Application()
app.start()