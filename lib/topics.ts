export interface TopicCluster {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  pillarSlug?: string;
  keywords: string[];
}

export const TOPIC_CLUSTERS: Record<string, TopicCluster> = {
  airport: {
    id: "airport",
    name: "机场评测与专线选型",
    slug: "airport-recommendation",
    description: "专注 2026 主流 IEPL/IPLC 专线与 BGP 中继机场的晚高峰延迟、丢包率、流媒体与 AI 解锁能力评测。",
    icon: "🏆",
    pillarSlug: "/blog/airport-recommendation/",
    keywords: ["机场评测", "专线机场", "IEPL", "IPLC", "晚高峰测速", "机场推荐"]
  },
  network: {
    id: "network",
    name: "网络底层协议与知识",
    slug: "network-guide",
    description: "深入解析 BGP 网络调度、IPLC/IEPL 物理专线、RTT 往返时延、TCP 拥塞控制与 DNS 劫持防护底层原理。",
    icon: "🌐",
    pillarSlug: "/blog/network-guide/",
    keywords: ["网络知识", "BGP", "IPLC原理", "IEPL架构", "RTT", "丢包率", "DNS解析"]
  },
  vpn: {
    id: "vpn",
    name: "VPN 与隐私保护指南",
    slug: "vpn-guide",
    description: "全方位防护 WebRTC 真实 IP 泄漏、DNS 劫持与流量被监控，提供商业级加密专线选型与海外安全办公方案。",
    icon: "🛡️",
    pillarSlug: "/blog/vpn-guide/",
    keywords: ["VPN教程", "VPN隐私", "WebRTC泄露", "DNS泄露", "网络隐私保护", "出海安全"]
  },
  troubleshooting: {
    id: "troubleshooting",
    name: "网络故障排查自救",
    slug: "vpn-troubleshooting",
    description: "针对节点无法连接、TCP 握手超时、DNS 污染与代理客户端证书报错等高频网络故障的标准化排查 SOP。",
    icon: "🔧",
    pillarSlug: "/blog/vpn-troubleshooting/",
    keywords: ["故障排查", "网络无法连接", "连接超时", "Sing-box报错", "Clash连接不上"]
  },
  client: {
    id: "client",
    name: "客户端配置实战",
    slug: "clash-guide",
    description: "涵盖 Sing-box、Clash Verge Rev、Shadowrocket 及 Loon 等现代化跨平台代理客户端的规则集与轻量分流实操。",
    icon: "⚡",
    pillarSlug: "/blog/clash-guide/",
    keywords: ["Clash教程", "Sing-box配置", "Shadowrocket", "分流规则", "跨平台客户端"]
  },
  whitepaper: {
    id: "whitepaper",
    name: "评测方法论与白皮书",
    slug: "airport-evaluation-methodology",
    description: "基于客观性能指标、丢包加权模型与 AI 审查风控规则的定量化客观评测标准体系。",
    icon: "📊",
    pillarSlug: "/whitepaper/airport-evaluation-methodology/",
    keywords: ["白皮书", "评测方法论", "网络性能模型", "定量打分体系", "真实数据"]
  }
};

// 工具模型定义
export interface RelatedTool {
  id: string;
  name: string;
  url: string;
  description: string;
  badge: string;
  icon: string;
}

export const TOOLS_DATABASE: Record<string, RelatedTool> = {
  networkHealth: {
    id: "networkHealth",
    name: "Network Health Score",
    url: "/tools/network-health/",
    description: "全功能网络健康度综合评分，三维诊断性能、隐私与稳定性。",
    badge: "综合体检",
    icon: "🩺"
  },
  myIp: {
    id: "myIp",
    name: "What Is My IP / 公网探针",
    url: "/tools/my-ip/",
    description: "在线查询当前公网 IPv4/IPv6、出口运营商归属，并运行多节点 Ping 延迟测试。",
    badge: "基础检测",
    icon: "📍"
  },
  dnsLeak: {
    id: "dnsLeak",
    name: "DNS Leak Test 泄露检测",
    url: "/tools/dns-leak-test/",
    description: "探测 DNS 是否遭本地 ISP 监听劫持，排查域名解析安全性。",
    badge: "隐私加固",
    icon: "🛡️"
  },
  webrtc: {
    id: "webrtc",
    name: "WebRTC 真实 IP 泄露检测",
    url: "/tools/webrtc-test/",
    description: "利用浏览器底层 STUN 协议嗅探，排查是否绕过代理泄漏局域网或真实公网 IP。",
    badge: "隐私防护",
    icon: "🔒"
  },
  pingTest: {
    id: "pingTest",
    name: "Ping 延迟与抖动测试",
    url: "/tools/ping-test/",
    description: "多轮发包测量网络往返延迟 (RTT)、抖动与丢包表现。",
    badge: "性能测试",
    icon: "⚡"
  },
  vpnLeak: {
    id: "vpnLeak",
    name: "VPN 综合 4 重泄露体检",
    url: "/tools/vpn-leak-test/",
    description: "交叉审计 IP 泄露、DNS 劫持、WebRTC 穿透与 IPv6 旁路风险。",
    badge: "安全审计",
    icon: "🔍"
  },
  vpnSpeed: {
    id: "vpnSpeed",
    name: "VPN 带宽吞吐测速",
    url: "/tools/vpn-speed-test/",
    description: "分块拉取 CDN 资源测试实际下载吞吐速率 (Mbps) 与稳定性。",
    badge: "带宽测试",
    icon: "🚀"
  },
  airportRank: {
    id: "airportRank",
    name: "2026 专线机场对比大盘",
    url: "/rank/",
    description: "多维指标实测对比主流专线服务商，包含延迟稳定性实测与优惠信息。",
    badge: "性能选型",
    icon: "🏆"
  }
};

// 根据文章 slug / category / tags 动态识别 Topic Cluster
export function getTopicBySlug(slug: string, category: string = "", tags: string[] = []): TopicCluster {
  const s = slug.toLowerCase();
  const t = tags.map(x => x.toLowerCase()).join(" ");

  if (s.includes("whitepaper") || s.includes("白皮书") || category.includes("白皮书")) {
    return TOPIC_CLUSTERS.whitepaper;
  }
  if (s.includes("troubleshooting") || s.includes("sop") || s.includes("faq") || s.includes("排查")) {
    return TOPIC_CLUSTERS.troubleshooting;
  }
  if (s.includes("singbox") || s.includes("clash") || s.includes("docker") || s.includes("self-hosted") || s.includes("apple-id")) {
    return TOPIC_CLUSTERS.client;
  }
  if (s.includes("stable-nodes") || s.includes("network") || t.includes("协议") || t.includes("网络知识")) {
    return TOPIC_CLUSTERS.network;
  }
  if (s.includes("review") || s.includes("airport") || category.includes("测评") || category.includes("机场")) {
    return TOPIC_CLUSTERS.airport;
  }

  return TOPIC_CLUSTERS.network;
}

// 动态匹配相关工具 (Related Tools)
export function getRelatedTools(topicId: string): RelatedTool[] {
  switch (topicId) {
    case "airport":
      return [TOOLS_DATABASE.airportRank, TOOLS_DATABASE.pingTest, TOOLS_DATABASE.vpnSpeed];
    case "vpn":
      return [TOOLS_DATABASE.vpnLeak, TOOLS_DATABASE.dnsLeak, TOOLS_DATABASE.webrtc];
    case "network":
      return [TOOLS_DATABASE.networkHealth, TOOLS_DATABASE.pingTest, TOOLS_DATABASE.myIp];
    case "troubleshooting":
      return [TOOLS_DATABASE.networkHealth, TOOLS_DATABASE.dnsLeak, TOOLS_DATABASE.vpnLeak];
    case "client":
      return [TOOLS_DATABASE.dnsLeak, TOOLS_DATABASE.pingTest, TOOLS_DATABASE.myIp];
    case "whitepaper":
      return [TOOLS_DATABASE.networkHealth, TOOLS_DATABASE.airportRank, TOOLS_DATABASE.pingTest];
    default:
      return [TOOLS_DATABASE.networkHealth, TOOLS_DATABASE.myIp, TOOLS_DATABASE.dnsLeak];
  }
}

// 意图导向转化模块 (Next Step CTA Funnel)
export interface NextStepAction {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
  secondaryText?: string;
  secondaryUrl?: string;
}

export function getNextStepByTopic(topicId: string, airportName?: string): NextStepAction {
  if (airportName) {
    return {
      title: `想知道 ${airportName} 在您本地宽带的实际网络表现？`,
      subtitle: "运行一次多节点延迟与丢包探测，或前往 2026 专线大盘查看全网多维指标横向评测对比。",
      buttonText: "⚡ 运行本地网络延迟测试",
      buttonUrl: "/tools/ping-test/",
      secondaryText: "🏆 查看 2026 机场对比大盘",
      secondaryUrl: "/rank/"
    };
  }

  switch (topicId) {
    case "airport":
      return {
        title: "想知道当前网络连接到底有多快？",
        subtitle: "建议先运行一次本地公网 IP 与节点延迟检测，排查是否存在运营商国际出口限速。",
        buttonText: "⚡ 运行本地延迟与丢包检测",
        buttonUrl: "/tools/ping-test/",
        secondaryText: "🏆 查看 2026 专线机场对比大盘",
        secondaryUrl: "/rank/"
      };
    case "vpn":
      return {
        title: "发现 DNS 劫持或 WebRTC 泄漏？",
        subtitle: "立即使用沙箱探针检测本地网络环境，确保跨境办公与隐私浏览无泄漏风险。",
        buttonText: "🛡️ 运行 WebRTC / DNS 泄露检测",
        buttonUrl: "/tools/vpn-leak-test/",
        secondaryText: "📍 检查当前真实公网 IP",
        secondaryUrl: "/tools/my-ip/"
      };
    case "troubleshooting":
      return {
        title: "配置完成后，检查您的网络链路是否已安全生效",
        subtitle: "通过网络诊断工具箱，验证代理规则分流是否正常、公网 IP 是否已隐匿。",
        buttonText: "📍 测试当前公网出口 IP",
        buttonUrl: "/tools/my-ip/",
        secondaryText: "🩺 查看全维网络健康评分",
        secondaryUrl: "/tools/network-health/"
      };
    case "client":
      return {
        title: "配置完成后，检测节点延迟与隐私防线",
        subtitle: "使用网络诊断工具排查分流是否正常，确保无 WebRTC 与 DNS 暴露风险。",
        buttonText: "⚡ 运行 Ping 延迟与丢包测试",
        buttonUrl: "/tools/ping-test/",
        secondaryText: "🛡️ 运行 WebRTC 穿透检测",
        secondaryUrl: "/tools/webrtc-test/"
      };
    case "whitepaper":
      return {
        title: "参考白皮书指标体系，对当前网络进行一次基准体检",
        subtitle: "结合三维加权模型测定网络性能、隐私防护与链路稳定性真实分值。",
        buttonText: "🩺 运行全维网络健康评分",
        buttonUrl: "/tools/network-health/",
        secondaryText: "🏆 查看 2026 专线机场对比大盘",
        secondaryUrl: "/rank/"
      };
    default:
      return {
        title: "想全面评估当前网络的性能与安全状态？",
        subtitle: "通过猫太实验室工具箱，秒级检测公网 IP、延迟、抖动与隐私泄漏。",
        buttonText: "🩺 开始网络环境健康体检",
        buttonUrl: "/tools/network-health/",
        secondaryText: "⚡ 运行 Ping 延迟测试",
        secondaryUrl: "/tools/ping-test/"
      };
  }
}
