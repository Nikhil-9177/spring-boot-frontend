import React, { useState } from 'react';

export default function StudentForm({ onStudentAdded }) {
  const [form, setForm] = useState({ idNo: '', name: '', age: '', mobile: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch("https://spring-boot-backend-uwx7.onrender.com/api/student", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    setForm({ idNo: '', name: '', age: '', mobile: '' });

    // Call the parent function to refresh the table
    if (onStudentAdded) {
      onStudentAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="idNo" placeholder="ID" value={form.idNo} onChange={handleChange} required />
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
      <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required />
      <button type="submit">Add Student</button>
    </form>
  );
}
