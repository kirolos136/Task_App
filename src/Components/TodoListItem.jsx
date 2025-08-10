import { Card, Badge, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

export const ToDoItem = () => {
  const {id} = useParams();

  // Memoize the task retrieval to prevent unnecessary calculations on re-renders
  const task = useMemo(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const reqTask = tasks.filter((task) => task.id === id);
    return reqTask[0];
  }, [id]);

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>
          {task.title}
          <Badge 
            bg={task.completed ? "success" : "warning"} 
            className="ms-2"
          >
            {task.completed ? "Completed" : "In Progress"}
          </Badge>
        </Card.Title>
        <Card.Text>{task.desc}</Card.Text>
        <Card.Footer className="text-muted">
          <Row>
            <Col>
              Created: {new Date(task.createdAt).toLocaleString()}
            </Col>
          </Row>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};