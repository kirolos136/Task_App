import { useState } from 'react';
import { Form, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export const ToDoFrom = () =>{
    const [taskTitle , setTaskTitle] = useState("");
    const [taskDesc , setTaskDesc] = useState("");
    const navigate = useNavigate();

    
    function handleAddTask(e){
        e.preventDefault();

        let tasks = [];
        const task = {
                id:uuidv4(),
                title:taskTitle,
                desc:taskDesc,
                completed:false,
                createdAt: new Date()
            }
        
        if(!localStorage.getItem("tasks")){
            tasks.push(task);
            localStorage.setItem("tasks",JSON.stringify(tasks));
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks.push(task);
            localStorage.setItem("tasks",JSON.stringify(tasks));
        }
        
        alert("Task Added Successfully");
        setTaskTitle("");
        setTaskDesc("");
    }

    function returnToTasks(){
      navigate("/");
    }

    return(
        <Form onSubmit={handleAddTask}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter task description"
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" className="w-100">
                  Add Task
              </Button>
              <Button 
                    variant="secondary" 
                    type="button" 
                    className="w-100" 
                    onClick={returnToTasks}
              >
                    Return to Tasks
              </Button>
              </div>
        </Form>
    )
}