import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Task status must be "IN_PROGRESS" or "DONE"', // custom message
  })
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
