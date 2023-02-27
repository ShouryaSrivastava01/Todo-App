import React from "react";
import deleteBtn from "../assets/deleteBtn.svg"

export default function TodoCard({ props, deleteTask }) {
    return (
        <li className="taskList">
            {props.task}
            <button onClick={() => deleteTask(props.id)} ><img src={deleteBtn} alt="delete button"/></button>
        </li>
    )
}