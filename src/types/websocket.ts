export type WsResponse = {
    success?: boolean;
    orders: [
    {
      ingredients: string[],
      _id: string,
      status: string,
      number: number,
      createdAt: string,
      updatedAt: string
      name: string,
    }
  ],
  total: number,
  totalToday: number,
}

export type WsOrders = {
      ingredients: string[],
      _id: string,
      status: string,
      number: number,
      createdAt: string,
      updatedAt: string,
      name: string,
}