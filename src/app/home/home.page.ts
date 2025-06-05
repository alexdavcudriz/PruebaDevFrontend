import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  newTask: string = '';

  ngOnInit() {
    this.loadTasks();
  }

  get pendingTasks(): Task[] {
    return this.tasks.filter(t => !t.completed);
  }

  get completedTasks(): Task[] {
    return this.tasks.filter(t => t.completed);
  }

  addTask() {
    if (!this.newTask.trim()) return;

    const task: Task = {
      id: Date.now(),
      title: this.newTask.trim(),
      completed: false,
    };

    this.tasks.push(task);
    this.newTask = '';
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
