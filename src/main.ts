import Logger from './lib/Logger'

import Courier from './flows/Courier'
import Customer from './flows/Customer'
import Restraunt from './flows/Restraunt'

import menu from './db/menu'

const logger = new Logger()

class Application {
  restraunt: Restraunt
  customer: Customer
  courier: Courier

  constructor() {
    this.restraunt = new Restraunt('14th St New York')
  }

  createMenu() {
    menu.forEach((item) => {
      item.restrauntId = this.restraunt.id
      this.restraunt.editMenu('add', item)
    })
  }
}

const app = new Application()