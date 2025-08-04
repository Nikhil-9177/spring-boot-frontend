// App.js
import React, { useEffect, useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    const res = await fetch("https://spring-boot-backend-uwx7.onrender.com/api/student");
    const data = await res.json();
    setStudents(data);
    setEditingStudent(null); // Clear edit after update
  };

  const handleEdit = (idNo) => {
    const student = students.find(s => s.idNo === idNo);
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // optional UX improvement
  };

  return (
    <div>
      <h1>Student Management</h1>
      <StudentForm
        onStudentAdded={fetchStudents}
        editingStudent={editingStudent}
      />
      <StudentList
        students={students}
        onDelete={fetchStudents}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
