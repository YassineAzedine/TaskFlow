import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Project } from '../../projects/schemas/project.schema';
import { Sprint } from '../../sprints/schemas/sprint.schema';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ type: String, default: 'progress' })
  status: string; // pending, in_progress, completed

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String, default: 1 })
  priority: string; // 1: low, 2: medium, 3: high

  @Prop({ type: Date })
  dueDate?: Date;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projectId: Types.ObjectId; // ou Project si tu utilises populate

  @Prop({ type: Types.ObjectId, ref: 'Sprint', required: true })
  sprintId: Types.ObjectId; // ou Sprint si tu utilises populate

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedUser?: Types.ObjectId; // ou User si tu utilises populate

  tempId?: string; // champ temporaire côté front-end
}

export const TaskSchema = SchemaFactory.createForClass(Task);
