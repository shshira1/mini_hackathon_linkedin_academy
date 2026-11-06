import { GoogleGenAI, Type } from '@google/genai';

export interface EvaluationRequest {
  lessonTitle: string;
  taskPrompt: string;
  userAnswer: string;
}

export interface EvaluationResult {
  score: number;
  passed: boolean;
  praise: string;
  improvement: string;
  improvedExample: string;
  isAiGenerated: boolean;
}

export async function evaluateTask(data: EvaluationRequest): Promise<EvaluationResult> {
  const { lessonTitle, taskPrompt, userAnswer } = data;
  const trimmed = (userAnswer || '').trim();

  // Strict check: if input is too short, trivial, or gibberish (e.g. "hello my name is bob")
  if (isTrivialOrLowEffort(trimmed)) {
    return generateLowEffortFeedback(lessonTitle, taskPrompt, trimmed);
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Evaluate this college student's LinkedIn writing practice strictly against professional standards.
Topic: ${lessonTitle}
Assignment Prompt: ${taskPrompt}
Student's Submitted Text: "${trimmed}"`,
        config: {
          systemInstruction: `You are a strict, constructive collegiate career coach at LinkedIn Academy.
Your grading must be rigorous and hold students to genuine professional standards:

SCORING CRITERIA (Scale 1 to 10. Minimum passing score is 7):
- Score 1 to 4 (FAIL): Low effort, off-topic, simple greeting (e.g. "hello my name is bob"), joke, gibberish, or lacking essential keywords.
- Score 5 to 6 (FAIL / NEEDS REVISION): Attempted the assignment, but missing major components (e.g., no skills mentioned, no university standing, or unformatted).
- Score 7 to 8 (PASS): Good, solid response meeting core formula requirements.
- Score 9 to 10 (PASS / EXCELLENT): Outstanding, polished, keyword-rich LinkedIn copy ready for recruiters.

CRITICAL INSTRUCTION FOR EXAMPLES:
- Keep all examples relatable and generic to any college student (e.g., Business, Communications, Marketing, Psychology, Design, or general undergrad).
- DO NOT use niche FinTech, algorithmic trading, quantitative finance, or hyper-specific software dev references unless explicitly requested in the prompt.

OUTPUT FORMAT (JSON):
- score: Integer between 1 and 10.
- praise: Exactly one sentence acknowledging any positive element (even for low scores, praise taking the step or keeping it friendly).
- improvement: Exactly one clear, actionable instruction explaining what must be added or changed to achieve a passing score.
- improvedExample: A polished, high-scoring (9-10/10) professional version suited for a typical undergraduate student.`,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER, description: 'Integer score between 1 and 10' },
              praise: { type: Type.STRING, description: 'One sentence of constructive praise' },
              improvement: { type: Type.STRING, description: 'One specific actionable suggestion to pass' },
              improvedExample: { type: Type.STRING, description: 'Polished generic student version' },
            },
            required: ['score', 'praise', 'improvement', 'improvedExample'],
          },
        },
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        const score = Math.min(10, Math.max(1, Number(parsed.score) || 5));
        return {
          score,
          passed: score >= 7,
          praise: parsed.praise || 'Good effort taking the initiative to write this draft!',
          improvement:
            parsed.improvement ||
            'Include your field of study, 2-3 specific skills, and your target opportunity.',
          improvedExample: parsed.improvedExample || getGenericImprovedExample(lessonTitle),
          isAiGenerated: true,
        };
      }
    } catch (err) {
      console.error('Gemini API evaluation failed, using intelligent strict fallback:', err);
    }
  }

  // Strict heuristic evaluation fallback
  return generateStrictHeuristicFeedback(lessonTitle, taskPrompt, trimmed);
}

function isTrivialOrLowEffort(text: string): boolean {
  if (text.length < 20) return true;
  const lower = text.toLowerCase().trim();
  const trivialPhrases = [
    'hello my name is',
    'hi my name is',
    'hello world',
    'test',
    'asdf',
    'i am a student',
    'hey there',
    'placeholder',
    'my name is bob',
  ];
  return trivialPhrases.some((phrase) => lower.includes(phrase)) && text.length < 40;
}

function generateLowEffortFeedback(
  lessonTitle: string,
  taskPrompt: string,
  userAnswer: string
): EvaluationResult {
  return {
    score: 3,
    passed: false,
    praise: 'You tested out the input box, which is a start!',
    improvement:
      'A simple greeting or name alone will not work on LinkedIn. Use the 3-part formula: [Major / Year] | [Core Skills] | [Target Internship or Goal].',
    improvedExample: getGenericImprovedExample(lessonTitle),
    isAiGenerated: false,
  };
}

function getGenericImprovedExample(lessonTitle: string): string {
  switch (lessonTitle.toLowerCase()) {
    case 'headline':
      return 'Sophomore Business & Communications Major | Digital Marketing & Project Management | Seeking Summer 2027 Internships';
    case 'about section':
      return 'I am an undergraduate student passionate about bridging creative strategy and data-driven problem solving. On campus, I organize student leadership workshops and manage digital outreach for student organizations.\n\nAlways eager to connect with alumni, mentors, and fellow student leaders!';
    case 'connection request to an alum':
      return 'Hi Sarah! I am a sophomore at your alma mater studying communications. I really admire your career trajectory and team leadership. If your schedule ever permits, I would love to connect and follow your updates!';
    case 'following up after a career fair':
      return 'Hi Michael! It was great meeting you at the campus career fair today. I really enjoyed hearing about your company culture and the growth opportunities in your summer internship program. I submitted my application online and would love to stay connected here!';
    case 'commenting on a post':
      return 'Great insight on cross-functional communication! In our student project team, setting up 10-minute weekly syncs reduced project misalignment significantly. How do you maintain that clarity as team sizes scale?';
    case 'describing a class project':
      return '• Problem: Students struggled to find peer study groups across large campus lecture courses.\n• Solution: Developed CampusStudy, a web hub for student peer collaboration and shared study guides.\n• Impact: Reached 350+ active student signups and organized 80+ weekly study sessions in our first semester!';
    default:
      return 'Undergraduate Student | Team Leadership, Research & Analysis | Seeking Summer Opportunities';
  }
}

function generateStrictHeuristicFeedback(
  lessonTitle: string,
  taskPrompt: string,
  userAnswer: string
): EvaluationResult {
  const trimmed = userAnswer.trim();
  const length = trimmed.length;

  // Strict check on length and structure
  if (length < 30) {
    return {
      score: 4,
      passed: false,
      praise: 'You began putting your thoughts into words!',
      improvement:
        'This draft is too brief to catch recruiter attention. Add specific skills, tools, or quantifiable details to reach a passing score of 7+.',
      improvedExample: getGenericImprovedExample(lessonTitle),
      isAiGenerated: false,
    };
  }

  // Check for separators or substantive keywords
  const hasDividers = trimmed.includes('|') || trimmed.includes('•') || trimmed.includes('-');
  const hasGoalWords = /intern|seeking|passion|connect|major|sophomore|junior|senior|project/i.test(
    trimmed
  );

  if (!hasDividers && !hasGoalWords && length < 55) {
    return {
      score: 5,
      passed: false,
      praise: 'Good conversational start, but it needs more professional structure.',
      improvement:
        'Separate your university year, top 2-3 hard or soft skills, and what you are seeking to make it easily skimmable.',
      improvedExample: getGenericImprovedExample(lessonTitle),
      isAiGenerated: false,
    };
  }

  // Passed: solid effort
  const score = length > 80 && hasGoalWords ? 9 : 8;

  switch (lessonTitle.toLowerCase()) {
    case 'headline':
      return {
        score,
        passed: true,
        praise: 'Terrific job framing your student standing and career interests clearly!',
        improvement:
          'Ensure your top keyword skills (e.g. data analysis, digital marketing, or project coordination) appear in the first 60 characters.',
        improvedExample: trimmed.includes('|')
          ? trimmed
          : `${trimmed} | Project Management & Communications | Seeking Summer 2027 Internships`,
        isAiGenerated: false,
      };

    case 'about section':
      return {
        score,
        passed: true,
        praise: 'Engaging, authentic student narrative that feels approachable and professional!',
        improvement:
          'End with a welcoming call-to-action inviting fellow students, alumni, and recruiters to connect.',
        improvedExample: `${trimmed}\n\nAlways open to connecting with fellow student builders and alumni!`,
        isAiGenerated: false,
      };

    case 'connection request to an alum':
      return {
        score,
        passed: true,
        praise: 'Respectful, warm tone that honors the shared university connection!',
        improvement:
          'Keep your ask light and low-friction, focusing on learning from their journey rather than asking for job favors.',
        improvedExample: trimmed,
        isAiGenerated: false,
      };

    case 'following up after a career fair':
      return {
        score,
        passed: true,
        praise: 'Prompt, professional follow-up that reinforces your interest in their company!',
        improvement:
          'Mentioning one exact conversation detail from their booth helps recruiters immediately recall meeting you.',
        improvedExample: trimmed,
        isAiGenerated: false,
      };

    case 'commenting on a post':
      return {
        score,
        passed: true,
        praise: 'Insightful comment that adds real value to the discussion instead of a generic compliment!',
        improvement:
          'Adding a thoughtful question at the conclusion encourages the post author to reply and visit your profile.',
        improvedExample: `${trimmed} How do you recommend students approach this during internships?`,
        isAiGenerated: false,
      };

    case 'describing a class project':
      return {
        score,
        passed: true,
        praise: 'Strong demonstration of problem-solving and student project execution!',
        improvement:
          'Adding a measurable outcome (e.g., number of student users, test scores, or efficiency gain) makes your impact tangible.',
        improvedExample: trimmed,
        isAiGenerated: false,
      };

    default:
      return {
        score,
        passed: true,
        praise: 'Clear, well-crafted professional draft that hits the core objective!',
        improvement: 'Incorporate 1-2 specific industry keywords to improve search discoverability.',
        improvedExample: trimmed,
        isAiGenerated: false,
      };
  }
}
