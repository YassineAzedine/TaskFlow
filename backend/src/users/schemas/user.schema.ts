import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Project } from '../../projects/schemas/project.schema';
import { Task } from '../../tasks/schemas/task.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true }) // createdAt et updatedAt automatiques
export class User {
    // ...existing code...
  public _id: Types.ObjectId;
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Project' }] })
  projects: Project[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  tasks: Task[];
  id: any;
 
  
}
export const UserSchema = SchemaFactory.createForClass(User);
