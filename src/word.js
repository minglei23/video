
export const SetLanguage = (value) => {
    localStorage.setItem("language", value);
};

export const GetLanguage = () => {
    const language = localStorage.getItem("language");
    if (language) {
        return language;
    }
    return "EN";
};

export const trending = () => {
    switch (GetLanguage()) {
        case 'CN': return '热播榜';
        case 'VN': return 'Danh sách nóng';
        case 'TH': return 'รายการยอดนิยม';
        case 'TL': return 'Mainit na listahan ng broadcast';
        case 'AE': return 'قائمة البث';
        case 'ID': return 'Daftar siaran panas';
        case 'MS': return 'Senarai siaran panas';
        default: return 'Trending'
    }
}

export const popular = () => {
    switch (GetLanguage()) {
        case 'CN': return '最受欢迎';
        case 'VN': return 'Yêu thích';
        case 'TH': return 'ชื่นชอบ';
        case 'TL': return 'Popular';
        case 'AE': return 'محبوب';
        case 'ID': return 'Popular';
        case 'MS': return 'Popular';
        default: return 'Popular'
    }
}

export const revenge = () => {
    switch (GetLanguage()) {
        case 'CN': return '复仇与逆袭';
        case 'VN': return 'Trả thù và phản công';
        case 'TH': return 'แก้แค้นและโต้กลับ';
        case 'TL': return 'tack';
        case 'AE': return 'الانتقام و الهجوم المضاد';
        case 'ID': return 'Balas dendam dan Kontratak';
        case 'MS': return 'Balas dendam dan lawan';
        default: return 'Revenge & Counterattack'
    }
}

export const ancient = () => {
    switch (GetLanguage()) {
        case 'CN': return '古代';
        case 'VN': return 'Cổ đại';
        case 'TH': return 'โบราณ';
        case 'TL': return 'Ancient Times';
        case 'AE': return 'قديم';
        case 'ID': return 'Masa Lama';
        case 'MS': return 'Masa Lama';
        default: return 'Ancient Times'
    }
}

export const billionaires = () => {
    switch (GetLanguage()) {
        case 'CN': return '霸道总裁';
        case 'VN': return 'Tỷ phú và Tycoon';
        case 'TH': return 'มหาเศรษฐีและผู้ประกอบการ';
        case 'TL': return 'Bilyonaryo at Tycoons';
        case 'AE': return 'الملياردير و قطب';
        case 'ID': return 'Billionaire & Tycoons';
        case 'MS': return 'Billioner & Tycoons';
        default: return 'Billionaires & Tycoons'
    }
}

export const action = () => {
    switch (GetLanguage()) {
        case 'CN': return '武打与功夫';
        case 'VN': return 'Hành động và Kung Fu';
        case 'TH': return 'การกระทำและกังฟู';
        case 'TL': return 'Action & Kung Fu';
        case 'AE': return 'العمل مع الكونغ فو';
        case 'ID': return 'Aksi & Kung Fu';
        case 'MS': return 'Tindakan & Kung Fu';
        default: return 'Action & Kung Fu'
    }
}

export const love = () => {
    switch (GetLanguage()) {
        case 'CN': return '爱与家庭';
        case 'VN': return 'Tình yêu và gia đình';
        case 'TH': return 'ความรักและครอบครัว';
        case 'TL': return 'Love & Family';
        case 'AE': return 'الحب والأسرة';
        case 'ID': return 'Cinta & Keluarga';
        case 'MS': return 'Cinta & Keluarga';
        default: return 'Love & Family'
    }
}

export const short = () => {
    switch (GetLanguage()) {
        case 'CN': return '短系列';
        case 'VN': return 'Dòng ngắn';
        case 'TH': return 'ชุดสั้น';
        case 'TL': return 'Magiging Serye';
        case 'AE': return 'سلسلة قصيرة';
        case 'ID': return 'Seri pendek';
        case 'MS': return 'Seri pendek';
        default: return 'Short Series'
    }
}

export const home = () => {
    switch (GetLanguage()) {
        case 'CN': return '首页';
        case 'VN': return 'Trang chủ';
        case 'TH': return 'หน้าหลัก';
        case 'TL': return 'home page';
        case 'AE': return 'الصفحة الرئيسية';
        case 'ID': return 'halaman rumah';
        case 'MS': return 'halaman rumah';
        default: return 'home'
    }
}

export const recommend = () => {
    switch (GetLanguage()) {
        case 'CN': return '推荐';
        case 'VN': return 'Giới thiệu';
        case 'TH': return 'คำแนะนำ';
        case 'TL': return 'recommend';
        case 'AE': return 'التوصية';
        case 'ID': return 'merekomendasikan';
        case 'MS': return 'sarankan';
        default: return 'recommend'
    }
}

export const profile = () => {
    switch (GetLanguage()) {
        case 'CN': return '个人';
        case 'VN': return 'Thông tin cá nhân';
        case 'TH': return 'ข้อมูลส่วนตัว';
        case 'TL': return 'personal data';
        case 'AE': return 'البيانات الشخصية';
        case 'ID': return 'data pribadi';
        case 'MS': return 'data peribadi';
        default: return 'profile'
    }
}

export const search = () => {
    switch (GetLanguage()) {
        case 'CN': return '    搜索';
        case 'VN': return '    Tìm kiếm';
        case 'TH': return '    ค้นหา';
        case 'TL': return '    search';
        case 'AE': return '    بحث .';
        case 'ID': return '    Cari';
        case 'MS': return '    Cari';
        default: return '    search'
    }
}

export const subtitles = () => {
    switch (GetLanguage()) {
        case 'CN': return '字幕';
        case 'VN': return 'Phụ đề';
        case 'TH': return 'คำบรรยาย';
        case 'TL': return 'Subtitles';
        case 'AE': return 'ترجمات';
        case 'ID': return 'subtitle';
        case 'MS': return 'Subtajuk';
        default: return 'Subtitles'
    }
}

export const login = () => {
    switch (GetLanguage()) {
        case 'CN': return '登录';
        case 'VN': return 'Đăng nhập';
        case 'TH': return 'เข้าสู่ระบบ';
        case 'TL': return 'Login';
        case 'AE': return 'سجل';
        case 'ID': return 'Login';
        case 'MS': return 'Login';
        default: return 'Login'
    }
}

export const email = () => {
    switch (GetLanguage()) {
        case 'CN': return '邮件';
        case 'VN': return 'Thư điện tử';
        case 'TH': return 'อีเมล์';
        case 'TL': return 'email';
        case 'AE': return 'البريد الإلكتروني';
        case 'ID': return 'email';
        case 'MS': return 'email';
        default: return 'email'
    }
}

export const password = () => {
    switch (GetLanguage()) {
        case 'CN': return '密码';
        case 'VN': return 'Mật khẩu';
        case 'TH': return 'รหัสผ่าน';
        case 'TL': return 'password';
        case 'AE': return 'كلمة السر';
        case 'ID': return 'sandi';
        case 'MS': return 'Katalaluan';
        default: return 'password'
    }
}

export const gotosignup = () => {
    switch (GetLanguage()) {
        case 'CN': return '前往注册';
        case 'VN': return 'Đăng ký';
        case 'TH': return 'ไปที่ลงทะเบียน';
        case 'TL': return 'mag-sign up';
        case 'AE': return 'الذهاب للتسجيل';
        case 'ID': return 'pergi untuk mendaftar';
        case 'MS': return 'pergi untuk mendaftar';
        default: return 'go to sign up'
    }
}

export const orcontinuewith = () => {
    switch (GetLanguage()) {
        case 'CN': return '其他登录方式';
        case 'VN': return 'Cách đăng nhập khác';
        case 'TH': return 'เข้าสู่ระบบด้วยวิธีอื่น';
        case 'TL': return 'Iba pang mga paraan ng login';
        case 'AE': return 'طرق أخرى لتسجيل الدخول';
        case 'ID': return 'Metode daftar masuk lainnya';
        case 'MS': return 'Kaedah log masuk lain';
        default: return 'or continue with'
    }
}

export const signUp = () => {
    switch (GetLanguage()) {
        case 'CN': return '注册';
        case 'VN': return 'Đăng ký';
        case 'TH': return 'ลงทะเบียน';
        case 'TL': return 'Mag-sign up';
        case 'AE': return 'التسجيل';
        case 'ID': return 'Tandatangan';
        case 'MS': return 'Tandatangan';
        default: return 'Sign Up'
    }
}

export const getcoins = () => {
    switch (GetLanguage()) {
        case 'CN': return '获取硬币';
        case 'VN': return 'Nhận tiền xu';
        case 'TH': return 'รับเหรียญ';
        case 'TL': return 'kumuha ng mga barya';
        case 'AE': return 'الحصول على العملة';
        case 'ID': return 'mendapatkan koin';
        case 'MS': return 'dapatkan koin';
        default: return 'get coins'
    }
}

export const history = () => {
    switch (GetLanguage()) {
        case 'CN': return '我的历史';
        case 'VN': return 'Lịch sử';
        case 'TH': return 'ประวัติความเป็นมา';
        case 'TL': return 'kasaysayan';
        case 'AE': return 'تاريخ';
        case 'ID': return 'sejarah';
        case 'MS': return 'sejarah';
        default: return 'History'
    }
}

export const favorites = () => {
    switch (GetLanguage()) {
        case 'CN': return '我的收藏';
        case 'VN': return 'Yêu thích';
        case 'TH': return 'รายการโปรด';
        case 'TL': return 'paborito';
        case 'AE': return 'المفضلة';
        case 'ID': return 'Kegemaran saya';
        case 'MS': return 'Kegemaran saya';
        default: return 'Favorites'
    }
}

export const help = () => {
    switch (GetLanguage()) {
        case 'CN': return '帮助';
        case 'VN': return 'Trợ giúp';
        case 'TH': return 'ความช่วยเหลือ';
        case 'TL': return 'tulong';
        case 'AE': return 'ساعد';
        case 'ID': return 'Bantuan';
        case 'MS': return 'Bantuan';
        default: return 'Help'
    }
}

export const language = () => {
    switch (GetLanguage()) {
        case 'CN': return '语言';
        case 'VN': return 'Ngôn ngữ';
        case 'TH': return 'ภาษา';
        case 'TL': return 'Wika';
        case 'AE': return 'لغة';
        case 'ID': return 'Bahasa';
        case 'MS': return 'ഭാഷ';
        default: return 'Language'
    }
}

export const become = () => {
    switch (GetLanguage()) {
        case 'CN': return '成为VIP';
        case 'VN': return 'Trở thành VIP';
        case 'TH': return 'กลายเป็นวีไอพี';
        case 'TL': return 'Maging VIP';
        case 'AE': return 'تصبح VIP';
        case 'ID': return 'Menjadi VIP';
        case 'MS': return 'VIP ആകുക';
        default: return 'Become VIP'
    }
}

export const signout = () => {
    switch (GetLanguage()) {
        case 'CN': return '退出';
        case 'VN': return 'Thoát';
        case 'TH': return 'ออกจาก';
        case 'TL': return 'sign out';
        case 'AE': return 'سحب';
        case 'ID': return 'tanda keluar';
        case 'MS': return 'tandatangan keluar';
        default: return 'Sign Out'
    }
}

export const dailybonus = () => {
    switch (GetLanguage()) {
        case 'CN': return '每日奖励';
        case 'VN': return 'Tiền thưởng hàng ngày';
        case 'TH': return 'โบนัสรายวัน';
        case 'TL': return 'araw-araw na bonus';
        case 'AE': return 'مكافأة يومية';
        case 'ID': return 'bonus harian';
        case 'MS': return 'bonus sehari';
        default: return 'daily bonus'
    }
}

export const topup = () => {
    switch (GetLanguage()) {
        case 'CN': return '充值';
        case 'VN': return 'Nạp tiền';
        case 'TH': return 'เติมเงิน';
        case 'TL': return 'Reload';
        case 'AE': return 'شحن';
        case 'ID': return 'Isi ulang';
        case 'MS': return 'Muat Semula';
        default: return 'top up'
    }
}

export const recharge = () => {
    switch (GetLanguage()) {
        case 'CN': return '充值';
        case 'VN': return 'Nạp tiền';
        case 'TH': return 'เติมเงิน';
        case 'TL': return 'Reload';
        case 'AE': return 'شحن';
        case 'ID': return 'Isi ulang';
        case 'MS': return 'Muat Semula';
        default: return 'recharge'
    }
}

export const coins = () => {
    switch (GetLanguage()) {
        case 'CN': return '硬币';
        case 'VN': return 'Tiền xu';
        case 'TH': return 'เหรียญ';
        case 'TL': return 'coins';
        case 'AE': return 'عملة معدنية';
        case 'ID': return 'koin';
        case 'MS': return 'koin';
        default: return 'coins'
    }
}

export const bonus = () => {
    switch (GetLanguage()) {
        case 'CN': return '奖励';
        case 'VN': return 'Tiền thưởng';
        case 'TH': return 'โบนัส';
        case 'TL': return 'bonus';
        case 'AE': return 'مكافأة';
        case 'ID': return 'bonus';
        case 'MS': return 'bonus';
        default: return 'bonus'
    }
}

export const payby = () => {
    switch (GetLanguage()) {
        case 'CN': return '付款方式';
        case 'VN': return 'Phương thức thanh toán';
        case 'TH': return 'วิธีการชำระเงิน';
        case 'TL': return 'bayaran ayon sa';
        case 'AE': return 'طريقة الدفع';
        case 'ID': return 'bayar oleh';
        case 'MS': return 'bayar dengan';
        default: return 'pay by'
    }
}

export const termsofservice = () => {
    switch (GetLanguage()) {
        case 'CN': return '服务条款';
        case 'VN': return 'Điều khoản dịch vụ';
        case 'TH': return 'เงื่อนไขการให้บริการ';
        case 'TL': return 'mga tuntunin ng serbisyo';
        case 'AE': return 'شروط الخدمة';
        case 'ID': return 'istilah layanan';
        case 'MS': return 'terma perkhidmatan';
        default: return 'terms of service'
    }
}

export const privacypolicy = () => {
    switch (GetLanguage()) {
        case 'CN': return '隐私政策';
        case 'VN': return 'Chính sách bảo mật';
        case 'TH': return 'นโยบายความเป็นส่วนตัว';
        case 'TL': return 'patakaran ng pribado';
        case 'AE': return 'سياسة الخصوصية';
        case 'ID': return 'kebijakan privasi';
        case 'MS': return 'polisi privasi';
        default: return 'privacy policy'
    }
}

