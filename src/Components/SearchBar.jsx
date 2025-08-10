import { useState, useEffect } from 'react';
import { Form, InputGroup, Button, Container, Row, Col } from 'react-bootstrap';

export const SearchBar = ({ tasks, onSearchResults }) => {
    const [searchQuery, setSearchQuery] = useState('');
    
    // When searchQuery changes or tasks update, filter the tasks and send results back
    useEffect(() => {
        const filteredTasks = handleSearch();
        onSearchResults(filteredTasks);
    }, [searchQuery, tasks]);

    const handleSearch = () => {
        if (!tasks) return [];
        
        if (searchQuery.trim() === "") {
            return tasks;
        }

        return tasks.filter((task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission
        const filteredTasks = handleSearch();
        onSearchResults(filteredTasks);
    };

    return (
        <Container className="p-0">
            <Row className="justify-content-center">
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <InputGroup>
                            <Form.Control
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Search tasks"
                            />
                            <Button variant="primary" type="submit">
                                Search
                            </Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};