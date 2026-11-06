import { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  // UNIT 1: Build Your Profile
  {
    id: 'headline',
    unitId: 1,
    unitTitle: 'Build Your Profile',
    unitSubtitle: 'Turn your profile into an opportunity magnet',
    unitColor: 'from-blue-600 to-sky-600',
    title: 'Headline: Your 10-Second Billboard',
    shortTitle: 'Headline',
    duration: '3 min',
    xpReward: 30,
    icon: 'Sparkles',
    tip: {
      title: 'Craft a Headline That Recruiter Algorithms Love',
      summary:
        'Your headline is your #1 search asset on LinkedIn. Don’t just write "Student at XYZ University" — recruiters search for tangible skills and target roles.',
      proTip:
        'Winning Formula: [Current Standing/Major] + [2-3 Key Skills or Focus Areas] + [What You’re Seeking]. Use clean vertical dividers (|) for effortless scanning.',
      badgeText: 'Profile Booster',
      visualMockup: {
        type: 'headline',
        title: 'Strong vs. Weak Headline',
        author: 'Alex Chen',
        body: '❌ "Student at State University seeking opportunities"\n✅ "Junior Business & Communications Major | Digital Marketing & Project Management | Seeking Summer 2027 Internships"',
      },
    },
    quiz: {
      question:
        'Which LinkedIn headline will generate the most recruiter search impressions for an undergraduate looking for a summer internship?',
      options: [
        { id: 'a', text: 'Student at State University seeking entry level roles' },
        {
          id: 'b',
          text: 'Junior Business & Tech Major | Digital Strategy, Analytics & Project Coordination | Seeking Summer 2027 Internships',
        },
        { id: 'c', text: 'Motivated problem solver with big ambitions' },
        { id: 'd', text: 'Hardworking college student looking for work' },
      ],
      correctOptionId: 'b',
      explanation:
        'Option B includes the exact keywords recruiters filter by: student standing (Junior), academic focus, tangible skills (Digital Strategy, Analytics), and clear internship target timing (Summer 2027).',
    },
    practice: {
      prompt:
        'Write a LinkedIn headline for a college student majoring in Business Administration & Communications looking for a summer marketing or project internship.',
      contextHint:
        'Use the formula: [Major / Year] | [2-3 Key Skills/Tools] | [Target Role or Ambition]',
      placeholder:
        'e.g., Sophomore Business & Communications Major | Digital Marketing, Content Strategy & Data Analytics | Seeking Summer 2027 Internships',
      starterSuggestions: [
        'Junior Business Major | Digital Marketing & Analytics | Seeking Summer 2027 Internships',
        'Sophomore Communications Major | Content Creation, PR & Social Media Strategy | Intern Candidate',
        'Undergraduate in Business & Media | Project Management & Market Research | Seeking Opportunities',
      ],
      category: 'headline',
      defaultInput:
        'Sophomore Business Administration & Communications Major | Digital Marketing, Content Strategy & Analytics | Seeking Summer 2027 Internships',
    },
  },

  {
    id: 'about',
    unitId: 1,
    unitTitle: 'Build Your Profile',
    unitSubtitle: 'Turn your profile into an opportunity magnet',
    unitColor: 'from-blue-600 to-sky-600',
    title: 'About Section: Your Personal Story',
    shortTitle: 'About Section',
    duration: '3 min',
    xpReward: 30,
    icon: 'UserCheck',
    tip: {
      title: 'Hook Readers in the First 3 Lines',
      summary:
        'Your About section shouldn’t just repeat your resume bullets. It’s the only place on LinkedIn where you can speak directly in your authentic voice about WHY you love your field.',
      proTip:
        'Structure in 3 bite-sized paragraphs: 1) The Hook (your spark & curiosity), 2) The Proof (recent student leadership or projects), 3) The Invitation (call to connect or collaborate).',
      badgeText: 'Narrative Hook',
      visualMockup: {
        type: 'about',
        title: 'Storytelling Formula',
        author: 'Alex Chen',
        body: 'I am fascinated by how creative strategy and data-driven communication bring communities together. On campus, I lead student event coordination and help student organizations grow their digital presence.\n\nWhen I am not organizing campus workshops, you can find me reading about emerging brand trends. Always excited to connect with alumni, mentors, and fellow student leaders: alex@university.edu',
      },
    },
    quiz: {
      question:
        'What is the most common mistake college students make when writing their LinkedIn "About" section?',
      options: [
        { id: 'a', text: 'Writing in first-person voice ("I love building...")' },
        { id: 'b', text: 'Pasting their entire resume into one dense, unformatted block of text' },
        { id: 'c', text: 'Mentioning student clubs and campus leadership' },
        { id: 'd', text: 'Listing their university email or portfolio link' },
      ],
      correctOptionId: 'b',
      explanation:
        'Recruiters review profiles on mobile screens in under 30 seconds. A giant wall of resume text is unreadable; breaking it into 2-3 clean, conversational paragraphs makes it shine.',
    },
    practice: {
      prompt:
        'Draft a 2–3 sentence About summary for an undergraduate student who loves campus leadership, event planning, and data-driven problem solving.',
      contextHint:
        'Mention your academic focus, one tangible campus highlight, and a friendly invite to connect.',
      placeholder:
        'e.g., I am an undergraduate student passionate about bridging creative communication and data analytics. On campus, I organize student leadership summits and manage digital outreach for 1,200+ attendees. Always open to connecting with fellow student builders and mentors!',
      starterSuggestions: [
        'Undergraduate studying Business & Media obsessed with turning ideas into community impact.',
        'Organized 4 campus initiatives reaching 1,200+ students. Passionate about project coordination.',
        'Feel free to connect or message me to chat about campus initiatives and emerging trends!',
      ],
      category: 'about',
      defaultInput:
        'I am an undergraduate student passionate about bridging creative strategy and data analytics. On campus, I organize student workshops and manage digital campaigns reaching 1,200+ attendees. Always excited to connect with alumni, mentors, and fellow student leaders!',
    },
  },

  // UNIT 2: Networking
  {
    id: 'connection-alum',
    unitId: 2,
    unitTitle: 'Networking',
    unitSubtitle: 'Connect with alumni & recruiters without being awkward',
    unitColor: 'from-indigo-600 to-blue-700',
    title: 'Connection Note to an Alum',
    shortTitle: 'Alum Message',
    duration: '3 min',
    xpReward: 35,
    icon: 'Send',
    tip: {
      title: 'Warm Up Cold Outreach with Shared College Bonds',
      summary:
        'Blank LinkedIn connection requests get ignored 88% of the time. A personalized 300-character note citing shared university roots boosts acceptance above 70%.',
      proTip:
        'Never ask for a job or referral in message #1! Ask for a brief 15-minute perspective chat or advice on how they transitioned from campus to their current team.',
      badgeText: 'High Response Rate',
      visualMockup: {
        type: 'connection',
        title: '300-Character Note',
        author: 'Sarah Lin (Associate Brand Manager)',
        body: 'Hi Sarah! I am a sophomore at your alma mater studying communications and business. I was really inspired by your career transition and recent team campaigns! If your schedule ever permits, I would love to connect and follow your updates.',
      },
    },
    quiz: {
      question:
        'When sending a first-time connection request to an alumnus at your dream company, which approach gets the highest reply rate?',
      options: [
        { id: 'a', text: 'Send no note so you don’t bother them with reading' },
        { id: 'b', text: 'Immediately ask if they can submit an internal employee referral for a job' },
        {
          id: 'c',
          text: 'Cite your shared university affiliation and ask for one specific piece of career perspective',
        },
        { id: 'd', text: 'Paste your full resume and cover letter directly into the message' },
      ],
      correctOptionId: 'c',
      explanation:
        'Alumni love giving back to their alma mater when approached respectfully! Building a genuine connection first makes opportunities follow naturally later.',
    },
    practice: {
      prompt:
        'Write a personalized LinkedIn connection note (under 300 characters) to an alum from your college who is now working as a Project Lead or Brand Specialist at a top company.',
      contextHint:
        'Include: 1) The college connection, 2) Specific compliment on their work, 3) Polite low-friction ask.',
      placeholder:
        'Hi [Name]! Saw you graduated from [College] and are now at [Company]. As a sophomore studying business and communications, I really admire your team’s recent work. Would love to connect and follow your journey!',
      starterSuggestions: [
        'Hi Sarah! As a fellow student at your alma mater, I really admire your career trajectory.',
        'Would love to connect and follow your updates as I prepare for summer internship applications!',
        'Fellow alum here! Inspired by your transition from campus to your current role. Would love to connect.',
      ],
      category: 'connection',
      defaultInput:
        'Hi Sarah! Saw you also graduated from our university and are now at Adobe. As a sophomore studying communications, I really admire your team’s recent campaigns. Would love to connect and follow your updates!',
    },
  },

  {
    id: 'follow-up-fair',
    unitId: 2,
    unitTitle: 'Networking',
    unitSubtitle: 'Connect with alumni & recruiters without being awkward',
    unitColor: 'from-indigo-600 to-blue-700',
    title: 'Following Up After a Career Fair',
    shortTitle: 'Career Fair Follow-up',
    duration: '3 min',
    xpReward: 35,
    icon: 'MailCheck',
    tip: {
      title: 'The 24-Hour Career Fair Follow-up Secret',
      summary:
        'Recruiters meet over 150 students in 4 noisy hours. If you don’t follow up within 24–48 hours with a specific memory hook, your resume gets buried in the pile.',
      proTip:
        'Mention one exact thing you talked about at the table (e.g., "our conversation about your team’s rotational internship program" or "the advice you gave about student leadership projects").',
      badgeText: 'Recruiter Recall',
      visualMockup: {
        type: 'followup',
        title: 'Booth Follow-up Message',
        author: 'Recruiter Maria (Target)',
        body: 'Hi Maria! It was great meeting you at the campus career fair today. I loved hearing about your company’s summer leadership program and team mentorship culture. I have submitted my application online and would love to stay connected here!',
      },
    },
    quiz: {
      question:
        'What detail is most effective to include in a follow-up message to a recruiter you met at a busy university career fair?',
      options: [
        { id: 'a', text: 'A complaint about the long lines at their table' },
        { id: 'b', text: 'A specific topic, project, or tip you mutually discussed during your booth chat' },
        { id: 'c', text: 'Asking when you can expect your first paycheck' },
        { id: 'd', text: 'Sending the exact same generic template to 20 different booth reps' },
      ],
      correctOptionId: 'b',
      explanation:
        'A specific memory hook instantly triggers the recruiter’s recall ("Oh, that was the student who asked about our cross-department rotational mentorship!") and separates you from 150 generic messages.',
    },
    practice: {
      prompt:
        'Write a LinkedIn follow-up note to recruiter Sarah after chatting at your campus career fair about her company’s summer internship and leadership development program.',
      contextHint:
        'Reference meeting at the campus fair, mention the leadership program topic, confirm you applied, and express enthusiasm.',
      placeholder:
        'Hi Sarah! It was fantastic speaking with you at the campus career fair today. Our chat about your company’s summer leadership program got me even more excited to apply. I just submitted my application online and would love to stay connected here!',
      starterSuggestions: [
        'Hi Sarah! Really enjoyed speaking with you at the campus career fair today.',
        'Our conversation about your company’s internship program was the highlight of my afternoon.',
        'I officially applied for the summer internship role. Would love to stay connected here!',
      ],
      category: 'followup',
      defaultInput:
        'Hi Sarah! Great chatting with you at the campus career fair today. Loved hearing about your company’s summer leadership internship program. I just submitted my application online and would love to stay connected here!',
    },
  },

  // UNIT 3: Posting & Commenting
  {
    id: 'commenting',
    unitId: 3,
    unitTitle: 'Posting & Commenting',
    unitSubtitle: 'Build thought leadership before you even graduate',
    unitColor: 'from-cyan-600 to-blue-700',
    title: 'Commenting on an Industry Post',
    shortTitle: 'High-Value Comments',
    duration: '3 min',
    xpReward: 40,
    icon: 'MessageSquareText',
    tip: {
      title: 'Comments are the Highest-ROI Growth Hack',
      summary:
        'You don’t need 10,000 followers to be noticed. Leaving insightful comments on posts by leaders at target companies puts your profile in front of hiring managers.',
      proTip:
        'Replace dead-end comments ("Great post! 🙌" or "Agreed!") with the 3-part Value Formula: 1) Validate the author’s point, 2) Share a real personal observation or student project takeaway, 3) Ask a genuine follow-up question.',
      badgeText: 'Engagement Magnet',
      visualMockup: {
        type: 'comment',
        title: 'Insightful Comment Example',
        author: 'Alex Chen',
        body: 'Spot on about team alignment. In our campus student association, instituting 10-minute async project briefs reduced miscommunication by half across 6 committees. How do you maintain that clarity as cross-functional teams expand?',
      },
    },
    quiz: {
      question:
        'Which LinkedIn comment is most likely to earn you profile views from hiring managers and industry professionals?',
      options: [
        { id: 'a', text: 'CFBR (Commenting for better reach) 🚀' },
        { id: 'b', text: '100% agreed! Thanks for sharing this valuable insight.' },
        {
          id: 'c',
          text: 'Point #2 on proactive cross-team communication really resonated—in our student organization we started 15-minute weekly alignment syncs and cut project delays significantly. How do you structure those check-ins for remote teams?',
        },
        { id: 'd', text: 'Hey check out my portfolio link in my bio!' },
      ],
      correctOptionId: 'c',
      explanation:
        'Option C contributes fresh value to the public conversation, shows real-world curiosity and team experience, and ends with a thoughtful question that invites the author to reply.',
    },
    practice: {
      prompt:
        'A Director posted: "The #1 differentiator for college graduates entering the workforce isn’t just technical knowledge—it’s proactive communication and cross-team collaboration." Write a thoughtful, respectful 2-sentence comment sharing a student perspective.',
      contextHint:
        'Acknowledge the author’s point and share how communication in team projects or student orgs made a noticeable difference.',
      placeholder:
        'Completely agree that clear communication across teams makes all the difference. In our campus projects, introducing 10-minute weekly alignment syncs helped our team avoid duplicate work and meet every milestone. How do you advise interns practice this on day one?',
      starterSuggestions: [
        'Completely agree that proactive communication is what makes student teams thrive.',
        'In our campus group projects, regular alignment check-ins made collaboration so much smoother.',
        'How do you recommend undergraduates best demonstrate strong collaboration skills during interviews?',
      ],
      category: 'comment',
      defaultInput:
        'Completely agree that clear communication across teams makes all the difference. In our campus projects, introducing quick 10-minute weekly alignment syncs helped our team avoid duplicate work and hit our goals on time. How do you suggest students practice this in their first internship?',
    },
  },

  {
    id: 'class-project',
    unitId: 3,
    unitTitle: 'Posting & Commenting',
    unitSubtitle: 'Build thought leadership before you even graduate',
    unitColor: 'from-cyan-600 to-blue-700',
    title: 'Describing a Class Project',
    shortTitle: 'Project Showcase',
    duration: '3 min',
    xpReward: 40,
    icon: 'Presentation',
    tip: {
      title: 'Turn Coursework into a Real-World Problem Showcase',
      summary:
        'Recruiters don’t care about "Assignment #4". They care about how you identify real human problems, coordinate with teammates, and deliver measurable outcomes.',
      proTip:
        'Use the PAR Framework: Problem (the campus or user struggle), Action (what your team designed and tools used), Result (metrics, user feedback, or key operational takeaways).',
      badgeText: 'Recruiter Gold',
      visualMockup: {
        type: 'project',
        title: 'Project Post Structure',
        author: 'Alex Chen',
        body: 'Over the past semester, our student team noticed first-year students struggled to locate campus tutoring resources and study groups.\n\nSo we designed CampusStudy — a centralized student hub for peer study group matching.\n\nKey takeaways:\n• Reached 350+ active student signups across 12 academic departments\n• Coordinated 80+ weekly peer review sessions\n• Learned how crucial user feedback is for rapid iteration!\n\nCheck out our project summary in the comments below! 👇',
      },
    },
    quiz: {
      question:
        'What is the best way to title a university course project on LinkedIn so it reads like an impactful initiative?',
      options: [
        { id: 'a', text: 'MGMT 301 Final Group Project - Team 3' },
        {
          id: 'b',
          text: 'CampusStudy: Peer Tutoring & Resource Hub (Coordinated 350+ Student Users Across 12 Departments)',
        },
        { id: 'c', text: 'School Homework on Management Strategy' },
        { id: 'd', text: 'Group Project Presentation' },
      ],
      correctOptionId: 'b',
      explanation:
        'Option B gives the project an identity ("CampusStudy"), states the problem solved, and provides tangible social proof / impact metrics (350+ Student Users Across 12 Departments).',
    },
    practice: {
      prompt:
        'Write a 3-bullet project showcase post describing a university group project where your team created a campus study and peer resource platform used by 350+ students.',
      contextHint:
        'Include: 1) The Problem identified, 2) The Solution your team executed, 3) Tangible user impact or metric.',
      placeholder:
        '• Problem: First-year students had difficulty connecting for peer study groups across large lecture classes.\n• Solution: Our team developed CampusStudy, an organized directory for peer review and exam prep.\n• Result: Facilitated 80+ weekly study sessions and engaged 350+ students across 12 departments in our first semester!',
      starterSuggestions: [
        '• Problem: Undergraduates struggled to organize study groups in large lectures.',
        '• Solution: Built CampusStudy, a community resource platform for peer study matching.',
        '• Result: Reached 350+ active student signups and 80+ organized study sessions in month one!',
      ],
      category: 'project',
      defaultInput:
        '• The Problem: Undergraduates in large lecture courses struggled to find consistent peer study partners.\n• The Solution: Our team created CampusStudy, a student resource directory with automated study group scheduling.\n• The Result: Connected 350+ students across 12 departments and facilitated 80+ weekly study sessions in semester one!',
    },
  },
];
