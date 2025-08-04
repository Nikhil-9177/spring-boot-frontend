// components/StudentList.js
import React from 'react';

export default function StudentList({ students, onDelete, onEdit }) {
  const deleteStudent = async id => {
    await fetch(`https://spring-boot-backend-uwx7.onrender.com/api/student/${id}`, {
      method: "DELETE"
    });
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div>
      <h2>Persons Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Mobile</th>
            <th>Blood Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.idNo}>
              <td>{s.idNo}</td>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>{s.mobile}</td>
              <td>{s.bloodGroup}</td>
              <td>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <button onClick={() => onEdit(s.idNo)}>Edit</button>
                    <button onClick={() => deleteStudent(s.idNo)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
