export enum RolesLogin {
  CUSTOMER = "CUSTOMER",
  STORE = "STORE",
  ADMIN = "ADMIN",
}

export enum Roles {
  CUSTOMER = "Khách hàng",
  STORE = "Cửa hàng",
  ADMIN = "QTV",
}

export enum CreateRoles {
  CUSTOMER = 0,
  STORE = 1,
  ADMIN = 2,
}

export enum WithdrawStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  DONE = 'DONE'
}

export enum WithdrawStatusRender {
  PENDING = 'Đang xử lí',
  APPROVED = 'Đã chấp nhận',
  REJECTED = 'Đã từ chối',
  DONE = 'Hoàn thành'
}

export enum UpdateOrderStatus {
  PENDING = 0,
  DELIVERY = 1,
  DONE = 2,
  CANCELED = 3
}

export enum OrderStatus {
  PENDING = 'PENDING',
  DELIVERY = 'DELIVERY',
  DONE = 'DONE',
  CANCELED = 'CANCELED'
}

export enum OrderStatusRender {
  PENDING = 'ĐANG CHỜ',
  DELIVERY = 'ĐANG GIAO HÀNG',
  DONE = 'ĐÃ GIAO HÀNG',
  CANCELED = 'ĐÃ HỦY'
}
