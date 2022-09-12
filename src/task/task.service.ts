import { Repository } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  getAllTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { search, status } = filterDto;
    let where = '';
    const whereParams = {};

    if (status) {
      where += 'task.status = :status';
      whereParams['status'] = status;
    }
    if (search) {
      where += where ? ' and ' : '';
      where += '(task.title like :search or task.description like :search)';
      whereParams['search'] = `%${search}%`;
    }

    return this.taskRepository
      .createQueryBuilder('task')
      .where(where, whereParams)
      .getMany();
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Task id = ${id} not found`);
    }

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = await this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.taskRepository.save(task);
    return task;
  }

  async deleteTask(id: number): Promise<void> {
    const taskExist = await this.getTaskById(id);
    await this.taskRepository.delete({
      id: taskExist.id,
    });
  }

  async updateStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.taskRepository.save(task);

    return task;
  }
}
