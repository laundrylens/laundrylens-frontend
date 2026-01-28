interface KakaoLoginButtonProps {
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export default function KakaoLoginButton({
  onClick,
  disabled = false,
  className = '',
}: KakaoLoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center justify-center gap-3 h-12 rounded-soft bg-[#FEE500] text-[#191919] font-medium hover:brightness-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      aria-label="카카오로 로그인"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 0.5C4.029 0.5 0 3.613 0 7.446c0 2.485 1.676 4.669 4.198 5.898-.138.482-.887 3.106-.918 3.313 0 0-.018.152.08.21.098.058.214.013.214.013.282-.038 3.268-2.13 3.783-2.488.537.076 1.091.116 1.643.116 4.971 0 9-3.113 9-6.962S13.971.5 9 .5"
          fill="#191919"
        />
      </svg>
      카카오로 시작하기
    </button>
  )
}
