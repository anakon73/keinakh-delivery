import RestrauntMenuItem from './RestrauntMenuItem'

export interface IMenu {
  itemsList: RestrauntMenuItem[]

  addItem(item: RestrauntMenuItem): void
  removeItem(itemName: RestrauntMenuItem): void
  showMenu(): RestrauntMenuItem[]
}

export class Menu implements IMenu {
  itemsList: RestrauntMenuItem[] = []

  addItem(item: RestrauntMenuItem): void {
    this.itemsList.push(item)
  }

  removeItem(item: RestrauntMenuItem) {
    const index = this.itemsList.indexOf(item)

    if (index === -1) {
      this.itemsList.splice(index, 1)
    }
  }

  showMenu(): RestrauntMenuItem[] {
    return this.itemsList
  }
}
