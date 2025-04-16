// page.js - 목차 순서 + 사진 반영 + 실시간 미리보기 포함
'use client'
import { useState } from 'react'
import SectionSidebar from './SectionSidebar'
import InvitationForm from './InvitationForm'

export default function Home() {
  const [formData, setFormData] = useState({
    name: 'Heejun & Sujin',
    date: '2024년 6월 15일 토요일 오후 2시',
    location: '라온컨벤션 2층 베르사유홀',
    message: `저희 두 사람이 사랑으로 하나 되어
새로운 출발을 함께 하고자 합니다.
기쁜 날 소중한 걸음으로 축복해주세요.`,
    account: `신랑: 123-4567-8901
신부: 234-5678-9012`,
  });

  const [sections, setSections] = useState([]);

  return (
    <div className="flex w-full min-h-screen bg-[#f5f0c8] text-sm">
      {/* 목차 설정 영역 */}
      <SectionSidebar onChange={setSections} />

      {/* 입력폼 영역 */}
      <div className="w-full md:w-1/2 p-6 overflow-y-auto">
        {sections.filter(s => s.enabled).map((section) => {
          if (section.id === 'info') {
            return <InvitationForm key="form" formData={formData} setFormData={setFormData} />
          }
          return null;
        })}
      </div>

      {/* 아이폰 미리보기 영역 */}
      <div className="hidden lg:flex justify-center items-center w-[400px] p-6">
        <div className="relative w-[300px] h-[600px] bg-white border-[14px] border-black rounded-[45px] shadow-2xl overflow-hidden">
          {/* 노치 */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-black rounded-b-xl z-10" />
          <div className="absolute top-3 left-6 w-2 h-2 bg-white rounded-full z-20" />
          <div className="absolute top-3 left-10 w-1.5 h-1.5 bg-white rounded-full z-20" />

          <div className="h-full w-full overflow-y-auto p-4 space-y-4 text-center">
            {sections.map((section) => {
              if (!section.enabled) return null;
              if (section.id === 'photo' && section.imageUrl) {
                return <img key="photo" src={section.imageUrl} className="rounded-xl w-full object-cover" alt="사진" />
              }
              if (section.id === 'info') {
                return (
                  <div key="info">
                    <h1 className="text-lg font-bold">{formData.name}</h1>
                    <p>{formData.date}</p>
                    <p>{formData.location}</p>
                  </div>
                )
              }
              if (section.id === 'message') {
                return <p key="message" className="whitespace-pre-wrap">{formData.message}</p>
              }
              if (section.id === 'account') {
                return <p key="account" className="whitespace-pre-wrap">{formData.account}</p>
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
