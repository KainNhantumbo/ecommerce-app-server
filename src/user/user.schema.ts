import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';
import { roles } from './dto/create-user.dto';

export interface IUser {
  readonly firstName: string;
  readonly lastName: string;
  readonly role: string;
  readonly employeeId: string;
  readonly email: string;
  readonly password: string;
}

export interface UserDocument extends HydratedDocument<User> {}

@Schema({ timestamps: true })
export class User implements IUser {
  @Prop({ type: String, required: true, maxlength: 32, minlength: 2 })
  firstName: string;

  @Prop({ type: String, required: true, maxlength: 32, minlength: 2 })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, default: roles[0], enum: [...roles] })
  role: string;

  @Prop({ type: String, default: roles[0], enum: [...roles] })
  employeeId: string;

  @Prop({ type: String, required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
