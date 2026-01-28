interface FooterLink {
  label: string
  href: string
}

interface FooterLinkGroup {
  title: string
  links: FooterLink[]
}

const defaultLinkGroups: FooterLinkGroup[] = [
  {
    title: '서비스',
    links: [
      { label: '기호 사전', href: '/symbols' },
      { label: '이미지 분석', href: '/analyze' },
      { label: '세탁 가이드', href: '/guide' },
    ],
  },
  {
    title: '지원',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: '문의하기', href: '/contact' },
    ],
  },
  {
    title: '법적 고지',
    links: [
      { label: '이용약관', href: '/terms' },
      { label: '개인정보처리방침', href: '/privacy' },
    ],
  },
]

interface FooterProps {
  linkGroups?: FooterLinkGroup[]
}

export default function Footer({ linkGroups = defaultLinkGroups }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy-900 text-navy-300" aria-label="사이트 푸터">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🧺</span>
              <span className="text-xl font-bold text-white">LaundryLens</span>
            </a>
            <p className="text-sm text-navy-400">
              세탁기호를 쉽게 이해하고<br />
              올바른 세탁 방법을 알아보세요.
            </p>
          </div>

          {/* Link Groups */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-navy-700">
          <p className="text-sm text-navy-400 text-center">
            © {currentYear} LaundryLens. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
