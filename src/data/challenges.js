// Every challenge is a "case file". `flag` is checked case-insensitively,
// whitespace-trimmed. `threat` sets both the difficulty and the XP reward.
export const THREAT_LEVELS = {
  LOW: { label: 'LOW', xp: 50, color: '#4FD1C5' },
  MEDIUM: { label: 'MEDIUM', xp: 100, color: '#F5A623' },
  HIGH: { label: 'HIGH', xp: 175, color: '#E5484D' },
  CRITICAL: { label: 'CRITICAL', xp: 250, color: '#FF4D6D' },
}

export const challenges = [
  {
    id: 'case-001',
    title: 'The Base64 Note',
    category: 'Encoding',
    threat: 'LOW',
    briefing:
      "A rival intern left a sticky note taped under a keyboard. It's clearly not plain text — decode it to find out what they're hiding.",
    evidence: 'TkVWRVJfVFJVU1RfUExBSU5URVhU',
    hint: 'This alphabet uses 64 characters. Any online or command-line decoder will do the trick — try `base64 -d` in a terminal.',
    flag: 'NEVER_TRUST_PLAINTEXT',
    explainer:
      "Base64 isn't encryption — it's just a way to represent binary data as text. Anyone can reverse it instantly, which is why it should never be used to protect secrets.",
  },
  {
    id: 'case-002',
    title: 'Phish in the Inbox',
    category: 'Social Engineering',
    threat: 'LOW',
    briefing:
      'Marketing forwarded an "urgent" email asking staff to reset their password at security-portal-verify.com within 24 hours. Something about the sender is off. Find the giveaway and enter it as the flag, formatted like FLAG_A_KEYWORD.',
    evidence:
      'From: IT Support <it-support@company-secure-verify-login.net>\nSubject: Immediate Action Required: Password Expiry\n\nYour password expires in 24 hours. Click the secure link below to keep your account active. Failure to comply will result in suspension.',
    hint: 'Real IT teams don\'t use urgency and a lookalike domain in the same breath. Look closely at the sender\'s domain name.',
    flag: 'FLAG_LOOKALIKE_DOMAIN',
    explainer:
      'The sender domain mimics a trusted brand but is not the real one — a classic phishing tell. Legitimate companies also rarely create false urgency to force a rushed click.',
  },
  {
    id: 'case-003',
    title: 'Caesar\'s Last Message',
    category: 'Cryptography',
    threat: 'MEDIUM',
    briefing:
      'An old surveillance log was encrypted with a simple shift cipher before the analyst disappeared. Recover the original message and submit it as the flag, exactly as it reads once decoded (uppercase, underscores instead of spaces).',
    evidence: 'WKH_YDXOW_RSHQV_DW_PLGQLJKW',
    hint: 'It is a Caesar cipher shifted by 3. "W" decodes to "T". Shift every letter back by 3 positions in the alphabet.',
    flag: 'THE_VAULT_OPENS_AT_MIDNIGHT',
    explainer:
      'Caesar ciphers shift each letter a fixed number of places through the alphabet. They\'re trivial to break by hand or by brute-forcing all 25 shifts, which is why modern cryptography relies on far more complex, key-based algorithms.',
  },
  {
    id: 'case-004',
    title: 'Login Bypass',
    category: 'Web Security',
    threat: 'MEDIUM',
    briefing:
      "A junior developer wrote this login query by concatenating user input directly into SQL. Find the input for the username field that would let an attacker log in as admin without knowing the password. Submit it exactly.",
    evidence:
      "SELECT * FROM users WHERE username = '[INPUT]' AND password = '[PASSWORD]';\n\n-- The developer trusts whatever the user types and drops it straight into the query.",
    hint: 'You want everything after the username check to be ignored. A single quote closes the string, and -- comments out the rest of the SQL line.',
    flag: "admin'--",
    explainer:
      'This is a classic SQL injection: closing the string early and commenting out the password check bypasses authentication entirely. Parameterized queries (prepared statements) prevent this by never treating input as executable code.',
  },
  {
    id: 'case-005',
    title: 'The Hidden Script',
    category: 'Web Security',
    threat: 'HIGH',
    briefing:
      "A comment box on a forum doesn't sanitize input. Find the exact JavaScript alert payload below that would run in another user's browser when they view the comment, and submit it as the flag.",
    evidence:
      "Comment field renders raw HTML: <div class='comment'>{{user_input}}</div>\n\nNo encoding, no filtering, no Content-Security-Policy header set.",
    hint: 'You need to break out of the div and inject a <script> tag that calls alert() with any message.',
    flag: "<script>alert('xss')</script>",
    explainer:
      'This is Cross-Site Scripting (XSS): unsanitized input rendered as HTML lets an attacker run arbitrary JavaScript in a victim\'s browser. The fix is output encoding and a strict Content-Security-Policy.',
  },
  {
    id: 'case-006',
    title: 'The Midnight Log',
    category: 'Network Forensics',
    threat: 'CRITICAL',
    briefing:
      'A server log shows hundreds of failed logins from one IP address in under a minute, followed by a single success. Identify the attack technique at play and submit it in the format FLAG_TWO_WORDS_UPPERCASE.',
    evidence:
      '03:14:01 FAILED login user=admin ip=91.203.44.12\n03:14:01 FAILED login user=admin ip=91.203.44.12\n03:14:02 FAILED login user=admin ip=91.203.44.12\n... (312 more attempts within 58 seconds) ...\n03:15:00 SUCCESS login user=admin ip=91.203.44.12',
    hint: 'Hundreds of rapid, automated login attempts against one account, trying many passwords fast — what is that called?',
    flag: 'FLAG_BRUTE_FORCE',
    explainer:
      'This is a brute-force attack: automated, rapid-fire login attempts until one succeeds. Rate limiting, account lockouts, and multi-factor authentication are the standard defenses.',
  },
]
