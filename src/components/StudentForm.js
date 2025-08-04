// components/StudentForm.js
import React, { useState, useEffect } from 'react';

export default function StudentForm({ onStudentAdded, editingStudent }) {
  const [form, setForm] = useState({ idNo: '', name: '', age: '', mobile: '', bloodGroup: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setForm(editingStudent);
    } else {
      setForm({ idNo: '', name: '', age: '', mobile: '', bloodGroup: '' });
    }
    setErrors({});
  }, [editingStudent]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!String(form.idNo).trim()) newErrors.idNo = 'ID is required';
    if (!form.name.trim()) newErrors.name = 'Name is required';

    const ageNum = Number(form.age);
    if (!/^\d+$/.test(form.age)) {
      newErrors.age = 'Age must be a number';
    } else if (ageNum < 0 || ageNum > 100) {
      newErrors.age = 'Age must be between 0 and 100';
    }

    if (!/^\d{10}$/.test(form.mobile)) {
  newErrors.mobile = 'Mobile must be exactly 10 digits';
}


    const validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    if (!validBloodGroups.includes(form.bloodGroup.trim().toUpperCase())) {
      newErrors.bloodGroup = 'Enter valid blood group (A+, B-, O+, etc)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    const url = editingStudent
      ? `https://spring-boot-backend-uwx7.onrender.com/api/student/${form.idNo}`
      : "https://spring-boot-backend-uwx7.onrender.com/api/student";

    const method = editingStudent ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    setForm({ idNo: '', name: '', age: '', mobile: '', bloodGroup: '' });
    onStudentAdded?.();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="idNo"
        placeholder="ID should be like (eg:N123)"
        value={form.idNo}
        onChange={handleChange}
        required
        disabled={editingStudent}
      />
      {errors.idNo && <small style={{ color: 'red' }}>{errors.idNo}</small>}

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      {errors.name && <small style={{ color: 'red' }}>{errors.name}</small>}

      <input
        name="age"
        placeholder="Age should be a number 0-100"
        value={form.age}
        maxLength="3"
        onChange={handleChange}
        required
      />
      {errors.age && <small style={{ color: 'red' }}>{errors.age}</small>}

            <input
        name="mobile"
        placeholder="Mobile"
        value={form.mobile}
        onChange={handleChange}
        maxLength="10"
        required
        />
        {errors.mobile && <small style={{ color: 'red' }}>{errors.mobile}</small>}

      <input
        name="bloodGroup"
        placeholder="Blood Group (e.g. A+, O-, AB+)"
        value={form.bloodGroup}
        onChange={handleChange}
        required
      />
      {errors.bloodGroup && <small style={{ color: 'red' }}>{errors.bloodGroup}</small>}

      <button type="submit">
        {editingStudent ? 'Update Student' : 'Add Student'}
      </button>
    </form>
  );
}
