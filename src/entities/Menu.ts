import RestrauntMenuItem from './RestrauntMenuItem'

export interface Menu {
  itemsList: RestrauntMenuItem[]

  addItem(item: RestrauntMenuItem): void
  removeItem(itemName: RestrauntMenuItem): void
  showMenu(): RestrauntMenuItem[]
}

export interface MenuImpl extends Menu { }

export class MenuImpl {
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
