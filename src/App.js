import React, { useEffect, useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const res = await fetch("https://spring-boot-backend-uwx7.onrender.com/api/student");
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Student Management</h1>
      <StudentForm onStudentAdded={fetchStudents} />
      <StudentList students={students} onDelete={fetchStudents} />
    </div>
  );
}

export default App;
