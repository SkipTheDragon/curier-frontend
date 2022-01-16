export interface Authenticated {
  id: number;
  username: string | undefined;
  roles: Role[] | undefined;
  isAuth: boolean;
}
export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  user: Authenticated | undefined;
  orders: [] | undefined;
};

export type Role = {
  id: number;
  name: string;
};

export type Warehouse = {
  id: number;
  location: Location;
  name: string;
};

export type Location = {
  coordX: number;
  coordY: number;
  id: number;
  name: string;
};

export interface Order {
  id: number|undefined;
  fromWarehouse: string | number | Warehouse;
  toWarehouse: string | number | Warehouse;
  price: number;
  mass: number;
  status: number;
  employee: Employee| null;
  client: Employee;
}
