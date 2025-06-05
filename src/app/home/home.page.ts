import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  newTask: string = '';
  categories: Category[] = [];
  selectedCategoryId: number | null = null;
  filterCategoryId: number | null = null;

  ngOnInit() {
    this.loadTasks();
    this.loadCategories();
  }

  ionViewWillEnter() {
    this.loadCategories();
  }

  loadCategories() {
    const stored = localStorage.getItem('categories');
    if (stored) {
      this.categories = JSON.parse(stored);
    }
  }

  getCategoryName(categoryId: number | undefined | null): string {
    console.log("categoryId", categoryId, this.categories)
    return this.categories.find(c => c.id === categoryId)?.name || 'Sin categoría';
  }

  get pendingTasks(): Task[] {
    return this.tasks.filter(task =>
      !task.completed &&
      (this.filterCategoryId == null || task.categoryId === this.filterCategoryId)
    );
  }

  get completedTasks(): Task[] {
    return this.tasks.filter(task =>
      task.completed &&
      (this.filterCategoryId == null || task.categoryId === this.filterCategoryId)
    );
  }

  addTask() {
    const title = this.newTask.trim();
    if (!title) return;
  
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      categoryId: this.selectedCategoryId ?? 0,
    };
  
    this.tasks.push(newTask);
    this.newTask = '';
    this.selectedCategoryId = null;
    this.saveTasks();
  }
  

  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed;
    this.saveTasks();
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      this.tasks = JSON.parse(saved);
    }
  }
}
