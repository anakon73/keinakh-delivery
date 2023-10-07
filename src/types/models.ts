import RestrauntMenuItem from '../entities/RestrauntMenuItem'

export type orderStatus =
  'customer_created' |
  'customer_paid' |
  'customer_cancelled' |
  'kitchen_accepted' |
  'kitchen_denied' |
  'kitchen_refunded' |
  'kitchen_preparing' |
  'delivery_pending' |
  'delivery_denied' |
  'delivery_refunded' |
  'delivery_picking' |
  'delivery_delivering' |
  'delivery_complete'

export type IOrderItems = { item: RestrauntMenuItem, quantity: number }
