import { useState, MouseEvent, FC, ChangeEvent, FormEvent } from "react";
import { BsPencilFill } from "react-icons/bs";
import { FaCheck, FaTrash } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';

import { Todo as TodoType } from '../interfaces/Todo'

interface PropType {
    todo: TodoType;
    toggleCompleted: Function;
    setTodo: Function;
    delTodo: Function;
}

const Todo: FC<PropType> = (props: PropType) => {
    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [task, setTask] = useState<string>(props.todo.task)

    const { todo } = props

    const handleChange: (ev: ChangeEvent<HTMLInputElement>) => void = (ev) => {
        setTask(ev.target.value)
    }

    const handleSubmit: (ev: FormEvent<HTMLFormElement>) => void = (ev) => {
        ev.preventDefault()
        props.setTodo(task)
    }

    const handleCompleted: (ev: MouseEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement>) => void = (ev) => {
        ev.preventDefault()
        props.toggleCompleted()
    } 

    return (
        <div
			key={todo.id}
			className="p-2 border rounded-md my-1 flex justify-between items-center"
		>
			{
				isEditable ? 
				<form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        value={task}
                        className="bg-transparent text-white border-white border p-1"
                        onChange={handleChange}
                    />
                </form> :
				<div
					onContextMenu={handleCompleted}
					className={ todo.isCompleted ? 'line-through' : '' }
				>
					{ todo.task }
				</div>
			}

			<div className="text-white text-lg">
                <button className="mx-1" onClick={handleCompleted}>{ todo.isCompleted ? <ImCross /> : <FaCheck />}</button>
				<button className="mx-1" onClick={() => setIsEditable(prevState => !prevState)}><BsPencilFill /></button>
                <button className="mx-1" onClick={() => props.delTodo()}><FaTrash /></button>
			</div>
		</div>
    )
}

export default Todo