import { FC, ChangeEvent, FormEvent, MouseEvent, useState } from "react"
import { nanoid } from 'nanoid'
import { BsPencilFill } from 'react-icons/bs'

import Todo from './components/Todo'

import { Todo as TodoType } from './interfaces/Todo'

const App: FC = () => {
	const [newTodo, setNewTodo] = useState<string>('')

	const [todos, setTodos] = useState<TodoType[]>([])

	const handleChange: (ev: ChangeEvent<HTMLInputElement>) => void = (ev) => {
		setNewTodo(ev.target.value)
	}

	const handleSubmit: (ev: FormEvent<HTMLFormElement>) => void = (ev) => {
		ev.preventDefault()
		if(newTodo !== ''){
			setTodos(prevTodos => {
				return [ ...prevTodos, { task: newTodo, isCompleted: false, id: nanoid(), isEditable: false }]
			})
			setNewTodo('')
		}
	}

	const delTodo: (id: string) => void = (id) => {
		setTodos((prevTodos: TodoType[]) => {
			return prevTodos.filter((todo: TodoType) => (
				id !== todo.id
			))
		})
	}

	const toggleCompleted: (id: string) => void = (id) => {
		setTodos((prevTodos: TodoType[]) => {
			return prevTodos.map((todo: TodoType) => (
				todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
			))
		})
	}

	const setTodo: (id: string, task: string) => void = (id, task) => {
		setTodos((prevTodos: TodoType[]) => {
			return prevTodos.map((todo: TodoType) => (
				id === todo.id ? { ...todo, task: task } : todo
			))
		})
	}

	const pendingTodoElements: JSX.Element[] = todos.map((todo: TodoType) => (
		!todo.isCompleted ? <Todo 
			todo={todo} 
			setTodo={(task: string) => setTodo(todo.id, task)} 
			toggleCompleted={() => toggleCompleted(todo.id)}
			delTodo={() => delTodo(todo.id)}
		/> : <></>
	))

	const completedTodoElements: JSX.Element[] = todos.map((todo: TodoType) => (
		todo.isCompleted ? <Todo 
			todo={todo} 
			setTodo={(task: string) => setTodo(todo.id, task)} 
			toggleCompleted={() => toggleCompleted(todo.id)}
			delTodo={() => delTodo(todo.id)}
		/> : <></>
	))

	return (
		<div className="flex flex-col">
			<div className="shadow-md py-4 text-2xl text-center">
				Taskify
			</div>

			<div className="p-3">
				<form className="flex justify-center items-center" onSubmit={handleSubmit}>
					<input 
						type="text"
						value={newTodo}
						onChange={handleChange} 
						placeholder="Do something..." 
						className='border w-2/3 border-slate-400 focus:outline-none focus:border-blue-500 rounded-md p-2 m-2'
					/>
					<button className="bg-blue-600 rounded-md px-4 py-2 text-white">Add Todo</button>
				</form>
			</div>

			<div className="flex items-center lg:items-start md:items-start flex-col lg:flex-row md:flex-row text-white p-2">
				<div className="p-3 rounded-lg my-2 flex lg:w-1/2 bg-blue-600 mx-1 flex-col w-4/5">
					<h2 className="text-lg border-b pb-2 mb-4">Pending Todos</h2>
					{ pendingTodoElements }
				</div>
				<div className="p-3 flex my-2 rounded-lg lg:w-1/2 bg-green-600 mx-1 flex-col w-4/5">
					<h2 className="text-lg border-b pb-2 mb-4">Completed Todos</h2>
					{ completedTodoElements }
				</div>
			</div>
		</div>
	)
}

export default App