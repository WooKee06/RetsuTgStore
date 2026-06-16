import { makeAutoObservable } from 'mobx';
import type { User } from '@shared/types';

const MOCK_USER: User = {
  id: 'usr_001',
  name: 'Alexandre Dubois',
  avatar: undefined,
  phone: '+7 (999) 123-45-67',
  email: 'alexandre@retsu.com',
  ordersCount: 12,
};

export class UserStore {
  user: User | null = null;
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: User): void {
    this.user = user;
    this.isAuthenticated = true;
  }

  clearUser(): void {
    this.user = null;
    this.isAuthenticated = false;
  }

  initMockUser(): void {
    this.setUser(MOCK_USER);
  }
}

export const userStore = new UserStore();
