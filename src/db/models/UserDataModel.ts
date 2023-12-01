import { Schema, model } from 'mongoose'

export const UserDataModel = model(
  'User',
  new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    gender: { type: String, require: true },
    birthYear: { type: Number, require: true },
    photoUri: { type: String, default: null },
    activated: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }),
)
