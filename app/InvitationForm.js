
import { useState } from 'react';

export default function InvitationForm({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">👰 예식 정보</h2>

      <div className="space-y-1">
        <label className="block text-gray-700 font-medium">이름</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-gray-700 font-medium">날짜/시간</label>
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-gray-700 font-medium">장소</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mt-4">💌 초대 메시지</h3>
        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 resize-none mt-2"
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mt-4">📞 계좌 정보</h3>
        <textarea
          name="account"
          rows={2}
          value={formData.account}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 resize-none mt-2"
        />
      </div>
    </div>
  );
}
