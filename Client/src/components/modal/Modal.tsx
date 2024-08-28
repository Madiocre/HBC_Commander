import { useState } from "react";
import styles from "./modal.module.css";

export const Modal = ({ onClose, onAddJob }) => {
    const [formData, setFormData] = useState({
        taskName: '',
        status: 'Pending',
        startTime: '',
        endTime: '',
        executionTime: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Format start and end times if necessary
        const formattedStartTime = formData.startTime ? new Date(formData.startTime).toISOString() : null;
        const formattedEndTime = formData.endTime ? new Date(formData.endTime).toISOString() : null;

        // Create new job entry
        const newJob = {
            TaskName: formData.taskName,
            Status: formData.status,
            StartTime: formattedStartTime,
            EndTime: formattedEndTime,
            ExecutionTime: formData.executionTime
        };

        onAddJob(newJob); // Call the function passed from parent to add the job
        onClose(); // Close the modal after submission
    };

    return (
        <div className={styles.modalBack}>
            <div className={styles.modalContainer}>
                <h2>Add New Job</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="taskName">Task Name:</label>
                        <input
                            type="text"
                            id="taskName"
                            name="taskName"
                            value={formData.taskName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="executionTime">Execution Time (in minutes):</label>
                        <input
                            type="number"
                            id="executionTime"
                            name="executionTime"
                            value={formData.executionTime}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.submitBtn}>Add Job</button>
                        <button type="button" className={styles.modalCloseBtn} onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
