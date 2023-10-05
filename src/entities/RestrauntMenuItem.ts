import idGenerator from "../lib/idGenerator"

export default class RestrauntMenuItem {
  id: number
  restrauntId: number
  name: string
  price: number
  description: string

  constructor(
    id: number,
    restrauntId: number,
    name: string,
    price: number,
    description: string,
  ) {
    this.id = idGenerator()
    this.name = name
    this.restrauntId = restrauntId
    this.price = price
    this.description = description
  }
}