export interface NetworkingTopic {
  id: string;
  name: string;
  shortDesc: string;
  category: 'topology' | 'addressing' | 'hardware' | 'protocol';
  fullContent: string;
  keyConcepts: string[];
  securityImplications: string;
}

export interface SecurityTopic {
  id: string;
  name: string;
  shortDesc: string;
  category: 'defense' | 'crypto' | 'identity' | 'monitoring';
  fullContent: string;
  bestPractices: string[];
  realWorldScenario: string;
}

export interface CyberNote {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  tags: string[];
}

export interface CodeLesson {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  code: string;
  output: string;
  explanation: string[];
  deepDive: string;
}

export interface AiTool {
  id: string;
  title: string;
  category: string;
  status: 'In Architecture Phase' | 'Prototype Pipeline' | 'Planned Lab Model';
  tagline: string;
  description: string;
  techStack: string[];
  plannedFeatures: string[];
  systemPromptGoal: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'CYBERSECURITY' | 'C++' | 'PYTHON' | 'AI';
  tagline: string;
  description: string;
  features: string[];
  technologies: string[];
  githubUrl: string;
  demoAvailable: boolean;
  demoType: 'terminal' | 'interactive' | 'preview';
}

export const NETWORKING_TOPICS: NetworkingTopic[] = [
  {
    id: 'lan',
    name: 'LAN (Local Area Network)',
    shortDesc: 'High-speed local network confined to a single geographic area such as an office, lab, or home.',
    category: 'topology',
    fullContent: 'LANs interconnect computers, workstations, and network appliances using Ethernet (IEEE 802.3) or Wi-Fi (IEEE 802.11). They feature very high data transfer rates (1 Gbps to 100 Gbps) and low latency.',
    keyConcepts: ['Broadcast domains', 'VLAN isolation (802.1Q)', 'Ethernet switching', 'Subnetting & CIDR'],
    securityImplications: 'Vulnerable to ARP spoofing, DHCP starvation, and broadcast storm attacks if unsegmented. Requires 802.1X port security and dynamic ARP inspection.'
  },
  {
    id: 'man',
    name: 'MAN (Metropolitan Area Network)',
    shortDesc: 'High-capacity network spanning a metropolitan region or campus cluster.',
    category: 'topology',
    fullContent: 'MANs link multiple LANs across a city or large university campus using fiber optics (Dark Fiber / DWDM) or Metro Ethernet. Managed by telecommunication providers or regional consortia.',
    keyConcepts: ['Metro Ethernet', 'Optical carrier rings (SONET/SDH)', 'Regional backbones', 'Point-to-point microwave'],
    securityImplications: 'Traffic travels over carrier-managed fiber lines; requires end-to-end IPsec or MACsec encryption against wiretaps and fiber bending interception.'
  },
  {
    id: 'wan',
    name: 'WAN (Wide Area Network)',
    shortDesc: 'Global or continental network connecting geographically dispersed sites across countries.',
    category: 'topology',
    fullContent: 'The Internet is the ultimate public WAN. Enterprise WANs utilize MPLS circuits, SD-WAN overlays, and leased lines to provide multi-region transit with dynamic routing (BGP, OSPF).',
    keyConcepts: ['Border Gateway Protocol (BGP)', 'MPLS & SD-WAN', 'Submarine cable relays', 'Autonomous Systems (AS)'],
    securityImplications: 'Prone to BGP route hijacking, DDoS transit amplification, and ISP inspection. Strict IPSec VPN tunnels and zero-trust perimeter gates are mandatory.'
  },
  {
    id: 'pan',
    name: 'PAN (Personal Area Network)',
    shortDesc: 'Short-range network centered around an individual device cluster (under 10 meters).',
    category: 'topology',
    fullContent: 'PANs connect personal peripherals like smartphones, smartwatches, hardware security keys (YubiKey), and telemetry sensors using Bluetooth (BLE), Zigbee, or USB.',
    keyConcepts: ['Bluetooth Low Energy (BLE)', 'Near Field Communication (NFC)', 'Ultra-Wideband (UWB)', 'Pairing pin exchanges'],
    securityImplications: 'Vulnerable to BlueBorne, Bluejacking, and rogue beacon tracking. Unpaired Bluetooth interfaces should remain in non-discoverable states.'
  },
  {
    id: 'ip-address',
    name: 'IP Address (IPv4 & IPv6)',
    shortDesc: 'Numerical logical identifier assigned to each node on an IP network for routing and location.',
    category: 'addressing',
    fullContent: 'IPv4 uses 32-bit addresses grouped in 4 octets (e.g. 192.168.1.1), while IPv6 uses 128-bit hexadecimal addressing (e.g. 2001:0db8::1) to solve address exhaustion. NAT enables private IPv4 pools to share public transit addresses.',
    keyConcepts: ['IPv4 32-bit dotted decimal', 'IPv6 128-bit hex blocks', 'CIDR prefix masking (/24, /16)', 'RFC 1918 Private Ranges'],
    securityImplications: 'IP spoofing can bypass IP-based ACLs. Ingress filtering (BCP 38) and stateful firewalls are critical to drop unauthorized packets.'
  },
  {
    id: 'mac-address',
    name: 'MAC Address (Layer 2)',
    shortDesc: '48-bit unique physical address burned into Network Interface Cards (NICs) at the factory.',
    category: 'addressing',
    fullContent: 'The first 24 bits represent the Organizationally Unique Identifier (OUI) assigned by IEEE, while the final 24 bits represent the vendor-assigned serial number (e.g. 00:1A:2B:3C:4D:5E). Used by switches for local frame forwarding via CAM tables.',
    keyConcepts: ['48-bit hardware address', 'OUI vendor prefix', 'Address Resolution Protocol (ARP)', 'CAM table lookups'],
    securityImplications: 'MAC addresses are transmitted unencrypted in Ethernet frames and can be trivially spoofed via software. Port security and 802.1X authentication restrict unauthorized NICs.'
  },
  {
    id: 'routers',
    name: 'Routers (Layer 3)',
    shortDesc: 'Intelligent packet forwarding devices that interconnect distinct networks and choose optimal paths.',
    category: 'hardware',
    fullContent: 'Routers operate at the Network Layer (OSI Layer 3). They maintain routing tables updated via dynamic routing protocols (OSPF, EIGRP, BGP) to forward packets based on destination IP addresses.',
    keyConcepts: ['Packet routing tables', 'Network Address Translation (NAT)', 'Access Control Lists (ACLs)', 'Autonomous System transit'],
    securityImplications: 'Unsecured router management interfaces (Telnet, default SNMP strings) expose the entire subnet. Hardening requires SSHv2, TACACS+/RADIUS, and control-plane policing (CoPP).'
  },
  {
    id: 'switches',
    name: 'Switches (Layer 2 / 3)',
    shortDesc: 'Multi-port bridges that forward Ethernet frames selectively based on destination MAC addresses.',
    category: 'hardware',
    fullContent: 'Unlike obsolete hubs that broadcast to all ports, switches learn MAC-to-port mappings dynamically. Layer 3 managed switches also perform wire-speed inter-VLAN routing without external router bottlenecks.',
    keyConcepts: ['CAM (Content Addressable Memory) table', 'VLAN tagging (802.1Q)', 'Spanning Tree Protocol (STP)', 'Port mirroring (SPAN)'],
    securityImplications: 'Susceptible to CAM table overflow (forcing the switch into fail-open hub mode) and VLAN hopping. Mitigated with port security limits and BPDU guard.'
  },
  {
    id: 'ports',
    name: 'Ports (Transport Layer)',
    shortDesc: '16-bit logical endpoints (0–65535) multiplexing multiple network services on a single IP.',
    category: 'protocol',
    fullContent: 'Standard ranges: Well-Known Ports (0–1023, like 80 HTTP, 443 HTTPS, 22 SSH), Registered Ports (1024–49151), and Ephemeral/Dynamic Ports (49152–65535). Sockets combine IP + Port + Protocol.',
    keyConcepts: ['Socket binding (IP:Port)', 'TCP 3-way handshake', 'UDP stateless datagrams', 'Service identification'],
    securityImplications: 'Unnecessary open listening ports expand attack surfaces. Port scanning (e.g. Nmap SYN scans) uncovers vulnerable service versions.'
  },
  {
    id: 'protocols',
    name: 'Protocols (TCP, UDP, ICMP)',
    shortDesc: 'Standardized rules governing format, transmission, and error checking of digital communication.',
    category: 'protocol',
    fullContent: 'TCP provides connection-oriented, reliable, ordered, and error-checked byte stream delivery. UDP offers low-latency, connectionless best-effort transmission ideal for DNS and real-time media. ICMP handles control and diagnostic messages (Ping, Traceroute).',
    keyConcepts: ['TCP SYN/ACK sequence flow', 'Flow control & windowing', 'UDP connectionless speed', 'ICMP error signaling'],
    securityImplications: 'TCP SYN flood attacks overwhelm connection tables. UDP amplification leverages spoofed queries to reflection servers.'
  },
  {
    id: 'client-server',
    name: 'Client / Server Architecture',
    shortDesc: 'Distributed computing model partitioning tasks between resource providers and service requesters.',
    category: 'protocol',
    fullContent: 'Clients initiate requests to well-known servers listening on static ports. Servers authenticate requests, process database or compute operations, and stream structured responses back (REST, gRPC, WebSocket).',
    keyConcepts: ['Request-Response lifecycle', 'Stateless vs stateful sessions', 'Load balancing & reverse proxies', 'TLS/SSL handshake negotiation'],
    securityImplications: 'Single points of failure, SQL injection, API privilege escalation, and credential stuffing target central server endpoints.'
  }
];

export const SECURITY_TOPICS: SecurityTopic[] = [
  {
    id: 'authentication',
    name: 'Authentication (AuthN)',
    shortDesc: 'Verifying the claimed identity of a user, process, or machine.',
    category: 'identity',
    fullContent: 'Authentication verifies *who* you are. Modern systems rely on Multi-Factor Authentication (MFA) combining three pillars: something you know (passphrase), something you have (FIDO2 WebAuthn token, TOTP authenticator), and something you are (biometrics).',
    bestPractices: ['Enforce hardware-backed MFA (WebAuthn/FIDO2)', 'Disallow SMS/Email OTP where phishing is a risk', 'Implement adaptive risk-based authentication triggers', 'Rotate session tokens upon privilege escalation'],
    realWorldScenario: 'An attacker obtains leaked corporate passwords from a breach, but is stopped dead at the second factor because the enterprise requires FIDO2 hardware keys resistant to reverse-proxy phishing.'
  },
  {
    id: 'password-security',
    name: 'Password Security & Storage',
    shortDesc: 'Hardening user credentials against brute-force, dictionary, and rainbow table attacks.',
    category: 'identity',
    fullContent: 'Passwords must never be stored in plaintext or reversible encryption. Systems must employ salted, memory-hard adaptive hashing algorithms like Argon2id or bcrypt with high work factors to thwart GPU-accelerated cracking.',
    bestPractices: ['Use Argon2id with calibrated memory & iteration cost', 'Generate cryptographically random unique salts (>= 16 bytes)', 'Enforce minimum length (12+ characters) over arbitrary complexity rules', 'Check passwords against HaveIBeenPwned k-anonymity API'],
    realWorldScenario: 'When a database dump leaks, attackers run hashcat on RTX 4090 GPUs. While MD5 yields 100 billion hashes/sec, Argon2id limits them to a handful of guesses per second, keeping credentials safe.'
  },
  {
    id: 'firewalls',
    name: 'Firewalls & Network Defense',
    shortDesc: 'Inspecting incoming and outgoing network traffic against defined security policy rulesets.',
    category: 'defense',
    fullContent: 'Evolved from packet filters to Next-Generation Firewalls (NGFW) and Web Application Firewalls (WAF). Statefully tracks connection tables, performs Deep Packet Inspection (DPI), detects protocol anomalies, and drops malformed traffic.',
    bestPractices: ['Default-deny ingress and egress posture', 'Segment trust zones with strict inter-VLAN micro-segmentation', 'Inspect TLS traffic with automated certificate revocation checks', 'Deploy WAFs with OWASP Top 10 rule enforcement'],
    realWorldScenario: 'A malware implant executes on an internal workstation. When it attempts command-and-control beaconing to an external IP on port 4444, egress firewall rules immediately drop the unauthorized outbound connection.'
  },
  {
    id: 'monitoring',
    name: 'Security Monitoring & SIEM',
    shortDesc: 'Continuous aggregation, correlation, and analysis of events across endpoints, networks, and cloud.',
    category: 'monitoring',
    fullContent: 'Security Information and Event Management (SIEM) systems ingest logs from Syslog, Windows Event Logs (Sysmon), Zeek network telemetry, and cloud audit trails. Automated alerts detect lateral movement and privilege escalation.',
    bestPractices: ['Centralize immutable, write-once audit logs', 'Monitor process spawning lineages (e.g. Word launching powershell.exe)', 'Define automated SOAR playbooks for rapid containment', 'Maintain baseline behavioral analytics (UEBA)'],
    realWorldScenario: 'An attacker uses PsExec for lateral movement at 3 AM. The SIEM detects an anomalous administrative logon from an unexpected IP and triggers an alert within 45 seconds.'
  },
  {
    id: 'encryption',
    name: 'Encryption (Symmetric & Asymmetric)',
    shortDesc: 'Transforming readable plaintext into ciphertext using mathematical cryptographic keys.',
    category: 'crypto',
    fullContent: 'Symmetric encryption (AES-256-GCM, ChaCha20-Poly1305) utilizes a single shared key for blazing fast bulk data encryption. Asymmetric cryptography (RSA-4096, ECC Ed25519) uses public/private key pairs for digital signatures and secure key exchange (ECDHE).',
    bestPractices: ['Always use Authenticated Encryption with Associated Data (AEAD)', 'Never roll custom crypto primitives; use libsodium or OpenSSL', 'Enforce Perfect Forward Secrecy (PFS) in TLS configurations', 'Safeguard private keys in Hardware Security Modules (HSMs)'],
    realWorldScenario: 'During an eavesdropping attack on open Wi-Fi, the attacker captures full raw network packets. Because the session utilizes TLS 1.3 with AES-GCM, the packet payloads appear as pure mathematical randomness.'
  },
  {
    id: 'hashing',
    name: 'Cryptographic Hashing',
    shortDesc: 'One-way deterministic mathematical algorithms mapping arbitrary data to fixed-length digests.',
    category: 'crypto',
    fullContent: 'Cryptographic hash functions (SHA-256, SHA-3, BLAKE3) are strictly one-way: deterministic, quick to compute, pre-image resistant, second pre-image resistant, and collision resistant. Used for file integrity checks and digital signatures.',
    bestPractices: ['Use SHA-256 or BLAKE3 for file integrity verification', 'Avoid broken algorithms (MD5, SHA-1) in all security contexts', 'Combine with HMAC (Hash-based Message Authentication Code) for API signing', 'Use memory-hard functions (Argon2id) for passwords, not plain SHA-256'],
    realWorldScenario: 'A software download mirror is compromised by threat actors. Users verify the published SHA-256 checksum against the vendor official site and detect that the binary has been modified with a backdoor.'
  },
  {
    id: 'access-control',
    name: 'Access Control (RBAC & ABAC)',
    shortDesc: 'Granting or denying permissions based on role, identity, context, and the Principle of Least Privilege.',
    category: 'identity',
    fullContent: 'Role-Based Access Control (RBAC) groups permissions into functional roles. Attribute-Based Access Control (ABAC) evaluates granular variables: user role, target data classification, time of day, client device health, and geolocation.',
    bestPractices: ['Enforce the Principle of Least Privilege (PoLP)', 'Implement Just-in-Time (JIT) temporary privilege elevation', 'Conduct regular access re-certification audits', 'Prevent separation of duties violations'],
    realWorldScenario: 'A developer account is compromised via phishing. Because the account only possesses scoped read-only access to testing environments with zero production database credentials, the blast radius is strictly contained.'
  },
  {
    id: 'network-security',
    name: 'Network Security & Defense in Depth',
    shortDesc: 'Layered defensive strategy across physical, perimeter, internal network, host, and application tiers.',
    category: 'defense',
    fullContent: 'Defense in Depth assumes any single layer will eventually fail. Combines network segmentation, zero trust network access (ZTNA), endpoint detection and response (EDR), honeypots, and encrypted internal overlays.',
    bestPractices: ['Treat internal networks as untrusted by default (Zero Trust)', 'Deploy canary tokens and honey-credentials as early tripwires', 'Mandate mutual TLS (mTLS) for microservice communication', 'Conduct regular penetration testing and red-team engagements'],
    realWorldScenario: 'An attacker breaches the external web server via an unpatched vulnerability. However, internal network segmentation prevents lateral movement to database servers, and EDR on the host isolates the machine.'
  },
  {
    id: 'malware-awareness',
    name: 'Malware Mechanics & Analysis',
    shortDesc: 'Understanding payloads: Trojans, Ransomware, Worms, Rootkits, and Fileless In-Memory implants.',
    category: 'defense',
    fullContent: 'Malware leverages initial access (phishing, drive-by downloads), execution (living-off-the-land binaries), persistence (registry run keys, scheduled tasks), defense evasion (process hollowing, reflective DLL loading), and command-and-control beaconing.',
    bestPractices: ['Use isolated sandboxes with network simulation for dynamic analysis', 'Inspect PE file headers, import tables (IAT), and entropy metrics', 'Block untrusted Office macros and script interpreters via AppLocker', 'Maintain offline, immutable, 3-2-1 air-gapped backups against ransomware'],
    realWorldScenario: 'An employee receives a spear-phishing invoice attachment containing an obfuscated PowerShell loader. Endpoint Application Control blocks script execution from temp directories, neutralizing the threat instantly.'
  }
];

export const CYBER_NOTES: CyberNote[] = [
  {
    id: 'note-wireshark',
    title: 'Dissecting TCP Handshakes & Packet Anomalies with Wireshark',
    category: 'Packet Analysis',
    date: '2026-03-12',
    readTime: '6 min',
    summary: 'A deep dive into Layer 4 packet mechanics, capturing the SYN -> SYN-ACK -> ACK flow and spotting rogue TCP resets and SYN flood signatures.',
    tags: ['Wireshark', 'TCP/IP', 'Packet Sniffing', 'PCAP'],
    content: [
      'In this experiment, I set up a local testing environment using Wireshark to capture raw packet exchanges during standard TCP sessions.',
      'Examining the sequence numbers and acknowledgment numbers reveals exactly how TCP guarantees delivery. The client chooses an initial sequence number (ISN), and the server increments it by 1 in the SYN-ACK response.',
      'Key takeaway: Detecting anomalies like asymmetric window sizing, out-of-order retransmissions, and anomalous RST packet bursts provides clear indicators of network tampering or active port scans.'
    ]
  },
  {
    id: 'note-portscanner',
    title: 'Architecting a Multi-Threaded Port Scanner in Python & C++',
    category: 'Tool Building',
    date: '2026-02-28',
    readTime: '8 min',
    summary: 'Comparing low-level POSIX sockets in C++ versus concurrent.futures in Python to understand raw socket performance and banner grabbing.',
    tags: ['Python', 'C++', 'Sockets', 'Reconnaissance'],
    content: [
      'Building my own port scanner helped demystify how tools like Nmap perform TCP connect() scans.',
      'In Python, using asyncio or ThreadPoolExecutor allowed scanning 1000 ports in under 3 seconds with graceful timeout handling.',
      'Rewriting the socket core in C++ using non-blocking sockets and select()/epoll() showed significant memory footprint reduction and helped me grasp raw file descriptor management in Linux.'
    ]
  },
  {
    id: 'note-crypto-aes',
    title: 'Practical Cryptography: AES-256-GCM vs CBC with HMAC',
    category: 'Cryptography',
    date: '2026-01-20',
    readTime: '7 min',
    summary: 'Why Authenticated Encryption (AEAD) is essential, and how padding oracle attacks destroy CBC mode when integrity verification is neglected.',
    tags: ['Cryptography', 'AES', 'AEAD', 'Security'],
    content: [
      'Encryption provides confidentiality, but without authentication, an attacker can tamper with ciphertext bits in transit (malleability attacks).',
      'AES-GCM integrates Galois Counter Mode to compute an authentication tag alongside the ciphertext, preventing bit-flipping and padding oracle exploits.',
      'Golden rule: Never encrypt without authenticating first. Always prefer modern AEAD ciphers like AES-256-GCM or ChaCha20-Poly1305.'
    ]
  },
  {
    id: 'note-homelab',
    title: 'Building an Isolated Virtualized Security Lab with Proxmox & pfSense',
    category: 'Lab Architecture',
    date: '2025-12-14',
    readTime: '9 min',
    summary: 'Configuring segmented VLANs, a Kali Linux testing machine, vulnerable target VMs (Metasploitable, DVWA), and Zeek/Suricata IDS sensors.',
    tags: ['HomeLab', 'pfSense', 'Proxmox', 'VLANs'],
    content: [
      'Hands-on experimentation requires a strictly isolated environment so simulated attacks cannot leak into real home or enterprise networks.',
      'Using Proxmox VE, I defined separate virtual bridges (vmbr1, vmbr2) with pfSense acting as the firewall gateway.',
      'This setup allows safe packet inspection, malware sandboxing, and practicing offensive-defensive dual testing.'
    ]
  }
];

export const CPP_LESSONS: CodeLesson[] = [
  {
    id: 'cpp-basics',
    title: 'Variables, Types & Fast I/O in Modern C++',
    difficulty: 'Beginner',
    summary: 'Understanding strongly-typed systems, memory representations, standard streams, and performance-tuned I/O.',
    code: `#include <iostream>
#include <string>
#include <iomanip>

int main() {
    // Fast I/O for competitive programming & performance
    std::ios_base::sync_with_stdio(false);
    std::cin.tie(NULL);

    int packetCount = 1420;
    double throughputMBps = 84.75;
    bool firewallActive = true;
    std::string securityZone = "DMZ-Internal";

    std::cout << "[SYSTEM STATUS REPORT]\\n";
    std::cout << "Security Zone : " << securityZone << "\\n";
    std::cout << "Packets Logged: " << packetCount << "\\n";
    std::cout << "Throughput    : " << std::fixed << std::setprecision(2) 
              << throughputMBps << " MB/s\\n";
    std::cout << "Firewall Active: " << (firewallActive ? "ENABLED" : "DISABLED") << "\\n";

    return 0;
}`,
    output: `[SYSTEM STATUS REPORT]
Security Zone : DMZ-Internal
Packets Logged: 1420
Throughput    : 84.75 MB/s
Firewall Active: ENABLED`,
    explanation: [
      'C++ is statically typed. Variables must be declared before use, reserving exact memory bytes on the stack.',
      'std::ios_base::sync_with_stdio(false) unties C++ streams from C stdio buffers, drastically speeding up I/O loops.',
      'std::cin.tie(NULL) prevents flushing std::cout before each std::cin input operation.'
    ],
    deepDive: 'At the machine code level, primitive types (int = 4 bytes, double = 8 bytes) map directly into CPU registers (RAX, XMM0), achieving maximum instruction pipeline efficiency.'
  },
  {
    id: 'cpp-pointers',
    title: 'Pointers, References & Direct Memory Manipulation',
    difficulty: 'Intermediate',
    summary: 'Direct pointer addressing, dereferencing, pass-by-reference semantics, and avoiding memory leaks.',
    code: `#include <iostream>

void inspectBuffer(const uint8_t* buffer, size_t length) {
    std::cout << "Hex Dump: ";
    for (size_t i = 0; i < length; ++i) {
        std::cout << "0x" << std::hex << static_cast<int>(buffer[i]) << " ";
    }
    std::cout << std::dec << "\\n";
}

int main() {
    uint8_t packetHeader[] = { 0x45, 0x00, 0x00, 0x3c, 0x1c, 0x46 };
    size_t headerLen = sizeof(packetHeader) / sizeof(packetHeader[0]);

    uint8_t* ptr = packetHeader; // Pointer to array start

    std::cout << "Base Memory Address: " << static_cast<void*>(ptr) << "\\n";
    std::cout << "First Byte Value   : 0x" << std::hex << static_cast<int>(*ptr) << std::dec << "\\n";

    inspectBuffer(packetHeader, headerLen);
    return 0;
}`,
    output: `Base Memory Address: 0x7ffd19b2e880
First Byte Value   : 0x45
Hex Dump: 0x45 0x0 0x0 0x3c 0x1c 0x46`,
    explanation: [
      'Pointers hold raw virtual memory addresses in hexadecimal representation (64-bit = 8 bytes).',
      'The dereference operator (*) accesses or mutates the data stored at that specific address.',
      'Pointers enable zero-copy buffer passing, crucial for high-speed network packet inspection without overhead.'
    ],
    deepDive: 'Understanding pointers is the foundation of cybersecurity: buffer overflows, format string vulnerabilities, and heap exploits all exploit raw memory mismanagement.'
  },
  {
    id: 'cpp-oop',
    title: 'Object-Oriented Programming (Classes & Encapsulation)',
    difficulty: 'Intermediate',
    summary: 'Constructors, RAII (Resource Acquisition Is Initialization), member encapsulation, and clean destructor cleanup.',
    code: `#include <iostream>
#include <string>
#include <vector>

class FirewallRule {
private:
    std::string ipSubnet;
    int port;
    bool allow;

public:
    FirewallRule(std::string subnet, int p, bool isAllowed)
        : ipSubnet(std::move(subnet)), port(p), allow(isAllowed) {}

    bool evaluate(const std::string& incomingIp, int targetPort) const {
        if (targetPort == port && incomingIp.find(ipSubnet) != std::string::npos) {
            return allow;
        }
        return false;
    }

    void print() const {
        std::cout << "Rule: " << (allow ? "[ACCEPT]" : "[DROP]") 
                  << " " << ipSubnet << " on Port " << port << "\\n";
    }
};

int main() {
    FirewallRule rule1("192.168.1.", 443, true);
    FirewallRule rule2("10.0.0.", 22, false);

    rule1.print();
    rule2.print();

    std::cout << "Test 192.168.1.50:443 -> " 
              << (rule1.evaluate("192.168.1.50", 443) ? "PASSED" : "BLOCKED") << "\\n";
    return 0;
}`,
    output: `Rule: [ACCEPT] 192.168.1. on Port 443
Rule: [DROP] 10.0.0. on Port 22
Test 192.168.1.50:443 -> PASSED`,
    explanation: [
      'Private members protect internal state from accidental tampering by external code.',
      'Constructors with member initialization lists initialize fields efficiently before the constructor body runs.',
      'Const member functions guarantee that calling the method will not alter object state.'
    ],
    deepDive: 'Modern C++ utilizes RAII so that sockets, files, and heap allocations clean themselves up automatically when the enclosing object leaves scope.'
  },
  {
    id: 'cpp-filehandling',
    title: 'Binary File Handling & Raw Packet Stream Parsing',
    difficulty: 'Advanced',
    summary: 'Reading and writing binary streams with std::ifstream and std::ofstream for PCAP forensics.',
    code: `#include <iostream>
#include <fstream>
#include <vector>

struct SimplePcapHeader {
    uint32_t magicNumber;
    uint16_t versionMajor;
    uint16_t versionMinor;
    int32_t  thiszone;
    uint32_t sigfigs;
    uint32_t snaplen;
    uint32_t network;
};

int main() {
    SimplePcapHeader header{
        0xa1b2c3d4, // Standard PCAP magic number
        2, 4, 0, 0, 65535, 1 // Ethernet link type
    };

    // Simulate binary writing to memory stream
    std::cout << "[SIMULATED PCAP BINARY DUMP]\\n";
    std::cout << "Magic: 0x" << std::hex << header.magicNumber << std::dec << "\\n";
    std::cout << "PCAP Version: " << header.versionMajor << "." << header.versionMinor << "\\n";
    std::cout << "SnapLen (Max Bytes): " << header.snaplen << " bytes\\n";
    std::cout << "Link Layer Type   : " << header.network << " (Ethernet)\\n";

    return 0;
}`,
    output: `[SIMULATED PCAP BINARY DUMP]
Magic: 0xa1b2c3d4
PCAP Version: 2.4
SnapLen (Max Bytes): 65535 bytes
Link Layer Type   : 1 (Ethernet)`,
    explanation: [
      'Binary mode (std::ios::binary) bypasses newline character translations (CRLF to LF), preserving exact byte values.',
      'Direct struct deserialization maps file chunks directly into memory structures for ultra-fast processing.',
      'Must verify endianness (big-endian vs little-endian) when parsing cross-platform network captures.'
    ],
    deepDive: 'High-performance packet analyzers (like Snort or Suricata) read raw binary streams with zero-copy ring buffers using PF_RING or DPDK.'
  }
];

export const PYTHON_LESSONS: CodeLesson[] = [
  {
    id: 'py-basics',
    title: 'Python Essentials: Dynamic Types, Collections & Clean Syntax',
    difficulty: 'Beginner',
    summary: 'Core language structure, list comprehensions, dictionary indexing, and dynamic scripting power.',
    code: `# Python 3.12: Essential Data Structures for Security Scripts
import time

ports = [21, 22, 53, 80, 443, 8080]
service_map = {
    21: "FTP (Plaintext)",
    22: "SSH (Secure Shell)",
    53: "DNS (Domain Name System)",
    80: "HTTP (Web Unencrypted)",
    443: "HTTPS (TLS Encrypted)",
    8080: "HTTP-Alt / Proxy"
}

# List comprehension filtering encrypted ports
encrypted_ports = [p for p in ports if p in (22, 443)]

print(f"[+] Total Ports Monitored: {len(ports)}")
print(f"[+] Encrypted Services   : {encrypted_ports}")
print("\\n--- Service Inventory ---")
for port, name in service_map.items():
    print(f"Port {port:<5} -> {name}")`,
    output: `[+] Total Ports Monitored: 6
[+] Encrypted Services   : [22, 443]

--- Service Inventory ---
Port 21    -> FTP (Plaintext)
Port 22    -> SSH (Secure Shell)
Port 53    -> DNS (Domain Name System)
Port 80    -> HTTP (Web Unencrypted)
Port 443   -> HTTPS (TLS Encrypted)
Port 8080  -> HTTP-Alt / Proxy`,
    explanation: [
      'Python is dynamically typed and garbage collected, making rapid prototyping lightning fast.',
      'Dictionaries offer average O(1) hash map lookup times for port and service mapping.',
      'F-strings (formatted string literals) provide readable string interpolation.'
    ],
    deepDive: 'Python has become the de facto language for cybersecurity automation, malware scripting analysis, and penetration testing tooling.'
  },
  {
    id: 'py-socket-scanner',
    title: 'Network Socket Programming & Port Reconnaissance',
    difficulty: 'Intermediate',
    summary: 'Creating raw network sockets, establishing TCP 3-way handshakes, and parsing banners.',
    code: `import socket

def test_port(host: str, port: int, timeout: float = 0.5) -> bool:
    """Attempts a full TCP connect handshake to determine port state."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(timeout)
        result = s.connect_ex((host, port))
        return result == 0  # 0 indicates successful connection

target_host = "127.0.0.1"
common_ports = [22, 80, 443, 3000, 8080]

print(f"Scanning target: {target_host}")
for port in common_ports:
    # Simulated quick scan result
    status = "OPEN [ACTIVE]" if port in [80, 443, 3000] else "CLOSED / FILTERED"
    print(f"Target: {target_host}:{port:<5} | Status: {status}")`,
    output: `Scanning target: 127.0.0.1
Target: 127.0.0.1:22    | Status: CLOSED / FILTERED
Target: 127.0.0.1:80    | Status: OPEN [ACTIVE]
Target: 127.0.0.1:443   | Status: OPEN [ACTIVE]
Target: 127.0.0.1:3000  | Status: OPEN [ACTIVE]
Target: 127.0.0.1:8080  | Status: CLOSED / FILTERED`,
    explanation: [
      'socket.AF_INET specifies IPv4 addressing, and SOCK_STREAM configures reliable TCP protocol.',
      'connect_ex() returns an error indicator (like errno.ECONNREFUSED) rather than raising an exception, which speeds up scanning loops.',
      'The "with" context manager automatically closes the socket file descriptor even if exceptions occur.'
    ],
    deepDive: 'Production scanners like Masscan or Nmap use raw sockets (SOCK_RAW) with custom crafted SYN packets to avoid completing the TCP handshake, remaining quieter in server logs.'
  },
  {
    id: 'py-log-parser',
    title: 'Automated Security Log Parsing & Threat Detection with Regex',
    difficulty: 'Intermediate',
    summary: 'Using regular expressions and collections to parse web access logs for brute-force attacks and SQL injections.',
    code: `import re
from collections import Counter

# Simulated access log entries
log_entries = [
    '192.168.1.100 - - [28/Sep/2026:04:12:01] "POST /login HTTP/1.1" 401 128',
    '192.168.1.100 - - [28/Sep/2026:04:12:02] "POST /login HTTP/1.1" 401 128',
    '192.168.1.100 - - [28/Sep/2026:04:12:03] "POST /login HTTP/1.1" 401 128',
    '192.168.1.100 - - [28/Sep/2026:04:12:04] "POST /login HTTP/1.1" 200 4820',
    '10.0.0.45 - - [28/Sep/2026:04:15:10] "GET /products?id=1 UNION SELECT null,password FROM users" 403 240'
]

ip_pattern = re.compile(r'^(\\d+\\.\\d+\\.\\d+\\.\\d+)')
sqli_pattern = re.compile(r'(?i)(union.*select|or\\s+1=1|--|/\\*)')

print("[!] INGESTING SECURITY LOG STREAM:")
for line in log_entries:
    ip_match = ip_pattern.match(line)
    ip = ip_match.group(1) if ip_match else "UNKNOWN"

    if sqli_pattern.search(line):
        print(f"[ALERT] SQL Injection signature detected from: {ip}")
    elif "401" in line:
        print(f"[WARN] Failed Authentication Attempt from: {ip}")
    elif "200" in line and "/login" in line:
        print(f"[NOTICE] Successful Login after failed bursts from: {ip}")`,
    output: `[!] INGESTING SECURITY LOG STREAM:
[WARN] Failed Authentication Attempt from: 192.168.1.100
[WARN] Failed Authentication Attempt from: 192.168.1.100
[WARN] Failed Authentication Attempt from: 192.168.1.100
[NOTICE] Successful Login after failed bursts from: 192.168.1.100
[ALERT] SQL Injection signature detected from: 10.0.0.45`,
    explanation: [
      're.compile() pre-compiles regex patterns for high-throughput string matching across millions of log lines.',
      'The case-insensitive flag (?i) detects uppercase and lowercase obfuscation attempts.',
      'Python scripts can stream parsed alerts directly to Discord webhooks, Slack channels, or SIEM ingestion APIs.'
    ],
    deepDive: 'Real SOC teams run Python automated parsers continuously in worker nodes, flagging anomalies before attackers can escalate privileges.'
  }
];

export const AI_TOOLS: AiTool[] = [
  {
    id: 'ai-code-assistant',
    title: 'AI Code Assistant',
    category: 'C++ & Python Dev',
    status: 'In Architecture Phase',
    tagline: 'Context-aware code optimization and security flaw detector.',
    description: 'Designed to analyze C++ and Python source files for memory leaks, uninitialized pointers, insecure library calls, and inefficient algorithmic complexity.',
    techStack: ['Python', 'AST Parser', 'Gemini Flash API', 'Tree-Sitter C++'],
    plannedFeatures: [
      'AST-based semantic vulnerability scanning',
      'Instant memory-safety refactor suggestions for C++',
      'PEP8 and performance linting for Python',
      'Interactive syntax explanation engine'
    ],
    systemPromptGoal: 'Specialized systems engineer auditor analyzing code for buffer boundaries, safe pointer arithmetic, and algorithmic Big-O constraints.'
  },
  {
    id: 'ai-cyber-assistant',
    title: 'Cybersecurity Learning Assistant',
    category: 'Ethical Hacking & Defense',
    status: 'Prototype Pipeline',
    tagline: 'Interactive mentor for networking concepts and defense-in-depth scenarios.',
    description: 'An AI mentor that quizzes learners on OSI layers, firewall configurations, and guides them step-by-step through ethical CTF challenges.',
    techStack: ['Next-Gen LLM', 'Vector DB Knowledge Base', 'Tailwind UI'],
    plannedFeatures: [
      'Interactive CTF hint generation without giving away direct answers',
      'Realistic network topology troubleshooting scenarios',
      'Explaining CVE writeups in simple plain language',
      'Ethical hacking boundary verification safeguards'
    ],
    systemPromptGoal: 'Senior Security Analyst and Educator prioritizing ethical defensive boundaries, clear conceptual analogies, and step-by-step guidance.'
  },
  {
    id: 'ai-python-helper',
    title: 'Python Helper',
    category: 'Automation & Scripting',
    status: 'In Architecture Phase',
    tagline: 'Automated script generator for network telemetry and log analysis.',
    description: 'Translates natural language automation requests into clean, idiomatic Python scripts using standard library modules (socket, subprocess, re, asyncio).',
    techStack: ['Python 3.12', 'FastAPI Proxy', 'Gemini Flash'],
    plannedFeatures: [
      'Automated script generation for repetitive OS tasks',
      'Regex builder with live sample matching',
      'Asyncio concurrency boilerplate generator',
      'Type hinting and docstring generation'
    ],
    systemPromptGoal: 'Clean-code Python artisan emphasizing typing, exceptions handling, and zero unnecessary dependencies.'
  },
  {
    id: 'ai-cpp-helper',
    title: 'C++ Helper',
    category: 'Systems & Low-Level',
    status: 'In Architecture Phase',
    tagline: 'Deep dive into modern C++20/C++23 constructs and memory semantics.',
    description: 'Assists with template metaprogramming, smart pointers (unique_ptr, shared_ptr), move semantics, and diagnosing cryptic compiler errors.',
    techStack: ['Clang AST', 'C++20 Modules', 'AI Inference API'],
    plannedFeatures: [
      'Demystifying GCC / Clang template error walls',
      'Move semantics and rvalue reference visualization',
      'Valgrind memory leak diagnostic interpretation',
      'Assembly output side-by-side comparison'
    ],
    systemPromptGoal: 'Expert C++ architect focused on RAII, memory layout, cache locality, and zero-cost abstractions.'
  },
  {
    id: 'ai-study-assistant',
    title: 'Study Assistant',
    category: 'Continuous Learning',
    status: 'Planned Lab Model',
    tagline: 'Active recall and spaced repetition flashcard engine for IT certifications.',
    description: 'Generates customized practice scenarios and active recall question decks for certifications like CompTIA Network+, Security+, and Linux+, adapting to the user\'s weak points.',
    techStack: ['Spaced Repetition Algorithm', 'Markdown Generator', 'AI Engine'],
    plannedFeatures: [
      'Adaptive difficulty based on mastery ratings',
      'Custom question deck generation from uploaded lecture notes',
      'Conceptual gap detection and tailored study guides',
      'Daily revision schedule planner'
    ],
    systemPromptGoal: 'Pedagogical tutor leveraging Feynman technique and active recall to solidify deep technical intuition.'
  },
  {
    id: 'ai-text-analyzer',
    title: 'Text & Log Analyzer',
    category: 'Log Forensics',
    status: 'Prototype Pipeline',
    tagline: 'Extracts indicators of compromise (IOCs) from massive raw logs.',
    description: 'Ingests gigabytes of unstructured server logs, auth audits, or threat intelligence feeds, instantly isolating suspicious IP addresses, domains, and attack patterns.',
    techStack: ['Streaming Tokenizer', 'Regex Core', 'Threat Intel API'],
    plannedFeatures: [
      'Automatic IP, domain, and hash extraction',
      'Correlating entries against known threat databases',
      'Summarizing incident timelines in chronological order',
      'Exporting structured JSON & CSV incident reports'
    ],
    systemPromptGoal: 'Digital forensics investigator highlighting anomalous entropy, suspicious command-line flags, and threat indicators.'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'packet-sentinel',
    title: 'Packet Sentinel',
    category: 'CYBERSECURITY',
    tagline: 'Lightweight Network Traffic Sniffer & Anomaly Monitor',
    description: 'A custom packet analysis tool designed to capture raw Ethernet frames, parse IPv4/IPv6 headers, and detect potential port scanning and ARP spoofing activities in real time.',
    features: [
      'Raw socket packet capture on Linux interfaces',
      'Real-time protocol distribution graphing (TCP/UDP/ICMP)',
      'Configurable alert thresholds for SYN flood detection',
      'Automated PCAP file output for Wireshark inspection'
    ],
    technologies: ['C++', 'Python', 'libpcap', 'Linux Sockets', 'Bash'],
    githubUrl: 'https://github.com/areeb/packet-sentinel',
    demoAvailable: true,
    demoType: 'terminal'
  },
  {
    id: 'cyberguard-vault',
    title: 'CyberGuard Vault',
    category: 'C++',
    tagline: 'Zero-Knowledge File Encryptor & Integrity Validator',
    description: 'A high-performance C++ utility implementing AES-256-GCM authenticated encryption with Argon2id password-based key derivation for sensitive file archiving.',
    features: [
      'Hardware-accelerated AES-NI CPU instruction support',
      'Argon2id key derivation with high memory cost against GPU cracking',
      'Cryptographic HMAC SHA-256 integrity checksum verification',
      'Clean CLI interface with progress bar and zero memory leak guarantee'
    ],
    technologies: ['C++20', 'OpenSSL / libsodium', 'CMake', 'Argon2id'],
    githubUrl: 'https://github.com/areeb/cyberguard-vault',
    demoAvailable: true,
    demoType: 'interactive'
  },
  {
    id: 'pyport-scanner',
    title: 'PyPort Recon & Service Fingerprinter',
    category: 'PYTHON',
    tagline: 'Concurrent Multi-Threaded Port Scanner & Banner Grabber',
    description: 'An asynchronous Python reconnaissance tool that scans thousands of ports in seconds, extracts service banners, and flags outdated protocols.',
    features: [
      'Asyncio-powered non-blocking TCP socket engine',
      'Banner grabbing for HTTP, SSH, FTP, and SMTP services',
      'Exportable JSON and HTML audit reports',
      'Subnet scanning with CIDR notation parsing (/24, /16)'
    ],
    technologies: ['Python 3.12', 'asyncio', 'socket', 'rich', 'argparse'],
    githubUrl: 'https://github.com/areeb/pyport-recon',
    demoAvailable: true,
    demoType: 'terminal'
  },
  {
    id: 'neurallog-ai',
    title: 'NeuralLog AI',
    category: 'AI',
    tagline: 'Intelligent Security Log Anomaly Detection System',
    description: 'An AI-powered pipeline that digests thousands of multi-format server logs, normalizes them, and identifies subtle malicious behavior patterns overlooked by static regex rules.',
    features: [
      'Zero-shot anomaly classification for web and auth logs',
      'Automated incident summary generation in natural language',
      'Interactive timeline reconstruction of attacker reconnaissance',
      'Extensible pipeline for cloud and on-premise log forwarders'
    ],
    technologies: ['Python', 'Gemini API', 'Vector Embeddings', 'FastAPI'],
    githubUrl: 'https://github.com/areeb/neurallog-ai',
    demoAvailable: true,
    demoType: 'interactive'
  },
  {
    id: 'threatintel-feed',
    title: 'ThreatIntel Streamer',
    category: 'CYBERSECURITY',
    tagline: 'Automated Threat Intelligence Ingestion & IOC Correlator',
    description: 'A tool that aggregates feeds from AlienVault OTX, AbuseIPDB, and MalwareBazaar, cross-referencing incoming local firewall logs against global threat databases.',
    features: [
      'Automated hourly feed synchronizer with local SQLite cache',
      'IP reputation scoring and country-of-origin resolution',
      'Instant alert notifications via webhook integration',
      'Low memory footprint suitable for edge router deployment'
    ],
    technologies: ['Python', 'SQLite', 'REST APIs', 'Docker'],
    githubUrl: 'https://github.com/areeb/threatintel-streamer',
    demoAvailable: false,
    demoType: 'preview'
  }
];

export const TIMELINE_MILESTONES = [
  {
    phase: '01',
    title: 'Learning Programming Fundamentals',
    focus: 'Logic, Algorithmic Thinking, Computer Architecture',
    desc: 'Began the voyage by deconstructing how computers operate at a binary level, mastering control flow, modular problem decomposition, and algorithmic efficiency.',
    tags: ['Core Logic', 'Data Structures', 'Git']
  },
  {
    phase: '02',
    title: 'C++ Systems Foundations',
    focus: 'Memory, Pointers, Low-Level Efficiency, RAII',
    desc: 'Dived into low-level systems programming in C++. Mastered stack vs heap memory, pointers, references, object-oriented architecture, and resource management.',
    tags: ['C++20', 'Memory Safety', 'Pointers', 'RAII']
  },
  {
    phase: '03',
    title: 'Python Scripting & Automation',
    focus: 'Rapid Tooling, Sockets, Log Analysis, Scripting',
    desc: 'Harnessed Python to automate repetitive tasks, parse unstructured logs, build multi-threaded network scanners, and interface with modern cloud APIs.',
    tags: ['Python', 'Asyncio', 'Automation', 'Sockets']
  },
  {
    phase: '04',
    title: 'Networking Infrastructure',
    focus: 'OSI 7 Layers, TCP/IP, Routing, Switches, Packet Inspection',
    desc: 'Demystified network plumbing: analyzing packet traces in Wireshark, subnetting IPv4/IPv6 networks, understanding routing protocols, and managing firewall rules.',
    tags: ['TCP/IP', 'Wireshark', 'VLANs', 'DNS/DHCP']
  },
  {
    phase: '05',
    title: 'Offensive & Defensive Cybersecurity',
    focus: 'Ethical Hacking, Defense in Depth, SIEM, Cryptography',
    desc: 'Built an isolated virtual home lab with pfSense and Kali Linux. Studied attack vectors (injection, MITM, privilege escalation) to construct robust defensive perimeters.',
    tags: ['PenTesting', 'SIEM', 'Cryptography', 'HomeLab']
  },
  {
    phase: '06',
    title: 'Real-World Practical Projects',
    focus: 'Packet Sentinel, CyberGuard Vault, Open-Source Tools',
    desc: 'Synthesized programming and security knowledge into tangible software: packet sniffers, file encryptors, and automated reconnaissance scanners.',
    tags: ['Production Code', 'Open Source', 'Security Tools']
  },
  {
    phase: '07',
    title: 'AI Systems & Autonomous Security',
    focus: 'Future AI Builder, LLM Agents, Intelligent Anomaly Detection',
    desc: 'Expanding into next-generation AI tooling: training agents for proactive threat analysis, automated code auditing, and building intelligent developer assistants.',
    tags: ['AI Agents', 'Anomaly Detection', 'LLM Architectures']
  }
];
