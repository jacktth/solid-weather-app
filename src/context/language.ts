import { createSignal, createMemo, createRoot } from "solid-js";
import { Language } from "types/types";

function createLanguage() {
  const [lang, setLanguage] = createSignal<Language>("en");
  const changeLan = (lan: Language) => setLanguage(lan);

  return { lang, changeLan };
}

export default createRoot(createLanguage);
