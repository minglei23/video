
export const SetLanguage = (value) => {
    localStorage.setItem("language", value);
    const d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = "language=" + value + ";" + expires + ";path=/";
};

export const GetLanguage = () => {
    var language = localStorage.getItem("language");
    if (language) {
        return language;
    }
    const name = "language=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            language = c.substring(name.length, c.length);
            localStorage.setItem("language", language);
            return language;
        }
    }
    localStorage.setItem("language", "EN");
    return "EN";
};

export const languageName = (type) => {
    switch (type) {
        case 'CN': return '繁体中文';
        case 'VN': return 'Tiếng Việt';
        case 'TH': return 'แบบไทย';
        case 'TL': return 'Filipino';
        case 'AE': return 'عربي';
        case 'ID': return 'bahasa Indonesia';
        case 'MS': return 'മലേഷ്യൻ';
        case 'ES': return 'español';
        default: return 'English'
    }
}

export const trending = () => {
    switch (GetLanguage()) {
        case 'CN': return '熱播榜';
        case 'VN': return 'Danh sách nóng';
        case 'TH': return 'รายการยอดนิยม';
        case 'TL': return 'Mainit na listahan ng broadcast';
        case 'AE': return 'قائمة البث';
        case 'ID': return 'Daftar siaran panas';
        case 'MS': return 'Senarai siaran panas';
        case 'ES': return 'Tendencia';
        default: return 'Trending'
    }
}

export const popular = () => {
    switch (GetLanguage()) {
        case 'CN': return '受喜愛的';
        case 'VN': return 'Yêu thích';
        case 'TH': return 'ชื่นชอบ';
        case 'TL': return 'Popular';
        case 'AE': return 'محبوب';
        case 'ID': return 'Popular';
        case 'MS': return 'Popular';
        case 'ES': return 'Querido';
        default: return 'Popular'
    }
}

export const revenge = () => {
    switch (GetLanguage()) {
        case 'CN': return '復仇與反擊';
        case 'VN': return 'Trả thù và phản công';
        case 'TH': return 'แก้แค้นและโต้กลับ';
        case 'TL': return 'tack';
        case 'AE': return 'الانتقام و الهجوم المضاد';
        case 'ID': return 'Balas dendam dan Kontratak';
        case 'MS': return 'Balas dendam dan lawan';
        case 'ES': return 'Venganza y contraataque';
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
        case 'ES': return 'Antiguo';
        default: return 'Ancient Times'
    }
}

export const billionaires = () => {
    switch (GetLanguage()) {
        case 'CN': return '億萬富翁和大亨';
        case 'VN': return 'Tỷ phú và Tycoon';
        case 'TH': return 'มหาเศรษฐีและผู้ประกอบการ';
        case 'TL': return 'Bilyonaryo at Tycoons';
        case 'AE': return 'الملياردير و قطب';
        case 'ID': return 'Billionaire & Tycoons';
        case 'MS': return 'Billioner & Tycoons';
        case 'ES': return 'Multimillonarios y magnates';
        default: return 'Billionaires & Tycoons'
    }
}

export const action = () => {
    switch (GetLanguage()) {
        case 'CN': return '動作與功夫';
        case 'VN': return 'Hành động và Kung Fu';
        case 'TH': return 'การกระทำและกังฟู';
        case 'TL': return 'Action & Kung Fu';
        case 'AE': return 'العمل مع الكونغ فو';
        case 'ID': return 'Aksi & Kung Fu';
        case 'MS': return 'Tindakan & Kung Fu';
        case 'ES': return 'Acción y kung fu';
        default: return 'Action & Kung Fu'
    }
}

export const westernDrama = () => {
    switch (GetLanguage()) {
        case 'CN': return '西洋戲劇';
        case 'VN': return 'kịch phương Tây';
        case 'TH': return 'ละครตะวันตก';
        case 'TL': return 'Western drama';
        case 'AE': return 'الدراما الغربية';
        case 'ID': return 'Drama Barat';
        case 'MS': return 'Drama Barat';
        case 'ES': return 'Western Drama';
        default: return 'Western Drama'
    }
}

export const love = () => {
    switch (GetLanguage()) {
        case 'CN': return '愛與家庭';
        case 'VN': return 'Tình yêu và gia đình';
        case 'TH': return 'ความรักและครอบครัว';
        case 'TL': return 'Love & Family';
        case 'AE': return 'الحب والأسرة';
        case 'ID': return 'Cinta & Keluarga';
        case 'MS': return 'Cinta & Keluarga';
        case 'ES': return 'Amor y familia';
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
        case 'ES': return 'Serie corta';
        default: return 'Short Series'
    }
}

export const home = () => {
    switch (GetLanguage()) {
        case 'CN': return '首頁';
        case 'VN': return 'Trang chủ';
        case 'TH': return 'หน้าหลัก';
        case 'TL': return 'home page';
        case 'AE': return 'الصفحة الرئيسية';
        case 'ID': return 'halaman rumah';
        case 'MS': return 'halaman rumah';
        case 'ES': return 'Casa';
        default: return 'home'
    }
}

export const recommend = () => {
    switch (GetLanguage()) {
        case 'CN': return '推薦';
        case 'VN': return 'Giới thiệu';
        case 'TH': return 'คำแนะนำ';
        case 'TL': return 'recommend';
        case 'AE': return 'التوصية';
        case 'ID': return 'merekomendasikan';
        case 'MS': return 'sarankan';
        case 'ES': return 'Recomendación';
        default: return 'recommend'
    }
}

export const profile = () => {
    switch (GetLanguage()) {
        case 'CN': return '個人資料';
        case 'VN': return 'Thông tin cá nhân';
        case 'TH': return 'ข้อมูลส่วนตัว';
        case 'TL': return 'personal data';
        case 'AE': return 'البيانات الشخصية';
        case 'ID': return 'data pribadi';
        case 'MS': return 'data peribadi';
        case 'ES': return 'Silueta';
        default: return 'profile'
    }
}

export const search = () => {
    switch (GetLanguage()) {
        case 'CN': return '    蒐索';
        case 'VN': return '    Tìm kiếm';
        case 'TH': return '    ค้นหา';
        case 'TL': return '    search';
        case 'AE': return '    بحث .';
        case 'ID': return '    Cari';
        case 'MS': return '    Cari';
        case 'ES': return '    Buscar';
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
        case 'ES': return 'Subtítulos';
        default: return 'Subtitles'
    }
}

export const loginword = () => {
    switch (GetLanguage()) {
        case 'CN': return '登入';
        case 'VN': return 'Đăng nhập';
        case 'TH': return 'เข้าสู่ระบบ';
        case 'TL': return 'Login';
        case 'AE': return 'سجل';
        case 'ID': return 'Login';
        case 'MS': return 'Login';
        case 'ES': return 'Iniciar sesión';
        default: return 'Login'
    }
}

export const emailWord = () => {
    switch (GetLanguage()) {
        case 'CN': return '電子郵件';
        case 'VN': return 'Thư điện tử';
        case 'TH': return 'อีเมล์';
        case 'TL': return 'email';
        case 'AE': return 'البريد الإلكتروني';
        case 'ID': return 'email';
        case 'MS': return 'email';
        case 'ES': return 'Correo electrónico';
        default: return 'email'
    }
}

export const enteremail = () => {
    switch (GetLanguage()) {
        case 'CN': return '輸入電子郵寄地址';
        case 'VN': return 'Nhập địa chỉ email';
        case 'TH': return 'ป้อนที่อยู่อีเมล';
        case 'TL': return 'ipasok ang email address';
        case 'AE': return 'أدخل عنوان البريد الإلكتروني';
        case 'ID': return 'masukkan alamat email';
        case 'MS': return 'masukkan alamat e-mel';
        case 'ES': return 'Introduzca la dirección de correo electrónico';
        default: return 'enter an email address'
    }
}

export const passwordWord = () => {
    switch (GetLanguage()) {
        case 'CN': return '密碼';
        case 'VN': return 'Mật khẩu';
        case 'TH': return 'รหัสผ่าน';
        case 'TL': return 'password';
        case 'AE': return 'كلمة السر';
        case 'ID': return 'sandi';
        case 'MS': return 'Katalaluan';
        case 'ES': return 'Palabras clave';
        default: return 'password'
    }
}

export const gotologin = () => {
    switch (GetLanguage()) {
        case 'CN': return '轉到登入';
        case 'VN': return 'Đăng nhập';
        case 'TH': return 'เข้าสู่ระบบ';
        case 'TL': return 'pumunta sa login';
        case 'AE': return 'الذهاب إلى تسجيل الدخول';
        case 'ID': return 'pergi ke login';
        case 'MS': return 'pergi ke log masuk';
        case 'ES': return 'Ir a iniciar sesión';
        default: return 'go to login'
    }
}

export const gotosignup = () => {
    switch (GetLanguage()) {
        case 'CN': return '去注册';
        case 'VN': return 'Đăng ký';
        case 'TH': return 'ไปที่ลงทะเบียน';
        case 'TL': return 'mag-sign up';
        case 'AE': return 'الذهاب للتسجيل';
        case 'ID': return 'pergi untuk mendaftar';
        case 'MS': return 'pergi untuk mendaftar';
        case 'ES': return 'Ir a registrarse';
        default: return 'go to sign up'
    }
}

export const orcontinuewith = () => {
    switch (GetLanguage()) {
        case 'CN': return '其他管道登入';
        case 'VN': return 'Cách đăng nhập khác';
        case 'TH': return 'เข้าสู่ระบบด้วยวิธีอื่น';
        case 'TL': return 'Iba pang mga paraan ng login';
        case 'AE': return 'طرق أخرى لتسجيل الدخول';
        case 'ID': return 'Metode daftar masuk lainnya';
        case 'MS': return 'Kaedah log masuk lain';
        case 'ES': return 'O continuar';
        default: return 'or continue with'
    }
}

export const signupWord = () => {
    switch (GetLanguage()) {
        case 'CN': return '注册';
        case 'VN': return 'Đăng ký';
        case 'TH': return 'ลงทะเบียน';
        case 'TL': return 'Mag-sign up';
        case 'AE': return 'التسجيل';
        case 'ID': return 'Tandatangan';
        case 'MS': return 'Tandatangan';
        case 'ES': return 'Registro';
        default: return 'Sign Up'
    }
}

export const getcoins = () => {
    switch (GetLanguage()) {
        case 'CN': return '獲取硬幣';
        case 'VN': return 'Nhận tiền xu';
        case 'TH': return 'รับเหรียญ';
        case 'TL': return 'kumuha ng mga barya';
        case 'AE': return 'الحصول على العملة';
        case 'ID': return 'mendapatkan koin';
        case 'MS': return 'dapatkan koin';
        case 'ES': return 'Obtener monedas';
        default: return 'get coins'
    }
}

export const history = () => {
    switch (GetLanguage()) {
        case 'CN': return '歷史';
        case 'VN': return 'Lịch sử';
        case 'TH': return 'ประวัติความเป็นมา';
        case 'TL': return 'kasaysayan';
        case 'AE': return 'تاريخ';
        case 'ID': return 'sejarah';
        case 'MS': return 'sejarah';
        case 'ES': return 'Historia';
        default: return 'History'
    }
}

export const favorites = () => {
    switch (GetLanguage()) {
        case 'CN': return '我的最愛';
        case 'VN': return 'Yêu thích';
        case 'TH': return 'รายการโปรด';
        case 'TL': return 'paborito';
        case 'AE': return 'المفضلة';
        case 'ID': return 'Kegemaran saya';
        case 'MS': return 'Kegemaran saya';
        case 'ES': return 'Colección';
        default: return 'Favorites'
    }
}

export const help = () => {
    switch (GetLanguage()) {
        case 'CN': return '幫助';
        case 'VN': return 'Trợ giúp';
        case 'TH': return 'ความช่วยเหลือ';
        case 'TL': return 'tulong';
        case 'AE': return 'ساعد';
        case 'ID': return 'Bantuan';
        case 'MS': return 'Bantuan';
        case 'ES': return 'Ayudar';
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
        case 'ES': return 'Language';
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
        case 'ES': return 'Become VIP';
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
        case 'ES': return 'Salida';
        default: return 'Sign Out'
    }
}

export const dailybonus = () => {
    switch (GetLanguage()) {
        case 'CN': return '每日獎金';
        case 'VN': return 'Tiền thưởng hàng ngày';
        case 'TH': return 'โบนัสรายวัน';
        case 'TL': return 'araw-araw na bonus';
        case 'AE': return 'مكافأة يومية';
        case 'ID': return 'bonus harian';
        case 'MS': return 'bonus sehari';
        case 'ES': return 'Bonificación diaria';
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
        case 'ES': return 'Llenar';
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
        case 'ES': return 'Carga';
        default: return 'recharge'
    }
}

export const coins = () => {
    switch (GetLanguage()) {
        case 'CN': return '硬幣';
        case 'VN': return 'Tiền xu';
        case 'TH': return 'เหรียญ';
        case 'TL': return 'coins';
        case 'AE': return 'عملة معدنية';
        case 'ID': return 'koin';
        case 'MS': return 'koin';
        case 'ES': return 'Monedas';
        default: return 'coins'
    }
}

export const bonus = () => {
    switch (GetLanguage()) {
        case 'CN': return '獎金';
        case 'VN': return 'Tiền thưởng';
        case 'TH': return 'โบนัส';
        case 'TL': return 'bonus';
        case 'AE': return 'مكافأة';
        case 'ID': return 'bonus';
        case 'MS': return 'bonus';
        case 'ES': return 'Bonificación';
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
        case 'ES': return 'Método de pago';
        default: return 'pay by'
    }
}

export const termsofservice = () => {
    switch (GetLanguage()) {
        case 'CN': return '服務條款';
        case 'VN': return 'Điều khoản dịch vụ';
        case 'TH': return 'เงื่อนไขการให้บริการ';
        case 'TL': return 'mga tuntunin ng serbisyo';
        case 'AE': return 'شروط الخدمة';
        case 'ID': return 'istilah layanan';
        case 'MS': return 'terma perkhidmatan';
        case 'ES': return 'Cláusulas de servicio';
        default: return 'terms of service'
    }
}

export const privacypolicy = () => {
    switch (GetLanguage()) {
        case 'CN': return 'Política de privacidad';
        case 'VN': return 'Chính sách bảo mật';
        case 'TH': return 'นโยบายความเป็นส่วนตัว';
        case 'TL': return 'patakaran ng pribado';
        case 'AE': return 'سياسة الخصوصية';
        case 'ID': return 'kebijakan privasi';
        case 'MS': return 'polisi privasi';
        case 'ES': return 'Popular';
        default: return 'privacy policy'
    }
}

export const share = () => {
    switch (GetLanguage()) {
        case 'CN': return '分享';
        case 'VN': return 'Chia sẻ';
        case 'TH': return 'แบ่งปัน';
        case 'TL': return 'Ibahagi';
        case 'AE': return 'يشارك';
        case 'ID': return 'Membagikan';
        case 'MS': return 'anjara';
        case 'ES': return 'Comunión';
        default: return 'Share'
    }
}

export const collect = () => {
    switch (GetLanguage()) {
        case 'CN': return '收藏';
        case 'VN': return 'Sưu tầm';
        case 'TH': return 'เก็บรวบรวม';
        case 'TL': return 'Mangolekta';
        case 'AE': return 'يجمع';
        case 'ID': return 'Mengumpulkan';
        case 'MS': return 'manangona';
        case 'ES': return 'Recogida';
        default: return 'Collect'
    }
}

export const seriesInfo = () => {
    switch (GetLanguage()) {
        case 'CN': return '剧集';
        case 'VN': return 'Loạt';
        case 'TH': return 'ชุด';
        case 'TL': return 'Serye';
        case 'AE': return 'مسلسل';
        case 'ID': return 'Seri';
        case 'MS': return 'andian-tantara';
        case 'ES': return 'Serie dramática';
        default: return 'Series'
    }
}
