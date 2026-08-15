export const quizzes = [
  {
    id: 'quiz-network',
    title: 'Network Security Basics',
    category: 'Networking',
    xpPerCorrect: 20,
    questions: [
      {
        q: 'What does a firewall primarily do?',
        options: [
          'Encrypts files stored on disk',
          'Filters traffic between networks based on rules',
          'Speeds up internet connections',
          'Backs up data automatically',
        ],
        answer: 1,
      },
      {
        q: 'Which port is conventionally used for HTTPS traffic?',
        options: ['21', '80', '443', '3389'],
        answer: 2,
      },
      {
        q: 'A VPN primarily provides which benefit?',
        options: [
          'An encrypted tunnel for network traffic',
          'Automatic virus removal',
          'Faster DNS lookups',
          'Free cloud storage',
        ],
        answer: 0,
      },
      {
        q: 'What is a "man-in-the-middle" attack?',
        options: [
          'Malware that deletes files after a delay',
          'An attacker secretly intercepting communication between two parties',
          'A denial-of-service flood',
          'A weak password guessed by a bot',
        ],
        answer: 1,
      },
      {
        q: 'Which of these best describes network segmentation?',
        options: [
          'Splitting a network into smaller zones to limit how far a breach can spread',
          'Compressing network packets for speed',
          'Assigning static IPs to every device',
          'Disabling Wi-Fi in favor of Ethernet',
        ],
        answer: 0,
      },
    ],
  },
  {
    id: 'quiz-social-eng',
    title: 'Social Engineering Tactics',
    category: 'Human Factor',
    xpPerCorrect: 20,
    questions: [
      {
        q: 'What is "pretexting"?',
        options: [
          'Sending a text message before a call',
          'Creating a fabricated scenario to manipulate a target into giving up information',
          'A type of firewall rule',
          'Encrypting a message before sending',
        ],
        answer: 1,
      },
      {
        q: 'Why do phishing emails often create a false sense of urgency?',
        options: [
          'To comply with email regulations',
          'It has no real effect on victims',
          'To pressure victims into acting before they think critically',
          'To make the email load faster',
        ],
        answer: 2,
      },
      {
        q: 'What is "tailgating" in a physical security context?',
        options: [
          'Following an authorized person through a secure door without your own credentials',
          'Driving too close to another car',
          'A type of malware',
          'Sending mass spam emails',
        ],
        answer: 0,
      },
      {
        q: 'An attacker calling and impersonating IT support to get your password is an example of:',
        options: ['Brute forcing', 'Vishing (voice phishing)', 'Port scanning', 'Packet sniffing'],
        answer: 1,
      },
      {
        q: 'What is the best defense against social engineering?',
        options: [
          'A stronger firewall',
          'Faster internet',
          'Ongoing awareness training and healthy skepticism of unsolicited requests',
          'Longer passwords alone',
        ],
        answer: 2,
      },
    ],
  },
  {
    id: 'quiz-crypto',
    title: 'Cryptography Fundamentals',
    category: 'Cryptography',
    xpPerCorrect: 20,
    questions: [
      {
        q: 'What is the key difference between symmetric and asymmetric encryption?',
        options: [
          'Symmetric uses one shared key; asymmetric uses a public/private key pair',
          'Symmetric is always weaker',
          'Asymmetric doesn\'t use keys at all',
          'There is no real difference',
        ],
        answer: 0,
      },
      {
        q: 'What is a hash function primarily used for?',
        options: [
          'Compressing files for storage',
          'Producing a fixed-size fingerprint of data to verify integrity',
          'Encrypting data so it can be decrypted later',
          'Speeding up network requests',
        ],
        answer: 1,
      },
      {
        q: 'Why is a Caesar cipher considered insecure today?',
        options: [
          'It requires too much computing power',
          'It only has 25 possible shifts, making it trivial to brute-force',
          'It cannot be typed on modern keyboards',
          'It was never actually used historically',
        ],
        answer: 1,
      },
      {
        q: 'What does "salting" a password before hashing accomplish?',
        options: [
          'Makes the password easier to remember',
          'Adds random data so identical passwords produce different hashes',
          'Encrypts the password twice',
          'Shortens the hash output',
        ],
        answer: 1,
      },
      {
        q: 'TLS (used in HTTPS) primarily provides:',
        options: [
          'Faster page load times only',
          'Encrypted, authenticated communication between client and server',
          'Automatic malware scanning',
          'A backup of the website',
        ],
        answer: 1,
      },
    ],
  },
  {
    id: 'quiz-webapp',
    title: 'Web Application Security',
    category: 'AppSec',
    xpPerCorrect: 20,
    questions: [
      {
        q: 'What does XSS (Cross-Site Scripting) allow an attacker to do?',
        options: [
          'Run arbitrary scripts in a victim\'s browser via unsanitized input',
          'Physically access a server',
          'Bypass a firewall entirely',
          'Read encrypted disks',
        ],
        answer: 0,
      },
      {
        q: 'What is the best defense against SQL injection?',
        options: [
          'Longer database passwords',
          'Parameterized queries / prepared statements',
          'Disabling the database at night',
          'Renaming database tables',
        ],
        answer: 1,
      },
      {
        q: 'What does CSRF (Cross-Site Request Forgery) trick a victim into doing?',
        options: [
          'Downloading malware directly',
          'Unknowingly submitting a request to a site they\'re authenticated on',
          'Giving up their Wi-Fi password',
          'Installing a rogue browser extension',
        ],
        answer: 1,
      },
      {
        q: 'Why should sensitive data never be stored in client-side JavaScript?',
        options: [
          'It slows the page down',
          'Anything shipped to the browser can be viewed or extracted by the user',
          'JavaScript cannot store strings',
          'It voids browser warranties',
        ],
        answer: 1,
      },
      {
        q: 'What is the purpose of a Content-Security-Policy (CSP) header?',
        options: [
          'Restrict which sources of scripts/content a browser is allowed to load, reducing XSS risk',
          'Speed up CSS rendering',
          'Encrypt cookies automatically',
          'Block all JavaScript unconditionally',
        ],
        answer: 0,
      },
    ],
  },
]
