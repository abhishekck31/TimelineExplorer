import type { Company } from "@/components/timeline-explorer"

export const initialCompanies: Company[] = [
  {
    id: "tata",
    name: "Tata Group",
    founded: "1868",
    founder: "Jamsetji Nusserwanji Tata",
    headquarters: "Mumbai, India",
    employees: "935,000+",
    revenue: "$128 billion (2022-23)",
    description: `The Tata Group is an Indian multinational conglomerate founded in 1868 by Jamsetji Nusserwanji Tata. 
    Headquartered in Mumbai, it encompasses over 30 companies across 10 verticals, including steel, automobiles, 
    information technology, consumer products, and more.
    
    With operations in more than 100 countries and a combined revenue exceeding $128 billion (2022-23), 
    the Tata Group employs over 935,000 people worldwide. The group is known for its ethical business practices 
    and philanthropic activities, with approximately 66% of the equity of Tata Sons, the principal investment 
    holding company, held by philanthropic trusts.`,
    keyAchievements: [
      "First integrated steel plant in Asia (Tata Steel, 1907)",
      "India's first airline (Tata Airlines, 1932, now Air India)",
      "India's first software services company (TCS, 1968)",
      "Acquisition of global brands like Jaguar Land Rover and Tetley",
      "Pioneer in corporate social responsibility in India",
    ],
    events: [
      {
        id: 1,
        title: "Tata Group Founded",
        date: "1868-01-01",
        category: "founding",
        description: "Jamsetji Nusserwanji Tata founded the Tata Group as a trading company in Mumbai, India.",
        image: "/Jamestji.jpg?height=200&width=300",
        color: "",
        details:
          "Jamsetji Nusserwanji Tata established a trading company in 1868, which would eventually grow into the Tata Group, one of India's largest and most respected conglomerates.\n\nWith an initial capital of ₹21,000, Jamsetji started by trading in cotton, metals, and opium. His vision extended far beyond mere trading, as he dreamed of building an industrial India that could compete on the global stage.\n\nJamsetji's business philosophy was revolutionary for its time. He believed in the principles of fair business practices, philanthropy, and nation-building through industry. These values continue to guide the Tata Group to this day.",
      },
      {
        id: 2,
        title: "Empress Mills",
        date: "1874-01-01",
        category: "manufacturing",
        description: "Jamsetji Tata established the central India's first textile mill, the Empress Mills in Nagpur.",
        image: "/Empress.png?height=200&width=300",
        color: "",
        details:
          "The Empress Mills, established in Nagpur in 1874, was Jamsetji Tata's first major industrial venture. Named in honor of Queen Victoria, who had recently been proclaimed Empress of India, the mill represented Jamsetji's vision of modern industrial development in India.\n\nThe mill was equipped with the latest machinery imported from England and employed thousands of workers. It was known for producing high-quality textiles that could compete with British imports.\n\nBeyond its commercial success, the Empress Mills was notable for its progressive labor practices. Jamsetji introduced worker welfare measures that were far ahead of their time, including provident fund schemes, gratuity payments, and accident compensation.",
      },
      {
        id: 3,
        title: "Taj Hotel",
        date: "1903-12-16",
        category: "hospitality",
        description:
          "The iconic Taj Hotel opened in Mumbai, fulfilling Jamsetji Tata's vision of a world-class hotel in India.",
        image: "/Tajhotel.png?height=200&width=300",
        color: "",
        details:
          "The Taj Mahal Hotel in Mumbai (then Bombay) was inaugurated on December 16, 1903. It was the culmination of Jamsetji Tata's dream to build a grand hotel that would showcase Indian hospitality to the world.\n\nLegend has it that Jamsetji decided to build the hotel after being denied entry to a prestigious hotel in Bombay that had a \"Europeans Only\" policy. He resolved to build a hotel that would welcome all people, regardless of race, color, or creed.\n\nThe Taj was the first building in Bombay to use electricity and American fans, the first to have Turkish baths, and the first to have German elevators. It quickly became a symbol of Indian wealth, enterprise, and hospitality.\n\nSadly, Jamsetji did not live to see his dream realized, as he passed away in 1904, shortly after the hotel's construction began. The hotel was completed by his son Dorabji Tata.",
      },
      {
        id: 4,
        title: "Tata Steel Established",
        date: "1907-08-26",
        category: "manufacturing",
        description:
          "Tata Iron and Steel Company (now Tata Steel) was established in Jamshedpur, becoming India's first steel plant.",
        image: "/Steel.png?height=200&width=300",
        color: "",
        details:
          "The Tata Iron and Steel Company (TISCO, now Tata Steel) was established on August 26, 1907, fulfilling another of Jamsetji Tata's grand visions. He had recognized that steel would be fundamental to India's industrial development and independence.\n\nThe plant was built in what would become Jamshedpur, named after Jamsetji himself. The location was chosen for its proximity to iron ore, coal, and manganese deposits, as well as its access to water and transportation.\n\nTISCO began production in 1912 and was the first steel plant in India. It was also one of the few steel companies in the world to remain profitable during the Great Depression.\n\nThe establishment of TISCO was a monumental achievement, as it came at a time when experts, particularly from the colonial British government, were skeptical about India's ability to produce steel. The success of TISCO proved them wrong and marked a significant step toward India's industrial self-sufficiency.",
      },
      {
        id: 5,
        title: "Tata Airlines",
        date: "1932-10-15",
        category: "aviation",
        description: "JRD Tata founded Tata Airlines, India's first airline which later became Air India.",
        image: "/AirIndia.png?height=200&width=300",
        color: "",
        details:
          "Tata Airlines, India's first airline, was founded by JRD Tata on October 15, 1932. JRD, an aviation enthusiast and India's first licensed pilot, personally piloted the inaugural flight from Karachi to Mumbai (then Bombay) via Ahmedabad.\n\nThe airline began as a mail carrier for Imperial Airways, carrying mail from Karachi to Bombay. It soon expanded to passenger services and by 1938, it was flying both inland and international routes.\n\nIn 1946, Tata Airlines was renamed Air India, and in 1948, the Government of India acquired a 49% stake in the company. In 1953, the airline was nationalized, though JRD Tata remained its Chairman until 1977.\n\nIn a full-circle moment, the Tata Group reacquired Air India from the Government of India in 2021, bringing the airline back to its original founders after 68 years.",
      },
    ],
  },
  {
    id: "microsoft",
    name: "Microsoft Corporation",
    founded: "1975",
    founder: "Bill Gates and Paul Allen",
    headquarters: "Redmond, Washington, USA",
    employees: "221,000+",
    revenue: "$211.9 billion (2022)",
    description: `Microsoft Corporation is an American multinational technology corporation founded by Bill Gates and Paul Allen on April 4, 1975. 
    Initially focused on developing and selling BASIC interpreters for the Altair 8800 microcomputer, Microsoft rose to dominate the personal computer 
    operating system market with MS-DOS in the mid-1980s, followed by the Windows operating system.
    
    The company has since diversified into cloud computing, software development, computer hardware, and artificial intelligence. 
    Microsoft's flagship products include Windows, Office, Azure, Xbox, and Surface devices. Under the leadership of Satya Nadella since 2014, 
    Microsoft has pivoted strongly toward cloud services and AI technologies.`,
    keyAchievements: [
      "Development of Windows, the world's most widely used operating system",
      "Creation of Microsoft Office, the standard in productivity software",
      "Xbox gaming platform",
      "Azure cloud computing platform",
      "Acquisition of LinkedIn, GitHub, and Activision Blizzard",
    ],
    events: [
      {
        id: 1,
        title: "Microsoft Founded",
        date: "1975-04-04",
        category: "founding",
        description: "Bill Gates and Paul Allen founded Microsoft in Albuquerque, New Mexico.",
        image: "/BillGates.png?height=200&width=300",
        color: "",
        details:
          'Microsoft was founded on April 4, 1975, by Bill Gates and Paul Allen in Albuquerque, New Mexico. The company was initially established to develop and sell BASIC interpreters for the Altair 8800 microcomputer.\n\nGates and Allen had been friends since their school days at Lakeside School in Seattle. They shared a passion for computers and programming, and saw an opportunity in the emerging personal computer market.\n\nThe name "Microsoft" was coined by Allen, combining "microcomputer" and "software." It reflected the company\'s focus on software for microcomputers, which were the precursors to personal computers.\n\nIn its early days, Microsoft operated out of a small office in Albuquerque, close to MITS, the manufacturer of the Altair 8800. The company had just a handful of employees, including Gates and Allen.',
      },
      {
        id: 2,
        title: "MS-DOS",
        date: "1981-08-12",
        category: "software",
        description:
          "Microsoft released MS-DOS, which became the standard operating system for IBM PCs and compatibles.",
        image: "/MS-DOS.png?height=200&width=300",
        color: "",
        details:
          "MS-DOS (Microsoft Disk Operating System) was released on August 12, 1981, as the operating system for the IBM Personal Computer. This marked a pivotal moment in Microsoft's history and in the development of personal computing.\n\nThe story of MS-DOS begins with IBM's decision to enter the personal computer market. IBM approached Microsoft to provide an operating system for their new PC. Microsoft didn't have an operating system at the time, so they acquired QDOS (Quick and Dirty Operating System) from Seattle Computer Products, modified it, and renamed it MS-DOS.\n\nThe deal with IBM was a masterstroke by Gates. Microsoft retained the rights to license MS-DOS to other computer manufacturers, which proved to be incredibly lucrative as the PC clone market exploded in the 1980s.\n\nMS-DOS was a command-line operating system, requiring users to type commands rather than use a graphical interface. Despite its complexity for non-technical users, it dominated the PC operating system market throughout the 1980s and early 1990s.",
      },
      {
        id: 3,
        title: "Windows 1.0",
        date: "1985-11-20",
        category: "software",
        description: "Microsoft released Windows 1.0, its first graphical user interface operating system.",
        image: "/Windows1.png?height=200&width=300",
        color: "",
        details:
          "Windows 1.0 was released on November 20, 1985, marking Microsoft's entry into the graphical user interface (GUI) operating system market. It was Microsoft's response to Apple's Macintosh, which had introduced many users to the concept of a GUI.\n\nWindows 1.0 was not a standalone operating system but rather a graphical shell that ran on top of MS-DOS. It included several applications such as Calculator, Calendar, Cardfile, Clipboard viewer, Clock, Control Panel, Notepad, Paint, Reversi, Terminal, and Write.\n\nThe system requirements for Windows 1.0 were modest by today's standards but substantial for the time: it required two double-sided disk drives, 256KB of RAM, and a graphics adapter card.\n\nWhile Windows 1.0 was not an immediate commercial success, it laid the foundation for future versions of Windows that would eventually dominate the operating system market.",
      },
      {
        id: 4,
        title: "Microsoft Office",
        date: "1990-10-01",
        category: "software",
        description: "Microsoft released Office for Windows, bundling Word, Excel, and PowerPoint into a suite.",
        image: "/Office.png?height=200&width=300",
        color: "",
        details:
          "Microsoft Office for Windows was released on October 1, 1990. It was the first version of Office to bundle Microsoft's productivity applications—Word, Excel, and PowerPoint—into a cohesive suite for Windows 3.0.\n\nPrior to this, Microsoft had sold these applications individually. The decision to bundle them together was a strategic move that would prove to be enormously successful. It provided users with a set of integrated tools for word processing, spreadsheet calculations, and presentations.\n\nThe suite was designed with a consistent user interface across all applications, making it easier for users to switch between them. This consistency became a hallmark of Office and contributed to its widespread adoption.\n\nMicrosoft Office quickly became the standard for productivity software in businesses and homes around the world. It has been regularly updated over the years, with new applications added to the suite and existing ones enhanced with new features.",
      },
      {
        id: 5,
        title: "Windows 95",
        date: "1995-08-24",
        category: "software",
        description:
          "Microsoft released Windows 95, which introduced the Start menu and taskbar, revolutionizing the PC interface.",
        image: "/Windows95.png?height=200&width=300",
        color: "",
        details:
          'Windows 95 was released on August 24, 1995, with a massive marketing campaign that included the Rolling Stones\' "Start Me Up" as its theme song. It was a landmark release that significantly changed the way people interacted with computers.\n\nWindows 95 introduced several features that have become staples of the Windows experience, including the Start menu, taskbar, and the concept of "minimizing" and "maximizing" windows. It also introduced long fil  taskbar, and the concept of "minimizing" and "maximizing" windows. It also introduced long filenames, plug-and-play capabilities, and improved multitasking.\n\nUnlike its predecessors, Windows 95 was a complete operating system, not just a graphical shell running on top of MS-DOS. However, it still used MS-DOS for some functions, particularly during the boot process.\n\nThe launch of Windows 95 was a cultural event. People lined up at midnight to be among the first to purchase the software, and the release was covered extensively by mainstream media. It sold 7 million copies in the first five weeks, cementing Microsoft\'s dominance in the operating system market.',
      },
    ],
  },
  {
    id: "apple",
    name: "Apple Inc.",
    founded: "1976",
    founder: "Steve Jobs, Steve Wozniak, and Ronald Wayne",
    headquarters: "Cupertino, California, USA",
    employees: "164,000+",
    revenue: "$394.3 billion (2022)",
    description: `Apple Inc. is an American multinational technology company founded on April 1, 1976, by Steve Jobs, Steve Wozniak, and Ronald Wayne. 
    The company began with the Apple I personal computer and rose to prominence with the Macintosh in 1984, which introduced the graphical user interface to a wider consumer market.
    
    After a period of decline in the 1990s, Jobs returned to Apple in 1997 and led a remarkable turnaround. The company revolutionized multiple industries with groundbreaking products: 
    the iPod (2001) transformed the music industry, the iPhone (2007) redefined mobile phones, and the iPad (2010) created the modern tablet category.
    
    Today, Apple is known for its ecosystem of hardware, software, and services, including Mac computers, iPhones, iPads, Apple Watch, AirPods, and services like the App Store, 
    Apple Music, Apple TV+, and Apple Pay.`,
    keyAchievements: [
      "Introduction of the iPhone, revolutionizing the smartphone industry",
      "Creation of the App Store ecosystem",
      "Development of the iPad, defining the modern tablet category",
      "Apple Silicon transition, bringing custom ARM-based processors to Mac",
      "First company to reach $3 trillion market capitalization",
    ],
    events: [
      {
        id: 1,
        title: "Apple Computer Founded",
        date: "1976-04-01",
        category: "founding",
        description: "Steve Jobs, Steve Wozniak, and Ronald Wayne founded Apple Computer in Jobs' garage.",
        image: "/Apple.png?height=200&width=300",
        color: "",
        details:
          "Apple Computer was founded on April 1, 1976, by Steve Jobs, Steve Wozniak, and Ronald Wayne. The company was established in the garage of Jobs' childhood home in Los Altos, California.\n\nThe three founders had different backgrounds and skills. Wozniak was the technical genius who designed the Apple I computer. Jobs was the visionary who saw the potential of personal computers and had the marketing acumen to sell them. Wayne, who worked with Jobs at Atari, provided administrative support and drew the first Apple logo.\n\nWayne's involvement with Apple was brief. He sold his 10% stake in the company just 12 days after its founding for $800, concerned about potential personal liability if the company failed. That stake would be worth billions today.\n\nThe company's name, \"Apple Computer,\" was inspired by Jobs' visit to an apple orchard. He thought the name sounded \"fun, spirited, and not intimidating,\" making computers more approachable to the average person.",
      },
      {
        id: 2,
        title: "Apple II Released",
        date: "1977-06-05",
        category: "product",
        description: "Apple released the Apple II, one of the first highly successful mass-produced microcomputers.",
        image: "/Apple2.png?height=200&width=300",
        color: "",
        details:
          "The Apple II was released on June 5, 1977, at the West Coast Computer Faire. It was one of the first highly successful mass-produced microcomputers and played a crucial role in establishing Apple as a major player in the personal computer industry.\n\nDesigned primarily by Steve Wozniak, the Apple II featured a MOS Technology 6502 microprocessor running at 1 MHz, 4KB of RAM (expandable to 48KB), and color graphics capabilities—a significant advancement over competitors at the time.\n\nThe Apple II's open architecture allowed for third-party hardware developers to create expansion cards, which greatly extended the computer's capabilities. This openness contributed significantly to its success.\n\nThe introduction of VisiCalc, the first spreadsheet program for personal computers, in 1979 made the Apple II an attractive option for business users, expanding its market beyond hobbyists and into offices and schools.\n\nThe Apple II series continued with various models (II Plus, IIe, IIc, IIGS) until the line was discontinued in 1993, making it one of the longest-lived computer series in history.",
      },
      {
        id: 3,
        title: "Macintosh Introduction",
        date: "1984-01-24",
        category: "product",
        description: 'Apple introduced the Macintosh with its famous "1984" Super Bowl commercial.',
        image: "/Macintosh.png?height=200&width=300",
        color: "",
        details:
          'The Macintosh was introduced on January 24, 1984, with the now-famous "1984" Super Bowl commercial directed by Ridley Scott. The commercial, which portrayed Apple as a heroic underdog fighting against conformity (represented by IBM), is considered a watershed event in advertising history.\n\nThe original Macintosh featured a 9-inch monochrome display, a Motorola 68000 processor running at 8 MHz, 128KB of RAM, and a 400KB floppy disk drive. Most importantly, it introduced the graphical user interface (GUI) to a mainstream audience, featuring icons, windows, and a mouse for navigation.\n\nSteve Jobs unveiled the Macintosh at Apple\'s annual shareholders\' meeting, where the computer famously introduced itself: "Hello, I am Macintosh. It sure is great to get out of that bag."\n\nDespite its innovative design, the original Macintosh faced challenges due to its high price ($2,495, equivalent to about $6,500 today) and limited software availability. However, it laid the foundation for Apple\'s future and fundamentally changed how people interacted with computers.',
      },
      {
        id: 4,
        title: "Steve Jobs Returns to Apple",
        date: "1997-09-16",
        category: "leadership",
        description: "Steve Jobs returned to Apple as interim CEO after Apple acquired NeXT.",
        image: "/SteveJobs.png?height=200&width=300",
        color: "",
        details:
          "Steve Jobs returned to Apple on September 16, 1997, as interim CEO (later dropping the \"interim\" title) after Apple acquired NeXT for $429 million. This marked the beginning of one of the greatest corporate turnarounds in business history.\n\nWhen Jobs returned, Apple was in dire financial straits, losing money and market share. The company was approximately 90 days from bankruptcy, according to Jobs' later recollections.\n\nJobs immediately made several strategic decisions: he streamlined Apple's product line by cutting numerous projects, secured a $150 million investment from Microsoft, and refocused the company on creating innovative, well-designed products.\n\nHe also introduced a new corporate culture centered around secrecy, simplicity, and perfectionism. This cultural shift would become a hallmark of Apple's approach to product development.\n\nJobs' return set the stage for Apple's subsequent introduction of groundbreaking products like the iMac, iPod, iPhone, and iPad, which would transform not just Apple but entire industries.",
      },
      {
        id: 5,
        title: "iPhone Introduction",
        date: "2007-01-09",
        category: "product",
        description: "Steve Jobs unveiled the iPhone, revolutionizing the mobile phone industry.",
        image: "/iPhone.png?height=200&width=300",
        color: "",
        details:
          'Steve Jobs unveiled the iPhone on January 9, 2007, at the Macworld Conference & Expo in San Francisco. In his presentation, Jobs described the iPhone as "a revolutionary product that changes everything," and famously announced it as "a widescreen iPod with touch controls, a revolutionary mobile phone, and a breakthrough Internet communications device."\n\nThe original iPhone featured a 3.5-inch touchscreen display, a 2-megapixel camera, and ran iPhone OS (later renamed iOS). It lacked many features common in smartphones today, including 3G connectivity, GPS, and the App Store, which would be introduced a year later.\n\nDespite its limitations and high price ($499 for the 4GB model and $599 for the 8GB model with a two-year contract), the iPhone was met with enormous enthusiasm. People lined up for days outside Apple Stores to purchase it when it was released on June 29, 2007.\n\nThe iPhone\'s introduction marked a paradigm shift in mobile technology, moving away from physical keyboards and styluses toward multi-touch interfaces. It fundamentally changed how people interact with technology and set the standard for smartphones that continues to this day.',
      },
    ],
  },
]

