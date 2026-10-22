import type { EventItem } from '../types';

export const demoEventsData: EventItem[] = [
  {
    id: 'demo-ai-sprint-2026',
    title: 'INNOVANTA AI Builders Sprint',
    tagline: 'Rapid Prototype Weekend: From Transformers to Deployed Agents',
    category: 'AI & Tech',
    status: 'open',
    date: 'Sample Date: Nov 28, 2026',
    time: '10:00 AM – 6:00 PM IST',
    venue: 'Campus Innovation Center & Virtual Discord Stage',
    locationType: 'hybrid',
    description:
      'A hands-on intensive sprint exploring autonomous agent architectures, local LLMs, and real-world retrieval workflows.',
    fullDescription:
      'The INNOVANTA AI Builders Sprint is a weekend build-a-thon designed for student engineers and researchers eager to take AI beyond chatbots. Teams collaborate to build functional AI prototypes addressing real campus or social problems, mentored by senior student researchers and industry mentors.',
    registrationDeadline: 'Registration Closes: Nov 24, 2026 (Demo)',
    registrationUrl: '', // Configurable URL
    posterGradient: 'from-purple-900/60 via-purple-600/30 to-slate-900/80',
    isFeatured: true,
    isDemo: true,
    prerequisites: [
      'Basic familiarity with Python or JavaScript/TypeScript',
      'Curiosity for intelligent systems & APIs',
      'Laptop with Node.js / Python environment',
    ],
    takeaways: [
      'Production-ready starter templates for AI agents',
      'Peer review and hands-on architecture mentorship',
      'Opportunity to incubate your project in INNOVANTA Labs',
    ],
    agenda: [
      { time: '10:00 AM', title: 'Keynote & Challenge Briefing', description: 'Deconstructing modern AI agent workflows.' },
      { time: '11:30 AM', title: 'Team Formation & Ideation', description: 'Pitching problem statements and sprint scoping.' },
      { time: '01:30 PM', title: 'Build Block I: Core Architecture', description: 'Fast prototyping with live mentor office hours.' },
      { time: '04:30 PM', title: 'Build Block II: UX & Edge Cases', description: 'Testing edge cases and crafting final presentations.' },
      { time: '05:30 PM', title: 'Showcase & Feedback Circles', description: 'Lightning 3-minute demos and community voting.' },
    ],
    speakers: [
      { name: 'Student Tech Lead', role: 'AI Track Mentor', org: 'INNOVANTA Ecosystem' },
      { name: 'Guest Practitioner', role: 'ML Systems Engineer', org: 'Partner Tech Studio' },
    ],
  },
  {
    id: 'demo-genesis-hackathon',
    title: 'INNOVANTA Genesis 48h Hackathon',
    tagline: 'Manifest Solutions. Build Prototypes. Impact Communities.',
    category: 'Innovation & Hackathons',
    status: 'coming-soon',
    date: 'Sample Date: Dec 12–14, 2026',
    time: '48 Hours Continuous',
    venue: 'Main University Amphitheater & Online Portal',
    locationType: 'hybrid',
    description:
      'Our flagship student hackathon uniting coders, designers, hardware hobbyists and founders across multidisciplinary tracks.',
    fullDescription:
      'Genesis is INNOVANTA’s marquee annual challenge. Over 48 hours, student teams tackle challenges across climate-tech, healthcare, fintech, accessibility, and autonomous tools. Featuring deep mentorship, midnight workshops, and live project pitching.',
    registrationDeadline: 'Applications Open Soon',
    registrationUrl: '',
    posterGradient: 'from-amber-900/60 via-orange-600/30 to-slate-900/80',
    isFeatured: true,
    isDemo: true,
    prerequisites: [
      'Open to all students across all academic branches',
      'Solo innovators or teams of 2 to 4 members',
    ],
    takeaways: [
      'Direct pipeline to seed funding & incubator partners',
      'Exclusive INNOVANTA builder swag & cloud credits',
      'Featured showcase on the community hall of fame',
    ],
    agenda: [
      { time: 'Day 1 - 06:00 PM', title: 'Opening Ceremony', description: 'Theme reveal, rules, and problem statement release.' },
      { time: 'Day 2 - 11:00 AM', title: 'Checkpoint Mentoring', description: '1-on-1 architecture review with industry engineers.' },
      { time: 'Day 3 - 03:00 PM', title: 'Code Freeze & Judging', description: 'Interactive demo exhibition and jury evaluations.' },
    ],
    speakers: [
      { name: 'Ecosystem Lead', role: 'Hackathon Director', org: 'INNOVANTA' },
      { name: 'Alumni Founder', role: 'Keynote Speaker', org: 'NextGen Ventures' },
    ],
  },
  {
    id: 'demo-founder-masterclass',
    title: 'From Repo to Revenue: Student Founder Workshop',
    tagline: 'Practical Product Validation, Unit Economics & Pitching',
    category: 'Entrepreneurship',
    status: 'open',
    date: 'Sample Date: Dec 05, 2026',
    time: '4:00 PM – 6:30 PM IST',
    venue: 'Innovation Hub Seminar Hall',
    locationType: 'in-person',
    description:
      'A no-nonsense masterclass breaking down customer discovery, minimum viable products, and campus startup grant applications.',
    fullDescription:
      'Many great student projects stay on GitHub forever. This masterclass bridges the gap between technical execution and startup viability. Learn how to discover paying users, structure pilot programs, and present cleanly to student venture funds.',
    registrationDeadline: 'Limited to 60 seats (Demo)',
    registrationUrl: '',
    posterGradient: 'from-violet-900/60 via-indigo-700/30 to-amber-950/60',
    isFeatured: true,
    isDemo: true,
    prerequisites: ['Anyone with a project idea or current working prototype'],
    takeaways: [
      'Pitch deck structure template used by YC student founders',
      'Validation interview framework checklist',
      'Direct Q&A with venture scouts',
    ],
    agenda: [
      { time: '04:00 PM', title: 'The Student Founder Playbook', description: 'Validating real demand before building complex infrastructure.' },
      { time: '04:50 PM', title: 'Interactive Tear-Downs', description: 'Live review of 3 volunteer student project pitch decks.' },
      { time: '05:40 PM', title: 'Open Floor & Networking', description: 'Founder mixer with coffee and project matchmaking.' },
    ],
    speakers: [
      { name: 'Venture Partner', role: 'Seed Stage Investor', org: 'Student Founders Fund' },
    ],
  },
  {
    id: 'demo-paper-symposium',
    title: 'Research Reading: Frontier AI Architectures',
    tagline: 'Critical Paper Review, Reproducibility & Open Questions',
    category: 'Research & Papers',
    status: 'completed',
    date: 'Sample Past Date: Oct 18, 2026',
    time: 'Concluded Event',
    venue: 'Virtual Research Room',
    locationType: 'online',
    description:
      'An academic deep dive reviewing recent attention mechanisms, state-space models (Mamba), and multimodal alignment.',
    fullDescription:
      'In this inaugural research circle, 45 student researchers gathered to analyze preprint architectures, evaluate benchmark claims, and run reproduction code scripts in collaborative notebooks.',
    posterGradient: 'from-slate-900 via-purple-950/40 to-slate-950',
    isFeatured: false,
    isDemo: true,
    highlights: [
      'Reviewed 3 key preprints on efficient state-space architectures',
      '45 student researchers participated across 6 university departments',
      'Collaborative repository published with annotated PyTorch snippets',
      'Interactive Q&A on research methodology and paper publishing',
    ],
    agenda: [
      { time: '05:00 PM', title: 'Paper Breakdown', description: 'Mathematical breakdown of state-space formulations.' },
      { time: '05:45 PM', title: 'Notebook Code Walkthrough', description: 'Live PyTorch inspection of token mixing layers.' },
      { time: '06:30 PM', title: 'Open Debate & Synthesis', description: 'Discussion of compute trade-offs and future directions.' },
    ],
  },
  {
    id: 'demo-design-systems-lab',
    title: 'Modern UI/UX Systems for Engineers',
    tagline: 'Bridging Design Tokens, Accessibility & Component Architecture',
    category: 'Workshop & Hands-on',
    status: 'completed',
    date: 'Sample Past Date: Sep 30, 2026',
    time: 'Concluded Event',
    venue: 'Interactive Computing Studio',
    locationType: 'in-person',
    description:
      'Engineering beautiful, accessible frontend experiences with custom design tokens, micro-interactions and smooth performance.',
    fullDescription:
      'A practical 3-hour workshop where student developers learned to translate Figma variables into production-grade CSS variables, handle WCAG color contrast standards, and animate without degrading framerates.',
    posterGradient: 'from-orange-950/60 via-amber-900/30 to-purple-950/60',
    isFeatured: false,
    isDemo: true,
    highlights: [
      'Built a complete dark-mode design system from scratch',
      '70+ attendees with 100% completion rate for the hands-on lab',
      'Hands-on accessibility audit using screen-reader simulation',
    ],
    agenda: [
      { time: '03:00 PM', title: 'Design Token Fundamentals', description: 'Color harmony, semantic variables and typography scales.' },
      { time: '04:00 PM', title: 'Building the Component Library', description: 'Buttons, modals, cards and accessible focus traps.' },
      { time: '05:15 PM', title: 'Critique & Polish', description: 'Code review of participant implementations.' },
    ],
  },
  {
    id: 'demo-innovanta-launch-mixer',
    title: 'INNOVANTA Ecosystem Inception Mixer',
    tagline: 'Uniting Builders, Thinkers & Pioneers Across Disciplines',
    category: 'Community & Keynote',
    status: 'completed',
    date: 'Sample Past Date: Sep 10, 2026',
    time: 'Concluded Event',
    venue: 'Main Campus Quadrangle & Live Stream',
    locationType: 'hybrid',
    description:
      'The inaugural community gathering unveiling INNOVANTA’s core vision, pillars, upcoming sprints, and open team recruitment.',
    fullDescription:
      'The formal unveiling of INNOVANTA to the university and regional community. Over 200 passionate students, faculty mentors, and startup ecosystem leaders gathered to celebrate student-led innovation.',
    posterGradient: 'from-purple-950/80 via-indigo-900/40 to-amber-950/60',
    isFeatured: false,
    isDemo: true,
    highlights: [
      'Official community launch attended by 200+ student innovators',
      'Unveiling of the MANIFEST. BUILD. IMPACT. charter',
      '6 collaborative project tracks initiated on day one',
    ],
    agenda: [
      { time: '04:30 PM', title: 'The Vision Keynote', description: 'Why student innovation ecosystems matter now more than ever.' },
      { time: '05:15 PM', title: 'Pillars Showcase', description: 'Presenting Technology, Research, Entrepreneurship & Outreach.' },
      { time: '06:00 PM', title: 'Community Networking & Mixer', description: 'Connecting across majors over coffee and demo stations.' },
    ],
  },
];
