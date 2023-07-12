import React from 'react';
import Todo, { TodoProps } from './Todo';

interface TodoType {
  _id: number;
  completed: boolean;
  title: string;
  userId: string;
}

interface ListTodoProps {
  list: TodoType[];
  setList: React.Dispatch<React.SetStateAction<TodoType[]>>;
  handleSave: () => void;
}

const ListTodo: React.FC<ListTodoProps> = ({ list, setList, handleSave }) => {
  return (
    <section className=' py-4 grid grid-cols-4 gap-5 mx-60'>
      {list.map((todo) => (
        <Todo
          userId={todo.userId}
          _id={todo._id}
          completed={todo.completed}
          key={todo._id}
          title={todo.title}
          todo={todo}
          list={list}
          setList={setList}
          handleSave={handleSave}
        />
      ))}
    </section>
  );
};

export default ListTodo;