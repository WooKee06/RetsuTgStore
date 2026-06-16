import { makeAutoObservable, runInAction } from 'mobx';
import type { Product } from '@shared/types';

const FAVORITES_STORAGE_KEY = 'retsu_favorites';

function loadFavoritesFromStorage(): Product[] {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavoritesToStorage(items: Product[]): void {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(items));
}

export class FavoriteStore {
  items: Product[] = [];

  constructor() {
    makeAutoObservable(this);
    runInAction(() => {
      this.items = loadFavoritesFromStorage();
    });
  }

  toggleFavorite(product: Product): void {
    const index = this.items.findIndex((item) => item.id === product.id);

    if (index >= 0) {
      this.items.splice(index, 1);
    } else {
      this.items.push({ ...product, isFavorite: true });
    }

    saveFavoritesToStorage(this.items);
  }

  isFavorite(productId: string): boolean {
    return this.items.some((item) => item.id === productId);
  }

  get count(): number {
    return this.items.length;
  }
}

export const favoriteStore = new FavoriteStore();
