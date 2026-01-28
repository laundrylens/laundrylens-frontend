import { useState } from 'react'
import { Button, Card, Modal } from '../common'
import type { User } from '../../stores/authStore'
import { useAuthStore } from '../../stores/authStore'

interface ProfileSectionProps {
  user: User
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  const { logout } = useAuthStore()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const getProviderLabel = (provider: string) => {
    switch (provider) {
      case 'kakao':
        return '카카오'
      case 'google':
        return '구글'
      default:
        return provider
    }
  }

  const handleDeleteAccount = () => {
    // TODO: Implement actual account deletion API call
    logout()
    setShowDeleteModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Profile Info Card */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-navy-900 mb-6">프로필 정보</h2>

        <div className="flex items-start gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.nickname}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-navy-200 flex items-center justify-center">
                <span className="text-2xl font-bold text-navy-500">
                  {user.nickname.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div className="flex-grow space-y-4">
            <div>
              <label className="text-sm text-navy-500">닉네임</label>
              <p className="text-navy-900 font-medium">{user.nickname}</p>
            </div>
            <div>
              <label className="text-sm text-navy-500">이메일</label>
              <p className="text-navy-900">{user.email}</p>
            </div>
            <div>
              <label className="text-sm text-navy-500">로그인 방식</label>
              <p className="text-navy-900">{getProviderLabel(user.provider)}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-red-200">
        <h2 className="text-lg font-semibold text-red-600 mb-4">계정 삭제</h2>
        <p className="text-navy-600 mb-4">
          계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
        </p>
        <Button
          variant="secondary"
          className="text-red-600 border-red-300 hover:bg-red-50"
          onClick={() => setShowDeleteModal(true)}
        >
          회원탈퇴
        </Button>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="회원탈퇴"
      >
        <div className="p-6">
          <p className="text-navy-600 mb-6">
            정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </p>
          <ul className="text-sm text-navy-500 mb-6 space-y-2">
            <li>• 모든 분석 이력이 삭제됩니다.</li>
            <li>• 구독 중인 플랜이 즉시 취소됩니다.</li>
            <li>• 결제 내역 정보가 삭제됩니다.</li>
          </ul>
          <div className="flex gap-4">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setShowDeleteModal(false)}
            >
              취소
            </Button>
            <Button
              variant="primary"
              className="flex-1 bg-red-500 hover:bg-red-600"
              onClick={handleDeleteAccount}
            >
              탈퇴하기
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
