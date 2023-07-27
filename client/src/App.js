import { Dashboard } from "./Components/Dashboard";
import { Nav } from "./Components/Nav";
import { Create } from "./Components/Create";
import { Edit } from "./Components/Edit";
import { Form } from "./Components/Form";
import { Responses } from "./Components/Responses";
import { AllForms } from "./Components/AllForms";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="bg-zinc-900 min-h-screen">
          <Nav />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/form/:id" element={<Form />} />
            <Route path="/responses/:id" element={<Responses />} />
            <Route path="/allForms" element={<AllForms />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
