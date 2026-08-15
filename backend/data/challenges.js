// In-memory "database" of case files. In a real deployment this would live
// in Postgres/Mongo — kept as a plain module here so the backend runs with
// zero external services.
export const THREAT_LEVELS = {
  LOW: { label: 'LOW', xp: 50 },
  MEDIUM: { label: 'MEDIUM', xp: 100 },
  HIGH: { label: 'HIGH', xp: 175 },
  CRITICAL: { label: 'CRITICAL', xp: 250 },
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
      'Marketing forwarded an "urgent" email asking staff to reset their password within 24 hours. Find the giveaway and enter it as the flag, formatted like FLAG_A_KEYWORD.',
    evidence:
      'From: IT Support <it-support@company-secure-verify-login.net>\nSubject: Immediate Action Required: Password Expiry',
    hint: "Look closely at the sender's domain name.",
    flag: 'FLAG_LOOKALIKE_DOMAIN',
    explainer:
      'The sender domain mimics a trusted brand but is not the real one — a classic phishing tell.',
  },
  {
    id: 'case-003',
    title: "Caesar's Last Message",
    category: 'Cryptography',
    threat: 'MEDIUM',
    briefing:
      'An old surveillance log was encrypted with a simple shift cipher. Recover the original message and submit it as the flag.',
    evidence: 'WKH_YDXOW_RSHQV_DW_PLGQLJKW',
    hint: 'It is a Caesar cipher shifted by 3. Shift every letter back by 3 positions.',
    flag: 'THE_VAULT_OPENS_AT_MIDNIGHT',
    explainer:
      "Caesar ciphers shift each letter a fixed number of places through the alphabet — trivial to brute-force, which is why modern cryptography relies on key-based algorithms.",
  },
  {
    id: 'case-004',
    title: 'Login Bypass',
    category: 'Web Security',
    threat: 'MEDIUM',
    briefing:
      'A login query is built by concatenating user input directly into SQL. Find the username input that logs in as admin without a password.',
    evidence:
      "SELECT * FROM users WHERE username = '[INPUT]' AND password = '[PASSWORD]';",
    hint: 'A single quote closes the string, and -- comments out the rest of the line.',
    flag: "admin'--",
    explainer:
      'This is SQL injection: closing the string early and commenting out the password check bypasses authentication. Parameterized queries prevent this.',
  },
  {
    id: 'case-005',
    title: 'The Hidden Script',
    category: 'Web Security',
    threat: 'HIGH',
    briefing:
      "A comment box doesn't sanitize input. Submit the exact JavaScript alert payload that would run in another user's browser.",
    evidence: "Comment field renders raw HTML: <div class='comment'>{{user_input}}</div>",
    hint: 'Break out of the div and inject a <script> tag that calls alert().',
    flag: "<script>alert('xss')</script>",
    explainer:
      'This is Cross-Site Scripting (XSS): unsanitized input rendered as HTML lets an attacker run arbitrary JavaScript in a victim\'s browser.',
  },
  {
    id: 'case-006',
    title: 'The Midnight Log',
    category: 'Network Forensics',
    threat: 'CRITICAL',
    briefing:
      'A server log shows hundreds of failed logins from one IP in under a minute, then a success. Identify the attack technique as FLAG_TWO_WORDS_UPPERCASE.',
    evidence:
      '03:14:01 FAILED login user=admin ip=91.203.44.12 (x312)\n03:15:00 SUCCESS login user=admin ip=91.203.44.12',
    hint: 'Hundreds of rapid automated login attempts against one account — what is that called?',
    flag: 'FLAG_BRUTE_FORCE',
    explainer:
      'This is a brute-force attack. Rate limiting, account lockouts, and multi-factor authentication are the standard defenses.',
  },
]
