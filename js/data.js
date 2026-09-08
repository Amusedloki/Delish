/* ============================================================
   DELISH — centralized site data
   ------------------------------------------------------------
   ⚠️ PLACEHOLDER NOTICE
   No real Delish menu, prices, reviews, phone number, opening
   hours or photos were supplied with this project brief, so the
   values below are PLACEHOLDERS. They are intentionally kept in
   ONE file so real information can be dropped in easily.

   Before launch, replace:
     - CONTACT.phone / CONTACT.email / CONTACT.hours
     - MENU prices & descriptions
     - TESTIMONIALS (use real guest feedback only)
     - GALLERY + image URLs (swap in owned photography)
     - SOCIAL links (real handles)
   ============================================================ */

window.DELISH_DATA = {

  /* ---------- Business / contact (PLACEHOLDERS — replace) ---------- */
  contact: {
    name: 'Delish',
    tagline: 'Savoring the world, one bite at a time.',
    city: 'Port Harcourt',
    state: 'Rivers State',
    country: 'Nigeria',
    address: '123 Aba Road, GRA Phase II, Port Harcourt, Rivers State, Nigeria',
    phone: '+234 800 000 0000',            // TODO: real phone
    phoneHref: '+2348000000000',
    email: 'hello@delish.ng',              // TODO: real email
    mapEmbed: 'https://www.google.com/maps?q=Port+Harcourt,+Rivers+State,+Nigeria&output=embed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Port+Harcourt,+Rivers+State,+Nigeria',
    /* TODO: confirm real hours before launch — do not publish invented hours */
    hours: [
      { day: 'Monday',      time: '11:00 AM – 10:00 PM' },
      { day: 'Tuesday',     time: '11:00 AM – 10:00 PM' },
      { day: 'Wednesday',   time: '11:00 AM – 10:00 PM' },
      { day: 'Thursday',    time: '11:00 AM – 10:00 PM' },
      { day: 'Friday',      time: '11:00 AM – 11:00 PM' },
      { day: 'Saturday',    time: '11:00 AM – 11:00 PM' },
      { day: 'Sunday',      time: '12:00 PM – 9:00 PM' }
    ]
  },

  /* ---------- Social (PLACEHOLDERS — replace with real handles) ---------- */
  social: [
    { name: 'Instagram', href: '#instagram',  icon: 'instagram' },
    { name: 'Facebook',  href: '#facebook',   icon: 'facebook' },
    { name: 'X',         href: '#x',          icon: 'x' },
    { name: 'TikTok',    href: '#tiktok',     icon: 'tiktok' }
  ],

  /* ---------- Menu (PLACEHOLDER prices/dishes — replace) ---------- */
  menu: [
    /* ---- Starters ---- */
    { id: 'suya-skewers', name: 'Suya Skewers', category: 'Starters',
      description: 'Beef suya skewers dusted with our signature yaji spice, served with sliced onions, tomatoes and a squeeze of lime.',
      price: 4500, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=70',
      tags: ['BESTSELLER'], spicy: 2, vegetarian: false, bestseller: true, featured: true },
    { id: 'small-chops', name: 'Small Chops Platter', category: 'Starters',
      description: 'Puff puff, samosas, spring rolls and spiced gizzard with a trio of dipping sauces. Built for sharing.',
      price: 5500, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=70',
      tags: ['POPULAR'], spicy: 1, vegetarian: false, bestseller: false, featured: false },
    { id: 'peppered-snails', name: 'Peppered Snails', category: 'Starters',
      description: 'Tender snails sautéed in a rich pepper sauce with onions and plantain crisps.',
      price: 6500, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=70',
      tags: ['SPICY'], spicy: 3, vegetarian: false, bestseller: false, featured: false },
    { id: 'prawn-tempura', name: 'Prawn Tempura', category: 'Starters',
      description: 'Crispy golden prawns with a chili-lime dip and sesame garnish.',
      price: 7500, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=70',
      tags: [], spicy: 1, vegetarian: false, bestseller: false, featured: false },
    { id: 'asun', name: 'Asun', category: 'Starters',
      description: 'Smoky spiced goat meat, charred with scotch bonnet, ginger and onions. Bold and unapologetic.',
      price: 6000, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=70',
      tags: ['SPICY'], spicy: 3, vegetarian: false, bestseller: false, featured: false },
    { id: 'moi-moi-trio', name: 'Moi Moi Trio', category: 'Starters',
      description: 'Steamed bean pudding in three fillings — crayfish, egg and smoked fish — with a side of chilled kuli-kuli.',
      price: 3500, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=70',
      tags: ['VEGETARIAN'], spicy: 0, vegetarian: true, bestseller: false, featured: false },

    /* ---- Main Courses ---- */
    { id: 'grilled-catfish', name: 'Grilled Catfish', category: 'Main Courses',
      description: 'Whole catfish, char-grilled with a smoky suya rub, served with grilled peppers and yam fries.',
      price: 12000, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=70',
      tags: ['BESTSELLER','SPICY'], spicy: 2, vegetarian: false, bestseller: true, featured: true },
    { id: 'peppered-chicken', name: 'Peppered Chicken', category: 'Main Courses',
      description: 'Grilled chicken glazed in our house pepper sauce with onions, tomatoes and fresh herbs.',
      price: 8500, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=70',
      tags: ['SPICY'], spicy: 2, vegetarian: false, bestseller: false, featured: false },
    { id: 'suya-lamb-chops', name: 'Suya Lamb Chops', category: 'Main Courses',
      description: 'Lamb chops with a yaji crust, garlic mash and charred greens.',
      price: 14500, image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=70',
      tags: ['CHEF\u2019S CHOICE'], spicy: 2, vegetarian: false, bestseller: false, featured: false },
    { id: 'grilled-prawns', name: 'Grilled Jumbo Prawns', category: 'Main Courses',
      description: 'Jumbo prawns in garlic-herb butter, finished on the grill and served with lemon aioli.',
      price: 16000, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=70',
      tags: ['CHEF\u2019S CHOICE'], spicy: 1, vegetarian: false, bestseller: false, featured: false },
    { id: 'ribeye-steak', name: 'Grilled Ribeye Steak', category: 'Main Courses',
      description: '300g ribeye grilled to order with chimichurri, rosemary potatoes and roasted cherry tomatoes.',
      price: 18500, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=70',
      tags: ['CHEF\u2019S CHOICE'], spicy: 0, vegetarian: false, bestseller: true, featured: true },
    { id: 'grilled-chicken', name: 'Herb Grilled Chicken Breast', category: 'Main Courses',
      description: 'Free-range chicken breast, herb-marinated, served with jollof rice and sautéed vegetables.',
      price: 9500, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=70',
      tags: [], spicy: 0, vegetarian: false, bestseller: false, featured: false },

    /* ---- Rice & Local Favorites ---- */
    { id: 'jollof-rice', name: 'Jollof Rice', category: 'Rice & Local Favorites',
      description: 'Smoky Nigerian-style jollof rice slow-cooked in a rich tomato-pepper base, served with grilled chicken and fried plantain.',
      price: 6500, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=70',
      tags: ['BESTSELLER','POPULAR'], spicy: 1, vegetarian: false, bestseller: true, featured: true },
    { id: 'fried-rice', name: 'Delish Fried Rice', category: 'Rice & Local Favorites',
      description: 'Wok-fried rice with shrimp, liver, sweet corn, carrots and green peas.',
      price: 6500, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=70',
      tags: ['BESTSELLER'], spicy: 0, vegetarian: false, bestseller: true, featured: false },
    { id: 'coconut-rice', name: 'Coconut Rice', category: 'Rice & Local Favorites',
      description: 'Creamy coconut rice with seafood, bell peppers and a whisper of chili.',
      price: 7500, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=70',
      tags: ['POPULAR'], spicy: 1, vegetarian: false, bestseller: false, featured: false },
    { id: 'pounded-yam-egusi', name: 'Pounded Yam & Egusi', category: 'Rice & Local Favorites',
      description: 'Silky pounded yam with melon-seed egusi soup, assorted meat, stockfish and bitterleaf.',
      price: 8000, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=70',
      tags: [], spicy: 1, vegetarian: false, bestseller: false, featured: false },
    { id: 'ofada-ayamase', name: 'Ofada Rice & Ayamase', category: 'Rice & Local Favorites',
      description: 'Unpolished ofada rice with the famous designer stew of green peppers and assorted meat.',
      price: 9000, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=70',
      tags: ['SPICY'], spicy: 3, vegetarian: false, bestseller: false, featured: false },
    { id: 'afang-soup', name: 'Afang Soup & Swallow', category: 'Rice & Local Favorites',
      description: 'Afang soup with periwinkle, assorted meat and dried fish, served with your choice of swallow.',
      price: 9500, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=70',
      tags: [], spicy: 1, vegetarian: false, bestseller: false, featured: false },

    /* ---- International Favorites ---- */
    { id: 'chicken-alfredo', name: 'Chicken Alfredo Pasta', category: 'International Favorites',
      description: 'Fettuccine tossed in parmesan cream with grilled chicken, garlic and parsley.',
      price: 11000, image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=900&q=70',
      tags: [], spicy: 0, vegetarian: false, bestseller: false, featured: false },
    { id: 'seafood-marinara', name: 'Seafood Marinara Pasta', category: 'International Favorites',
      description: 'Shrimp and calamari in a slow-simmered tomato-basil sauce over linguine.',
      price: 14000, image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=70',
      tags: [], spicy: 1, vegetarian: false, bestseller: false, featured: false },
    { id: 'delish-burger', name: 'The Delish Burger', category: 'International Favorites',
      description: 'Brioche bun, flame-grilled beef patty, cheddar, caramelised onions, lettuce and house sauce, with skin-on fries.',
      price: 8000, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=70',
      tags: ['BESTSELLER'], spicy: 0, vegetarian: false, bestseller: true, featured: false },
    { id: 'margherita-pizza', name: 'Margherita Pizza', category: 'International Favorites',
      description: 'Wood-fired pizza with buffalo mozzarella, San Marzano tomato and fresh basil.',
      price: 9500, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=70',
      tags: ['VEGETARIAN'], spicy: 0, vegetarian: true, bestseller: false, featured: false },
    { id: 'pepperoni-pizza', name: 'Pepperoni Pizza', category: 'International Favorites',
      description: 'Wood-fired with double pepperoni, mozzarella and oregano.',
      price: 11500, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=70',
      tags: ['POPULAR'], spicy: 1, vegetarian: false, bestseller: false, featured: false },
    { id: 'grilled-salmon', name: 'Pan-Seared Salmon', category: 'International Favorites',
      description: 'Salmon fillet, crisp skin, lemon-butter sauce, crushed potatoes and asparagus.',
      price: 16500, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=70',
      tags: ['CHEF\u2019S CHOICE'], spicy: 0, vegetarian: false, bestseller: false, featured: false },
    { id: 'caesar-salad', name: 'Chicken Caesar Salad', category: 'International Favorites',
      description: 'Crisp romaine, shaved parmesan, garlic croutons and grilled chicken, with house caesar dressing.',
      price: 7000, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=70',
      tags: [], spicy: 0, vegetarian: false, bestseller: false, featured: false },

    /* ---- Desserts ---- */
    { id: 'lava-cake', name: 'Chocolate Lava Cake', category: 'Desserts',
      description: 'Warm dark-chocolate cake with a molten centre, vanilla bean ice cream and cocoa dust.',
      price: 6000, image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=900&q=70',
      tags: ['BESTSELLER'], spicy: 0, vegetarian: true, bestseller: true, featured: true },
    { id: 'puff-puff-choc', name: 'Puff Puff & Chocolate', category: 'Desserts',
      description: 'Warm puff puff bites with a dark chocolate dip and toasted coconut.',
      price: 3500, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=900&q=70',
      tags: ['NEW'], spicy: 0, vegetarian: true, bestseller: false, featured: false },
    { id: 'banana-bread-pudding', name: 'Banana Bread Pudding', category: 'Desserts',
      description: 'Caramel-soaked bread pudding with ripe plantain and vanilla custard.',
      price: 4500, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=70',
      tags: [], spicy: 0, vegetarian: true, bestseller: false, featured: false },
    { id: 'mango-panna-cotta', name: 'Mango Panna Cotta', category: 'Desserts',
      description: 'Silky panna cotta with fresh mango purée and a berry coulis.',
      price: 5500, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=70',
      tags: ['SEASONAL'], spicy: 0, vegetarian: true, bestseller: false, featured: false },

    /* ---- Drinks ---- */
    { id: 'chapman', name: 'House Chapman', category: 'Drinks',
      description: 'The classic Nigerian mocktail — grenadine, citrus, cucumber and angostura bitters over ice.',
      price: 3000, image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=900&q=70',
      tags: ['BESTSELLER'], spicy: 0, vegetarian: true, bestseller: true, featured: true },
    { id: 'zobo-cooler', name: 'Zobo Cooler', category: 'Drinks',
      description: 'Hibiscus cooler steeped with ginger, pineapple and a hint of clove.',
      price: 2500, image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=900&q=70',
      tags: ['POPULAR'], spicy: 0, vegetarian: true, bestseller: false, featured: false },
    { id: 'mango-smoothie', name: 'Fresh Mango Smoothie', category: 'Drinks',
      description: 'Blended ripe mango with yoghurt and a touch of honey.',
      price: 3500, image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=900&q=70',
      tags: ['VEGETARIAN'], spicy: 0, vegetarian: true, bestseller: false, featured: false },
    { id: 'kunu', name: 'Kunu Aya', category: 'Drinks',
      description: 'Spiced tiger-nut milk, chilled and lightly sweetened.',
      price: 2500, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=70',
      tags: [], spicy: 0, vegetarian: true, bestseller: false, featured: false },
    { id: 'espresso', name: 'Espresso & Coffee', category: 'Drinks',
      description: 'Served espresso, americano or cappuccino with locally roasted beans.',
      price: 2500, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=70',
      tags: [], spicy: 0, vegetarian: true, bestseller: false, featured: false },
    { id: 'house-wine', name: 'House Wine', category: 'Drinks',
      description: 'Red or white house selection, served by the glass.',
      price: 4500, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=70',
      tags: [], spicy: 0, vegetarian: true, bestseller: false, featured: false }
  ],

  /* ---------- Specials (PLACEHOLDERS — replace with real offers) ---------- */
  specials: {
    today: {
      name: 'Chef\u2019s Table Surf & Turf',
      desc: 'Grilled lobster tail with a beef fillet, saffron butter and truffle mash. Our chef\u2019s daily statement — limited to twelve plates.',
      price: 28500,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=70',
      tag: 'TODAY\u2019S SPECIAL'
    },
    chefsPicks: ['ribeye-steak', 'grilled-catfish', 'grilled-salmon', 'grilled-prawns'],
    seasonal: ['mango-panna-cotta', 'coconut-rice', 'zobo-cooler', 'afang-soup'],
    limited: [
      { name: 'Saturday Suya Night', desc: 'Live suya station, grill-side seating and street-food classics with a fine-dining finish. Every Saturday from 6 PM.', tag: 'EVERY SATURDAY',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=70' },
      { name: 'Seafood Sunday Roast', desc: 'Whole grilled seafood platters, slow roasts and live music every Sunday afternoon.', tag: 'EVERY SUNDAY',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=70' },
      { name: 'Chef\u2019s Table Tasting', desc: 'A seven-course tasting journey with wine pairing, hosted in the open kitchen. Reserve 48 hours ahead.', tag: 'BY RESERVATION',
        image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=70' }
    ]
  },

  /* ---------- Testimonials (SAMPLE PLACEHOLDERS — replace with real guest reviews) ---------- */
  testimonials: [
    { name: 'Adaeze O.', role: 'Regular guest', rating: 5,
      text: 'The jollof is everything the city whispers about — smoky, rich and served with real warmth. Delish feels like eating in someone\u2019s home, if their home had a sommelier.' },
    { name: 'Emeka N.', role: 'Birthday dinner', rating: 5,
      text: 'Booked for my wife\u2019s birthday and the team went above board — a private corner, a surprise dessert and service that never hovered. Best evening in Port Harcourt so far.' },
    { name: 'Chidinma A.', role: 'First visit', rating: 4,
      text: 'Beautiful space, and the surf & turf was cooked perfectly. You can tell every plate is cared about. Coming back for the Sunday roast.' },
    { name: 'Tunde B.', role: 'Business dinner', rating: 5,
      text: 'Took clients here and it made me look great. Great pacing, great wine list, and the suya lamb chops disappeared in minutes.' },
    { name: 'Ngozi U.', role: 'Family lunch', rating: 5,
      text: 'The small chops platter fed the whole table and the kids loved the pizza. Warm, unhurried atmosphere — exactly what a Sunday lunch should feel like.' },
    { name: 'Femi O.', role: 'Date night', rating: 4,
      text: 'Dim lighting, good music and a mango panna cotta I still think about. Service was attentive without being fussy.' }
  ],

  /* ---------- Gallery (PLACEHOLDER photos — replace with owned photography) ---------- */
  gallery: [
    { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1100&q=70', cat: 'Food',   cap: 'Chef\u2019s tasting plate' },
    { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1100&q=70', cat: 'Interior', cap: 'The dining room' },
    { src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1100&q=70', cat: 'Food',   cap: 'Grill night' },
    { src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1100&q=70', cat: 'Kitchen', cap: 'The pass' },
    { src: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=1100&q=70', cat: 'Drinks', cap: 'House chapman' },
    { src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1100&q=70', cat: 'Interior', cap: 'Golden hour' },
    { src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1100&q=70', cat: 'Food',   cap: 'Fresh from the kitchen' },
    { src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1100&q=70', cat: 'Kitchen', cap: 'Plating' },
    { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1100&q=70', cat: 'Events', cap: 'Private dining' },
    { src: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1100&q=70', cat: 'Food',   cap: 'Dessert corner' },
    { src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1100&q=70', cat: 'Drinks', cap: 'The bar' },
    { src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1100&q=70', cat: 'Events', cap: 'Catering service' },
    { src: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1100&q=70', cat: 'Food',   cap: 'Rice & local favorites' },
    { src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1100&q=70', cat: 'Interior', cap: 'Evening service' }
  ],

  /* ---------- Home hero slides ---------- */
  heroSlides: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=72',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=72',
    'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=2000&q=72',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=2000&q=72',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2000&q=72'
  ],

  /* ---------- Static image fallback (inline SVG, warm tone) ---------- */
  fallbackImg: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="675">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#A34A24"/><stop offset="1" stop-color="#1E1E1E"/></linearGradient></defs>' +
    '<rect width="900" height="675" fill="url(#g)"/>' +
    '<text x="450" y="345" font-family="Georgia,serif" font-size="34" fill="rgba(255,255,255,.85)" text-anchor="middle">DELISH</text>' +
    '<text x="450" y="385" font-family="Arial" font-size="15" fill="rgba(255,255,255,.55)" text-anchor="middle">Image coming soon</text></svg>'
  )
};
