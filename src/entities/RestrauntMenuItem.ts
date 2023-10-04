import idGenerator from "../lib/idGenerator"

export default class RestrauntMenuItem {
  id: number
  restrauntId: number
  name: string
  price: number
  description: number
  balance: number

  constructor(
    id: number,
    restrauntId: number,
    name: string,
    price: number,
    description: number,
    balance: number
  ) {
    this.id = idGenerator()
    this.name = name
    this.restrauntId = restrauntId
    this.price = price
    this.description = description
    this.balance = balance
  }
}