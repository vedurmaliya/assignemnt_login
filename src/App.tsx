import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from "./components/Form"
import Component1 from "./components/Component1"
import Component2 from './components/Component2';

function App() {

  return (
    <Router>
    <Routes>
      <Route path='/' element={<Form />} />
      <Route index element={<Form />} />
      <Route path='/component1' element={<><Component1 /><Component2 /></>} />
    </Routes>
    </Router>
  )
}

export default App;
