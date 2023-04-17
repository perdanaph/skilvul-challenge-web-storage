import { addLocalStorage, addSessionStorage, addCookieStorage } from './helpers/storage-option.js';

const btn1 = document.getElementById('button1');
const result = document.getElementById('result');

const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const gender = document.getElementById('gender');
const address = document.getElementById('address');
const storageType = document.getElementById('storage-option');

export function btn2Click() {
  btn1.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.clear();
    sessionStorage.clear();

    if (document.cookie.length > 0) {
      let cookies = document.cookie.split(';');

      for (let i = 0; i < cookies.length; i++) {
        let cookieName = cookies[i].split('=')[0].trim();
        document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      }
    }

    result.innerHTML = '';

    let item;

    for (let i = 0; i < storageType.length; i++) {
      if (storageType[i].value == 'local') {
        let selectedGender = gender.selectedIndex;
        let data = {
          firstname: firstname.value,
          lastname: lastname.value,
          address: address.value,
          gender: gender.options[selectedGender].text,
          storageType: storageType[i].value,
        };
        addLocalStorage(data);
        item = JSON.parse(localStorage.getItem('data'));
      }
      if (storageType[i].value == 'session') {
        let selectedGender = gender.selectedIndex;
        let data = {
          firstname: firstname.value,
          lastname: lastname.value,
          address: address.value,
          gender: gender.options[selectedGender].text,
          storageType: storageType[i].value,
        };
        addSessionStorage(data);
        item = JSON.parse(sessionStorage.getItem('data'));
      }
      if (storageType[i].value == 'cookie') {
        let selectedGender = gender.selectedIndex;
        let data = {
          firstname: firstname.value,
          lastname: lastname.value,
          address: address.value,
          gender: gender.options[selectedGender].text,
          storageType: storageType[i].value,
        };
        item = addCookieStorage(data);
      }
    }
    let html = '';

    for (const [key, value] of Object.entries(item)) {
      html = html + `<li>${value}</li>`;
    }

    result.innerHTML += `<p><ul>${html}</ul></p>`;
  });
}
