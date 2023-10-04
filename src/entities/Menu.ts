import RestrauntMenuItem from '../entities/RestrauntMenuItem'

interface IMenu {
  addItem(item: RestrauntMenuItem): void
  removeItem(itemName: string): void
  showMenu(): RestrauntMenuItem[]
}

export default class Menu implements IMenu {
  #itemsList: RestrauntMenuItem[]

  addItem(item: RestrauntMenuItem): void {
    this.#itemsList.push(item)
  }

  removeItem(itemName: string) {
    this.#itemsList.filter((item) => item.name !== itemName)
  }

  showMenu(): RestrauntMenuItem[] {
    return this.#itemsList
  }
}
