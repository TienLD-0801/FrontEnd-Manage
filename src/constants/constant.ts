import {
  ManageAccounts,
  CalendarMonth,
  ProductionQuantityLimits,
  Dashboard,
  SvgIconComponent,
} from '@mui/icons-material';

// Router
export const ROUTE_PATH = {
  index: '/',
  home: '/home',
  introduce: '/introduce',
  listprice: '/listprice',
  register: '/register',
  training: '/training',

  // Admin
  login: '/admin-login',
  dashboard: '/admin-dashboard',
  product: '/admin-product',
  schedule: '/admin-schedule',
  user: '/admin-user',
};

// Data header
export const DATA_HEADER = [
  { id: 1, name: 'HOME', routerName: '/' },
  { id: 2, name: 'ABOUT', routerName: '/introduce' },
  { id: 3, name: 'PRICE', routerName: '/listprice' },
  { id: 4, name: 'TRAINING', routerName: '/training' },
  { id: 5, name: 'BLOG', routerName: '' },
  { id: 6, name: 'CONTACT', routerName: '' },
];

//data author
export const DATA_AUTHOR = [
  {
    id: 1,
    name: 'Login',
    routerName: '/login',
  },
  {
    id: 2,
    name: 'Register',
    routerName: '/register',
  },
];

//Data slide swiper
export type DataSlideType = {
  id: number;
  img: string;
};

export const DATA_SLIDE: DataSlideType[] = [
  {
    id: 1,
    img: 'https://static.thehoneycombers.com/wp-content/uploads/sites/2/2021/04/Barber-shops-in-Singapore.png',
  },
  {
    id: 2,
    img: 'https://sgp1.digitaloceanspaces.com/tz-mag-ph/wp-content/uploads/2022/04/060604045656/Dapper-Dons-Barbershop.png',
  },
  {
    id: 3,
    img: 'https://previews.123rf.com/images/kostsov/kostsov1801/kostsov180100081/93958941-modern-barbershop-interior-with-chairs-3d-rendering.jpg',
  },
];

//Data  introduce
export type DataIntroduceType = {
  id: number;
  img: string;
  title: string;
  description: string;
};
export const DATA_INTRODUCE: DataIntroduceType[] = [
  {
    id: 1,
    img: 'https://storage.30shine.com/ResourceWeb/data/images/hanh-trinh-toa-sang/30shine-toc-mullet.jpg',
    title:
      ' Phúc lột xác mái tóc để suốt bao năm giúp ngoại hình mới cực cuốn hút',
    description:
      'Thay đổi kiểu tóc đã để suốt bao năm là một quyết định vô cùng khó khăn nhưng Phúc đã vượt qua nỗi sợ đó và tạo một kiểu tóc mới hoàn toàn ',
  },
  {
    id: 2,
    img: 'https://storage.30shine.com/ResourceWeb/data/images/hanh-trinh-toa-sang/30shine-toc-mullet.jpg',
    title:
      ' Phúc lột xác mái tóc để suốt bao năm giúp ngoại hình mới cực cuốn hút',
    description:
      'Thay đổi kiểu tóc đã để suốt bao năm là một quyết định vô cùng khó khăn nhưng Phúc đã vượt qua nỗi sợ đó và tạo một kiểu tóc mới hoàn toàn ',
  },
];

export const DATA_PRICELIST = [
  {
    id: 1,
    title: 'Cắt tóc (combo 6 bước)',
    price: [70000],
  },
  {
    id: 2,
    title: 'Cạo mặt',
    price: [10000],
  },
  {
    id: 3,
    title: 'Lột mụn',
    price: [30000],
  },
  {
    id: 4,
    title: 'Ráy Tai',
    price: [50000],
  },
  {
    id: 5,
    title: 'Đắp mặt nạ dưỡng da',
    price: [30000],
  },
  {
    id: 6,
    title: 'Gội đầu',
    price: [20000],
  },
  {
    id: 7,
    title: 'Uốn tóc',
    price: [150000, 250000],
  },
  {
    id: 8,
    title: 'Uốn tóc Premlock',
    price: [500000, 1000000],
  },
  {
    id: 9,
    title: 'Uốn tóc texture(Con sâu)',
    price: [300000, 450000],
  },
  {
    id: 10,
    title: ' Duỗi tóc',
    price: [250000],
  },
  {
    id: 11,
    title: 'Nhuộm màu 1 lần',
    price: [200000],
  },
  {
    id: 12,
    title: 'Nhuộm đen',
    price: [150000],
  },
  {
    id: 13,
    title: 'Nâng tông + Nhuộm',
    price: [270000],
  },
  {
    id: 14,
    title: 'Tẩy tóc lần 1 + Nhuộm ',
    price: [350000],
  },
  {
    id: 15,
    title: 'Tẩy tóc lần 2 + Nhuộm',
    price: [450000],
  },
  {
    id: 16,
    title: 'Tẩy tóc bạch kim',
    price: [500000, 700000],
  },
  {
    id: 17,
    title: 'Ép side',
    price: [70000, 150000],
  },
  {
    id: 18,
    title: 'Xả uốn tóc',
    price: [50000],
  },
];

export const DATA_COMBO = [
  {
    id: 1,
    title: 'COMBO VIP',
    price: 400000,
    image:
      'https://artbarbershop.com/wp-content/uploads/2021/04/icon-combo-vip.png',
  },
  {
    id: 2,
    title: 'COMBO THƯ GIÃN',
    price: 65000,
    image:
      'https://artbarbershop.com/wp-content/uploads/2021/04/icon-combo-goi-dau.png',
  },
  {
    id: 3,
    title: 'COMBO CẠO MẶT + RÁY TAI + ĐÁNH MẮT',
    price: 85000,
    image:
      'https://artbarbershop.com/wp-content/uploads/2021/04/icon-cao-mat.png',
  },
];

// Data training

export type DataTrainingType = {
  id: number;
  icon: string;
  title: string;
};

export const DATA_INFORMATION: DataTrainingType[] = [
  { id: 1, icon: 'icon-next', title: 'Kỹ thuật sử dụng kéo ,dao cạo, lược.' },
  { id: 2, icon: 'icon-next', title: 'Kỹ thuật sử dụng tông đơ và cử .' },
  { id: 3, icon: 'icon-next', title: 'Kỹ năng FADE nhiều cấp độ .' },
  {
    id: 4,
    icon: 'icon-next',
    title:
      'Tất cả kiểu tóc cổ điển tới hiện đại như : Undercut , mohican , short quiff ,sidepart ,layer ...',
  },
  { id: 5, icon: 'icon-next', title: 'Kiến thức về hóa chất & Nhuộm' },
  {
    id: 6,
    icon: 'icon-next',
    title: 'Kỹ năng uốn như :Premlock , giấy bạc ...',
  },
  { id: 7, icon: 'icon-next', title: 'Kỹ năng pha + Nhuộm màu' },
  { id: 8, icon: 'icon-next', title: 'Kỹ năng giao tiếp khách hàng' },
];

// Data input register
type DataInputRegisterType = {
  id: number;
  name: String;
  type: 'text' | 'email' | 'password';
  value: 'name' | 'email' | 'password';
  required: boolean;
  onChangeRegister?: (
    e: React.ChangeEvent<HTMLInputElement>,
    value: 'name' | 'email' | 'password',
  ) => void;
};

export const DATA_INPUT_REGISTER: DataInputRegisterType[] = [
  {
    id: 1,
    name: 'Name',
    type: 'text',
    required: true,
    value: 'name',
  },
  { id: 2, name: 'Email', type: 'email', required: true, value: 'email' },
  {
    id: 3,
    name: 'Password',
    type: 'password',
    required: true,
    value: 'password',
  },
];

export interface DataDasBoardType {
  id: number;
  text: string;
  router: string;
  icon: SvgIconComponent;
}

export const DATA_DASHBOARD: DataDasBoardType[] = [
  {
    id: 1,
    text: 'dashboard.children.default',
    router: '/admin-dashboard',
    icon: Dashboard,
  },
  {
    id: 2,
    text: 'dashboard.children.product',
    router: '/admin-product',
    icon: ProductionQuantityLimits,
  },
  {
    id: 3,
    text: 'dashboard.children.schedule',
    router: '/admin-schedule',
    icon: CalendarMonth,
  },
  {
    id: 4,
    text: 'dashboard.children.user',
    router: '/admin-user',
    icon: ManageAccounts,
  },
];

export type DataDialogEditUserType = {
  id: string;
  type: 'text' | 'email' | 'number' | 'date_of_birth';
  label?: string;
  value: 'name' | 'email' | 'card_id' | 'phone' | 'date_of_birth';
  margin?: 'none' | 'dense' | 'normal';
  autoComplete?: string | undefined;
  isPicker?: boolean;
};

export const DATA_DIALOG_EDIT_USER: DataDialogEditUserType[] = [
  {
    id: '1',
    type: 'text',
    label: 'Name',
    value: 'name',
    margin: 'dense',
    autoComplete: undefined,
  },
  {
    id: '2',
    type: 'email',
    label: 'Email',
    value: 'email',
    margin: 'dense',
    autoComplete: undefined,
  },
  {
    id: '3',
    value: 'date_of_birth',
    type: 'date_of_birth',
    margin: 'dense',
    autoComplete: undefined,
    isPicker: true,
  },
  {
    id: '4',
    type: 'text',
    label: 'CMND/CCCD',
    value: 'card_id',
    margin: 'dense',
    autoComplete: undefined,
  },
  {
    id: '5',
    type: 'text',
    label: 'Phone',
    value: 'phone',
    margin: 'dense',
    autoComplete: undefined,
  },
];

export type DataDialogCreateUserType = {
  id: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date_of_birth';
  label?: string;
  value: 'name' | 'email' | 'password' | 'date_of_birth' | 'card_id' | 'phone';
  margin?: 'none' | 'dense' | 'normal';
  autoComplete?: string;
  isPicker?: boolean;
};

export const DATA_DIALOG_CREATE_USER: DataDialogCreateUserType[] = [
  {
    id: '1',
    type: 'text',
    label: 'Name',
    value: 'name',
    margin: 'dense',
    autoComplete: undefined,
  },
  {
    id: '2',
    type: 'email',
    label: 'Email',
    value: 'email',
    margin: 'dense',
    autoComplete: undefined,
  },
  {
    id: '3',
    type: 'password',
    label: 'Password',
    value: 'password',
    margin: 'dense',
    autoComplete: 'off',
  },
  {
    id: '4',
    value: 'date_of_birth',
    type: 'date_of_birth',
    margin: 'dense',
    autoComplete: undefined,
    isPicker: true,
  },
  {
    id: '5',
    type: 'text',
    label: 'CMND/CCCD',
    value: 'card_id',
    margin: 'dense',
    autoComplete: undefined,
  },
  {
    id: '6',
    type: 'text',
    label: 'Phone',
    value: 'phone',
    margin: 'dense',
    autoComplete: undefined,
  },
];

// type form login text field
export type TextFieldLoginType = {
  id: string;
  type: 'email' | 'password';
  label: string;
  value: 'email' | 'password';
  margin?: 'none' | 'dense' | 'normal' | undefined;
  autoComplete?: string | undefined;
};

// data text field login
export const TEXT_FIELD_LOGIN: TextFieldLoginType[] = [
  {
    id: '1',
    type: 'email',
    label: 'Email',
    value: 'email',
    margin: 'dense',
    autoComplete: undefined,
  },
  {
    id: '2',
    type: 'password',
    label: 'Password',
    value: 'password',
    margin: 'dense',
    autoComplete: 'off',
  },
];

// data menu language

export type MENU_LANGUAGE_TYPE = {
  id: string;
  name: string;
  value: string;
};

export const MENU_LANGUAGE: MENU_LANGUAGE_TYPE[] = [
  { id: '1', name: 'English (UK)', value: 'UK' },
  { id: '2', name: 'Vietnamese (VN)', value: 'VN' },
];
