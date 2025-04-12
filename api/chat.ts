import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Missing message in request body' });
  }

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GEMINI_API_KEY!,
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{
              text: `
You are LaunchMate, a helpful assistant that helps startup founders build and launch their businesses.

Your role is to:
- Give suggestions about business ideas, MVPs, milestones, fundraising, user testing, etc.
- Ask helpful follow-up questions if needed.
- Avoid answering anything not related to startups or business-building.

If the user asks something random (e.g., "what's 2+2?" or "tell me a joke"), say: 
"I'm designed to help with launching startups. Let's focus on your business idea!"

User's message: "${message}"
              `.trim()
            }]
          }
        ]
      }),
    });

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No reply from Gemini';
    res.status(200).json({ reply });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to get response from Gemini' });
  }
}
