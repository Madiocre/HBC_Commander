import { useState } from 'react';
// import { apiCall } from './services/apiService';

import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Logs from './pages/Logs';
import Settings from './pages/Settings';
import Logout from './pages/Logout';



const Menus = [
  { title: 'Dashboard', src: 'dashboard', gap: false },
  { title: 'Jobs', src: 'jobs', gap: false },
  { title: 'Logs', src: 'log', gap: true },
  { title: 'Settings', src: 'setting', gap: false },
  { title: 'Logout', src: 'logout', gap: true },
];

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(Menus[0].title); // Default to first menu

  const handleMenuClick = (title: string) => {
    setSelectedMenu(title);
  };


  let content;
  switch (selectedMenu) {
    case 'Dashboard':
      content = <Dashboard />;
      break;
    case 'Jobs':
      content = <Jobs />;
      break;
    case 'Logs':
      content = <Logs />;
      break;
    case 'Settings':
      content = <Settings />;
      break;
    case 'Logout':
      content = <Logout />; // Handle logout functionality
      break;
    default:
      content = <Dashboard />; // Default to dashboard
  }
  return (
    <div className="flex">
      <Sidebar open={isOpen} setOpen={setIsOpen} menus={Menus} onMenuClick={handleMenuClick} />
      <div className="h-screen flex-1 p-7">
        {content}
      </div>
    </div>
  );
};

export default App;