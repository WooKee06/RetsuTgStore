import { makeAutoObservable, runInAction } from 'mobx';
import type { Product, Color, CartItem } from '@shared/types';

const CART_STORAGE_KEY = 'retsu_cart';

function loadCartFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export class CartStore {
  items: CartItem[] = [];

  constructor() {
    makeAutoObservable(this);
    runInAction(() => {
      this.items = loadCartFromStorage();
    });
  }

  addItem(product: Product, size: string, color: Color): void {
    const existing = this.items.find(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor.hex === color.hex,
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({
        product,
        quantity: 1,
        selectedSize: size,
        selectedColor: color,
      });
    }

    saveCartToStorage(this.items);
  }

  removeItem(productId: string): void {
    this.items = this.items.filter((item) => item.product.id !== productId);
    saveCartToStorage(this.items);
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.items.find((item) => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        saveCartToStorage(this.items);
      }
    }
  }

  clearCart(): void {
    this.items = [];
    saveCartToStorage(this.items);
  }

  get totalItems(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice(): number {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }

  getItem(productId: string): CartItem | undefined {
    return this.items.find((item) => item.product.id === productId);
  }
}

export const cartStore = new CartStore();
