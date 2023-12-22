import fetch from "node-fetch";

export const checkPhoneNumber = (inputNumber) => new Promise((resolve, reject) => {
    fetch(`https://api2.sbuxcard.com/v2/auth/generate-sms-otp`, {
        method: "POST",
        headers: {
            'user-agent': 'Dart/2.19 (dart:io)',
            'x-signature': `1702992865396:68c9d2aa228801dd45f6f960eec9f017b90ae487df1304ad2b2666832d92da1a`,
            'accept-language': 'en',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Length': '29',
            'host': 'api2.sbuxcard.com',
            'content-type': 'application/json; charset=utf-8',
            'Connection': 'close',
            'cache-control': 'no-cache', // Contoh header tambahan
        },
        body: JSON.stringify({
            "phoneNumber": `${inputNumber}`
        })
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(error => reject(error))
});

export const validateOtp = (inputOtp, inputNumber) => new Promise((resolve, reject) => {
    fetch(`https://api2.sbuxcard.com//v2/auth/validate-sms-otp`, {
        method: "POST",
        headers: {
            'user-agent': 'Dart/2.19 (dart:io)',
            'x-signature': '1702992904704:7984e4edaf36e0fbc8ee7d4f609e55de8661e83467814e3ee711460037b49672',
            'accept-language': 'en',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Length': '44',
            'host': 'api2.sbuxcard.com',
            'content-type': 'application/json; charset=utf-8',
            'Connection': 'close'
        },
        body: JSON.stringify({
            "otp": `${inputOtp}`,
            "phoneNumber": `${inputNumber}`
        })
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(error => reject(error))
});

export const getRegistration = (email, password, firstName, lastName, dob, inputNumber, refferallCode, inputOtp) => new Promise((resolve, reject) => {
    fetch(`https://api2.sbuxcard.com//v2/customer/registration`, {
        method: "POST",
        headers: {
            'user-agent': 'Dart/2.19 (dart:io)',
            'x-signature': '1702992964066:60d26a2c44c2f9e5ce684aca9172103163ea7403a19070057245a0d0fa62e98e',
            'accept-language': 'en',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Length': '270',
            'host': 'api2.sbuxcard.com',
            'content-type': 'application/json; charset=utf-8',
            'Connection': 'close'
        },
        body: JSON.stringify({
            "email": `${email}`,
            "password": `${password}`,
            "external_id": null,
            "first_name": `${firstName}`,
            "last_name": `${lastName}`,
            "dob": `${dob}`,
            "fav_beverage": "Coffe",
            "direct_marcomm": true,
            "phone_number": `${inputNumber}`,
            "referralCode": `${refferallCode}`,
            "otp": `${inputOtp}`
        })
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(error => reject(error))
});

//!LOGIN DISINI
export const getLogin = (inputEmail, inputPassword) => new Promise((resolve, reject) => {
    fetch(`https://api2.sbuxcard.com//v2/auth/login`, {
        method: "POST",
        headers: {
            'user-agent': 'Dart/2.19 (dart:io)',
            'x-signature': '1703042599647:14c8746391156b50636489f30c29a8649447dd5c1200b3d65710babd17c8d7ec',
            'accept-language': 'en',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Length': '260',
            'host': 'api2.sbuxcard.com',
            'content-type': 'application/json; charset=utf-8',
            'Connection': 'close'
        },
        body: JSON.stringify({
            "email": `${inputEmail}`,
            "password": `${inputPassword}`,
            "appAddress": "cpOLkjJuSUaL681OgklB50:APA91bEDq8QfP1NTGq9szlpB0GK9ZeEC27AvxrXdaKIv4b9oyqM7FbSbP27zWQeV45VFW3TM2S0p4V8LDyS6XCaUqpLToHaIjpFgeMcM93x-zOXDVTf8wdX8zS0F8n9DSKDtu_VVDXY2",
            "appType": "ANDROID"
        })
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(error => reject(error))
});

export const validateOtpLogin = (inputOtp, accessToken) => new Promise((resolve, reject) => {
    fetch(`https://api2.sbuxcard.com//v2/auth/validate-otp`, {
        method: "POST",
        headers: {
            'user-agent': 'Dart/2.19 (dart:io)',
            'x-signature': '1703042649707:c79e1e30dc7e14e45d2a82cb2e99bea144535685caa65f7e32fd815e1685f089',
            'accept-language': 'en',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Length': '76',
            'host': 'api2.sbuxcard.com',
            'content-type': 'application/json; charset=utf-8',
            'Connection': 'close'
        },
        body: JSON.stringify({
            "otp": `${inputOtp}`,
            "accessToken": `${accessToken}`
        })
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(error => reject(error))
});

export const getProfileAccount = (accessToken) => new Promise((resolve, reject) => {
    fetch(`https://api2.sbuxcard.com//v2/customer/get-customer`, {
        method: "GET",
        headers: {
            'user-agent': 'Dart/2.19 (dart:io)',
            'x-signature': '1703043064823:9d25a707e5f26beee0128b88566771f18d08c70a4ad3be033979b77c99f28d5b',
            'accept-language': 'en',
            'Accept-Encoding': 'gzip, deflate, br',
            'host': 'api2.sbuxcard.com',
            'authorization': `Bearer ${accessToken}`,
            'Connection': 'close'
        }
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(error => reject(error))
});

export const getCheckVoucher = (externalId, accessToken) => new Promise((resolve, reject) => {
    fetch(`https://api2.sbuxcard.com//v2/content/get-offer?external_id=${externalId}`, {
        method: "GET",
        headers: {
            'user-agent': 'Dart/2.19 (dart:io)',
            'x-signature': '1703043071489:1e932c0f14ba5b0f6a767ed01cca746050929ca453debebaf4d1dd4e22f5d22c',
            'accept-language': 'en',
            'Accept-Encoding': 'gzip, deflate, br',
            'host': 'api2.sbuxcard.com',
            'authorization': `Bearer ${accessToken}`,
            'Connection': 'close'
        }
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(error => reject(error))
});