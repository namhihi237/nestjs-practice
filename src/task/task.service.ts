import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { search, status } = filterDto;
    let tasks = [];

    if (status && !search) {
      tasks = this.getTasksByStatus(status);
    } else if (search && !status) {
      tasks = this.getTasksBySearch(search);
    } else if (status && search) {
      tasks = this.getTasksByStatusAndSearch(status, search);
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === parseInt(id));
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const lastTask = this.tasks[this.tasks.length - 1];

    const task: Task = {
      id: lastTask ? lastTask.id + 1 : 1,
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== parseInt(id));
  }

  updateStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  getTasksBySearch(search: string): Task[] {
    return this.tasks.filter((task) => {
      if (task.title.includes(search) || task.description.includes(search)) {
        return task;
      }
    });
  }

  getTasksByStatusAndSearch(status: TaskStatus, search: string): Task[] {
    return this.tasks.filter((task) => {
      if (
        task.title.includes(search) ||
        (task.description.includes(search) && task.status === status)
      ) {
        return task;
      }
    });
  }
}
