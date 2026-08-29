#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Python 自动化脚本：定时巡检 Apple ID 账号可用性，自动标记锁定账号并切入备用库
可配合 Linux Cron / GitHub Actions 无人值守运行
"""

import os
import sys
import logging
import requests
from datetime import datetime

# ========================================================
# 1. 基础配置与环境变量读取
# ========================================================
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] [%(levelname)s] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://your-project.supabase.co")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "your-service-role-key")

HEADERS = {
    "apikey": SUPABASE_SERVICE_ROLE_KEY,
    "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

# ========================================================
# 2. 核心功能函数
# ========================================================

def get_active_accounts():
    """获取当前所有状态为 active 的账号"""
    url = f"{SUPABASE_URL}/rest/v1/apple_accounts?status=eq.active&select=*"
    try:
        resp = requests.get(url, headers=HEADERS, timeout=10)
        resp.raise_for_status()
        return resp.json()
    except Exception as e:
        logging.error(f"获取 active 账号列表失败: {e}")
        return []

def get-[#backup](#)_accounts():
    """获取储备库中状态为 out_of_stock 的新账号"""
    url = f"{SUPABASE_URL}/rest/v1/apple_accounts?status=eq.out_of_stock&select=*&limit=1"
    try:
        resp = requests.get(url, headers=HEADERS, timeout=10)
        resp.raise_for_status()
        accounts = resp.json()
        return accounts[0] if accounts else None
    except Exception as e:
        logging.error(f"获取备用账号失败: {e}")
        return None

def verify_apple_id(email, password):
    """
    模拟验证请求检查 Apple ID 账号可用性
    (真实场景可接入第三方验证 API 或模拟 Apple idmsa.apple.com 鉴权响应)
    """
    logging.info(f"正在巡检账号状态: {email} ...")
    
    # 模拟示例逻辑：在自动化巡检中，如检测到特殊测试词或底层逻辑返回 401/403 则判断为 locked
    if "locked" in email or "disabled" in email:
        return False
    
    # 正常测试通过
    return True

def update_account_status(account_id, new_status):
    """更新 Supabase 中指定账号的 status 字段"""
    url = f"{SUPABASE_URL}/rest/v1/apple_accounts?id=eq.{account_id}"
    payload = {
        "status": new_status,
        "updated_at": datetime.utcnow().isoformat()
    }
    try:
        resp = requests.patch(url, json=payload, headers=HEADERS, timeout=10)
        resp.raise_for_status()
        logging.info(f"✅ 账号 ID: {account_id} 状态成功更新为 '{new_status}'")
        return True
    except Exception as e:
        logging.error(f"❌ 更新账号 {account_id} 状态失败: {e}")
        return False

# ========================================================
# 3. 主控制流程
# ========================================================

def main():
    logging.info("==========================================")
    logging.info("🚀 启动 Apple ID 账号状态自动巡检与同步任务")
    logging.info("==========================================")

    if not SUPABASE_URL or "your-project" in SUPABASE_URL:
        logging.warning("⚠️ 未检测到有效 SUPABASE_URL，退出运行。请在环境变量中设置。")
        sys.exit(0)

    active_accounts = get_active_accounts()
    logging.info(f"共扫描到 {len(active_accounts)} 个在用的 active 共享账号。")

    locked_count = 0

    for acc in active_accounts:
        acc_id = acc['id']
        email = acc['email']
        password = acc['password']

        is_valid = verify_apple_id(email, password)

        if not is_valid:
            logging.warning(f"🚨 账号失效/已被封控锁机: {email}")
            # 1. 标记为 locked
            if update_account_status(acc_id, "locked"):
                locked_count += 1
                
                # 2. 自动激活备用库新账号
                backup_acc = get_backup_accounts()
                if backup_acc:
                    logging.info(f"🔄 正在从储备库激活新账号: {backup_acc['email']} ...")
                    update_account_status(backup_acc['id'], "active")
                else:
                    logging.warning("⚠️ 警告：储备库中已无可用 out_of_stock 备用账号！")

    logging.info("==========================================")
    logging.info(f"🎉 巡检完成！累计锁机/下架账号: {locked_count} 个。")
    logging.info("==========================================")

if __name__ == "__main__":
  main()
