import { NextApiRequest, NextApiResponse } from 'next';
//import { ITask } from '../../lib/models/TaskModel';
import { connectDatabase } from '../../lib/db';
import TaskModel from '../../lib/models/TaskModel';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  const userId = session?.user?.email;
  switch (req.method) {

    case 'GET':
      try {
        await connectDatabase();
        const tasks = await TaskModel.find();
        res.status(200).json(tasks);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
        res.status(500).json({ error: 'Error al obtener las tareas' });
      }
      break;

    case 'POST':
      const { title, completed } = req.body;
      try {
        await connectDatabase();
        const newTask = new TaskModel({ title, completed, userId });
        await newTask.save();
        res.status(201).json(newTask);
      } catch (error) {
        console.error('Error al crear la tarea:', error);
        res.status(500).json({ error: 'Error al crear la tarea' });
      }
      break;

    case 'DELETE':
      try {
        await connectDatabase();
        const task = await TaskModel.deleteMany();
        res.status(200).json(task)
      } catch (error) {
        res.status(500).json({error: 'Error al eliminar la tarea'})
      }
      res.status(405).json({ message: 'Método no permitido' });
      break;
  }
}