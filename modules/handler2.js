import { addLocalStorage, addSessionStorage, addCookieStorage } from './helpers/storage-option.js';

const btn2 = document.getElementById('button2');
const result = document.getElementById('result');

const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const gender = document.getElementById('gender');
const address = document.getElementById('address');
const storageType = document.getElementById('storage-option');

export function btn2Click() {
  btn2.addEventListener('click', (event) => {
    event.preventDefault();

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
