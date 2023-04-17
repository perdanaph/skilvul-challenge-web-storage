export function addLocalStorage(data) {
  localStorage.setItem('data', JSON.stringify(data));
}

export function addSessionStorage(data) {
  sessionStorage.setItem('data', JSON.stringify(data));
}

export function addCookieStorage(data) {
  for (const [key, value] of Object.entries(data)) {
    document.cookie = `${key}=${value}; expires=Thu, 20 Apr 2023 23:59:00`;
  }

  const decodedCookie = decodeURIComponent(document.cookie);
  let getItems = decodedCookie.split(';');

  let temp = {};

  for (let i = 0; i < getItems.length; i++) {
    let cookie = getItems[i].split('=');
    let cookieName = cookie[0].trim();
    let cookieValue = cookie[1];
    temp[cookieName] = cookieValue;
  }

  return temp;
}
