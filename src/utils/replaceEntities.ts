export const replaceEntities = (str: string) => {
  return str
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'")
    .replace(/&amp;/gi, "&")
    .replace(/&rsquo;/gi, "'")
    .replace(/&oacute;/gi, "ó")
    .replace(/&iacute;/gi, "í")
    .replace(/&eacute;/gi, "é")
    .replace(/&aacute;/gi, "á")
    .replace(/&ouml;/gi, "ö")
    .replace(/&lrm;/gi, "")
    .replace(/&ldquo;/gi, "“")
    .replace(/&rdquo;/gi, "”")
    .replace(/&hellip;/gi, "...")
    .replace(/&deg;/gi, "°")
    .replace(/&shy;/gi, "-");
};
