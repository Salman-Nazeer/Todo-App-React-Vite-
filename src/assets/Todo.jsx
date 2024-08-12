import { useEffect, useState } from "react";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { v4 as uuidv4 } from 'uuid';

const Todo = () => {
    const [todo, settodo] = useState("");
    const [todos, settodos] = useState([]);
    const [showFinished, setshowFinished] = useState(false);

    const toggleFinished = (e) => {
        setshowFinished(!showFinished);
    }

    useEffect(() => {
        let todoString = localStorage.getItem("todos")
        if (todoString) {
            let todos = JSON.parse(localStorage.getItem("todos"))
            settodos(todos)
        }
        saveToLS();
    }, [])

    const saveToLS = () => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }

    useEffect(() => {
        saveToLS();
    }, [todos])

    const handleChange = (e) => {
        settodo(e.target.value);
    };

    const handleAdd = () => {
        settodos([...todos, { id: uuidv4(), todo: todo, isCompleted: false }]);
        settodo("");
    };

    const handleCheckBOx = (e) => {
        let id = e.target.name;
        let index = todos.findIndex(item => {
            return item.id === id;
        })
        let newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        settodos(newTodos);
        saveToLS();

    }


    const handleEdit = (e, id) => {
        let t = todos.filter(i => i.id === id)
        settodo(t[0].todo)
        let newTodos = todos.filter(item => {
            return item.id != id
        });
        settodos(newTodos);
        saveToLS();
    };

    const handleDelete = (e, id) => {
        let newTodos = todos.filter(item => {
            return item.id != id
        });
        settodos(newTodos);
        saveToLS();
    };

    return (
        <>
            <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
                <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
                <div className="addTodo my-5 flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">Add Todos</h2>
                    <div className="flex">
                        <input
                            onChange={handleChange}
                            value={todo}
                            className="w-full rounded-full px-5 py-1"
                            type="text"
                        />
                        <button
                            disabled={todo.length <= 3}
                            onClick={handleAdd}
                            type="submit"
                            className="bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white"
                        >
                            Save
                        </button>
                    </div>
                </div>
                <div className="flex gap-2 ms-2">
                    <input onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="" />
                    <pre className="">Show Finished</pre>
                </div>
                <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
                <h2 className="text-2xl font-bold">Yours Todos</h2>

                {todos.length === 0 && <div className="m-5">There is no Todo!</div>}
                <div className="todos">

                    {todos.map(item => {
                        return (
                            (showFinished || !item.isCompleted)
                            &&
                            <div key={item.id} className="todo flex flex w-75% justify-between my-2 gap-5">
                                <div className="flex gap-5">
                                    <input onChange={handleCheckBOx} type="checkbox" value={item.isCompleted} name={item.id} checked={item.isCompleted} id="" />
                                    <div className={item.isCompleted ? "line-through" : ""}>
                                        {item.todo}
                                    </div>
                                </div>
                                <div className="button flex h-full my-auto ">
                                    <button
                                        onClick={(e) => handleEdit(e, item.id)}
                                        className="bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={(e) => handleDelete(e, item.id)}
                                        className="bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Todo;
