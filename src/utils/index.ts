function formatDate(date: number): string {
  const duration = Math.round((+Date.now() - date) / 1000);
  if (duration >= 60 * 60 * 24) {
    const time = new Date(date);
    let yyyy = time.getFullYear();
    let MM = padLeft(time.getMonth() + 1, 2, '0');
    let dd = padLeft(time.getDate(), 2, '0');
    let hh = padLeft(time.getHours(), 2, '0');
    let mm = padLeft(time.getMinutes(), 2, '0');
    let ss = padLeft(time.getSeconds(), 2, '0');
    return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
  }
  const time = formatSecond(duration);
  let str = '';
  if (time.hh) {
    str += `${time.hh}小时`;
  }
  if (time.mm) {
    str += ` ${time.mm}分钟`;
  }
  if (time.ss) {
    str += ` ${time.ss}秒`;
  }
  return `${str}前`;
}

function padLeft(str: string | number, total: number, padding: string): string {
  str = String(str);
  let n = total - str.length;
  if (n > 0) {
    for (let index = 0; index < n; index++) {
      str = padding + str;
    }
  }
  return str;
}

function formatSecond(second: number): { hh: number, mm: number, ss: number } {
  const date = {
    hh: 0,
    mm: 0,
    ss: 0
  }
  date.hh = Math.floor(second / 60 / 60);
  date.mm = Math.floor((second - date.hh * 60 * 60) / 60);
  date.ss = Math.max((second - date.hh * 60 * 60 - date.mm * 60), 1);
  return date;


}

function transformContent(content: string): string {
  return content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
}

export { formatDate, transformContent };
