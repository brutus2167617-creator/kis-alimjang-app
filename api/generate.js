import https from 'https';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prompt, maxTokens } = req.body;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API 키 없음' });

  const body = JSON.stringify({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: maxTokens || 1200,
    messages: [{ role: 'user', content: prompt }]
  });

  const options = {
    hostname: 'api.anthropic.com',
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Length': Buffer.byteLength(body, 'utf8')
    }
  };

  return new Promise((resolve) => {
    const request = https.request(options, (response) => {
      let chunks = [];
response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => {
        try {
          const data = Buffer.concat(chunks).toString('utf8');
const parsed = JSON.parse(data);
          if (parsed.error) {
            res.status(500).json({ error: parsed.error.message });
          } else {
            const text = parsed.content.map(i => i.text || '').join('\n');
            res.status(200).json({ text });
          }
        } catch(e) {
          res.status(500).json({ error: e.message });
        }
        resolve();
      });
    });
    request.on('error', (e) => {
      res.status(500).json({ error: e.message });
      resolve();
    });
    request.write(body);
    request.end();
  });
}
