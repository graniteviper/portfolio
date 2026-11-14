import React, { useState, useEffect, useRef } from "react";
import type { JSX } from "react";

interface CommandOutput {
  command: string;
  output: string | JSX.Element;
}

const TerminalPortfolio: React.FC = () => {
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const ascii = `
    ██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗ 
    ██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
    ███████║███████║██║     █████╔╝ █████╗  ██████╔╝
    ██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
    ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
    ████████╗███████╗██████╗ ███    ███╗██║███╗   ██╗ █████╗ ██╗     
    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
       ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
       ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
       ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
       ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝`;

  const formatText = (text: string) => (
    <pre
      className="font-mono whitespace-pre-wrap text-md leading-tight"
      style={{
        color: "#00ff00",
        fontFamily: '"Courier New", Courier, monospace',
      }}
    >
      {text}
    </pre>
  );

  const commands: { [key: string]: () => string | JSX.Element } = {
    help: () =>
      formatText(`
AVAILABLE COMMANDS:
==================
about          - Display user information
skills         - List technical capabilities
projects       - Show project repository
experience     - Display work history
contact        - Show contact protocols
education      - Academic credentials
clear          - Clear terminal buffer
banner         - Display ASCII banner
whoami         - Current user info
neofetch       - System information
ls             - List directory contents
sudo           - Execute command as root
help           - Display this message`),

    about: () =>
      formatText(`
[INITIALIZING PROFILE...]
=========================

> Tanishq, 19
> Full-Stack Developer
> Systems & AI Engineer
> Open Source Builder

I craft performant, scalable systems and intelligent web apps.  
From low-level Rust backends to sleek Next.js frontends,  
I bridge performance with great developer experience.

My interests lie in:
→ Building production-grade apps with Rust, TypeScript & Next.js  
→ Architecting distributed systems and backend APIs  
→ Exploring ML pipelines & computer vision  
→ Advanced DSA, algorithms, and optimization techniques  

When I'm not coding, I'm usually:
→ Playing fifa
→ Experimenting with new frameworks  
→ Hitting the gym
→ Sharing projects and insights on X and Linked in

[PROFILE READY — SYSTEMS ONLINE]`),
    skills: () =>
      formatText(`
[INITIALIZING SKILL MATRIX...]
==============================
┌───────────────────────────────┐
│       SKILL MATRIX 0xC0FFEE   │
└───────────────────────────────┘

LANGUAGES:
├── TypeScript   ██████████████ 100%
├── Rust         ████████████   90%
├── Python       ███████████    85%
├── C / C++      ███████        60%
└── SQL / PLPGSQL█████████      82%

BACKEND / FRAMEWORKS:
├── Node.js / Express       ███████████ 95%
├── Actix / Rocket (Rust)   ██████████   88%
├── Next.js (server-side)   █████████    85%
├── FastAPI / Django        ████████     78%
└── gRPC / REST APIs        █████████    82%

DATABASES & STORAGE:
├── PostgreSQL     █████████████ 95%
├── Redis (caching)███████████   88%
├── MongoDB        ████████      75%
├── Timescale / OLAP ███████     70%
└── S3 / Object Storage ███████  78%

CLOUD / INFRA & CI:
├── Docker / Compose       ███████████ 92%
├── Kubernetes             █████████    82%
├── Terraform / IaaC       ████████     78%
├── CI/CD (GitHub Actions) █████████    88%
└── Cloud (AWS/GCP)        ████████     76%

SYSTEMS / OBSERVABILITY:
├── Linux / Sysadmin       ███████████ 90%
├── Logging / Prometheus / Grafana ███████ 75%
├── Networking (tcpdump, netcat) ███████ 70%

ALGORITHMS & COMPETITIVE:
├── Advanced DSA / CP      ███████████ 90%
├── Problem Solving / Optimizations ████████ 85%

TOOLS & WORKFLOW:
├── Git / GitHub           ███████████ 95%
├── DockerHub / Registries ████████     78%
├── Testing (jest/pytest)  ████████     76%
└── Code Review / RFCs     █████████    82%

[SKILL MATRIX LOADED]
`),

    projects: () => (
      <pre
        className="font-mono whitespace-pre-wrap text-md leading-tight"
        style={{
          color: "#00ff00",
          fontFamily: '"Courier New", Courier, monospace',
        }}
      >
        {`[ACCESSING PROJECT REPOSITORY...]
=================================

PROJECT_001: DECENTRALISED UPTIME MONITOR
├── Decentralised uptime verification system
├── Fast, Scalable, Secured
├── Microservices architecture
├── Created a K8 cluster of all microservices
├── Stack: Bun, React JS, Express JS, Kubernetes, Redis
└── LINK:`}
        <a
          href="https://uptimemonitor.tandev-prod.fun/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-[#00ff00] ml-1"
        >
          Visit Site
        </a>

        {`

PROJECT_002: X-post
├── Create customised posts for X
├── Adjust tones for posts creation
├── Integrated Google OAuth
├── Stack: Postgres, Node JS, Gemini API, Next JS
└── LINK:`}
        <a
          href="https://x-post-delta.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-[#00ff00] ml-1"
        >
          Visit Site
        </a>

        {`

PROJECT_003: Adobe Hackathon
├── ML model for understanding a cluster of PDFs 
├── Dockerised the application
├── Pipeline for efficient data handling
├── Stack: pyMuPDF, Python, Docker
└── LINK:`}
        <a
          href="https://github.com/graniteviper/animated-octo-potato"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-[#00ff00] ml-1"
        >
          Visit Repository
        </a>

        {`

PROJECT_004: Todo backend in Rust
├── Secure, scalable backend in rust
├── Used rocket for backend
├── Connects with database using tokio-postgres
├── Stack: Rust, Rocket, Postgres
└── LINK:`}
        <a
          href="https://github.com/graniteviper/laughing-octo-engine"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-[#00ff00] ml-1"
        >
          Visit Repository
        </a>

        {`

[Project ACCESS GRANTED]`}
      </pre>
    ),

    experience: () =>
      formatText(`
[RETRIEVING WORK HISTORY...]
============================

----------None Found----------
`),

    contact: () =>
      formatText(`
[ESTABLISHING COMMUNICATION PROTOCOLS...]
=========================================

EMAIL:     t1403anishq@gmail.com
GITHUB:    graniteviper
LINKEDIN:  tanishq sharma
X:         @tanishqs1403

SECURE CHANNELS:
├── Signal: +1-555-HACK-DEV
├── Wire:   @terminalhacker
└── Matrix: @hacker:matrix.org

[PROTOCOLS ESTABLISHED]`),

    education: () =>
      formatText(`
[LOADING ACADEMIC RECORDS...]
=============================

DEGREE: B.E. Electronics and Communication Engineering
├── Institution: Punjab Engineering College
├── Duration: 2023 - 2027

CERTIFICATIONS:
├── Fundamentals of Network Engineering (Udemy)
├── Fundamentals of Operating System (Udemy)

[RECORDS LOADED]`),

    banner: () => (
      <div
        className="whitespace-pre text-xs leading-tight"
        style={{ color: "#00ff00" }}
      >
        {ascii}
      </div>
    ),

    whoami: () => formatText(`root@terminal:~# access level: ADMINISTRATOR`),

    neofetch: () =>
      formatText(`
              .-/+oossssoo+/-.               root@terminal
          ':+ssssssssssssssssss+:'           -------------
        -+ssssssssssssssssssyyssss+-         OS: Arch Linux x86_64
      .ossssssssssssssssssdMMMNysssso.       Host: Portfolio Terminal
     /ssssssssssshdmmNNmmyNMMMMhssssss/      Kernel: 6.1.0-terminal
    +ssssssssshmydMMMMMMMNddddyssssssss+     Uptime: ∞
   /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/    Shell: bash 5.2.15
  .ssssssssdMMMNhsssssssssshNMMMdssssssss.   Terminal: xterm-256color
  +sssshhhyNMMNyssssssssssssyNMMMysssssss+   CPU: Intel i9-13900K
  ossyNMMMNyMMhsssssssssssssshmmmhssssssso   GPU: NVIDIA RTX 4090
  ossyNMMMNyMMhsssssssssssssshmmmhssssssso   Memory: 64GB DDR5
  +sssshhhyNMMNyssssssssssssyNMMMysssssss+   
  .ssssssssdMMMNhsssssssssshNMMMdssssssss.   ████████████████████████
   /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/    ████████████████████████
    +sssssssssdmydMMMMMMMMddddyssssssss+     ████████████████████████
     /ssssssssssshdmNNNNmyNMMMMhssssss/      ████████████████████████
      .ossssssssssssssssssdMMMNysssso.       ████████████████████████
        -+sssssssssssssssssyyyssss+-         ████████████████████████
          ':+ssssssssssssssssss+:'           ████████████████████████
              .-/+oossssoo+/-.               ████████████████████████`),

    ls: () =>
      formatText(`
total 48K
drwxr-xr-x 8 root root 4.0K Oct 26 2025 .
drwxr-xr-x 3 root root 4.0K Oct 26 2025 ..
-rw-r--r-- 1 root root  220 Oct 26 2025 .bash_logout
-rw-r--r-- 1 root root 3.7K Oct 26 2025 .bashrc
drwxr-xr-x 2 root root 4.0K Oct 26 2025 projects/
drwxr-xr-x 2 root root 4.0K Oct 26 2025 skills/
drwxr-xr-x 2 root root 4.0K Oct 26 2025 experience/
-rw-r--r-- 1 root root  807 Oct 26 2025 README.md
-rwxr-xr-x 1 root root 8.8K Oct 26 2025 portfolio.sh`),

    sudo: () =>
      formatText(`[sudo] password for root: 
ACCESS GRANTED
You are now operating with elevated privileges.`),

    clear: () => formatText("CLEAR"),
  };

  useEffect(() => {
    setHistory([
      {
        command: "",
        output: (
          <div
            className="whitespace-pre text-xs leading-tight mb-4"
            style={{ color: "#00ff00" }}
          >
            {ascii}
          </div>
        ),
      },
      {
        command: "",
        output: formatText(`Hello There!!

Initializing terminal session...
Connecting to portfolio server...
Connection established.

Type 'help' for available commands.`),
      },
    ]);
  }, []);

  const scrollEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [history]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === "") return;

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    if (commands[trimmedCmd]) {
      const output = commands[trimmedCmd]();
      setHistory((prev) => [...prev, { command: cmd, output }]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: `bash: ${cmd}: command not found\nType 'help' to see available commands.`,
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter((cmd) =>
        cmd.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-black p-4 font-mono cursor-text overflow-hidden"
      onClick={() => inputRef.current?.focus()}
      style={{
        fontFamily: '"Courier New", Courier, monospace',
        color: "#00ff00",
      }}
    >
      <div ref={terminalRef} className="min-h-screen overflow-y-auto pb-20">
        {history.map((item, idx) => (
          <div key={idx} className="mb-2">
            {item.command && (
              <div className="flex items-start" style={{ color: "#00ff00" }}>
                <span>root@terminal:~#</span>
                <span className="ml-2">{item.command}</span>
              </div>
            )}
            <div
              className="mt-1 whitespace-pre-wrap"
              style={{ color: "#00ff00" }}
            >
              {typeof item.output === "string" ? item.output : item.output}
            </div>
          </div>
        ))}
        <div ref={scrollEndRef} />
        <div className="flex items-start" style={{ color: "#00ff00" }}>
          <span>root@terminal:~#</span>
          <div className="ml-2 flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none w-full"
              style={{
                color: "#00ff00",
                caretColor: "transparent",
              }}
              autoFocus
              spellCheck={false}
            />
            <span
              className="absolute"
              style={{
                left: `${input.length * 0.6}em`,
                top: 0,
                opacity: showCursor ? 1 : 0,
                color: "#00ff00",
              }}
            >
              █
            </span>
          </div>
        </div>
      </div>

      <div
        className="fixed bottom-2 right-4 text-xs opacity-50"
        style={{ color: "#00ff00" }}
      >
        [PRESS TAB FOR AUTOCOMPLETE] [↑/↓ FOR HISTORY]
      </div>
    </div>
  );
};

export default TerminalPortfolio;
