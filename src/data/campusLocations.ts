export interface CampusLocation {
  id: string;
  name: string;
  icon: string;
  embedUrl: string;
  description: string;
  details: string;
  category: "academic" | "labs" | "oc" | "campus" | "general";
  isPlaceholder?: boolean;
}

export const CAMPUS_LOCATIONS: CampusLocation[] = [
  // === Campus Highlights ===
  {
    id: "main-gate",
    name: "Main Gate",
    icon: "🚪",
    embedUrl: "https://www.google.com/maps/embed?pb=!4v1769016544503!6m8!1m7!1sBB_dFM8hxuObn58HIPKxmQ!2m2!1d31.01690810677329!2d77.07322580748374!3f270.9868428347353!4f-4.865774782614153!5f0.7820865974627469",
    description: "The grand entrance where your campus journey begins.",
    details: "Welcome to the main entrance of the campus, where your journey begins. As you step through this grand gateway, you are greeted by a peaceful and green environment that reflects the university's commitment to academic excellence and sustainability. The surrounding hills and clean atmosphere immediately set a calm and focused tone for everything ahead.",
    category: "campus",
  },
  {
    id: "girls-hostel",
    name: "Girls Hostel",
    icon: "🏠",
    embedUrl: "https://www.google.com/maps/embed?pb=!4v1769017317954!6m8!1m7!1sF-B18BHPms3lCM3JYz-GZQ!2m2!1d31.01605251172966!2d77.07124364166754!3f184.89016857246136!4f6.518772134314517!5f0.7820865974627469",
    description: "Safe and comfortable accommodation for female students.",
    details: "The Girls Hostel is designed to provide a safe, comfortable, and homely living environment. The facility is well-maintained and equipped with essential amenities including Wi-Fi, common rooms, and a mess hall, ensuring that students can focus on their academic and personal growth while enjoying a secure residential experience within the campus.",
    category: "campus",
  },
  {
    id: "mughal-garden",
    name: "Mughal Garden",
    icon: "🌳",
    embedUrl: "https://www.google.com/maps/embed?pb=!4v1769017240145!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ0V3ZGJlQWc.!2m2!1d31.01748463228725!2d77.06978551826248!3f252.51614765786093!4f1.4297939940067437!5f0.7820865974627469",
    description: "A beautiful heritage garden for relaxation and tranquility.",
    details: "The Mughal Garden is one of the most beautiful and relaxing spots on campus. Inspired by traditional Mughal landscaping, it offers a perfect blend of greenery, symmetry, and tranquility — featuring symmetrical flower beds, fountains, and shaded walkways, making it an ideal place for students to unwind or spend quiet time.",
    category: "campus",
  },
  {
    id: "mughal-garden-2",
    name: "Mughal Garden (View 2)",
    icon: "🌳",
    embedUrl: "https://www.google.com/maps/embed?pb=!4v1773682017758!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ0V3WjctUGc.!2m2!1d31.01743775221015!2d77.06993465131883!3f293.2643954388067!4f3.9482322831549226!5f0.7820865974627469",
    description: "Another scenic angle of the Mughal Garden.",
    details: "From this angle, you can better appreciate the layout and scenic beauty of the Mughal Garden. The pathways, plants, and open spaces come together to create a refreshing environment that enhances the natural charm of the campus.",
    category: "campus",
  },
  {
    id: "botanical-garden",
    name: "Botanical Garden",
    icon: "🌿",
    embedUrl: "https://www.google.com/maps/embed?pb=!4v1773682062924!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ0V3ZWFYVnc.!2m2!1d31.01698406854352!2d77.07132075431579!3f274.8964816480381!4f-6.653944607579078!5f0.7820865974627469",
    description: "A lush garden showcasing campus biodiversity.",
    details: "The Botanical Garden showcases the university's dedication to preserving biodiversity and maintaining a green campus. It features a wide variety of plants and trees, offering both aesthetic beauty and educational value for students interested in nature and environmental studies.",
    category: "campus",
  },
  {
    id: "temple",
    name: "Temple",
    icon: "🛕",
    embedUrl: "https://www.google.com/maps/embed?pb=!4v1769016834349!6m8!1m7!1sInhxoOGbdYA4EX7MOTq4-A!2m2!1d31.01760827881978!2d77.06783315805137!3f283.7153540495088!4f-10.44302779843548!5f0.7820865974627469",
    description: "A serene spiritual space for reflection.",
    details: "The campus temple is a peaceful and serene place where students and staff can take a moment for reflection and spirituality. Surrounded by nature, it provides a calming escape from daily academic activities and is open to all faiths.",
    category: "campus",
  },
  {
    id: "basketball-ground",
    name: "Basketball Ground",
    icon: "🏀",
    embedUrl: "https://www.google.com/maps/embed?pb=!4v1773682442525!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ0V3YTc2Y0E.!2m2!1d31.01734894069656!2d77.06883397826395!3f81.07631557454826!4f4.047523975509989!5f0.7820865974627469",
    description: "Outdoor court for sports and fitness.",
    details: "The Basketball Ground is an important part of campus life. It encourages students to stay active, participate in sports, and maintain a healthy balance between academics and physical fitness. It's also a popular gathering spot for sports enthusiasts.",
    category: "campus",
  },

  // === Academic Block (descending order) ===
  {
    id: "4th-floor-rooftop-gsv",
    name: "4th Floor Rooftop",
    icon: "🏗️",
    embedUrl: "https://www.google.com/maps/embed?pb=!4v1773682411901!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ0V3ZmJLVHc.!2m2!1d31.01655819016956!2d77.07080037472336!3f151.12701823452304!4f14.30557068005082!5f0.7820865974627469",
    description: "Interactive street-view perspective from above.",
    details: "This view provides an interactive street-view perspective from the rooftop. It allows you to explore the campus layout from above and understand how different buildings and spaces are connected.",
    category: "academic",
  },
  {
    id: "3rd-floor",
    name: "3rd Floor",
    icon: "3️⃣",
    embedUrl: "https://kuula.co/share/LpqwH?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1",
    description: "Classrooms, faculty offices, and seminar rooms.",
    details: "The third floor houses classrooms, faculty offices, and seminar rooms. This is where most academic interactions take place, including lectures, discussions, and mentorship sessions between students and professors.",
    category: "academic",
  },
  {
    id: "2nd-floor",
    name: "2nd Floor",
    icon: "2️⃣",
    embedUrl: "https://kuula.co/share/Lpqwr?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1",
    description: "Lecture halls and collaborative study areas.",
    details: "The second floor is dedicated to lecture halls and study areas. These spaces are designed to support focused learning, group discussions, and collaborative academic activities.",
    category: "academic",
  },
  {
    id: "1st-floor-ece-lab",
    name: "1st Floor ECE Lab",
    icon: "🔬",
    embedUrl: "https://kuula.co/share/Lpqsd?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1",
    description: "Electronics & Communication Engineering lab.",
    details: "Welcome to the Electronics and Communication Engineering Lab. This lab is equipped with modern instruments and tools that allow students to gain practical knowledge and hands-on experience in electronics and communication systems.",
    category: "academic",
  },
  {
    id: "1st-floor-physics-lab",
    name: "1st Floor Physics Lab",
    icon: "⚛️",
    embedUrl: "https://kuula.co/share/Lpqwf?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1",
    description: "Physics laboratory for hands-on experiments.",
    details: "The Physics Laboratory is where students perform experiments to understand fundamental scientific concepts in optics, mechanics, thermodynamics, and modern physics. It plays a key role in building analytical and experimental skills.",
    category: "academic",
  },
  {
    id: "1st-floor-balcony",
    name: "1st Floor Balcony",
    icon: "🌤️",
    embedUrl: "https://kuula.co/share/LpqQP?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1",
    description: "Open-air balcony with campus views.",
    details: "The first-floor balcony offers an open-air space where students can relax between classes. It provides beautiful views of the campus grounds, making it a refreshing spot to take a short break. This is a 360° interactive panorama.",
    category: "academic",
  },
  {
    id: "lecture-halls-1st",
    name: "Lecture Halls (1st Floor)",
    icon: "🎓",
    embedUrl: "https://www.google.com/maps/embed?pb=!4v1773682167677!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ0V3WTY0SkE.!2m2!1d31.01631135520564!2d77.07058712822541!3f194.58043904156563!4f-7.0963030511657905!5f0.7820865974627469",
    description: "Well-equipped lecture halls for learning.",
    details: "These lecture halls are designed to deliver an effective learning experience. With proper seating arrangements, projectors, and teaching facilities, they support both traditional and interactive teaching methods.",
    category: "academic",
  },
  {
    id: "auditorium-ground",
    name: "Auditorium (Ground Floor)",
    icon: "🎭",
    embedUrl: "https://www.google.com/maps/embed?pb=!4v1773682132815!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ0V3YTc2NGdF!2m2!1d31.01620682180723!2d77.07080037472336!3f52.30166309411784!4f-6.290941161185586!5f0.7820865974627469",
    description: "The heart of cultural and academic events.",
    details: "The auditorium is the heart of cultural and academic events on campus. It hosts seminars, workshops, performances, and guest lectures, bringing the entire student community together. It has a large seating capacity and modern AV equipment.",
    category: "academic",
  },


  // === Specialized Labs ===
  {
    id: "drobotics-lab",
    name: "Drobotics Lab",
    icon: "🤖",
    embedUrl: "https://kuula.co/share/Lpq3m?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1",
    description: "Innovation hub for robotics, drones & automation.",
    details: "Welcome to the Drobotics Lab, where innovation meets technology. This cutting-edge facility focuses on robotics, drones, and automation, allowing students to work on advanced projects and research in emerging fields like autonomous systems and robotic arm programming.",
    category: "labs",
  },



  // === OC (Open Cafeteria) ===
  {
    id: "oc",
    name: "OC (Open Cafeteria)",
    icon: "☕",
    embedUrl: "https://www.google.com/maps/embed?pb=!4v1769017409443!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQ0V3YTc2VkE.!2m2!1d31.0161679406136!2d77.07010301862866!3f332.456426142536!4f7.474565079743996!5f0.7820865974627469",
    description: "The popular campus hangout for food & socializing.",
    details: "The Open Cafeteria is a popular hangout spot for students. It offers a relaxed environment where students can enjoy food, socialize, and take a break from their academic routine. It serves food and beverages throughout the day.",
    category: "oc",
  },
  {
    id: "oc-balcony",
    name: "OC Balcony",
    icon: "🌅",
    embedUrl: "https://kuula.co/share/LpqRY?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1",
    description: "Scenic balcony seating with stunning views.",
    details: "The OC Balcony provides a scenic outdoor seating area with beautiful views of the surrounding hills. It's a perfect place to relax, especially during sunsets, while enjoying the peaceful surroundings. This is a 360° interactive panorama.",
    category: "oc",
  },

  // === General ===
  {
    id: "front-academic-block",
    name: "Front Academic Block",
    icon: "🏫",
    embedUrl: "https://www.google.com/maps/embed?pb=!4v1773682274531!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ0V3ZTdPOUFF!2m2!1d31.01636545785069!2d77.07163825063309!3f285.1745968555807!4f-1.0995367293571263!5f0.7820865974627469",
    description: "Front view showcasing modern campus architecture.",
    details: "This is the front view of the academic block, showcasing the university's modern architecture. It represents the institution's commitment to quality education and infrastructure, housing classrooms, labs, and administrative offices.",
    category: "general",
  },
  {
    id: "dhyan-kaksh",
    name: "Dhyan Kaksh",
    icon: "🧘",
    embedUrl: "https://www.google.com/maps/embed?pb=!4v1773682322677!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ0V3WTdZdXdF!2m2!1d31.01613667281465!2d77.0703306698281!3f28.840379634045988!4f-3.023942952140743!5f0.7820865974627469",
    description: "Meditation hall for mindfulness and well-being.",
    details: "The Dhyan Kaksh is a meditation hall designed to promote mindfulness and mental well-being. It offers a quiet space for relaxation, reflection, yoga, and inner balance — a peaceful escape within the campus.",
    category: "general",
  },
];

export const CATEGORY_LABELS: Record<string, { label: string; icon: string }> = {
  campus: { label: "Campus Highlights", icon: "🏫" },
  academic: { label: "Academic Block", icon: "🎓" },
  labs: { label: "Specialized Labs", icon: "🔬" },
  oc: { label: "OC (Open Cafeteria)", icon: "☕" },
  general: { label: "General", icon: "📍" },
};

export const getLocationsByCategory = (category: string): CampusLocation[] => {
  return CAMPUS_LOCATIONS.filter((l) => l.category === category);
};

export const findLocationByKeyword = (input: string): CampusLocation | null => {
  const lowerInput = input.toLowerCase();

  for (const location of CAMPUS_LOCATIONS) {
    if (location.isPlaceholder) continue;
    const nameMatch =
      location.name.toLowerCase().includes(lowerInput) ||
      lowerInput.includes(location.name.toLowerCase().split(" ")[0]);
    if (nameMatch) return location;
  }

  // Keyword matching
  if (lowerInput.includes("gate") || lowerInput.includes("entrance"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "main-gate") || null;
  if (lowerInput.includes("balcony") && lowerInput.includes("oc"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "oc-balcony") || null;
  if (lowerInput.includes("balcony"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "1st-floor-balcony") || null;
  if (lowerInput.includes("oc") || lowerInput.includes("cafeteria") || lowerInput.includes("cafe"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "oc") || null;
  if (lowerInput.includes("girl") || lowerInput.includes("hostel"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "girls-hostel") || null;
  if (lowerInput.includes("botanical"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "botanical-garden") || null;
  if (lowerInput.includes("mughal") || lowerInput.includes("mugal") || lowerInput.includes("garden"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "mughal-garden") || null;
  if (lowerInput.includes("temple") || lowerInput.includes("mandir") || lowerInput.includes("spiritual"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "temple") || null;
  if (lowerInput.includes("rooftop") || lowerInput.includes("4th"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "4th-floor-rooftop-gsv") || null;
  if (lowerInput.includes("3rd floor"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "3rd-floor") || null;
  if (lowerInput.includes("2nd floor"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "2nd-floor") || null;
  if (lowerInput.includes("ece"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "1st-floor-ece-lab") || null;
  if (lowerInput.includes("physics"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "1st-floor-physics-lab") || null;
  if (lowerInput.includes("drobot") || lowerInput.includes("drone") || lowerInput.includes("robot"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "drobotics-lab") || null;
  if (lowerInput.includes("library"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "library-ground") || null;
  if (lowerInput.includes("reception"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "reception-ground") || null;
  if (lowerInput.includes("auditorium"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "auditorium-ground") || null;
  if (lowerInput.includes("lecture"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "lecture-halls-1st") || null;
  if (lowerInput.includes("dhyan") || lowerInput.includes("meditation"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "dhyan-kaksh") || null;
  if (lowerInput.includes("basketball") || lowerInput.includes("basket"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "basketball-ground") || null;
  if (lowerInput.includes("front") && lowerInput.includes("academic"))
    return CAMPUS_LOCATIONS.find((l) => l.id === "front-academic-block") || null;

  return null;
};
