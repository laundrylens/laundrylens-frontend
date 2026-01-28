import { Link } from 'react-router-dom'
import { Button } from '../components/common'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-navy-900">404</h1>
      <p className="mt-4 text-xl text-navy-600">페이지를 찾을 수 없습니다.</p>
      <p className="mt-2 text-navy-400">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
      <Link to="/" className="mt-8">
        <Button>홈으로 돌아가기</Button>
      </Link>
    </div>
  )
}
