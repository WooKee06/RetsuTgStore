import { makeAutoObservable } from 'mobx';

export class UIStore {
  searchQuery = '';
  isSearchOpen = false;
  activeCategory = '';
  isCartOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSearchQuery(query: string): void {
    this.searchQuery = query;
  }

  toggleSearch(): void {
    this.isSearchOpen = !this.isSearchOpen;
    if (!this.isSearchOpen) {
      this.searchQuery = '';
    }
  }

  setActiveCategory(categoryId: string): void {
    this.activeCategory = categoryId;
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }
}

export const uiStore = new UIStore();
