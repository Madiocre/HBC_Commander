import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Log } from "../types/logs";
import logsData from './logs.db.json'; // Adjust the import path based on your project structure

const Logs = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching data from JSON
    setLogs(logsData);
  }, []);

  const handleViewAllLogs = () => {
    navigate('/all-logs');
  };

  return (
    <div style={{ padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px', minWidth: '650px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '1.5em', marginTop: '16px', marginBottom: '16px' }}>Logs</h2>
      <div 
        style={{ 
          maxHeight: '400px', 
          overflowY: 'auto', 
          whiteSpace: 'pre-wrap',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}
      >
        {logs.slice(0, 4).map((log) => (
          <div key={log.LogID} style={{ marginBottom: '8px', padding: '4px', borderBottom: '1px solid #ddd' }}>
            {`${new Date(log.Timestamp).toLocaleString()} - [Status: ${log.Status}] ${log.Message}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Logs;
