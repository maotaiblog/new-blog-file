-- ========================================================
-- 1. 创建 apple_accounts 账号数据表
-- ========================================================
CREATE TABLE IF NOT EXISTS public.apple_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    region VARCHAR(64) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'locked', 'out_of_stock')),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 为常用查询字段创建索引，提升 SELECT 效率
CREATE INDEX IF NOT EXISTS idx_apple_accounts_status ON public.apple_accounts(status);
CREATE INDEX IF NOT EXISTS idx_apple_accounts_updated_at ON public.apple_accounts(updated_at DESC);

-- ========================================================
-- 2. 开启 Supabase 行级安全策略 (Row Level Security / RLS)
-- ========================================================
ALTER TABLE public.apple_accounts ENABLE ROW LEVEL SECURITY;

-- 策略 1：仅允许 anon (匿名访客) 和 authenticated 角色读取 status = 'active' 的账号
CREATE POLICY "Allow public read-only active accounts" 
ON public.apple_accounts 
FOR SELECT 
TO anon, authenticated 
USING (status = 'active');

-- 策略 2：禁止任何匿名用户进行 INSERT、UPDATE 或 DELETE 写入操作
-- (无需显式编写写入许可 POLICY，Supabase 默认在开启 RLS 后对非 service_role 的写入行为全量拒绝，保障安全防篡改)

-- 插入初始测试账号数据 (测试用途)
INSERT INTO public.apple_accounts (region, email, password, status)
VALUES 
    ('🇺🇸 美区主账号 #1', 'us_share_2026_01@catblog.org', 'Password2026#US', 'active'),
    ('🇯🇵 日区备用 #2', 'jp_share_2026_02@catblog.org', 'Password2026#JP', 'active'),
    ('🇭🇰 港区专线 #3', 'hk_share_2026_03@catblog.org', 'Password2026#HK', 'active')
ON CONFLICT (email) DO NOTHING;
