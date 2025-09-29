import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateTaskDto {

  
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  status?: string;

 
  @IsOptional()
  priority?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;


  @IsNotEmpty()
  projectId: string;

  @IsNotEmpty()
  sprintId: string;
  @IsOptional()
  assignedUserId?: number;
    @IsOptional()
  tempId?: string;
}