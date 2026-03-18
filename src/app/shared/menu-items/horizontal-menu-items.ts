import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface Saperator {
  name: string;
  type?: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS: Menu[] = [
  {
    state: '',
    name: 'Explorar',
    type: 'saperator',
    icon: 'event'
  },
  {
    state: 'events',
    name: 'Eventos',
    type: 'sub',
    icon: 'event_available',
    children: [{ state: '', name: 'Cartelera', type: 'link' }]
  },
  {
    state: 'seat-map',
    name: 'Compra',
    type: 'sub',
    icon: 'chair',
    children: [{ state: '1', name: 'Mapa demo', type: 'link' }]
  },
  {
    state: 'cart',
    name: 'Carrito',
    type: 'link',
    icon: 'shopping_cart'
  },
  {
    state: 'tickets',
    name: 'Mis Tickets',
    type: 'sub',
    icon: 'confirmation_number',
    children: [{ state: 'my-tickets', name: 'Descargas', type: 'link' }]
  },
  {
    state: 'auth',
    name: 'Acceso',
    type: 'sub',
    icon: 'login',
    children: [{ state: 'login', name: 'Login', type: 'link' }]
  }
];

@Injectable()
export class HorizontalMenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
