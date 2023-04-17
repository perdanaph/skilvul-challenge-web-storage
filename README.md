# JS WEB STORAGE

---

## 1. **index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./css/style.css">
  <title>Web-Local-Storage</title>
</head>
<body>
  <main>
    <div class="container">  
      <form id="contact" action="" method="post">
        <h4>Form</h4>
        <fieldset>
          <input id="firstname" placeholder="First Name" type="text" tabindex="1" required autofocus>
        </fieldset>
        <fieldset>
          <input id="lastname" placeholder="Last Name" type="text" tabindex="1" required autofocus>
        </fieldset>
        <fieldset>
          <select id="gender" name="gender">
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
        </select>
        </fieldset>
        <fieldset>
          <textarea id="address" placeholder="Alamat" tabindex="5" required></textarea>
        </fieldset>
        <fieldset>
          <label for="firstname">Storage Option</label>
          <select id="storage-option" name="storage-option">
            <option value="local">local</option>
            <option value="session">session</option>
            <option value="cookie">cookie</option>
        </select>
        </fieldset>
        <fieldset>
          <button type="submit" id="button1">Button 1</button>
          <button type="submit" id="button2">Button 2</button>
        </fieldset>
      </form>

      <div id="result"></div>
    </div>
  </main>

  <script type="module" src="script.js"></script>
</body>
</html>
```

Pertama pada html membuat tag form untuk inputan yang di minta

## 2. **script.js**

```javascript
import { btn1Click } from './modules/handler1.js';
import { btn2Click } from './modules/handler2.js';

btn1Click();
btn2Click();
```

Kemudian pada file script.js mengimport module module yang diperlukan

## 3. **handler1.js**

```javascript
import { addLocalStorage, addSessionStorage, addCookieStorage } from './helpers/storage-option.js';

const btn1 = document.getElementById('button1');
const result = document.getElementById('result');

const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const gender = document.getElementById('gender');
const address = document.getElementById('address');
const storageType = document.getElementById('storage-option');

export function btn1Click() {
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

    result.innerHTML = `<p><ul>${html}</ul></p>`;
  });
}
```

Pada kode diatas pertama yang dilakukan adalah mengambil semua element pada form html, kemudian langkah kedua membuat function untuk handler pertama, kemudian menghapus storage pada browser lalu melakukan manipulasi dari inputan pada form yang kemudian hasil inputan akan ditampilkan pada html sekaligus menyimpan data input ke web storage dari pilihan yang sudah dipilih oleh user.

## 4. **handler2.js**
Pada file handler2.js kode yang dituliskan sama namun tidak melakukan clearing pada web storage, dan pada hasil input yang ditampilkan, html akan merender penambahan data inputan tanpa menghapus inputan yang pertama untuk melakukan itu saya menggunakan tanda "+",

```javascript
result.innerHTML += `<p><ul>${html}</ul></p>`;
```
