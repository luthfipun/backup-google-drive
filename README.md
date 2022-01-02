
# Backup to Google Drive
Simple backup data and database to Cloud (Google Drive) service account and share to personal Google drive account

<br/>
<br/>

## **Planning Project**
- Backup MySQL Database ✅
- Backup compressed data (like as images, video etc) (coming soon)

<br/>
<br/>

## **Installation**
- Make sure your mechine has installed **NodeJS**
- Clone this project and run
    ```
    npm install // or
    yarn install
    ```
<br/>

## **Configuration**
- Open file `.env` on the root project for setup configuration and fill configuration MySQL credentials and other filled what you want
- Create google service account on [this](https://support.google.com/a/answer/7378726?hl=en) tutorial and enable **Google Drive API** on [Google Console](https://console.developers.google.com/apis/api/drive/overview)
- Download Service Account JSON Client file and put to `gdrive/account/` rename with `service-account.json`
- Open `index.js` set interval backup what you want, for this example run backup every 6 hours, see interval documentation on [this](https://github.com/agenda/human-interval)
    ```
    interval: '6 hours'
    ```
<br/>

## **Run**
```
node index.js
```

<br/>

## **Optional**
If you run on the server and want to autorun at startup, you can follow [this](https://gist.github.com/renatoargh/f84d1c3884d6c59a3a1b)