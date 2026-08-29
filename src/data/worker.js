/**
 * Cloudflare Worker Backend API (ES Module)
 * 用于连接 Supabase REST API 查询当前活跃的 Apple ID 共享账号
 */

export default {
  async fetch(request, env, ctx) {
    // 1. 设置通用的 CORS 跨域响应头，允许所有域名发起 Fetch 请求
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json; charset=utf-8',
    };

    // 2. 处理 HTTP OPTIONS 预检请求 (Preflight)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    const url = new URL(request.url);

    // 3. 校验路由入口 GET /api/accounts
    if (url.pathname === '/api/accounts' && request.method === 'GET') {
      try {
        // 从 Cloudflare Worker 环境变量中安全读取 URL 和 ANON_KEY
        const supabaseUrl = env.SUPABASE_URL;
        const supabaseAnonKey = env.SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
          return new Response(
            JSON.stringify({
              code: 500,
              error: 'Server Misconfiguration',
              message: 'Supabase 环境变量配置缺失',
            }),
            { status: 500, headers: corsHeaders }
          );
        }

        // 仅查询 status 为 'active' 的账号
        const targetUrl = `${supabaseUrl}/rest/v1/apple_accounts?status=eq.active&select=id,region,email,password,status,updated_at&order=updated_at.desc`;

        const response = await fetch(targetUrl, {
          method: 'GET',
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errText = await response.text();
          return new Response(
            JSON.stringify({
              code: response.status,
              error: 'Database Query Failed',
              details: errText,
            }),
            { status: response.status, headers: corsHeaders }
          );
        }

        const data = await response.json();

        return new Response(
          JSON.stringify({
            code: 200,
            success: true,
            total: data.length,
            updated_at: new Date().toISOString(),
            data: data,
          }),
          { status: 200, headers: corsHeaders }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({
            code: 500,
            error: 'Internal Server Error',
            message: err.message || '未知服务器错误',
          }),
          { status: 500, headers: corsHeaders }
        );
      }
    }

    // 4. 未匹配路由
    return new Response(
      JSON.stringify({ code: 404, error: 'Not Found' }),
      { status: 404, headers: corsHeaders }
    );
  },
};
