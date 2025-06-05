import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { Category } from '../models/category.model';
import { FirebaseRemoteConfigService } from '../services/firebase-remote-config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  isFeatureEnabled = false;
  tasks: Task[] = [];
  newTask: string = '';
  categories: Category[] = [];
  selectedCategoryId: number | null = null;
  filterCategoryId: number | null = null;

  constructor(private remoteConfigService: FirebaseRemoteConfigService) { }

  async ngOnInit() {
    this.checkIsFeatureEnabled();
    this.loadTasks();
    this.loadCategories();
  }

  ionViewWillEnter() {
    this.checkIsFeatureEnabled();
    this.loadCategories();
  }

  async checkIsFeatureEnabled() {
    this.isFeatureEnabled = await this.remoteConfigService.getFeatureFlag('showExtraInfo');
    console.log("isFeatureEnabled", this.isFeatureEnabled)
  }

  loadCategories() {
    const stored = localStorage.getItem('categories');
    if (stored) {
      this.categories = JSON.parse(stored);
    }
  }

  getCategoryName(categoryId: number | undefined | null): string {
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
