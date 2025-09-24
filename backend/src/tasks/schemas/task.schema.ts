import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Project } from '../../projects/schemas/project.schema';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  save(): Task | PromiseLike<Task> {
    throw new Error('Method not implemented.');
  }
  @Prop({ required: true })
  title: string;

  @Prop({ type: String, default: 'progress' })
  status: string; // pending, in_progress, completed

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String, default: 1 })
  priority: number; // 1: low, 2: medium, 3: high

  @Prop({ type: Date })
  dueDate?: Date;

@Prop({ type: Types.ObjectId, ref: 'Project', required: true })
projectId: Types.ObjectId | Project;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedUser?: Types.ObjectId | User;
  tempId?: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
