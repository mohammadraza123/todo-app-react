import { useState } from "react"
import { IoMdAddCircle, IoIosCheckmarkCircle } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit, MdDelete } from "react-icons/md";

export default function Todo() {
    
// get Data from localstorage 
const getData = () => {
    const getItem = localStorage.getItem("data");
    if (getItem) {
      return JSON.parse(getItem);
    } else {
      return [];
    }
  };
    
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState(getData());
    const [editTodo, setEditTodo] = useState(false);

    function addTodo() {
        if (inputValue.trim() === '') {
            alert('Please write something')
        } else {
            setTodos([...todos, inputValue]);
            setInputValue('');
        }
    }

    function deleteAllTodo() {
        setTodos([]);
    }

    function editTodoItem(index) {
        setEditTodo(index);
        setInputValue(todos[index])
    }

    function updateTodoItem(index) {
        if (inputValue.trim() === '') {
            alert("Please write something")
        } else {
            const update = [...todos];
            update[index] = inputValue;
            setTodos(update)
            setEditTodo(null);
        }
    }
    
    function deleteTodoItem(index) {
        const deleteTodo = [...todos];
        deleteTodo.splice(index, 1);
        setTodos(deleteTodo)
    }

// set Data from localstorage
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(todos));
  }, [todos]);


    return (
        <div className="flex flex-col mt-24 items-center">
            <h1 className="text-4xl font-bold leading-7 text-gray-900 mb-8">Todo App</h1>
            <div className="bg-stone-300 rounded sm:p-8 md:p-[-2px]">

                <div className=" border rounded-lg shadow-md p-[34px]  flex items-center justify-center  space-x-4">
                    <input
                        className="border w-34 md:w-[390px] border-gray-300 focus:outline-none focus:border-blue-500 rounded-md py-2 px-4 block  appearance-none leading-normal"
                        type="text"
                        value={inputValue}
                        placeholder="Write something"
                        onChange={e => setInputValue(e.target.value)}
                    />

                    <button
                        className="text-3xl text-green-600"
                        onClick={addTodo}>
                        <IoMdAddCircle />
                    </button>

                    <button
                        className="text-3xl text-red-600"
                        onClick={deleteAllTodo}>
                        <AiFillDelete />
                    </button>
                </div>

                <div>
                    {todos.map((todo, index) => {
                        return (
                            <ul
                                className="rounded-lg shadow-xl border-black p-2 gap-2 mt-2"
                                key={index}
                            >
                                <div
                                    key={index}
                                    className="flex justify-between">
                                    {editTodo === index ? (
                                        <>
                                            <input
                                                className="border border-gray-300 focus:outline-none focus:border-blue-500 rounded-md py-2 px-4 block sm:w-[300px] md:w-[390px] appearance-none leading-normal"
                                                type="text"
                                                value={inputValue}
                                                onChange={e => setInputValue(e.target.value)} />
                                            <button
                                                className='text-[24px] text-green-600'
                                                onClick={() => updateTodoItem(index)} >
                                                <IoIosCheckmarkCircle />
                                            </button>
                                        </>
                                    ) : (
                                        <>

                                            <li className=" p-4 gap-3 ">{todo}</li>
                                            <div className="flex gap-3">

                                                <button
                                                    className='text-[20px] text-gray-600'
                                                    onClick={() => editTodoItem(index)} >
                                                    <MdEdit /></button>
                                                <button
                                                    className='text-[20px] text-red-600'
                                                    onClick={() => deleteTodoItem(index)}>
                                                    <MdDelete /></button>

                                            </div>
                                        </>
                                    )}
                                </div>
                            </ul>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


