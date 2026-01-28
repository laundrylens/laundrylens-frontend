import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import {
  ProfileSection,
  SubscriptionSection,
  PaymentHistorySection,
} from '../components/mypage'

type TabId = 'profile' | 'subscription' | 'history'

interface Tab {
  id: TabId
  label: string
}

const TABS: Tab[] = [
  { id: 'profile', label: '프로필' },
  { id: 'subscription', label: '구독 현황' },
  { id: 'history', label: '결제 내역' },
]

export default function MyPage() {
  const { isAuthenticated, user } = useAuthStore()
  const [activeTab, setActiveTab] = useState<TabId>('profile')

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSection user={user} />
      case 'subscription':
        return <SubscriptionSection user={user} />
      case 'history':
        return <PaymentHistorySection />
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900">마이페이지</h1>
        <p className="text-navy-600 mt-2">계정 정보와 구독 현황을 관리하세요.</p>
      </header>

      {/* Tabs */}
      <div className="border-b border-navy-200 mb-8">
        <nav className="flex gap-8" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`pb-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary-500 border-b-2 border-primary-500'
                  : 'text-navy-500 hover:text-navy-700'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div role="tabpanel">{renderTabContent()}</div>
    </div>
  )
}
