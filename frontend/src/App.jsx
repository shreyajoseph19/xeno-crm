
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function App() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', totalSpend: '', visits: '', lastOrder: '' });

  const fetchCustomers = async () => {
    const res = await axios.get('http://localhost:5000/api/customers');
    setCustomers(res.data);
  };

  useEffect(() => { fetchCustomers(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const addCustomer = async () => {
    if (!form.name || !form.email) return;
    await axios.post('http://localhost:5000/api/customers', form);
    setForm({ name: '', email: '', totalSpend: '', visits: '', lastOrder: '' });
    fetchCustomers();
  };

  const deleteCustomer = async id => {
    await axios.delete(`http://localhost:5000/api/customers/${id}`);
    fetchCustomers();
  };

  const chartData = {
    labels: customers.map(c => c.name),
    datasets: [{
      label: 'Total Spend',
      data: customers.map(c => parseFloat(c.totalSpend || 0)),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-pink-700 mb-4 text-center">Customer CRM</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="p-2 border rounded" />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="p-2 border rounded" />
        <input name="totalSpend" placeholder="Total Spend" value={form.totalSpend} onChange={handleChange} className="p-2 border rounded" />
        <input name="visits" placeholder="Visits" value={form.visits} onChange={handleChange} className="p-2 border rounded" />
        <input name="lastOrder" placeholder="Last Order Date" value={form.lastOrder} onChange={handleChange} className="p-2 border rounded col-span-2" />
      </div>
      <button onClick={addCustomer} className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded mb-4">Add Customer</button>
      <ul className="space-y-2 mb-6">
        {customers.map(c => (
          <li key={c.id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>{c.name} - ₹{c.totalSpend} (Visits: {c.visits})</div>
            <button onClick={() => deleteCustomer(c.id)} className="text-red-500 hover:text-red-700">Delete</button>
          </li>
        ))}
      </ul>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold text-pink-600 mb-2">Customer Spend Insights</h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
}

export default App;
