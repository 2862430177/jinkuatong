/* 名录集抓取探测脚本（一次性）：探测山西跨境电商企业名单的分页结构与数据量 */
const BASE =
  "https://gongshang.mingluji.com/shanxi/%E8%B7%A8%E5%A2%83%E7%94%B5%E5%95%86%E5%85%AC%E5%8F%B8%E5%90%8D%E5%BD%95";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

async function probe(page: number) {
  const url = page === 1 ? BASE : `${BASE}?page=${page}`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const text = await res.text();
  console.log(`page=${page} status=${res.status} len=${text.length}`);
  return text;
}

async function main() {
  const p1 = await probe(1);
  // 找分页：总页数线索
  const pageMatches = [...p1.matchAll(/page=(\d+)/g)].map((m) => Number(m[1]));
  console.log("page refs:", [...new Set(pageMatches)].sort((a, b) => a - b));
  // 找下一页链接
  const next = p1.match(/下一页[^<]*<a[^>]*href="([^"]+)"/);
  console.log("next link:", next ? next[1] : "none");
  // 提取企业名：通常为 <h3>或<a>包裹的中文公司名
  const nameRegex = />([\u4e00-\u9fa5A-Za-z0-9（）()·]+?(?:有限公司|有限责任公司|商行|个体工商户|公司))</g;
  const names = [...p1.matchAll(nameRegex)].map((m) => m[1]);
  console.log("names on p1:", names);
}

main().catch((e) => console.error("ERR", e));
