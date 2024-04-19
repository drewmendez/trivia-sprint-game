export const replaceEntities = (str: string) => {
  return str
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'")
    .replace(/&amp;/gi, "&")
    .replace(/&rsquo;/gi, "'")
    .replace(/&oacute;/gi, "ó")
    .replace(/&iacute;/gi, "í")
    .replace(/&aacute;/gi, "á")
    .replace(/&ouml;/gi, "ö");
};
