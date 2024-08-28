import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import JobsTable from "../components/JobTable";
import Logs from "../components/Logs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal } from "../components/modal/Modal";

const LoggedPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    navigate("/"); // Adjust the path as needed
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <Button
        variant="contained"
        color="error"
        startIcon={<LogoutIcon />}
        sx={{ position: "fixed", top: 5, left: 5, zIndex: 2000 }}
        onClick={handleLogoutClick}
      >
        Logout
      </Button>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="py-4">
          <JobsTable />
        </div>
        <div className="py-4">
          <Logs />
        </div>
      </div>
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        sx={{ position: "fixed", top: 5, right: 5, zIndex: 2000 }}
        onClick={() => setShowModal(true)}
      >
        Add
      </Button>
      {showModal && <Modal onClose={handleCloseModal} />}
    </section>
  );
};

export default LoggedPage;
