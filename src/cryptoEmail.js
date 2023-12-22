import fetch from "node-fetch";

export const chooseDomain = () => new Promise((resolve, reject) => {
    fetch(`https://cryptogmail.com/api/domains.config.json`, {
        method: "get",
        headers: {
            'Host': 'cryptogmail.com',
            'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120"',
            'Sec-Ch-Ua-Mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.71 Safari/537.36',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Accept': '*/*',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://cryptogmail.com/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Priority': 'u=1, i'
        }
    })
        .then(res => resolve(res.json()))
        .catch(error => reject(error))
});

export const chooseEmail = (email) => new Promise((resolve, reject) => {
    fetch(`https://cryptogmail.com/api/emails?inbox=${email}`, {
        method: "get",
        headers: {
            'Host': 'cryptogmail.com',
            'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120"',
            'Sec-Ch-Ua-Mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.71 Safari/537.36',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Accept': '*/*',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://cryptogmail.com/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Priority': 'u=1, i',
        }
    })
        .then(async (res) => {
            const value = {
                cookie: res.headers.raw()[`set-cookie`],
                body: await res.text()
            }
            resolve(value)
        })
        .catch(error => reject(error))
});

export const checkEmailText = (resultId) => new Promise((resolve, reject) => {
    fetch(`https://cryptogmail.com/api/emails/${resultId}`, {
        method: "get",
        headers: {
            'Host': 'cryptogmail.com',
            'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120"',
            'Accept': 'text/html,text/plain',
            'Accept-Language': 'ru,en-US;q=0.9,en;q=0.8,ru-RU;q=0.7',
            'Sec-Ch-Ua-Mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.71 Safari/537.36',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://cryptogmail.com/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Priority': 'u=1, i',
        }
    })
        .then(async (res) => {
            const value = {
                cookie: res.headers.raw()[`set-cookie`],
                body: await res.text()
            }
            resolve(value)
        })
        .catch(error => reject(error))
});