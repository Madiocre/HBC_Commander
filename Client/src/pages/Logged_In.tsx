import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import JobsTable from "../components/JobTable";
import Logs from "../components/Logs";

const LoggedPage = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <Button variant="contained" color="error" startIcon={<LogoutIcon />} sx={{ position: "fixed", top: 5, left: 5, zIndex: 2000 }}>
        Logout
      </Button>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <JobsTable />
        <Logs />
      </div>
      <Button variant="contained" color="success" startIcon={<AddIcon />} sx={{ position: "fixed", top: 5, right: 5, zIndex: 2000 }}>
        Add
      </Button>
    </section>
  );
}

export default LoggedPage;