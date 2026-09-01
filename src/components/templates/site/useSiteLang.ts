"use client";
// 独立站语言状态 hook：默认英文（面向海外买家），中文可切换；
// 选择写入 localStorage（jkt-site-lang），下次访问保持。
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_SITE_LANG, SITE_LANG_STORAGE_KEY } from "@/i18n/site";
import type { SiteLang } from "@/i18n/site";
import { pick, pickList } from "@/data/site-content";
import type { I18nText, I18nList } from "@/data/site-content/types";

export function useSiteLang() {
  const [lang, setLangState] = useState<SiteLang>(DEFAULT_SITE_LANG);

  // 静态导出下首次渲染为默认语言，挂载后读取本地记忆（避免 hydration 不一致）
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SITE_LANG_STORAGE_KEY);
      if (saved === "en" || saved === "zh") setLangState(saved);
    } catch {
      // localStorage 不可用时静默保持默认语言
    }
  }, []);

  /** 切换语言并持久化 */
  const setLang = useCallback((next: SiteLang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(SITE_LANG_STORAGE_KEY, next);
    } catch {
      // 忽略写入失败
    }
  }, []);

  /** 取双语文本（按当前语言） */
  const t = useCallback((text: I18nText) => pick(text, lang), [lang]);

  /** 取双语列表（按当前语言） */
  const tl = useCallback((list: I18nList) => pickList(list, lang), [lang]);

  return { lang, setLang, t, tl };
}
