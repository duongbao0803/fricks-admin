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
