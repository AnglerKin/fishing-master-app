export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const WW_KEY = process.env.WILLYWEATHER_KEY;
    if (!WW_KEY) {
      return res.status(500).json({ error: "环境变量 WILLYWEATHER_KEY 未配置" });
    }
    const targetUrl = new URL(req.query.url);
    targetUrl.searchParams.set("key", WW_KEY);

    const resp = await fetch(targetUrl.toString());
    const data = await resp.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
