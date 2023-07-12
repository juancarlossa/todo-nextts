import React from 'react';
import axios from 'axios';
//import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

interface TodoType {
  _id: number;
  completed: boolean;
  title: string;
  userId: string;
}

export interface TodoProps {
  title: string;
  _id: number;
  completed: boolean;
  userId: string;
  todo: TodoType;
  list: TodoType[];
  setList: React.Dispatch<React.SetStateAction<any[]>>;
  handleSave: () => void;
}

export default function Todo({ title, userId, _id, todo, list, setList, handleSave }: TodoProps) {
  
  const deleteHandler = async () => {
    console.log(_id)
    const taskId = todo._id;
    await axios.delete(`/api/tasks/${taskId}`)
      .then(res => console.log("Deleted task " + taskId))
      .catch(error => console.error(error));
    setList(list.filter((el) => el._id !== taskId));
    handleSave();
  };

  const completedHandler = async () => {
    console.log(_id)
    const taskId = todo._id;
    await axios.put(`/api/tasks/${taskId}`, { completed: !todo.completed })
      .then(res => console.log("Updated task " + taskId))
      .catch(error => console.error(error));
    setList(list.map((el) => {
      if (el._id === todo._id) {
        return {
          ...el,
          completed: !el.completed
        };
      }
      return el;
    }));
    handleSave();
  };

//    const putHandler = () => {
//      axiosEdit()
//    }
  
  return (
    <div className={`${todo.completed ? "py-5 px-2 bg-lime-400 my-2 rounded-lg" : "py-5 bg-stone-500 my-2 rounded-lg"}`}>
      <ul key={_id} className={`${todo.completed ? "completed italic text-zinc-600" : "text-white font-medium"}`}>
      {title}
        <button className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 ml-5 rounded transition ease-in-out delay-100" onClick={deleteHandler}><AiFillDelete /> </button>
        <button className=" bg-green-500 hover:bg-green-300 text-white font-bold py-2 px-3 mx-0 rounded transition ease-in-out delay-100" onClick={completedHandler}> <FaCheck /> </button>
      </ul>
    </div>
  )
}
