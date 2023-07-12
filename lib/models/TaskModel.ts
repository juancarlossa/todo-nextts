import mongoose, { models, model, Schema } from 'mongoose';

interface ITask extends Document {
  title: string;
  completed: boolean;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: false }
});

const TaskModel = models.Task || model('Task', TaskSchema)
// Crea el modelo de tarea
//export default mongoose.models.TaskModel || mongoose.model<ITask>('TaskModel', TaskSchema);
export default TaskModel