import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UsersService } from '../users/users.service';
import { ProjectsService } from '../projects/projects.service';
import { log } from 'console';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private usersService: UsersService,
    private projectsService: ProjectsService,
  ) {}

  // Créer une tâche
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    console.log(createTaskDto.projectId);
    
    const project = await this.projectsService.findOne(String(createTaskDto.projectId));
    console.log(createTaskDto);
    
    if (!project) throw new NotFoundException(`Project with ID ${createTaskDto.projectId} not found`);

    let assignedUser = null;
    if (createTaskDto.assignedUserId) {
      assignedUser = await this.usersService.findOne(String(createTaskDto.assignedUserId));
      if (!assignedUser) throw new NotFoundException(`User with ID ${createTaskDto.assignedUserId} not found`);
    }

    const task = new this.taskModel({
      ...createTaskDto,
     
      assignedUser: assignedUser ? new Types.ObjectId(assignedUser._id) : null,
    });
 console.log(task);
 
    return task.save();
  }

  // Récupérer toutes les tâches
  async findAll(): Promise<Task[]> {
    return this.taskModel
      .find()
      // .populate('project')        // Remplit le projet
      // .populate('assignedUser')   // Remplit l'utilisateur assigné
      .exec();
  }

  // Récupérer une tâche par ID
  async findOne(id: string): Promise<Task> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException(`Task ID ${id} is invalid`);

    const task = await this.taskModel
      .findById(id)
      .populate('project')
      .populate('assignedUser')
      .exec();

    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  // Mettre à jour une tâche
   async updateStatus(taskId: string, updateDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(
      taskId,
      { status: updateDto.status, updatedAt: new Date() },
      { new: true }
    );

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return task;
  }

  // Supprimer une tâche
  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException(`Task ID ${id} is invalid`);

    const result = await this.taskModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Task with ID ${id} not found`);
  }
async findAllByProject(projectId: string): Promise<Task[]> {
  if (!Types.ObjectId.isValid(projectId)) {
    throw new NotFoundException(`Project ID ${projectId} is invalid`);
  }

  const tasks = await this.taskModel
    .find({ projectId }) // le champ correct
    .populate('projectId') // ou .populate({ path: 'projectId', strictPopulate: false })
    .populate('assignedUser')
    .exec();

  return tasks;
}
async update(taskId: string, updateDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      taskId,
      { $set: updateDto },
      { new: true } // retourne la tâche mise à jour
    );

    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return updatedTask;
  }

async findBySprint(sprintId: string): Promise<Task[]> {
  console.log('sprintId', sprintId);
  // Convert string to ObjectId seulement si sprintId est valide
  const tasks = await this.taskModel
    .find({ sprintId: sprintId })
    .populate('sprintId')      // récupère les infos du sprint    // si besoin
    // si besoin
    .exec();
  console.log('tasks', tasks);
  return tasks;
}
}
