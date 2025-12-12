import axios from 'axios';
import { ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddPatient = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', age: '', gender: 'male', contact: '', address: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/patients', formData);
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Error adding patient');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition"><ArrowLeft /></Link>
                <h2 className="text-2xl font-bold text-gray-800">Add New Patient</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Patient Name</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange}
                        className="w-full p-3 border rounded-xl focus:ring-2 ring-indigo-500 outline-none" placeholder="Enter full name" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                        <input required type="number" name="age" value={formData.age} onChange={handleChange}
                            className="w-full p-3 border rounded-xl focus:ring-2 ring-indigo-500 outline-none" placeholder="Years" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange}
                            className="w-full p-3 border rounded-xl focus:ring-2 ring-indigo-500 outline-none">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number</label>
                    <input required type="tel" name="contact" value={formData.contact} onChange={handleChange}
                        className="w-full p-3 border rounded-xl focus:ring-2 ring-indigo-500 outline-none" placeholder="+91 9876543210" />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                    <textarea required name="address" rows="3" value={formData.address} onChange={handleChange}
                        className="w-full p-3 border rounded-xl focus:ring-2 ring-indigo-500 outline-none" placeholder="Full residential address..." ></textarea>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/30 flex justify-center items-center gap-2">
                    {loading ? 'Saving...' : <><Save size={20} /> Register Patient</>}
                </button>
            </form>
        </div>
    );
};

export default AddPatient;
