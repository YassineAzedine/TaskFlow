import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Sprint, SprintDocument } from './schemas/sprint.schema';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';

@Injectable()
export class SprintsService {
  constructor(@InjectModel(Sprint.name) private sprintModel: Model<SprintDocument>) {}

  async create(createSprintDto: CreateSprintDto): Promise<Sprint> {
    const createdSprint = new this.sprintModel({
      ...createSprintDto,
      projectId: new Types.ObjectId(createSprintDto.projectId)
    });
    return createdSprint.save();
  }

  async findAll(): Promise<Sprint[]> {
    return this.sprintModel.find().exec();
  }

  
async findByProject(projectId: string): Promise<Sprint[]> {
  console.log('projectId', projectId);

  // Convert string to ObjectId
  const objectId = new Types.ObjectId(projectId);

  const sprints = await this.sprintModel.find({ projectId: objectId }).exec();
  console.log('sprints', sprints);

  return sprints;
}

  async findOne(id: string): Promise<Sprint> {
    const sprint = await this.sprintModel.findById(id).exec();
    if (!sprint) throw new NotFoundException(`Sprint ${id} not found`);
    return sprint;
  }

  async update(id: string, updateSprintDto: UpdateSprintDto): Promise<Sprint> {
    const updated = await this.sprintModel.findByIdAndUpdate(id, updateSprintDto, { new: true });
    if (!updated) throw new NotFoundException(`Sprint ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.sprintModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException(`Sprint ${id} not found`);
  }
}
