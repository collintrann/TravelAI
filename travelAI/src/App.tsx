import { Routes, Route } from 'react-router-dom';
import { GroupNameForm } from './pages/GroupNameForm';
import { LocationForm } from './pages/LocationForm';
import { Dashboard } from './pages/Dashboard';
import { ThemeProvider } from './components/ui/theme-provider';
 
const App = () => {
   return (
      <>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
              <Route path="/" element={<GroupNameForm />} />
              <Route path="/location/:groupName" element={<LocationForm />} />
              <Route path="/dashboard/:groupName" element={<Dashboard />} />
          </Routes>
         </ThemeProvider>
      </>
   );
};
 
export default App;