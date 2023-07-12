import { NextApiRequest, NextApiResponse } from 'next';
import TaskModel from '@/lib/models/TaskModel';
import { connectDatabase } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await connectDatabase()
    try {
      const taskId = req.query.id as string;
      const task = await TaskModel.findById(taskId);

      if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }

      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Error al GET la tarea' });
    }
  } else if (req.method === 'DELETE'){
      await connectDatabase()
      try {
        const taskId = req.query.id as string;
        const task = await TaskModel.findByIdAndRemove(taskId);

        if (!task) {
          return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ error: 'Error al DELETE la tarea' });
      }

  } else if (req.method === 'PUT'){
      const { completed } = req.body;
      await connectDatabase()
      try {
        const taskId = req.query.id as string;
        const task = await TaskModel.findByIdAndUpdate(taskId, { completed }, { new: true });
        
        if (!task) {
          return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ error: 'Error al PUT la tarea' });
      }
  
  }
}