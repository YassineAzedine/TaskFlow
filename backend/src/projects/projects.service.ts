import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { Document } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    private usersService: UsersService,
  ) {}

  // Créer un projet
 async create(createProjectDto: CreateProjectDto): Promise<Project> {
  // Vérifier que le propriétaire existe
  const owner = await this.usersService.findOne(createProjectDto.ownerId);
  if (!owner) {
    throw new NotFoundException(`User with ID ${createProjectDto.ownerId} not found`);
  }
  const createdProject = new this.projectModel({
    ...createProjectDto,
    owner: new Types.ObjectId(createProjectDto.ownerId),
    tasks: [],
  }) as ProjectDocument; // <-- Add this type assertion

  return createdProject.save();
}

  // Récupérer tous les projets
  async findAll(): Promise<Project[]> {
    return this.projectModel.find().populate('owner').populate('tasks').exec();
  }

  // Récupérer un projet par ID
async findOne(id: string): Promise<Project> {
  const project = await this.projectModel
    .findById(id)
    .populate('owner')   // remplit l'objet owner
    .populate('tasks')   // remplit le tableau des tasks
    .exec();

  if (!project) throw new NotFoundException(`Project with ID ${id} not found`);
  return project;
}

  // Mettre à jour un projet
 async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
  console.log(id, updateProjectDto);

  if (updateProjectDto.ownerId) {
    // Vérifier que le nouveau propriétaire existe
    const owner = await this.usersService.findOne(updateProjectDto.ownerId);
    console.log(owner);

    if (!owner) {
      throw new NotFoundException(`User with ID ${updateProjectDto.ownerId} not found`);
    }

    // Convertir ownerId en ObjectId pour MongoDB
    (updateProjectDto as any).owner = new Types.ObjectId(updateProjectDto.ownerId);
    delete updateProjectDto.ownerId;
  }

  const updated = await this.projectModel.findByIdAndUpdate(
    id,
    updateProjectDto,          // <-- on fournit les données à mettre à jour
    { new: true }              // <-- retourne le document mis à jour
  ).exec();

  console.log(updated);

  if (!updated) {
    throw new NotFoundException(`Project with ID ${id} not found`);
  }

  return updated;
}

  // Supprimer un projet
  async remove(id: string): Promise<void> {
   
    const result = await this.projectModel.findByIdAndDelete(id).exec();
    if (!result) {  
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }
}
