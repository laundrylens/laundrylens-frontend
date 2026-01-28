import { Card } from '../common'

interface PaymentRecord {
  id: string
  date: string
  planName: string
  amount: number
  status: 'completed' | 'failed' | 'refunded'
}

// Mock data - replace with actual API call
const mockPaymentHistory: PaymentRecord[] = [
  {
    id: 'pay-001',
    date: '2025-01-28',
    planName: '베이직 플랜',
    amount: 3900,
    status: 'completed',
  },
  {
    id: 'pay-002',
    date: '2024-12-28',
    planName: '베이직 플랜',
    amount: 3900,
    status: 'completed',
  },
  {
    id: 'pay-003',
    date: '2024-11-28',
    planName: '베이직 플랜',
    amount: 3900,
    status: 'completed',
  },
]

export default function PaymentHistorySection() {
  // TODO: Replace with actual API call using useQuery
  const paymentHistory = mockPaymentHistory

  const getStatusBadge = (status: PaymentRecord['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
            완료
          </span>
        )
      case 'failed':
        return (
          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
            실패
          </span>
        )
      case 'refunded':
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
            환불
          </span>
        )
    }
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (paymentHistory.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <svg
            className="w-12 h-12 text-navy-300 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-navy-500">결제 내역이 없습니다.</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-navy-900">결제 내역</h2>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <Card className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-navy-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-navy-600">
                  날짜
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-navy-600">
                  상품
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-navy-600">
                  금액
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-navy-600">
                  상태
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {paymentHistory.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 text-sm text-navy-900">
                    {formatDate(record.date)}
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-900">
                    {record.planName}
                  </td>
                  <td className="px-6 py-4 text-sm text-navy-900">
                    {formatAmount(record.amount)}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(record.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {paymentHistory.map((record) => (
          <Card key={record.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-navy-900">{record.planName}</p>
                <p className="text-sm text-navy-500">{formatDate(record.date)}</p>
              </div>
              {getStatusBadge(record.status)}
            </div>
            <p className="text-lg font-semibold text-navy-900">
              {formatAmount(record.amount)}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}
