import React from "react";
import "./post.css";
import { useParams, Link } from "react-router-dom";
import { FaLink } from "react-icons/fa";

// Custom arrow component to match the reference site style
const CustomArrow = () => (
  <svg 
    width="18px" 
    height="18px" 
    stroke-width="1.5" 
    viewBox="0 0 24 24" 
    fill="none" 
    color="currentColor"
  >
    <path d="M10.25 4.75l-3.5 3.5 3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    <path d="M6.75 8.25h6a4 4 0 014 4v7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>
);

const postData = {
  "penetration-testing": {
    title: "Penetration Testing",
    date: "February 2024",
    content: [
      "This project involved conducting a basic penetration test in a controlled environment to identify vulnerabilities, ethically exploit them, and document findings. The goal was to practice using tools like Kali Linux, Nmap, and Metasploit while following industry best practices.",
      "",
      "## Step-by-Step Process",
      "",
      "### Step 1: Setting Up the Environment",
      "",
      "**Objective:** Create a safe lab for penetration testing without risking real-world systems.",
      "",
      "**Actions:**",
      "",
      "1. Installed VirtualBox to host virtual machines.",
      "2. Downloaded and set up Kali Linux as the attacker machine & a vulnerable VM, such as Metasploitable2 or a target from Hack The Box or TryHackMe.",
      "3. Configured both VMs to operate on an internal network to isolate traffic and ensure no external interference.",
      "4. Verified connectivity between the machines using the ping command:",
      "",
      "```bash",
      "ping [IP Address]",
      "```",
      "",
      "### Step 2: Initial Reconnaissance",
      "",
      "**Objective:** Gather basic information about the target system and its network presence.",
      "",
      "**Actions:**",
      "",
      "1. Used Nmap to perform network discovery and port scanning.",
      "2. Identified open ports and running services.",
      "3. Documented findings for further analysis.",
      "",
      "### Step 3: Vulnerability Assessment",
      "",
      "**Objective:** Identify potential security weaknesses in the target system.",
      "",
      "**Actions:**",
      "",
      "1. Conducted detailed service enumeration.",
      "2. Researched known vulnerabilities for identified services.",
      "3. Prioritized findings based on severity and exploitability.",
      "",
      "### Step 4: Exploitation",
      "",
      "**Objective:** Demonstrate the impact of identified vulnerabilities through controlled exploitation.",
      "",
      "**Actions:**",
      "",
      "1. Attempted to exploit identified vulnerabilities using Metasploit.",
      "2. Documented successful exploitation methods.",
      "3. Maintained detailed logs of all activities.",
      "",
      "### Step 5: Post-Exploitation",
      "",
      "**Objective:** Assess the extent of access gained and potential data exposure.",
      "",
      "**Actions:**",
      "",
      "1. Explored the compromised system to understand the level of access.",
      "2. Identified sensitive data and potential privilege escalation opportunities.",
      "3. Documented findings for remediation recommendations.",
      "",
      "### Step 6: Reporting",
      "",
      "**Objective:** Provide comprehensive documentation of findings and recommendations.",
      "",
      "**Actions:**",
      "",
      "1. Compiled detailed report of all findings.",
      "2. Provided clear remediation recommendations.",
      "3. Included evidence and proof-of-concept demonstrations.",
      "",
      "## Key Learnings",
      "",
      "This project reinforced the importance of systematic approach in penetration testing, from initial reconnaissance to final reporting. It highlighted the value of proper documentation and the ethical considerations involved in security testing.",
      "",
      "The hands-on experience with tools like **Kali Linux**, **Nmap**, and **Metasploit** provided practical understanding of their capabilities and limitations in real-world scenarios."
    ],
    images: [
      {
        src: "/public/work/penetration-testing.jpg",
        alt: "Penetration Testing Lab Setup"
      }
    ]
  },
  "advent-of-cyber-24": {
    title: "Advent of Cyber '24",
    date: "December 2024",
         content: [
       "Each December, TryHackMe hosts Advent of Cyber, a cybersecurity event that helps beginners and seasoned professionals sharpen their skills through daily challenges. In 2024, alongside the main event, a Side Quest was introduced — a parallel track made for those seeking more advanced, technical problems. Naturally, I took the challenge.",
       "",
       "Unlike the regular daily rooms focused on introducing core security concepts, the Side Quest was designed to push participants to the edge — featuring harder and even \"insane\"-rated tasks that required creative thinking, persistence, and solid technical foundations. For me, this was a perfect opportunity to document my problem-solving approach, showcase my methodology, and reinforce my skills in web exploitation, reverse engineering, OSINT, and more.",
       "",
       "This write-up walks through how I approached each challenge in the Side Quest, focusing on the thought process rather than the answers — because in cybersecurity, how you think is just as important as what you know.",
       "",
               "![Advent of Cyber '24](/work/articles/advent24/advent24.jpg)",
        "",
               "## What is the Side Quest?",
       "",
       "The Advent of Cyber 2024 Side Quest is a collection of five standalone challenges released alongside the main event. Unlike the daily beginner-friendly tasks, these are tougher, longer, and require a broader set of skills. Each task is independent, allowing participants to tackle them in any order.",
       "",
       "The difficulty ranges from Hard to Insane, and the topics span from reverse engineering and OSINT to advanced web exploitation and forensic analysis. This makes the Side Quest ideal for those who already have a solid foundation and want to test their capabilities in real-world-like scenarios.",
       "",
              "From analyzing strange binaries and chasing hidden artifacts to digging deep into misconfigured web apps, the Side Quest felt less like a tutorial and more like a realistic penetration test or blue team investigation. The challenges are thoughtfully crafted to reward creativity, persistence, and critical thinking — all of which I aimed to document throughout this write-up.",
       "",
              "### Methodology Used",
       "",
       "To tackle the Side Quest, I approached each task as if it were part of a real-world engagement — starting with reconnaissance, then moving into analysis, exploitation, and validation. Since the challenges were diverse, I relied on a flexible set of tools and workflows depending on the nature of each problem.",
       "",
               "Here are some of the key tools and techniques I used:",
        "",
                "• Recon & OSINT:",
        "Google Dorking, WHOIS lookups, and DNS analysis using nslookup, dig, and online tools like crt.sh.",
        "",
        "• Reverse Engineering & Binary Analysis:",
        "Ghidra, cutter, strings, and manual static analysis. Dynamic behavior was tested via sandboxing and debugging.",
        "",
        "• Web Exploitation:",
        "Burp Suite, browser dev tools, manual payload crafting, cookie and session manipulation, and logic flaw testing.",
        "",
        "• Scripting & Automation:",
        "Bash and Python scripts to parse files, decode obfuscated data, or automate repetitive tasks.",
        "",
        "• Log & Memory Analysis:",
       "Basic forensic analysis with tools like grep, binwalk, volatility, and analyzing pcap or image dumps.",
       "",
               "Throughout each challenge, I documented my process carefully — not only to ensure reproducibility but also to reflect on the techniques used, what worked, and what could be improved. The following sections break down each task, focusing on the reasoning that led to the solution.",
        "",
        "![Advent of Cyber Challenge](/work/articles/advent24/adventch.jpg)",
      "",
                           "## Task 1 – Operation Tiny Frostbite (Hard)",
        "",
        "This first Side Quest challenge introduced a miniature Linux binary — deceptively small in size but packed with complexity. At first glance, it looked harmless, but diving deeper revealed subtle behaviors that hinted at obfuscation and intentional misdirection.",
        "",
                 "I began by inspecting the file with basic static analysis tools like file, strings, and ltrace to gather quick intel. Unsurprisingly, the output was limited, so I turned to Ghidra for deeper insight. Within the decompiled code, I noticed fragmented logic and string construction techniques that weren't obvious at first sight. The binary appeared to piece together commands or flags in memory, requiring a bit of reverse engineering and educated guesswork.",
         "",
         "",
         "Once I understood the logic behind how the binary operated — particularly how it handled inputs and validation — I used controlled inputs to trigger different code paths. Dynamic analysis helped confirm my understanding, and eventually, I was able to reconstruct the expected behavior.",
        "",
                 "This challenge reinforced the importance of reading beyond the surface and thinking like a developer who's trying to hide something. It was a solid warm-up for what was to come in the more intense challenges ahead.",
         "",
         "## Task 2 – Yin and Yang (Hard)",
         "",
         "This challenge stood out immediately due to its unique structure: it presented two seemingly opposite but interconnected components — a classic \"black-and-white\" theme, both visually and technically. At its core, it was a cleverly disguised OSINT investigation mixed with subtle web exploitation elements.",
         "",
         "The first step was recognizing that both parts of the puzzle — \"Yin\" and \"Yang\" — were providing partial clues. Alone, each side made little sense, but combined, they revealed a bigger picture. I started by collecting all visible and hidden information from the provided URLs and files, using browser dev tools and digging into HTTP headers, cookies, and encoded content.",
         "",
         "A big part of this challenge relied on following non-obvious trails, including decoding strange-looking text and tracing usernames or identifiers across platforms. Tools like base64, URL decoders, and search engines were essential here. Some clues were buried in page metadata, while others required understanding how frontend components interacted behind the scenes.",
         "",
         "What made this task especially interesting was how it rewarded curiosity and persistence — checking a directory here, revisiting a hint there — until all the pieces aligned. Once I combined the two sides correctly, the final answer revealed itself through pattern recognition and correlation, not brute force.",
         "",
         "It was a well-designed reminder that in cybersecurity, information rarely exists in isolation. Context is key.",
         "",
         "## Task 3 – Escaping the Blizzard (Insane)",
         "",
         "This challenge raised the difficulty significantly. From the start, Escaping the Blizzard felt like being dropped into a chaotic environment without a map — just scattered clues buried in raw data. The task revolved around analyzing memory dumps, simulating a real-world incident response situation.",
         "",
         "My first move was to get oriented: identifying the type of dump and the operating system it came from. Once confirmed, I loaded the image into Volatility, using plugins like pslist, cmdline, and filescan to build a timeline of what happened on the compromised system.",
         "",
         "Suspicious processes, strange command-line arguments, and leftover artifacts gave me breadcrumbs to follow. This wasn't just about running plugins — it required interpreting what those plugins revealed and correlating them. For example, why was a certain process active when it shouldn't have been? Was there network activity? Could I retrieve loaded modules or strings from memory?",
         "",
         "Eventually, carving out sections of memory led me to encrypted or encoded content. At this point, scripting came in handy to automate decoding and pattern matching, since manual inspection would've taken far too long.",
         "",
         "This task tested my ability to think like a forensic analyst under pressure: triaging systems, identifying indicators of compromise, and piecing together the narrative. Challenging, but very rewarding.",
         "",
         "## Task 4 – Krampus Festival (Insane)",
         "",
         "This challenge combined web exploitation with a strong dose of misdirection. At first glance, it looked like a festive static website, but underneath was a cleverly disguised logic flaw waiting to be uncovered.",
         "",
         "I began with standard recon: viewing the source code, crawling hidden directories, and inspecting JavaScript files. One file, in particular, hinted at client-side validation routines that could be bypassed. That led me to test various payloads and edge cases through Burp Suite, paying special attention to cookies, hidden parameters, and request flows.",
         "",
         "The turning point came when I realized the site was relying on client trust for sensitive logic. That opened the door for tampering — not through injection, but through subtle manipulations that tricked the backend into exposing restricted content.",
         "",
         "There was also a fun twist involving hidden flags behind authentication flows, but nothing was straightforward. Every clue seemed to lead to a dead end — until I stepped back and reframed the problem from a user logic perspective instead of a purely technical one.",
         "",
         "This challenge was a great reminder that vulnerabilities aren't always technical flaws — sometimes, it's about how developers implement logic or assume certain behaviors. It emphasized the value of patience, creativity, and testing what happens if…",
         "",
         "## Task 5 – An Avalanche of Web Apps (Insane)",
         "",
         "This final challenge felt like a culmination of everything learned throughout the Side Quest. It dropped me into a complex environment made up of multiple interconnected web applications, each with its own quirks — vulnerable components, misconfigurations, and fragmented clues spread across services.",
         "",
         "My initial approach was to map the entire environment. I manually enumerated routes, tested authentication points, and reviewed how different apps shared sessions or tokens. The setup mimicked a microservice architecture, so part of the challenge was figuring out how they communicated and where the trust boundaries were weak.",
         "",
         "I discovered a couple of input validation weaknesses, but exploiting them required chaining multiple steps across services — for example, gaining access in one app to pivot into another. It wasn't about a single exploit, but abuse of flow and trust relationships between apps.",
         "",
                   "Throughout the process, I made heavy use of:",
          "",
          "• Burp Suite for intercepting and replaying requests.",
          "",
          "• Custom scripts to automate enumeration and data extraction.",
          "",
          "• Browser dev tools to analyze frontend logic that could be manipulated.",
         "",
                   "The real lesson here was understanding systemic flaws, not just individual bugs. When services are loosely coupled but blindly trust each other, even small issues can snowball into full compromise — just like an avalanche.",
          "",
          "## Final Thoughts and Lessons Learned",
          "",
          "Completing the Advent of Cyber 2024 Side Quest was one of the most rewarding technical experiences I've had. Each challenge pushed me to apply a different set of skills — from reverse engineering and memory forensics to web exploitation and logic analysis — all under a single, well-crafted event.",
          "",
          "More than just solving puzzles, this Side Quest tested how I think under pressure, how I break down unfamiliar problems, and how I pivot when an initial approach doesn't work. It reinforced two key ideas:",
          "",
          "• Process matters as much as the outcome — documenting steps, forming hypotheses, testing, and iterating is what leads to sustainable problem-solving.",
          "",
          "• Security is interdisciplinary — real-world challenges rarely fit into a single category. The best solutions came from combining multiple techniques and perspectives.",
          "",
                     "This write-up is not just a walkthrough — it's a snapshot of how I tackle complex security problems. I look forward to using these experiences to continue growing in my cybersecurity career and applying this mindset in real-world environments.",
           "",
           "![Advent of Cyber End](/work/articles/advent24/adventend.jpg)",
           "",
           "Written by Franco Sbaffi, No Artificial Intelligence was used in the creation or writing of this project.",
           "",
           
      ],
     images: [
       {
         src: "/work/articles/advent24/advent24.jpg",
         alt: "Advent of Cyber '24"
       }
     ]
   },
  "log-file-analyzer": {
    title: "Log File Analyzer",
    date: "December 2024",
    content: [
      "Development of an automated log analysis system for security monitoring and threat detection.",
      "",
      "## Project Scope",
      "",
      "This project involved creating a comprehensive log analysis tool capable of processing multiple log formats and identifying potential security threats in real-time.",
      "",
      "### Technical Implementation",
      "",
      "1. **Log Parsing:** Implemented parsers for various log formats (Syslog, Windows Event Logs, Apache, etc.).",
      "2. **Pattern Recognition:** Developed algorithms to identify suspicious patterns and anomalies.",
      "3. **Alert System:** Created automated alerting mechanisms for immediate threat notification.",
      "4. **Dashboard:** Built a web-based dashboard for real-time monitoring and analysis.",
      "",
      "### Key Features",
      "",
      "- Real-time log processing and analysis",
      "- Customizable alert rules and thresholds",
      "- Historical data analysis and trending",
      "- Integration with existing security tools",
      "- Automated report generation",
      "",
      "## Results",
      "",
      "The system successfully reduced manual log review time by **85%** and improved threat detection accuracy by **40%** compared to traditional manual methods."
    ],
    images: []
  },
  "pentesting": {
    title: "Windows Server Administration",
    date: "February 2024",
    content: [
      "Comprehensive guide to Windows Server administration with focus on security best practices and system optimization.",
      "",
      "## Overview",
      "",
      "This project covered essential Windows Server administration tasks including user management, security configuration, and performance optimization.",
      "",
      "### Key Areas Covered",
      "",
      "1. **User and Group Management:** Implementing proper access controls and permissions.",
      "2. **Security Hardening:** Configuring Windows Firewall, implementing password policies, and enabling auditing.",
      "3. **System Monitoring:** Setting up performance monitoring and alerting systems.",
      "4. **Backup and Recovery:** Implementing comprehensive backup strategies and disaster recovery procedures.",
      "",
      "## Technical Implementation",
      "",
      "The project involved hands-on configuration of Windows Server environments, documenting step-by-step procedures and best practices for enterprise deployment.",
      "",
      "### Security Measures",
      "",
      "- Implemented **Group Policy Objects** for centralized security management",
      "- Configured **Windows Defender** and **Advanced Threat Protection**",
      "- Set up **Event Log monitoring** and **SIEM integration**",
      "- Established **patch management** procedures",
      "",
      "## Results",
      "",
      "Successfully implemented a secure and optimized Windows Server environment following industry best practices and compliance requirements."
    ],
    images: []
  },
  "network-security": {
    title: "Network Security Analysis",
    date: "March 2024",
    content: [
      "A comprehensive analysis of network security protocols and implementation strategies.",
      "",
      "## Overview",
      "",
      "This project focused on analyzing various network security measures and their effectiveness in protecting against common threats.",
      "",
      "### Key Findings",
      "",
      "1. **Firewall Configuration:** Proper firewall rules are essential for network protection.",
      "2. **Intrusion Detection:** Real-time monitoring helps identify potential threats.",
      "3. **Access Control:** Implementing least privilege principles reduces attack surface.",
      "",
      "## Implementation",
      "",
      "The analysis included practical testing of security measures in a controlled environment, documenting both successful implementations and areas for improvement."
    ],
    images: []
  }
};

const Post = () => {
  const { id } = useParams();
  const post = postData[id];

  // Generate table of contents dynamically from post content
  const generateTableOfContents = (content) => {
    const toc = [];
    content.forEach((item, index) => {
      if (typeof item === 'string') {
        if (item.startsWith('## ')) {
          toc.push({
            id: `section-${index}`,
            title: item.substring(3),
            level: 2
          });
        } else if (item.startsWith('### ')) {
          toc.push({
            id: `section-${index}`,
            title: item.substring(4),
            level: 3
          });
        }
      }
    });
    return toc;
  };

  const tableOfContents = post ? generateTableOfContents(post.content) : [];

  const handleTableOfContentsClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = post.title;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        fallbackShare(url, title);
      }
    } else {
      fallbackShare(url, title);
    }
  };

  const fallbackShare = (url, title) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        alert('¡Enlace copiado al portapapeles!');
      }).catch(() => {
        prompt('Copia este enlace:', url);
      });
    } else {
      prompt('Copia este enlace:', url);
    }
  };

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="page-post">
      {/* Left Sidebar */}
      <aside className="post-sidebar">
        <div className="sidebar-content">
          <Link to="/work" className="sidebar-back">
            <CustomArrow />
            <span>Back</span>
          </Link>
          
                     <nav className="sidebar-nav">
             <ul>
               {tableOfContents.map((item, index) => (
                 <li key={index} className={`toc-item toc-level-${item.level}`}>
                   <a 
                     href={`#${item.id}`}
                     onClick={(e) => handleTableOfContentsClick(e, item.id)}
                   >
                     {item.title}
                   </a>
                 </li>
               ))}
             </ul>
           </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="post-main">
        <header className="post-header">
          <Link to="/work" className="sidebar-back responsive-back">
            <CustomArrow />
            <span>Back</span>
          </Link>
          <div>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-date">{post.date}</p>
          </div>
          <div className="post-link" onClick={handleShare}>
            <FaLink size="14px" style={{ color: "hsl(0 0% 60%)" }} />
          </div>
        </header>

                 <div className="post-content">
           {post.content.map((paragraph, index) => {
             if (typeof paragraph === 'string') {
               if (paragraph.startsWith('## ')) {
                 return <h2 key={index} id={`section-${index}`}>{paragraph.substring(3)}</h2>;
               } else if (paragraph.startsWith('### ')) {
                 return <h3 key={index} id={`section-${index}`}>{paragraph.substring(4)}</h3>;
                               } else if ((paragraph.startsWith('• ') || paragraph.startsWith('* ')) && paragraph.endsWith(':')) {
                  // Remover el bullet point y mostrar solo el título
                  const title = paragraph.substring(2); // Remover "• " o "* "
                  return <strong key={index} style={{ color: 'white' }}>{title}</strong>;
                                 } else if (paragraph === 'Google Dorking, WHOIS lookups, and DNS analysis using nslookup, dig, and online tools like crt.sh.' ||
                            paragraph === 'Ghidra, cutter, strings, and manual static analysis. Dynamic behavior was tested via sandboxing and debugging.' ||
                            paragraph === 'Burp Suite, browser dev tools, manual payload crafting, cookie and session manipulation, and logic flaw testing.' ||
                            paragraph === 'Bash and Python scripts to parse files, decode obfuscated data, or automate repetitive tasks.' ||
                            paragraph === 'Basic forensic analysis with tools like grep, binwalk, volatility, and analyzing pcap or image dumps.') {
                   // Aplicar subrayado a herramientas técnicas específicas y agregar margen superior
                   const tools = ['nslookup', 'dig', 'Ghidra', 'cutter', 'strings', 'grep', 'binwalk', 'volatility', 'file', 'ltrace', 'base64', 'Burp Suite'];
                  let processedText = paragraph;
                  
                  tools.forEach(tool => {
                    const regex = new RegExp(`\\b${tool}\\b`, 'gi');
                    processedText = processedText.replace(regex, `<span style="text-decoration: underline; text-decoration-color: #a3ea26; text-decoration-thickness: 2px;">${tool}</span>`);
                  });
                  
                  return <span key={index} style={{ marginTop: '0.5rem', display: 'block' }} dangerouslySetInnerHTML={{ __html: processedText }} />;
                                                  } else if (paragraph.includes('nslookup') || paragraph.includes('dig') || paragraph.includes('Ghidra') || paragraph.includes('cutter') || paragraph.includes('strings') || paragraph.includes('grep') || paragraph.includes('binwalk') || paragraph.includes('volatility') || paragraph.includes('file') || paragraph.includes('ltrace') || paragraph.includes('base64') || paragraph.includes('Burp Suite')) {
                   // Aplicar subrayado a herramientas técnicas específicas
                   const tools = ['nslookup', 'dig', 'Ghidra', 'cutter', 'strings', 'grep', 'binwalk', 'volatility', 'file', 'ltrace', 'base64', 'Burp Suite'];
                   let processedText = paragraph;
                   
                   tools.forEach(tool => {
                     const regex = new RegExp(`\\b${tool}\\b`, 'gi');
                     processedText = processedText.replace(regex, `<span style="text-decoration: underline; text-decoration-color: #a3ea26; text-decoration-thickness: 2px;">${tool}</span>`);
                   });
                   
                   return <p key={index} dangerouslySetInnerHTML={{ __html: processedText }} />;
                } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return <strong key={index}>{paragraph.substring(2, paragraph.length - 2)}</strong>;
               } else if (paragraph.startsWith('```')) {
                 return null; // Handle code blocks separately
                               } else if (paragraph === null) {
                  return null; // Elemento ya procesado
                } else if (paragraph === '') {
                  return <br key={index} />;
                               } else if (paragraph === '• Burp Suite for intercepting and replaying requests.' ||
                           paragraph === '• Custom scripts to automate enumeration and data extraction.' ||
                           paragraph === '• Browser dev tools to analyze frontend logic that could be manipulated.') {
                  // Aplicar subrayado a herramientas técnicas específicas en la lista de Task 5
                  const text = paragraph.substring(2); // Remover el "• " del texto
                  const tools = ['Burp Suite'];
                  let processedText = text;
                  
                  tools.forEach(tool => {
                    const regex = new RegExp(`\\b${tool}\\b`, 'gi');
                    processedText = processedText.replace(regex, `<span style="text-decoration: underline; text-decoration-color: #a3ea26; text-decoration-thickness: 2px;">${tool}</span>`);
                  });
                  
                  return <li key={index} style={{ listStyle: 'none' }}>
                    <span style={{ color: '#a3ea26 !important', marginRight: '8px' }}>•</span>
                    <span dangerouslySetInnerHTML={{ __html: processedText }} />
                  </li>;
                } else if (paragraph === '• Process matters as much as the outcome — documenting steps, forming hypotheses, testing, and iterating is what leads to sustainable problem-solving.' ||
                           paragraph === '• Security is interdisciplinary — real-world challenges rarely fit into a single category. The best solutions came from combining multiple techniques and perspectives.') {
                  // Bullet points verdes para las lecciones aprendidas
                  const text = paragraph.substring(2); // Remover el "• " del texto
                  return <li key={index} style={{ listStyle: 'none' }}>
                    <span style={{ color: '#a3ea26 !important', marginRight: '8px' }}>•</span>
                    <span>{text}</span>
                  </li>;
                } else if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('4. ')) {
                  // Buscar si hay más elementos numerados consecutivos
                  const listItems = [];
                  let i = index;
                  while (i < post.content.length && typeof post.content[i] === 'string' && 
                         (post.content[i].startsWith('1. ') || post.content[i].startsWith('2. ') || 
                          post.content[i].startsWith('3. ') || post.content[i].startsWith('4. ') ||
                          post.content[i].startsWith('5. ') || post.content[i].startsWith('6. '))) {
                    listItems.push(post.content[i].substring(post.content[i].indexOf(' ') + 1));
                    i++;
                  }
                  
                  // Si encontramos elementos de lista, renderizar la lista completa
                  if (listItems.length > 0) {
                    // Saltar los índices que ya procesamos
                    for (let j = 1; j < listItems.length; j++) {
                      post.content[index + j] = null; // Marcar como procesado
                    }
                    
                    return (
                      <ol key={index}>
                        {listItems.map((item, listIndex) => (
                          <li key={listIndex}>{item}</li>
                        ))}
                      </ol>
                    );
                  }
                  
                  return <li key={index}>{paragraph.substring(paragraph.indexOf(' ') + 1)}</li>;
                               
                } else if (paragraph.startsWith('![')) {
                  // Handle markdown images
                  const match = paragraph.match(/!\[([^\]]*)\]\(([^)]+)\)/);
                  if (match) {
                    const [, alt, src] = match;
                    return <img key={index} src={src} alt={alt} className="post-img" />;
                  }
                  return <p key={index}>{paragraph}</p>;
               } else {
                 return <p key={index}>{paragraph}</p>;
               }
             } else {
               return <React.Fragment key={index}>{paragraph}</React.Fragment>;
             }
           })}
         </div>

        <div className="white-space"></div>
      </main>
    </div>
  );
};

export default Post;

