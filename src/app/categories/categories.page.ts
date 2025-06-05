import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false
})
export class CategoriesPage implements OnInit {

  categories: Category[] = [];
  newCategoryName: string = '';
  editingCategory: Category | null = null;
  editingName: string = '';

  ngOnInit() {
    this.loadCategories();
  }

  addCategory() {
    const name = this.newCategoryName.trim();
    if (!name) return;

    const newCategory: Category = {
      id: Date.now(),
      name,
    };
    this.categories.push(newCategory);
    this.newCategoryName = '';
    this.saveCategories();
  }

  editCategory(category: Category) {
    this.editingCategory = category;
    this.editingName = category.name;
  }

  saveEdit() {
    if (this.editingCategory) {
      const name = this.editingName.trim();
      if (!name) return;
      this.editingCategory.name = name;
      this.editingCategory = null;
      this.editingName = '';
      this.saveCategories();
    }
  }

  cancelEdit() {
    this.editingCategory = null;
    this.editingName = '';
  }

  deleteCategory(category: Category) {
    this.categories = this.categories.filter(c => c.id !== category.id);
    this.saveCategories();
  }

  saveCategories() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  loadCategories() {
    const saved = localStorage.getItem('categories');
    if (saved) {
      this.categories = JSON.parse(saved);
    }
  }
}
