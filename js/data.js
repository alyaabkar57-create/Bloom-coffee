/* =========================================================
   Bloom Coffee — Shared Data
   Products, categories, offers and translations live here.
   ========================================================= */

const CATEGORIES = [
  { id: 'hot',      ar: 'قهوة ساخنة',      en: 'Hot Coffee' },
  { id: 'iced',     ar: 'قهوة باردة',      en: 'Iced Coffee' },
  { id: 'matcha',   ar: 'ماتشا',           en: 'Matcha' },
  { id: 'refresh',  ar: 'مشروبات منعشة',   en: 'Refreshing Drinks' },
  { id: 'juice',    ar: 'عصائر طازجة',     en: 'Fresh Juices' },
  { id: 'dessert',  ar: 'حلويات',          en: 'Desserts' }
];

const SIZES = [
  { id: 'small',  ar: 'صغير',  en: 'Small',  factor: 0 },
  { id: 'medium', ar: 'متوسط', en: 'Medium', factor: 6 },
  { id: 'large',  ar: 'كبير',  en: 'Large',  factor: 12 }
];

const EXTRAS = [
  { id: 'oat',    ar: 'حليب الشوفان',   en: 'Oat Milk',       price: 5 },
  { id: 'vanilla',ar: 'نكهة الفانيلا',  en: 'Vanilla Syrup',   price: 4 },
  { id: 'caramel',ar: 'صلصة الكاراميل', en: 'Caramel Drizzle', price: 5 },
  { id: 'cream',  ar: 'كريمة إضافية',   en: 'Extra Cream',     price: 4 }
];

const PRODUCTS = [
  {
    id: 'flat-white',
    category: 'hot',
    price: 22,
    rating: 4.9,
    image: 'assets/images/photo-1495474472287-4d71bcdd2085.jpg',
    ar: { name: 'فلات وايت', desc: 'إسبريسو غني مع حليب مخملي ونسبة كريمة متوازنة.', ingredients: 'إسبريسو مزدوج، حليب طازج، رشة من مسحوق الكاكاو.' },
    en: { name: 'Flat White', desc: 'Rich espresso with velvety milk and a perfectly balanced cream.', ingredients: 'Double espresso, fresh milk, a dusting of cocoa.' },
    best: true
  },
  {
    id: 'caramel-latte',
    category: 'hot',
    price: 26,
    rating: 4.8,
    image: 'assets/images/photo-1541167760496-1628856ab772.jpg',
    ar: { name: 'لاتيه الكاراميل', desc: 'لاتيه كريمي مع صلصة كاراميل منزلية ورغوة حريرية.', ingredients: 'إسبريسو، حليب كامل الدسم، صلصة كاراميل، رغوة الحليب.' },
    en: { name: 'Caramel Latte', desc: 'Creamy latte with house-made caramel and silky foam.', ingredients: 'Espresso, whole milk, caramel sauce, milk foam.' },
    best: true
  },
  {
    id: 'cappuccino',
    category: 'hot',
    price: 24,
    rating: 4.7,
    image: 'assets/images/photo-1517701604599-bb29b565090c.jpg',
    ar: { name: 'كابتشينو', desc: 'توازن كلاسيكي بين الإسبريسو والحليب والرغوة الكثيفة.', ingredients: 'إسبريسو مزدوج، حليب، رغوة الحليب، قرفة.' },
    en: { name: 'Cappuccino', desc: 'A classic balance of espresso, milk and thick foam.', ingredients: 'Double espresso, milk, milk foam, cinnamon.' },
    best: false
  },
  {
    id: 'spanish-latte',
    category: 'hot',
    price: 27,
    rating: 4.9,
    image: 'assets/images/photo-1509042239860-f550ce710b93.jpg',
    ar: { name: 'لاتيه إسباني', desc: 'حليب مكثف محلى مع إسبريسو وقشرة كراميل محروقة.', ingredients: 'إسبريسو، حليب مكثف محلى، سكر بني محروق.' },
    en: { name: 'Spanish Latte', desc: 'Sweet condensed milk, espresso and a torched caramel crust.', ingredients: 'Espresso, sweet condensed milk, burnt brown sugar.' },
    best: true
  },
  {
    id: 'iced-americano',
    category: 'iced',
    price: 20,
    rating: 4.6,
    image: 'assets/images/photo-1461023058943-07fcbe16d735.jpg',
    ar: { name: 'أمريكانو مثلج', desc: 'إسبريسو منعش مع مكعبات ثلج وماء بارد نقي.', ingredients: 'إسبريسو مزدوج، ماء بارد، ثلج.' },
    en: { name: 'Iced Americano', desc: 'Refreshing espresso over pure cold water and ice.', ingredients: 'Double espresso, cold water, ice.' },
    best: false
  },
  {
    id: 'iced-latte',
    category: 'iced',
    price: 25,
    rating: 4.8,
    image: 'assets/images/photo-1511920170033-f8396924c348.jpg',
    ar: { name: 'لاتيه مثلج', desc: 'طبقاتجميلة من الحليب والإسبريسو فوق الثلج.', ingredients: 'إسبريسو، حليب بارد، ثلج، شراب الفانيلا.' },
    en: { name: 'Iced Latte', desc: 'Beautiful layers of milk and espresso over ice.', ingredients: 'Espresso, cold milk, ice, vanilla syrup.' },
    best: true
  },
  {
    id: 'cold-brew',
    category: 'iced',
    price: 28,
    rating: 4.9,
    image: 'assets/images/photo-1519996529931-28324d5a630e.jpg',
    ar: { name: 'قولد برو', desc: 'نقع بارد لمدة 18 ساعة لنكهة غنية وناعمة وحموضة منخفضة.', ingredients: 'حبوب قهوة مختصة مطحونة، ماء بارد، ثلج.' },
    en: { name: 'Cold Brew', desc: '18-hour steep for a rich, smooth, low-acidity flavor.', ingredients: 'Specialty ground coffee, cold water, ice.' },
    best: true
  },
  {
    id: 'matcha-latte',
    category: 'matcha',
    price: 29,
    rating: 4.8,
    image: 'assets/images/photo-1515823064-d6e0c04616a7.jpg',
    ar: { name: 'لاتيه الماتشا', desc: 'ماتشا يابانية أصلية مع حليب كريمي ورغوة ناعمة.', ingredients: 'مسحوق ماتشا احتفالي، حليب، رغوة الحليب.' },
    en: { name: 'Matcha Latte', desc: 'Authentic Japanese matcha with creamy milk and soft foam.', ingredients: 'Ceremonial grade matcha, milk, milk foam.' },
    best: true
  },
  {
    id: 'iced-matcha',
    category: 'matcha',
    price: 30,
    rating: 4.7,
    image: 'assets/images/photo-1536256263959-770b48d82b0a.jpg',
    ar: { name: 'ماتشا مثلجة', desc: 'ماتشا منعشة مع حليب الشوفان والثلج.', ingredients: 'ماتشا، حليب الشوفان، ثلج، شراب فانيلا.' },
    en: { name: 'Iced Matcha', desc: 'Refreshing matcha with oat milk and ice.', ingredients: 'Matcha, oat milk, ice, vanilla syrup.' },
    best: false
  },
  {
    id: 'matcha-lemonade',
    category: 'matcha',
    price: 31,
    rating: 4.6,
    image: 'assets/images/photo-1513558161293-cdaf765ed2fd.jpg',
    ar: { name: 'ليمونادة الماتشا', desc: 'مزيج منعش من الماتشا وعصير الليمون الطازج.', ingredients: 'ماتشا، عصير ليمون طازج، ماء فوّار، نعناع.' },
    en: { name: 'Matcha Lemonade', desc: 'A refreshing blend of matcha and fresh lemon juice.', ingredients: 'Matcha, fresh lemon juice, sparkling water, mint.' },
    best: false
  },
  {
    id: 'mint-lemonade',
    category: 'refresh',
    price: 21,
    rating: 4.7,
    image: 'assets/images/photo-1544145945-f90425340c7e.jpg',
    ar: { name: 'ليمونادة النعناع', desc: 'عصير ليمون طازج مع النعناع والثلج المفروم.', ingredients: 'ليمون طازج، نعناع، سكر قصب، ثلج.' },
    en: { name: 'Mint Lemonade', desc: 'Fresh lemon juice with mint and crushed ice.', ingredients: 'Fresh lemon, mint, cane sugar, ice.' },
    best: false
  },
  {
    id: 'berry-fizz',
    category: 'refresh',
    price: 24,
    rating: 4.5,
    image: 'assets/images/photo-1556679343-c7306c1976bc.jpg',
    ar: { name: 'فوّار التوت', desc: 'توت طازج مع ماء فوّار وقطع ليمون.', ingredients: 'توت مختلط، ماء فوّار، عصير ليمون، ثلج.' },
    en: { name: 'Berry Fizz', desc: 'Fresh berries with sparkling water and lemon.', ingredients: 'Mixed berries, sparkling water, lemon juice, ice.' },
    best: false
  },
  {
    id: 'hibiscus-tea',
    category: 'refresh',
    price: 19,
    rating: 4.6,
    image: 'assets/images/photo-1597318181409-cf64d0b5d8a2.jpg',
    ar: { name: 'شاي الكركديه البارد', desc: 'كركديه طبيعي مع الزنجبيل والعسل.', ingredients: 'كركديه مجفف، زنجبيل، عسل، ثلج.' },
    en: { name: 'Iced Hibiscus', desc: 'Natural hibiscus with ginger and honey.', ingredients: 'Dried hibiscus, ginger, honey, ice.' },
    best: false
  },
  {
    id: 'orange-juice',
    category: 'juice',
    price: 22,
    rating: 4.8,
    image: 'assets/images/photo-1600271886742-f049cd451bba.jpg',
    ar: { name: 'عصير البرتقال الطازج', desc: 'برتقال طازج معصور أمامك، غني بفيتامين سي.', ingredients: 'برتقال طازج 100%.' },
    en: { name: 'Fresh Orange Juice', desc: 'Freshly squeezed orange, packed with vitamin C.', ingredients: '100% fresh oranges.' },
    best: true
  },
  {
    id: 'mixed-juice',
    category: 'juice',
    price: 25,
    rating: 4.7,
    image: 'assets/images/photo-1613478223719-2ab802602423.jpg',
    ar: { name: 'عصير الفواكه المشكل', desc: ' مزيج من البرتقال والتفاح والأناناس والفراولة.', ingredients: 'برتقال، تفاح، أناناس، فراولة.' },
    en: { name: 'Mixed Fruit Juice', desc: 'A blend of orange, apple, pineapple and strawberry.', ingredients: 'Orange, apple, pineapple, strawberry.' },
    best: false
  },
  {
    id: 'avocado-smoothie',
    category: 'juice',
    price: 28,
    rating: 4.6,
    image: 'assets/images/photo-1610970881699-44a5587cabec.jpg',
    ar: { name: 'سموزي الأفوكادو', desc: 'أفوكادو كريمي مع الموز وحليب اللوز.', ingredients: 'أفوكادو، موز، حليب اللوز، عسل.' },
    en: { name: 'Avocado Smoothie', desc: 'Creamy avocado with banana and almond milk.', ingredients: 'Avocado, banana, almond milk, honey.' },
    best: false
  },
  {
    id: 'cheesecake',
    category: 'dessert',
    price: 32,
    rating: 4.9,
    image: 'assets/images/photo-1563805042-7684c019e1cb.jpg',
    ar: { name: 'تشيز كيك الكاراميل', desc: 'تشيز كيك غني مع طبقة كاراميل وقاعدة بسكويت مقرمشة.', ingredients: 'جبنة كريمية، كاراميل، بسكويت، بيض.' },
    en: { name: 'Caramel Cheesecake', desc: 'Rich cheesecake with caramel topping and a crisp base.', ingredients: 'Cream cheese, caramel, biscuit, eggs.' },
    best: true
  },
  {
    id: 'croissant',
    category: 'dessert',
    price: 18,
    rating: 4.8,
    image: 'assets/images/photo-1555507036-ab1f4038808a.jpg',
    ar: { name: 'كرواسون باللوز', desc: 'كرواسون طازج بالزبدة مع كريمة اللوز.', ingredients: 'زبدة، طحين، لوز، سكر، خميرة.' },
    en: { name: 'Almond Croissant', desc: 'Fresh buttery croissant with almond cream.', ingredients: 'Butter, flour, almonds, sugar, yeast.' },
    best: false
  },
  {
    id: 'brownie',
    category: 'dessert',
    price: 26,
    rating: 4.7,
    image: 'assets/images/photo-1606313564200-e75d5e30476c.jpg',
    ar: { name: 'براوني الشوكولاتة', desc: 'براوني دافئ مع صوص شوكولاتة وآيس كريم.', ingredients: 'شوكولاتة داكنة، زبدة، سكر، بيض، آيس كريم.' },
    en: { name: 'Chocolate Brownie', desc: 'Warm brownie with chocolate sauce and ice cream.', ingredients: 'Dark chocolate, butter, sugar, eggs, ice cream.' },
    best: false
  }
];

const OFFERS = [
  {
    id: 'morning-combo',
    price: 39,
    oldPrice: 52,
    image: 'assets/images/photo-1445116572660-236099ec97a0.jpg',
    ar: { name: 'باقة بلوم الصباحية', desc: 'قهوة ساخنة + كرواسون طازج، لبداية يومك المثالية.', details: 'اختر بين فلات وايت أو كابتشينو مع كرواسون بالزبدة. متاحة يومياً من 7 صباحاً حتى 11 ظهراً.' },
    en: { name: 'Bloom Morning Bundle', desc: 'Hot coffee + fresh croissant for the perfect start.', details: 'Choose between a flat white or cappuccino with a buttery croissant. Available daily 7am–11am.' }
  },
  {
    id: 'friends-pack',
    price: 89,
    oldPrice: 112,
    image: 'assets/images/photo-1521017432531-fbd92d768814.jpg',
    ar: { name: 'باقة الأصدقاء', desc: 'أربع مشروبات مميزة + حلويات للجميع.', details: 'أربعة مشروبات من اختيارك (لاتيه، ماتشا، قولد برو، عصير طازج) مع قطعتين من الحلويات.' },
    en: { name: 'Friends Pack', desc: 'Four signature drinks + sweets for everyone.', details: 'Four drinks of your choice (latte, matcha, cold brew, fresh juice) with two dessert pieces.' }
  },
  {
    id: 'study-bundle',
    price: 55,
    oldPrice: 68,
    image: 'assets/images/photo-1501339847302-ac426a4a7cbb.jpg',
    ar: { name: 'باقة الدراسة', desc: 'قهوة كبيرة + حلوى + جلسة هادئة مع واي فاي.', details: 'مشروب كبير من اختيارك مع حلوى، واستمتع بجلسة هادئة مع واي فاي مجاني لمدة ساعتين.' },
    en: { name: 'Study Bundle', desc: 'Large coffee + dessert + a quiet seat with Wi-Fi.', details: 'A large drink of your choice with a dessert, plus two hours of free Wi-Fi in a quiet corner.' }
  },
  {
    id: 'dessert-du.',
    price: 45,
    oldPrice: 58,
    image: 'assets/images/photo-1488477181946-6428a0291777.jpg',
    ar: { name: 'ثنائي الحلويات', desc: 'قطعتان من حلوياتنا المفضلة مع مشروب ساخن.', details: 'اختر قطعتين من تشيز كيك، براوني، أو كرواسون مع مشروب ساخن من اختيارك.' },
    en: { name: 'Dessert Duo', desc: 'Two of our favorite desserts with a hot drink.', details: 'Pick two of cheesecake, brownie or croissant with a hot drink of your choice.' }
  }
];

const REVIEWS = [
  {
    ar: { name: 'سارة العتيبي', text: 'أفضل قهوة في الحي! الأجواء هادئة والفريق لطيف جداً، وال latitudes هنا لا تُفوّت.' },
    en: { name: 'Sarah Al-Otaibi', text: 'Best coffee in the neighborhood! Calm vibes, lovely team, and the lattes are unmissable.' },
    rating: 5,
    initials: 'س'
  },
  {
    ar: { name: 'خالد منصور', text: 'قولد برو رائع والماتشا عندهم بطعم أصيل. المكان مثالي للعمل Sacha.' },
    en: { name: 'Khalid Mansour', text: 'Excellent cold brew and authentic-tasting matcha. Perfect spot for remote work.' },
    rating: 5,
    initials: 'خ'
  },
  {
    ar: { name: 'نورة الحربي', text: 'تصميم المكان جميل جداً والحلويات طازجة. تجربة تستاهل التكرار.' },
    en: { name: 'Noura Al-Harbi', text: 'Beautiful interior and fresh desserts. An experience worth repeating.' },
    rating: 5,
    initials: 'ن'
  }
];

/* Translation dictionary for all static UI text */
const I18N = {
  ar: {
    brandSub: 'مقهى ومشروبات',
    popular: 'الأكثر طلباً',
    nav_home: 'الرئيسية', nav_menu: 'القائمة', nav_offers: 'العروض', nav_about: 'من نحن', nav_contact: 'تواصل معنا',
    cart: 'السلة', wishlist: 'المفضلة', lang: 'EN', orderNow: 'اطلب الآن', exploreMenu: 'استكشف القائمة',
    heroBadge: 'مقهى الحرفية الجديدة',
    heroTitleA: 'لحظة تستحق أن تُرتشف', heroTitleB: 'قهوة أكثر من مجرد لقاء',
    heroDesc: 'قهوة مختصة محمّصة بعناية، ومشروبات ابتكارية، وأجواء دافئة صُممت ليكون فيها كل لقاء أجمل.',
    heroCta: 'استكشف القائمة', heroSecondary: 'تعرف علينا',
    bestSellers: 'الأكثر طلباً', bestDesc: 'اختيارات يحبها ضيوفنا وتعود إليها مراراً.',
    viewAll: 'عرض الكل', offersTitle: 'عروض لا تُفوّت', offersDesc: 'باقات مصممة لتناسب يومك، وتوفر لك أكثر.',
    aboutMiniTitle: 'أكثر من مجرد قهوة', aboutMiniDesc: 'في بلوم، نؤمن أن القهوة ليست مشروباً فقط، بل طقس يومي يجمعنا. نختار حبوبنا من أفضل المزارع، ونحضّر كل كوب بشغف وتفاصيل دقيقة.',
    aboutLink: 'قصتنا كاملة', reviewsTitle: 'ماذا يقول ضيوفنا', reviewsDesc: 'كلمات حقيقية من أشخاص جعلوا بلوم جزءاً من يومهم.',
    footerDesc: 'قهوة حرفية، مشروبات مبتكرة، ولحظات تستحق أن تُعاش. اكتشف فرق بلوم.',
    footerQuick: 'روابط سريعة', footerContact: 'تواصل معنا', footerSocial: 'تابعنا',
    address: 'الرياض، المملكة العربية السعودية', hours: 'يومياً: 7:00 ص – 11:00 م',
    rights: 'جميع الحقوق محفوظة.',
    cartTitle: 'سلة المشتريات', emptyCart: 'سلتك فارغة حالياً', emptyCartDesc: 'أضف بعض المشروبات اللذيذة للبدء.',
    wishTitle: 'قائمة المفضلة', emptyWish: 'لم تضف أي مفضلة بعد', emptyWishDesc: 'احفظ مشروباتك المفضلة للعودة إليها لاحقاً.',
    subtotal: 'المجموع الفرعي', checkout: 'إتمام الطلب', clearAll: 'مسح الكل', remove: 'إزالة',
    addedToCart: 'تمت الإضافة إلى السلة', removedFromCart: 'تمت الإزالة من السلة', addedToWish: 'أُضيف إلى المفضلة', removedFromWish: 'أُزيل من المفضلة',
    qtyUpdated: 'تم تحديث الكمية', checkoutMsg: 'سيتم فتح خدمة الطلب قريباً. شكراً لصبرك!',
    menuTitle: 'قائمة المشروبات', menuDesc: 'كل ما نحضّره لك بشغف، في مكان واحد.',
    searchPlaceholder: 'ابحث عن مشروبك المفضل...', all: 'الكل', noResults: 'لا توجد نتائج مطابقة', noResultsDesc: 'جرّب كلمة بحث أخرى أو اختر تصنيفاً مختلفاً.',
    from: 'ابتداءً من', perPiece: 'لكل قطعة', details: 'التفاصيل',
    productNotFound: 'المنتج غير موجود', productNotFoundDesc: 'ربما تم تغيير الرابط. عد إلى القائمة لاكتشاف مشروبات أخرى.',
    backToMenu: 'العودة للقائمة', size: 'اختر الحجم', extras: 'إضافات اختيارية', ingredients: 'المكونات',
    addToCart: 'أضف إلى السلة', goBack: 'رجوع', related: 'قد يعجبك أيضاً',
    offersPageTitle: 'عروض وباقات مميزة', offersPageDesc: 'قيمة أكثر في كل كوب — اختر الباقة التي تناسبك.',
    viewOffer: 'عرض التفاصيل', offerDetails: 'تفاصيل الباقة', addOffer: 'أضف الباقة للسلة',
    aboutPageTitle: 'قصة بلوم', aboutPageTitle2: 'بلوم... فكرة نبتت من حب القهوة',
    story1Title: 'بلوم فكرة نبتت من حب القهوة', story1Text: 'بدأت بلوم بفكرة بسيطة: أن القهوة الجيدة تستحق مكاناً يشبهها. من أول كوب حُضّر بشغف، كبرت الفكرة لتصبح مساحة تجمع محبي القهوة والمشروبات المبتكرة في أجواء دافئة.',
    story2Title: 'حرفية في كل تفصيل', story2Text: 'نختار حبوبنا من مزارع متخصصة، ونحمّصها بعناية، ثم نحضّرها بأيدٍ تعرف الفرق بين الجيد والاستثنائي. كل مشروب في قائمتنا صُمم ليكون تجربة، لا مجرد نكهة.',
    visionTitle: 'رؤيتنا', visionText: 'أن نكون المقهى الذي يعود إليه الناس كل يوم، بحثاً عن طعم موثوق ولحظة هادئة في وسط المدينة.',
    missionTitle: 'رسالتنا', missionText: 'نقدم مشروبات عالية الجودة بأسلوب مبتكر وخدمة صادقة، ونخلق مساحة يحتفي فيها الناس بالتفاصيل الصغيرة.',
    stats1: 'سنة من الخبرة', stats2: 'حبوب مختصة', stats3: 'ضيف سعيد يومياً', stats4: 'مشروباً مميزاً',
    contactPageTitle: 'أرسل لنا رسالة', contactPageDesc: 'نحب أن نسمع منك — سؤال، اقتراح، أو طلب خاص. راسلنا وسنعود إليك قريباً.',
    formName: 'الاسم الكامل', formEmail: 'البريد الإلكتروني', formMessage: 'رسالتك',
    send: 'إرسال الرسالة', sending: 'جارٍ الإرسال...', successMsg: 'تم إرسال رسالتك بنجاح! سنرد عليك قريباً.',
    errName: 'يرجى إدخال الاسم', errEmail: 'يرجى إدخال بريد إلكتروني صحيح', errMessage: 'يرجى كتابة رسالتك',
    phone: 'الهاتف', email: 'البريد الإلكتروني', location: 'الموقع', findUs: 'جدنا على الخريطة',
    mapNote: 'يمكن تعديل إحداثيات الموقع بسهولة في ملف contact.html',
    close: 'إغلاق', continueShop: 'متابعة التسوق', total: 'الإجمالي', free: 'مجاني',
    stars: 'نجوم', loading: 'جارٍ التحميل...', tryAgain: 'يرجى المحاولة لاحقاً'
  },
  en: {
    brandSub: 'Coffee & Drinks',
    popular: 'Popular',
    nav_home: 'Home', nav_menu: 'Menu', nav_offers: 'Offers', nav_about: 'About', nav_contact: 'Contact',
    cart: 'Cart', wishlist: 'Wishlist', lang: 'ع', orderNow: 'Order Now', exploreMenu: 'Explore Menu',
    heroBadge: 'The New Craft Café',
    heroTitleA: 'A Moment Worth Savoring', heroTitleB: 'Coffee, More Than a Meeting',
    heroDesc: 'Carefully roasted specialty coffee, inventive drinks, and a warm space designed to make every gathering better.',
    heroCta: 'Explore the Menu', heroSecondary: 'Get to know us',
    bestSellers: 'Best Sellers', bestDesc: 'Favorites our guests keep coming back for.',
    viewAll: 'View All', offersTitle: 'Offers You’ll Love', offersDesc: 'Bundles made for your day — more value in every sip.',
    aboutMiniTitle: 'More Than Coffee', aboutMiniDesc: 'At Bloom, we believe coffee is more than a drink — it’s a daily ritual that brings us together. We source the finest beans and craft every cup with care and precision.',
    aboutLink: 'Our full story', reviewsTitle: 'What Our Guests Say', reviewsDesc: 'Real words from people who made Bloom part of their day.',
    footerDesc: 'Craft coffee, creative drinks, and moments worth living. Discover the Bloom difference.',
    footerQuick: 'Quick Links', footerContact: 'Get in Touch', footerSocial: 'Follow Us',
    address: 'Riyadh, Saudi Arabia', hours: 'Daily: 7:00 AM – 11:00 PM',
    rights: 'All rights reserved.',
    cartTitle: 'Your Cart', emptyCart: 'Your cart is empty', emptyCartDesc: 'Add some delicious drinks to get started.',
    wishTitle: 'Wishlist', emptyWish: 'No favorites yet', emptyWishDesc: 'Save drinks you love to find them later.',
    subtotal: 'Subtotal', checkout: 'Checkout', clearAll: 'Clear All', remove: 'Remove',
    addedToCart: 'Added to cart', removedFromCart: 'Removed from cart', addedToWish: 'Added to wishlist', removedFromWish: 'Removed from wishlist',
    qtyUpdated: 'Quantity updated', checkoutMsg: 'Online ordering is coming soon. Thanks for your patience!',
    menuTitle: 'Our Menu', menuDesc: 'Everything we craft with passion, all in one place.',
    searchPlaceholder: 'Search for your favorite drink...', all: 'All', noResults: 'No matching results', noResultsDesc: 'Try a different keyword or category.',
    from: 'From', perPiece: 'per piece', details: 'Details',
    productNotFound: 'Product not found', productNotFoundDesc: 'The link may have changed. Head back to the menu to explore more.',
    backToMenu: 'Back to Menu', size: 'Choose Size', extras: 'Optional Extras', ingredients: 'Ingredients',
    addToCart: 'Add to Cart', goBack: 'Go Back', related: 'You might also like',
    offersPageTitle: 'Special Offers & Bundles', offersPageDesc: 'More value in every cup — pick the bundle that fits you.',
    viewOffer: 'View Details', offerDetails: 'Bundle Details', addOffer: 'Add Bundle to Cart',
    aboutPageTitle: 'The Bloom Story', aboutPageTitle2: 'Bloom — An Idea Born from a Love of Coffee',
    story1Title: 'An Idea Born from a Love of Coffee', story1Text: 'Bloom began with a simple idea: great coffee deserves a place that feels like it. From the first cup crafted with passion, the idea grew into a space bringing coffee lovers and creative drinks together.',
    story2Title: 'Craft in Every Detail', story2Text: 'We select beans from dedicated farms, roast them with care, and prepare them by hands that know the difference between good and exceptional. Every drink on our menu is designed to be an experience, not just a flavor.',
    visionTitle: 'Our Vision', visionText: 'To be the café people return to every day — for a reliable taste and a quiet moment in the heart of the city.',
    missionTitle: 'Our Mission', missionText: 'To serve high-quality drinks with an innovative spirit and honest service, and to create a space where people celebrate the little details.',
    stats1: 'Years of Experience', stats2: 'Specialty Beans', stats3: 'Happy Guests Daily', stats4: 'Signature Drinks',
    contactPageTitle: 'Send Us a Message', contactPageDesc: 'We love hearing from you — a question, suggestion, or special request. Write to us and we’ll get back soon.',
    formName: 'Full Name', formEmail: 'Email Address', formMessage: 'Your Message',
    send: 'Send Message', sending: 'Sending...', successMsg: 'Your message has been sent! We’ll get back to you soon.',
    errName: 'Please enter your name', errEmail: 'Please enter a valid email', errMessage: 'Please write your message',
    phone: 'Phone', email: 'Email', location: 'Location', findUs: 'Find Us on the Map',
    mapNote: 'Map coordinates can be easily edited in contact.html',
    close: 'Close', continueShop: 'Continue Shopping', total: 'Total', free: 'Free',
    stars: 'stars', loading: 'Loading...', tryAgain: 'Please try again later'
  }
};

/* Expose globally for plain-script pages */
window.BLOOM_DATA = { CATEGORIES, SIZES, EXTRAS, PRODUCTS, OFFERS, REVIEWS, I18N };
