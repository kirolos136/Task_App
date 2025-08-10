import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { Card, Row, Button, Col, Alert } from 'react-bootstrap';

export const Main = () => {
    const [tasks, setTasks] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('success');

    const navigate = useNavigate();

    // Memoize filtered tasks to prevent recalculations on every render
    const filteredTasks = useMemo(() => {
        return searchResults.filter(task => !task.completed);
    }, [searchResults]);
    
    // Memoize completed tasks
    const completedTasks = useMemo(() => {
        return searchResults.filter(task => task.completed);
    }, [searchResults]);

    function goToForm() {
        navigate("/AddTask");
    }

    function goToTask(id){
        navigate(`/${id}`)
    }

    // Load tasks from localStorage
    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            const parsedTasks = JSON.parse(storedTasks);
            setTasks(parsedTasks);
            setSearchResults(parsedTasks);
        }
    }, []);

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks]);

    function handleDelete(title) {
        // Create a new array without the deleted task
        const updatedTasks = tasks.filter(task => task.title !== title);
        setTasks(updatedTasks);
        setSearchResults(updatedTasks);
        
        // Show success alert
        showTemporaryAlert('Task deleted successfully', 'success');
    }

    function handleComplete(title) {
        // Update the completed status of the task
        const updatedTasks = tasks.map(task => {
            if (task.title === title) {
                return { ...task, completed: true };
            }
            return task;
        });
        
        setTasks(updatedTasks);
        setSearchResults(updatedTasks);
        
        // Show success alert
        showTemporaryAlert('Task marked as completed', 'success');
    }
    
    // Function to show temporary alert
    const showTemporaryAlert = (message, variant) => {
        setAlertMessage(message);
        setAlertVariant(variant);
        setShowAlert(true);
        
        // Hide alert after 3 seconds
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };
    
    // Function to handle search results from SearchBar
    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    return (
        <Card className="shadow-lg rounded-4">
            <Card.Title className="text-center p-4 fs-3 fw-bold bg-primary text-white rounded-top-4">
                📝 My ToDo List
            </Card.Title>
            <Card.Body className="p-4">
                {showAlert && (
                    <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                        {alertMessage}
                    </Alert>
                )}
                <Row className="mb-3">
                    <Col className="d-grid">
                        <Button onClick={goToForm} variant="info">➕ Add Task</Button>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <SearchBar tasks={tasks} onSearchResults={handleSearchResults} />
                    </Col>
                </Row>

                {/* Uncompleted Tasks Section */}
                <h5 className="fw-semibold text-dark mb-3">📌 Pending Tasks</h5>
                {filteredTasks.length === 0 ? (
                    <Alert variant="info">No tasks found</Alert>
                ) : (
                    filteredTasks.map((task) => (
                        <Row key={task.title} className="m-2 p-3 bg-light border-start border-5 border-warning rounded-3 shadow-sm align-items-center">
                            <Col onClick={() => goToTask(task.id)} style={{ cursor: 'pointer' }}>
                                <strong>{task.title}</strong>
                            </Col>
                            <Col className="d-flex justify-content-end gap-2">
                                <Button onClick={() => handleComplete(task.title)} variant="outline-success">
                                    ✅ Complete
                                </Button>
                                <Button onClick={() => handleDelete(task.title)} variant="outline-danger">
                                    🗑️ Delete
                                </Button>
                            </Col>
                        </Row>
                    ))
                )}

                {/* Completed Tasks Section */}
                <h5 className="fw-semibold text-secondary mt-5 mb-3">✅ Completed Tasks</h5>
                {completedTasks.length === 0 ? (
                    <Alert variant="info">No completed tasks</Alert>
                ) : (
                    completedTasks.map((task) => (
                        <Row key={task.title} className="m-2 p-3 bg-success bg-opacity-10 border-start border-5 border-success rounded-3 shadow-sm align-items-center">
                            <Col onClick={() => goToTask(task.id)} style={{ cursor: 'pointer' }}>
                                <strong style={{ textDecoration: 'line-through', color: '#198754' }}>
                                    {task.title}
                                </strong>
                            </Col>
                            <Col className="d-flex justify-content-end gap-2">
                                <span className="text-success fw-medium">Done 🎉</span>
                                <Button onClick={() => handleDelete(task.title)} variant="outline-danger">
                                    🗑️ Delete
                                </Button>
                            </Col>
                        </Row>
                    ))
                )}
            </Card.Body>
        </Card>
    );
};