import { IsEnum } from 'class-validator';
import { TaskStatus } from './../task.model';
export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus, {
    message: 'Task status must be "IN_PROGRESS" or "DONE"', // custom message
  })
  status: TaskStatus;
}
