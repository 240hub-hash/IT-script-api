export default function handler(req, res) {
    const userAgent = req.headers['user-agent'] || '';

    // บล็อกการเข้าจากเบราว์เซอร์ปกติ
    if (!userAgent.includes('Roblox')) {
        return res.status(403).send('<h1 style="color:red;">403 Forbidden</h1><p>Direct browser access is strictly prohibited.</p>');
    }

    const { id } = req.query;

    // คลังสคริปต์ลับ (สามารถเพิ่ม ID และ โค้ด Lua ตรงนี้ได้เรื่อยๆ)
    const privateScripts = {
        "sc_9f81a2": `print("สคริปต์ทำงานสำเร็จจาก Vercel Private API!")`
    };

    const scriptContent = privateScripts[id];

    if (!scriptContent) {
        return res.status(404).send('-- Script ID not found');
    }

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    return res.status(200).send(scriptContent);
}
