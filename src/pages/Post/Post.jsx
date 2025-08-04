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
    date: "February 2025",
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
        src: "/work/penetration-testing.jpg",
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
  "junior-security-analyst": {
    title: "Junior Security Analyst",
    date: "December 2024",
    content: [
       "This write-up reflects my experience completing the \"Tropic Trooper\" room on TryHackMe — an interactive simulation designed to showcase the responsibilities, tools, and mindset required to succeed in an entry-level cybersecurity role. Rather than focusing on technical flags, this article highlights how I approached each scenario, what I learned about working in a SOC environment, and how this training supports my path into cybersecurity.",
       "",
       "![Tropic Trooper Investigation](/work/articles/trooper/trooper1.jpg)",
      "",
             "## Introduction: Stepping into the SOC",
       "",
       "The Junior Security Analyst Intro room puts you in the shoes of an entry-level analyst working in a Security Operations Center (SOC). From the start, the goal is clear: experience a real-world shift — receiving alerts, reviewing logs, and responding to potential threats — just like you would in an actual job.",
       "",
       "This lab doesn't throw overly technical puzzles at you. Instead, it emphasizes something even more important: contextual thinking. It teaches you how to process alerts, analyze patterns, and make decisions based on incomplete data — all while using common tools like SIEM platforms, ticketing systems, and log viewers.",
       "",
       "For me, this was an eye-opening experience. It helped connect the dots between theory and practice, showing how foundational knowledge is applied in day-to-day security operations. The tasks were simple, but the concepts behind them — triaging alerts, understanding log sources, recognizing indicators of compromise — are exactly what makes the difference in a real SOC environment.",
       "",
             "## Understanding the Role: What Does a Junior Security Analyst Do?",
       "",
       "A Junior Security Analyst is often the first line of defense in a security team. Their main responsibility is to monitor and respond to alerts — filtering out false positives, identifying real threats, and escalating when necessary. While they may not perform advanced forensics or incident response at this stage, their work is crucial in maintaining visibility and ensuring timely reactions.",
       "",
       "This role requires a blend of technical awareness and analytical thinking. You don't need to know every exploit in detail, but you do need to spot anomalies, recognize suspicious patterns, and follow procedures for investigation.",
       "",
       "The TryHackMe lab simulates this by assigning a variety of tasks you'd typically find in an actual SOC shift, such as:",
       "",
       "• Reviewing alerts from SIEM tools.",
       "• Analyzing logs from endpoints and firewalls.",
       "• Correlating evidence across multiple sources.",
       "• Deciding whether to escalate, dismiss, or investigate further.",
       "",
       "What stood out to me was how even simple alerts required a methodical, evidence-based approach. Rather than jumping to conclusions, it was about asking the right questions: Is this normal behavior? Has this IP appeared before? Does this process make sense on this host?",
       "",
       "The experience helped me better understand the junior analyst's critical role in maintaining the integrity of the monitoring process and acting as a filter between noise and real threats.",
       "",
             "## The SOC Environment: People, Processes, and Tools",
       "",
       "Working in a Security Operations Center (SOC) isn't just about tech — it's about collaboration, structure, and accountability. This part of the lab did a great job simulating that environment, giving insight into how SOCs operate in the real world.",
       "",
       "You're not working in isolation. A SOC typically includes multiple tiers of analysts (Level 1, 2, 3), incident responders, and sometimes even threat hunters. As a Junior Analyst, you're the first responder, but everything you do contributes to the bigger picture.",
       "",
       "The lab emphasized:",
       "",
       "• Ticketing workflows, where each alert is documented, categorized, and handled according to severity.",
       "• The use of SIEM tools to collect and analyze logs from various sources — firewalls, endpoint protection tools, servers, and more.",
       "• Importance of standard operating procedures (SOPs) and runbooks to guide decisions and escalation.",
       "",
       "One thing that stood out to me is how much of the work depends on precision and consistency. Even if a task seems repetitive, the accuracy of your log review, tagging, and documentation impacts how quickly the rest of the team can act.",
       "",
       "This simulation made it clear: technical skills matter, but understanding the flow of information and knowing how to work within the SOC structure is just as important.",
      "",
             "## Hands-on Simulation: A Day in the Life",
       "",
       "This was the core of the lab — stepping through a simulated workday as a Junior Security Analyst. Rather than isolated tasks, the room guided me through a narrative flow: receiving alerts, investigating suspicious activity, and making decisions based on the evidence.",
       "",
       "The day started with a typical SIEM alert, pointing to potentially malicious behavior. From there, I followed the breadcrumbs: analyzing logs, reviewing timestamps, checking IP addresses, and examining command-line activity. Each alert was a chance to practice triaging — is this a false positive, or is it something to escalate?",
       "",
       "Some situations required correlation across multiple data sources, like linking a suspicious login attempt to a strange process execution on an endpoint. It wasn't about exploiting a vulnerability; it was about interpreting events and identifying what's normal versus what's not.",
       "",
       "What I appreciated most was the realism:",
       "",
       "• Having to check log integrity.",
       "• Making judgment calls under time constraints.",
       "• Writing brief justifications for why an alert should be escalated or closed.",
       "",
       "This exercise simulated the mental workflow of an analyst, which often involves dealing with partial information and prioritizing what matters most. It gave me practical insight into the kinds of decisions I'd be expected to make on the job — and the importance of clear documentation in a SOC environment.",
      "",
             "## Key Skills and Takeaways",
       "",
       "While the lab was short, it covered a surprising number of essential skills that every aspiring Security Analyst should master. It wasn't about exploiting systems — it was about detecting, analyzing, and responding to potential threats in a structured, responsible way.",
       "",
       "Here are the main takeaways I got from the experience:",
       "",
       "• Log Analysis is foundational: Knowing how to read and interpret logs from different systems (endpoints, firewalls, authentication services) is at the heart of threat detection.",
       "",
       "• Critical thinking beats tool mastery: The most valuable moments came from asking the right questions — not from knowing a specific tool, but from understanding what to look for.",
       "",
       "• Documentation matters: Writing clear notes on your findings, reasoning, and decisions is crucial for communication within the SOC and future investigations.",
       "",
       "• Not everything is an attack: Learning to spot false positives and reduce noise is just as important as catching real threats.",
       "",
       "• Confidence in escalation: Knowing when to escalate — and being able to justify it — is part of what makes an analyst effective and trustworthy.",
       "",
       "This room reaffirmed that cybersecurity isn't just about technical depth — it's about mindset, process, and consistency.",
      "",
             "## Final Thoughts: Preparing for the Real World",
       "",
       "The \"Junior Security Analyst Intro\" room isn't flashy — there are no reverse shells, no complex exploits, no CTF-style flags. But that's exactly why it's valuable. It mirrors the real work of entry-level analysts, where success comes from consistency, attention to detail, and strong decision-making under uncertainty.",
       "",
       "This simulation helped me internalize what it really means to work in a SOC. It reinforced that tools and alerts are only as useful as the analyst interpreting them — and that being effective means knowing when to dig deeper, when to escalate, and when to trust the process.",
       "",
       "As I continue preparing for a career in cybersecurity, this room gave me a solid foundation for what to expect in a junior role. It's not about having all the answers — it's about staying curious, being methodical, and learning from every case."
    ],
    images: []
  },
           "borderlands": {
      title: "Borderlands",
    date: "February 2025",
    content: [
        "The Borderlands room on TryHackMe is an advanced red-team simulation that challenges users to breach a segmented network, pivot across multiple systems, and extract sensitive information scattered across internal services. Designed by professionals at Context Information Security for the HackBack2 event, this lab reflects real-world scenarios where perimeter breaches evolve into full-blown compromises through persistence, privilege escalation, and lateral movement.",
        "",
                 "In this write-up, I'll walk through the techniques and tools I used to gain initial access, enumerate internal assets, pivot through the network, and collect key data without disclosing the exact flags. The focus is on process, decision-making, and methodology — not just answers. This room offered an excellent opportunity to practice post-exploitation strategies, custom enumeration, and multi-host exploitation under realistic constraints.",
        "",
                 "![Borderlands](/work/articles/borderlands/borderlands.jpg)",
        "",
                "## Introduction: Beyond the Border",
        "",
        "Borderlands sets the stage for a realistic post-compromise scenario. Unlike beginner rooms that focus on single-host exploitation, this challenge simulates a segmented infrastructure where breaching the first machine is only the beginning. Once inside, you're expected to map internal assets, chain exploits, and use tunneling techniques to move laterally — much like a real attacker would inside a corporate network.",
        "",
        "From the start, it was clear this room would require strong fundamentals in network pivoting, manual enumeration, and a good grasp of Linux and web exploitation. No pre-built tools or hand-holding — just raw logs, open ports, and your ability to analyze what's really going on. The structure reminded me of a red team assessment where every next step depends on fully understanding the one before.",
       "",
               "## Initial Recon and Entry Point",
        "",
        "The first step in Borderlands was traditional external reconnaissance. I began by scanning the exposed host using tools like nmap to enumerate open ports and detect running services. Right away, I identified a few common ports that hinted at a web service and potentially some custom API endpoints.",
        "",
        "Upon closer inspection of the web interface, I noticed subtle hints in the responses and URLs that suggested deeper functionality — perhaps an internal admin panel or API endpoints not listed publicly. A combination of directory fuzzing (ffuf) and manual browsing helped uncover hidden resources, leading to an exposed endpoint that returned structured data — a great candidate for injection or enumeration.",
        "",
        "Once I understood how the application processed input, I was able to craft specific requests that allowed me to extract sensitive information, such as API keys or user details. This became the foothold — a way to authenticate or interact with the backend and set the stage for deeper compromise.",
       "",
               "## Breaking In: Gaining a Foothold",
        "",
        "After identifying the vulnerable endpoint, the next step was to exploit it to gain initial access to the host. The application logic wasn't obviously broken, but subtle misconfigurations and exposed keys hinted at deeper flaws. By combining what I gathered during enumeration — particularly leaked credentials and overlooked input validation — I was able to interact with backend components in unintended ways.",
        "",
        "Eventually, I landed a shell on the perimeter host. It wasn't a full interactive shell at first, but through techniques like reverse shell execution or command injection via the web interface, I managed to upgrade it into a more stable environment using tools like python or socat.",
        "",
        "At this point, I had low-privileged access to the first system. The goal wasn't just exploitation — it was positioning. From here, I began preparing to enumerate internal routes, identify lateral movement opportunities, and establish persistence. Getting the initial foothold was just the beginning — the real challenge was about to start.",
       "",
               "## Enumeration and Credential Discovery",
        "",
        "With access to the first machine, I shifted my focus to internal enumeration. The environment was segmented, so the first objective was to understand the network topology. Running tools like ip a, netstat, and inspecting /etc/hosts gave me hints about other reachable services and machines not exposed externally.",
        "",
        "I also searched local configuration files, browsing common locations like .bash_history, .ssh, and application directories. This phase required a careful, manual approach — some credentials were stored in plain text, while others were embedded in service configs or environment variables.",
        "",
        "One useful trick was analyzing how internal scripts or services authenticated with one another. This led to API keys and SSH credentials that became crucial for the next pivot. At this stage, attention to small details — like leftover development files or verbose error logs — paid off significantly.",
        "",
        "The takeaway here was clear: privilege escalation often starts with patient local enumeration. The more context I gathered, the more pathways opened for lateral movement and access to new targets.",
       "",
               "## Pivoting: Reaching Deeper into the Network",
        "",
        "With internal credentials and basic network visibility in hand, it was time to pivot. Since the environment was segmented, direct access to internal machines wasn't possible — everything had to go through the compromised perimeter host.",
        "",
        "I set up SSH tunneling to forward local ports and access services that were otherwise unreachable. Tools like ssh -L and proxychains helped route my traffic through the initial host, effectively treating it as a bridge into the internal network.",
        "",
        "Once inside, I continued enumeration on the next reachable targets. Each hop revealed a bit more: internal web services, routers, and a flag transmission system. Pivoting required balancing stealth and persistence — setting up stable tunnels while maintaining shell access and avoiding breaking the chain.",
        "",
        "This phase really reinforced the concept of living off the land — using built-in tools, carefully chaining access, and treating each compromised machine as a stepping stone to the next.",
       "",
               "## Web Application Exploitation",
        "",
        "One of the internal pivots led me to a web application hosted deeper in the network. This service wasn't accessible from the outside and seemed to be part of an internal dashboard or management interface. Thanks to the previous tunnel, I could now interact with it as if I were inside the local network.",
        "",
        "The application itself appeared minimal, but as usual, the real value was beneath the surface. I began with manual exploration to understand its structure, then followed up with content discovery tools like gobuster to enumerate hidden paths. That revealed endpoints which weren't linked on the UI — likely used for API calls or administrative functions.",
        "",
        "Careful testing of input fields and headers eventually revealed a weakness that allowed command execution or code inclusion. Once exploited, I was able to interact with the underlying system, navigate the file structure, and retrieve an internal flag stored within the /var/www directory.",
        "",
        "This reinforced the importance of never trusting internal apps just because they're \"not public.\" Many of them lack basic hardening, and once you're inside the perimeter, they become easy targets.",
       "",
               "## Router Compromise and Root Access",
        "",
        "One of the most interesting targets in Borderlands was an internal router system. After pivoting into the deeper layers of the network, I discovered a device that acted as a gateway between different subnets. While most CTF-style rooms avoid dealing with networking hardware, this one leaned into it — and it paid off.",
        "",
        "Enumeration revealed that the router ran a lightweight Linux-based OS, exposing a limited set of services. With previously gathered credentials and some intelligent file inspection, I found a way to access the system — initially with limited privileges. From there, I checked for misconfigurations, running processes, and any custom scripts.",
        "",
        "Privilege escalation required a mix of manual analysis and a strong understanding of Linux internals. I didn't rely on automated tools like linpeas or les, as the environment was locked down. Instead, I used native commands and logical reasoning to identify a privilege escalation vector — eventually gaining access to /root/, where another key flag was stored.",
        "",
        "This stage pushed me to treat network infrastructure not as passive routing logic, but as a fully exploitable attack surface — a valuable lesson for real-world red teaming.",
       "",
               "## Flag Interception: TCP and UDP Forensics",
        "",
        "One of the final and most creative components of Borderlands involved intercepting flags transmitted across the network using custom TCP and UDP protocols. This wasn't just about scanning — it was about traffic analysis and packet capture.",
        "",
        "After identifying the flag_server and flag_client components within the network, I set up packet sniffing using tcpdump and tshark through my pivoted access. I captured traffic on specific ports and interfaces, carefully filtering for relevant payloads based on size, content, and timing.",
        "",
        "The UDP transmission was more straightforward, as the traffic was stateless and easier to capture. However, the TCP transmission required more effort — including reassembling the stream and decoding a custom protocol format. Once I reconstructed the data, I found a hidden flag embedded in the payload.",
        "",
        "This part of the challenge highlighted the importance of network forensics in offensive security. It required patience, scripting, and a deep understanding of how communication flows across internal systems — a fitting final step in an already complex engagement.",
       "",
               "## Key Lessons from Borderlands",
        "",
        "Borderlands was more than just a CTF challenge — it was a hands-on simulation of what real-world adversaries face when breaching and navigating segmented infrastructures. From initial foothold to internal pivoting, and from device exploitation to traffic interception, every stage demanded critical thinking, attention to detail, and layered problem-solving.",
        "",
        "Some of the key takeaways for me were:",
        "",
        "• Don't rush enumeration — thorough inspection of services and configs revealed most paths forward.",
        "",
        "• Pivoting is essential — the ability to route traffic and establish tunnels made deeper access possible.",
        "",
        "• Credentials hide in plain sight — and are often the keys to lateral movement.",
        "",
        "• Network traffic holds secrets — especially in custom protocols and segmented environments.",
        "",
        "• Think like an attacker, act like an analyst — balance offensive creativity with methodical investigation.",
        "",
        "This room was an excellent exercise in advanced red teaming techniques and a great addition to my portfolio to demonstrate how I approach real-world, multi-stage compromises."
    ],
    images: []
  },
  "network-security": {
    title: "Network Security Analysis",
    date: "March 2025",
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
              // Renderizar imágenes Markdown antes que cualquier otra condición
              if (paragraph.startsWith('![')) {
                const match = paragraph.match(/!\[([^\]]*)\]\(([^)]+)\)/);
                if (match) {
                  const [, alt, src] = match;
                  return <img key={index} src={src} alt={alt} className="post-img" />;
                }
                return <p key={index}>{paragraph}</p>;
              }
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
                   const tools = ['nslookup', 'dig', 'Ghidra', 'cutter', 'strings', 'grep', 'binwalk', 'volatility', 'file', 'ltrace', 'base64', 'Burp Suite', 'Junior Security Analyst Intro', 'HackBack2 event', 'nmap', 'ffuf', 'python', 'socat', 'ip a', 'netstat', '/etc/hosts', '.bash_history', '.ssh', 'ssh -L', 'proxychains', 'gobuster', '/var/www', 'linpeas', 'les', '/root/', 'tcpdump', 'tshark', 'flag_server', 'flag_client'];
                  let processedText = paragraph;
                  
                  tools.forEach(tool => {
                    const regex = new RegExp(`\\b${tool}\\b`, 'gi');
                    processedText = processedText.replace(regex, `<span style="text-decoration: underline; text-decoration-color: #a3ea26; text-decoration-thickness: 2px;">${tool}</span>`);
                  });
                  
                  return <span key={index} style={{ marginTop: '0.5rem', display: 'block' }} dangerouslySetInnerHTML={{ __html: processedText }} />;
                                                                     } else if (paragraph.includes('nslookup') || paragraph.includes('dig') || paragraph.includes('Ghidra') || paragraph.includes('cutter') || paragraph.includes('strings') || paragraph.includes('grep') || paragraph.includes('binwalk') || paragraph.includes('volatility') || paragraph.includes('file') || paragraph.includes('ltrace') || paragraph.includes('base64') || paragraph.includes('Burp Suite') || paragraph.includes('Junior Security Analyst Intro') || paragraph.includes('HackBack2 event') || paragraph.includes('nmap') || paragraph.includes('ffuf') || paragraph.includes('python') || paragraph.includes('socat') || paragraph.includes('ip a') || paragraph.includes('netstat') || paragraph.includes('/etc/hosts') || paragraph.includes('.bash_history') || paragraph.includes('.ssh') || paragraph.includes('ssh -L') || paragraph.includes('proxychains') || paragraph.includes('gobuster') || paragraph.includes('/var/www') || paragraph.includes('linpeas') || paragraph.includes('les') || paragraph.includes('/root/') || paragraph.includes('tcpdump') || paragraph.includes('tshark') || paragraph.includes('flag_server') || paragraph.includes('flag_client')) {
                   // Aplicar subrayado a herramientas técnicas específicas
                     const tools = ['nslookup', 'dig', 'Ghidra', 'cutter', 'strings', 'grep', 'binwalk', 'volatility', 'file', 'ltrace', 'base64', 'Burp Suite', 'Junior Security Analyst Intro', 'HackBack2 event', 'nmap', 'ffuf', 'python', 'socat', 'ip a', 'netstat', '/etc/hosts', '.bash_history', '.ssh', 'ssh -L', 'proxychains', 'gobuster', '/var/www', 'linpeas', 'les', '/root/', 'tcpdump', 'tshark', 'flag_server', 'flag_client'];
                   let processedText = paragraph;
                   
                   tools.forEach(tool => {
                     // Escapar caracteres especiales para las expresiones regulares
                     const escapedTool = tool.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                     const regex = new RegExp(`\\b${escapedTool}\\b`, 'gi');
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
                    // Escapar caracteres especiales para las expresiones regulares
                    const escapedTool = tool.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const regex = new RegExp(`\\b${escapedTool}\\b`, 'gi');
                    processedText = processedText.replace(regex, `<span style="text-decoration: underline; text-decoration-color: #a3ea26; text-decoration-thickness: 2px;">${tool}</span>`);
                  });
                  
                  return <li key={index} style={{ listStyle: 'none' }}>
                    <span style={{ color: '#a3ea26 !important', marginRight: '8px' }}>•</span>
                    <span dangerouslySetInnerHTML={{ __html: processedText }} />
                  </li>;
                } else if (paragraph === '• Process matters as much as the outcome — documenting steps, forming hypotheses, testing, and iterating is what leads to sustainable problem-solving.' ||
                              paragraph === '• Security is interdisciplinary — real-world challenges rarely fit into a single category. The best solutions came from combining multiple techniques and perspectives.' ||
                              paragraph === '• Reviewing alerts from SIEM tools.' ||
                              paragraph === '• Analyzing logs from endpoints and firewalls.' ||
                              paragraph === '• Correlating evidence across multiple sources.' ||
                              paragraph === '• Deciding whether to escalate, dismiss, or investigate further.' ||
                              paragraph === '• Ticketing workflows, where each alert is documented, categorized, and handled according to severity.' ||
                              paragraph === '• The use of SIEM tools to collect and analyze logs from various sources — firewalls, endpoint protection tools, servers, and more.' ||
                              paragraph === '• Importance of standard operating procedures (SOPs) and runbooks to guide decisions and escalation.' ||
                              paragraph === '• Having to check log integrity.' ||
                              paragraph === '• Making judgment calls under time constraints.' ||
                              paragraph === '• Writing brief justifications for why an alert should be escalated or closed.' ||
                              paragraph === '• Log Analysis is foundational: Knowing how to read and interpret logs from different systems (endpoints, firewalls, authentication services) is at the heart of threat detection.' ||
                              paragraph === '• Critical thinking beats tool mastery: The most valuable moments came from asking the right questions — not from knowing a specific tool, but from understanding what to look for.' ||
                              paragraph === '• Documentation matters: Writing clear notes on your findings, reasoning, and decisions is crucial for communication within the SOC and future investigations.' ||
                              paragraph === '• Not everything is an attack: Learning to spot false positives and reduce noise is just as important as catching real threats.' ||
                              paragraph === '• Confidence in escalation: Knowing when to escalate — and being able to justify it — is part of what makes an analyst effective and trustworthy.' ||
                              paragraph === '• Don\'t rush enumeration — thorough inspection of services and configs revealed most paths forward.' ||
                              paragraph === '• Pivoting is essential — the ability to route traffic and establish tunnels made deeper access possible.' ||
                              paragraph === '• Credentials hide in plain sight — and are often the keys to lateral movement.' ||
                              paragraph === '• Network traffic holds secrets — especially in custom protocols and segmented environments.' ||
                              paragraph === '• Think like an attacker, act like an analyst — balance offensive creativity with methodical investigation.') {
                    // Bullet points verdes para las lecciones aprendidas y elementos de lista importantes
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

