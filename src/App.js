import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToDoFrom } from './Components/TodoForm';
import { Main } from './Components/Main';
import { ToDoItem } from './Components/TodoListItem';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="AddTask" element={<ToDoFrom/>}/>
          <Route path="/:id" element={<ToDoItem/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
