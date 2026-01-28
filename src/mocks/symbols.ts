import type { Symbol } from '../types'

export const mockSymbols: Symbol[] = [
  // 세탁 (wash)
  {
    id: '1',
    code: 'wash-normal',
    name: '일반 세탁',
    description: '일반적인 방법으로 세탁할 수 있습니다.',
    category: 'wash',
    imageUrl: '/symbols/wash-normal.svg',
    country: 'KR',
  },
  {
    id: '2',
    code: 'wash-30',
    name: '30°C 세탁',
    description: '30°C 이하의 물로 세탁하세요.',
    category: 'wash',
    imageUrl: '/symbols/wash-30.svg',
    country: 'KR',
  },
  {
    id: '3',
    code: 'wash-40',
    name: '40°C 세탁',
    description: '40°C 이하의 물로 세탁하세요.',
    category: 'wash',
    imageUrl: '/symbols/wash-40.svg',
    country: 'KR',
  },
  {
    id: '4',
    code: 'wash-no',
    name: '세탁 금지',
    description: '물세탁을 하지 마세요.',
    category: 'wash',
    imageUrl: '/symbols/wash-no.svg',
    country: 'KR',
  },

  // 표백 (bleach)
  {
    id: '5',
    code: 'bleach-ok',
    name: '표백 가능',
    description: '모든 표백제를 사용할 수 있습니다.',
    category: 'bleach',
    imageUrl: '/symbols/bleach-ok.svg',
    country: 'KR',
  },
  {
    id: '6',
    code: 'bleach-no',
    name: '표백 금지',
    description: '표백제를 사용하지 마세요.',
    category: 'bleach',
    imageUrl: '/symbols/bleach-no.svg',
    country: 'KR',
  },

  // 건조 (dry)
  {
    id: '7',
    code: 'dry-tumble',
    name: '텀블 건조',
    description: '건조기 사용이 가능합니다.',
    category: 'dry',
    imageUrl: '/symbols/dry-tumble.svg',
    country: 'KR',
  },
  {
    id: '8',
    code: 'dry-no',
    name: '건조기 금지',
    description: '건조기를 사용하지 마세요.',
    category: 'dry',
    imageUrl: '/symbols/dry-no.svg',
    country: 'KR',
  },
  {
    id: '9',
    code: 'dry-flat',
    name: '눕혀서 건조',
    description: '평평한 곳에 눕혀서 건조하세요.',
    category: 'dry',
    imageUrl: '/symbols/dry-flat.svg',
    country: 'KR',
  },

  // 다림질 (iron)
  {
    id: '10',
    code: 'iron-low',
    name: '저온 다림질',
    description: '110°C 이하로 다림질하세요.',
    category: 'iron',
    imageUrl: '/symbols/iron-low.svg',
    country: 'KR',
  },
  {
    id: '11',
    code: 'iron-medium',
    name: '중온 다림질',
    description: '150°C 이하로 다림질하세요.',
    category: 'iron',
    imageUrl: '/symbols/iron-medium.svg',
    country: 'KR',
  },
  {
    id: '12',
    code: 'iron-no',
    name: '다림질 금지',
    description: '다림질을 하지 마세요.',
    category: 'iron',
    imageUrl: '/symbols/iron-no.svg',
    country: 'KR',
  },

  // 드라이클리닝 (dryclean)
  {
    id: '13',
    code: 'dryclean-ok',
    name: '드라이클리닝 가능',
    description: '드라이클리닝이 가능합니다.',
    category: 'dryclean',
    imageUrl: '/symbols/dryclean-ok.svg',
    country: 'KR',
  },
  {
    id: '14',
    code: 'dryclean-no',
    name: '드라이클리닝 금지',
    description: '드라이클리닝을 하지 마세요.',
    category: 'dryclean',
    imageUrl: '/symbols/dryclean-no.svg',
    country: 'KR',
  },
]
