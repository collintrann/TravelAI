import { Routes, Route } from 'react-router-dom';
import { GroupNameForm } from './pages/GroupNameForm';
import { LocationForm } from './pages/LocationForm';
import { Dashboard } from './pages/Dashboard';
 
const App = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<GroupNameForm />} />
            <Route path="/location/:groupName" element={<LocationForm />} />
            <Route path="/dashboard:groupName" element={<Dashboard />} />
         </Routes>
      </>
   );
};
 
export default App;