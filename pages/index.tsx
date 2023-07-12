import './App.css';
import React, { useState, useEffect } from 'react';
import FormTodo from './components/FormTodo';
import ListTodo from './components/ListTodo';
import axios from 'axios';
import Navbar from './components/Navbar';
import { Profile } from './account';
import { getSession } from 'next-auth/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

interface Todo {
  _id: number;
  completed: boolean;
  title: string;
  userId: string;
}
interface UserPageProps {
  userId: string;
}
const App: React.FC<UserPageProps> = ({ userId }) => {
  const [input, setInput] = useState<string>("");
  const [list, setList] = useState<Todo[]>([]);
  const [id, setId] = useState<number>(0);
  
  // AXIOS + SERVER
  // Post

  // DeleteAll
  const axiosDeleteAll = async () => {
    await axios.delete('/api/tasks')
      .then(res => console.log(res.data))
      .catch(error => console.error(error));
    setList([]);
  };
  useEffect(() => {
    handleSave();
  }, [list]);

  // Fetch
  const axiosFetch = async () => {
    await axios.get('/api/tasks')
      .then(res => {
        const data = res.data;
        console.log('FETCH data')
        if (data) {
          setList(data);
        } else {
          console.log("No data to FETCH");
        }
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    axiosFetch();
  }, []);

  // Fetch Local Storage
  useEffect(() => {
    const data = localStorage.getItem('list');
    if (data) {
      const retrievedArray: Todo[] = JSON.parse(data);
      setList(retrievedArray);
    }
  }, []);

  useEffect(() => {
    const idNumber = localStorage.getItem('id');
    if (idNumber) {
      const retIdNumber = parseInt(idNumber, 10);
      setId(retIdNumber);
    }
  }, []);

  const handleSave = () => {
    const data = JSON.stringify(list);
    localStorage.setItem('list', data);

    const idNumber = String(id);
    localStorage.setItem('id', idNumber);
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const idHandler = () => {
    setId(id + 1);
  };

  const listHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (input !== "") {
      e.preventDefault();
      idHandler();
      setList([...list, {
        _id: id,
        completed: false,
        title: input,
        userId: userId,
      }]);
      //axiosPost(e);
      axiosFetch();
      setInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (input !== "") {
      e.preventDefault();
      try {
        idHandler();
        setList([...list, {
          _id: id,
          completed: false,
          title: input,
          userId: userId,
        }]);
      const taskData = {
        title: input,
        completed: false,
        userId: userId,
      };
      const response = await axios.post('/api/tasks', taskData);
      console.log(input, response.data);
      axiosFetch();
      } catch (error) {
        console.error('Error al crear la tarea:', error);
      }
        setInput("");
    };
  }

  return (
    <div className="App">
      <h1 className="py-10 text-zinc-600 text-4xl font-bold">Type your task</h1>
      <button className="bg-red-700 hover:bg-red-900 text-stone-50 font-semibold py-2 px-3 ml-5 rounded transition ease-in-out delay-100" onClick={axiosDeleteAll}>Delete All</button>
      <button className="bg-green-600 hover:bg-green-800 text-stone-50 font-semibold py-2 px-3 ml-5 rounded transition ease-in-out delay-100" onClick={handleSave}>Save</button>

      <FormTodo inputHandler={inputHandler} listHandler={listHandler} handleSubmit={handleSubmit} handleSave={handleSave} input={input} setInput={setInput} />
      <ListTodo list={list} setList={setList} handleSave={handleSave}/>
    </div>
  );
};

export default App;

export const getServerSideProps: GetServerSideProps<UserPageProps> = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);
  console.log('context ' + session?.user?.email)
  return {
    props: {
      userId: session?.user?.email || '',
    },
  };
};