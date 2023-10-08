import Logger from './lib/Logger'

import { type ICourier, Courier } from './flows/Courier'
import { type ICustomer, Customer } from './flows/Customer'
import { type IRestraunt, Restraunt } from './flows/Restraunt'

import { type IOrder, Order } from './entities/Order'

import menu from './db/menu'

import { IOrderItems } from './types'

const logger = new Logger()

class Application {
  restraunt: IRestraunt
  customer: ICustomer
  courier: ICourier
  order: IOrder

  constructor() {
    this.restraunt = new Restraunt('')
    this.order = new Order(0, 0, 0)
    this.courier = new Courier('')
    this.customer = new Customer('', '', '', '', 0)
  }

  createRestraunt() {
    this.restraunt = new Restraunt('14th St New York')
  }

  createMenu() {
    menu.forEach((item) => {
      item.restrauntId = this.restraunt.id
      this.restraunt.editMenu('add', item)
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

    if (this.order.status === 'kitchen_refunded') return

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