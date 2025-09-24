import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Task } from '../../tasks/schemas/task.schema';
import { User } from '../../users/schemas/user.schema';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  description?: string;

  @Prop({ default: 'active' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId | User;

}

export const ProjectSchema = SchemaFactory.createForClass(Project);

// Virtual populate pour les tasks
ProjectSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'project',
});

ProjectSchema.set('toObject', { virtuals: true });
ProjectSchema.set('toJSON', { virtuals: true });
