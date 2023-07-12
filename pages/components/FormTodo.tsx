import React from 'react'

interface FormTodoProps {
  listHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  inputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSave: () => void;
} 

function FormTodo({ listHandler, handleSubmit, inputHandler, input, setInput, handleSave }: FormTodoProps) {

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <h1>{input}</h1>
        <input
          type="text"
          placeholder="Type item"
          onChange={inputHandler}
          value={input}
          className="text-stone-500 placeholder-italic placeholder-text-slate-400 bg-white border border-stone-400 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-stone-50 font-semibold py-2 px-4 rounded transition ease-in-out delay-150"
          type="submit"
          onClick={() => {
            listHandler;
            handleSave
          }}
        >
          add
        </button>
      </div>
    </form>
  );
}
export default FormTodo;