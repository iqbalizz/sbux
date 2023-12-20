import fetch from "node-fetch";
import chalk from "chalk";
import delay from "delay";
import fs from "fs";
import readlineSync from "readline-sync";
import {
    mainFeatures,
    textChooseFeature,
    textProfileAccount,
    textVoucher
} from "./src/text.js";

const checkPhoneNumber = (inputNumber) => new Promise((resolve, reject) => {
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

const validateOtp = (inputOtp, inputNumber) => new Promise((resolve, reject) => {
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

const getRegistration = (email, password, firstName, lastName, dob, inputNumber, refferallCode, inputOtp) => new Promise((resolve, reject) => {
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
const getLogin = (inputEmail, inputPassword) => new Promise((resolve, reject) => {
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

const validateOtpLogin = (inputOtp, accessToken) => new Promise((resolve, reject) => {
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

const getProfileAccount = (accessToken) => new Promise((resolve, reject) => {
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

const getCheckVoucher = (externalId, accessToken) => new Promise((resolve, reject) => {
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

//! Fungsi untuk membaca dan menulis file JSON
const updateJsonFile = (filename, newData) => {
    try {
        // Membaca konten file JSON (jika file tidak ada, membuat array kosong)
        const existingData = fs.existsSync(filename) ? JSON.parse(fs.readFileSync(filename, 'utf-8')) : [];

        // Menambahkan data baru ke dalam array
        existingData.push(newData);

        // Menulis kembali array ke dalam file JSON
        fs.writeFileSync(filename, JSON.stringify(existingData, null, 2), 'utf-8');

        console.log('Data berhasil ditambahkan ke dalam file JSON.');
    } catch (error) {
        console.error('Error:', error.message);
    }
};

(async () => {
    console.log(mainFeatures());
    const inputFeatures = readlineSync.question(`[?] Masukkan Pilihan : `)

    if (inputFeatures === `1`) {
        const inputNumber = readlineSync.question(`[?] Masukkan Nomer HP (cth : 821...) : `)
        const resultCheckNumber = await checkPhoneNumber(inputNumber);
        // console.log(resultCheckNumber);
        if (resultCheckNumber.status === 200) {
            console.log(`[!] ${chalk.yellow(`Berhasil Mengirimkan Kode OTP!`)}`);
            await delay(3 * 1000);

            const messages = resultCheckNumber.message;
            console.log(`[!] ${chalk.green(messages)}`);

            const inputOtp = readlineSync.question(`[?] Masukkan Kode OTP : `);

            const resultValidateOtp = await validateOtp(inputOtp, inputNumber);
            // console.log(resultValidateOtp);
            if (resultValidateOtp !== null) {
                if (resultValidateOtp.status === 200) {
                    const messages = resultValidateOtp.message;
                    console.log(`[!] ${chalk.green(messages)}`);

                    const data = fs.readFileSync(`dataProfile.json`, `utf-8`);
                    const dataProfile = JSON.parse(data)

                    const email = dataProfile.email;
                    const password = dataProfile.password;
                    const firstName = dataProfile.firstName;
                    const lastName = dataProfile.lastName;
                    const dob = dataProfile.dob;
                    const refferallCode = dataProfile.referralCode;
                    // console.log(`${email} ${password} ${firstName} ${lastName} ${dob} ${refferallCode}`)

                    const resultRegistration = await getRegistration(email, password, firstName, lastName, dob, inputNumber, refferallCode, inputOtp);
                    // console.log(resultRegistration);
                    if (resultRegistration.status === 200) {
                        const messages = resultRegistration.message;
                        console.log(`[!] ${chalk.green(messages)}`);

                        const savedAccount = `Email: ${email}\nPassword: ${password}\nFullName: ${firstName} ${lastName}\nRefferall Code: ${refferallCode}\n\n`;

                        fs.appendFile('akun.txt', savedAccount, (err) => {
                            if (err) {
                                console.log(chalk.red('[!] Gagal menyimpan data akun.'));
                            } else {
                                console.log(chalk.green('[!] Data akun berhasil disimpan dalam file akun.txt.'));
                            }
                        });
                    } else {
                        const messages = resultRegistration.message;
                        console.log(`[!] ${chalk.red(messages)}`)
                    }
                } else {
                    console.log(chalk.red(`OTP Invalid Or OTP Expired!`));
                }
            } else {
                console.log(chalk.red(`Result Validate OTP is null!`));
            }
        } else {
            const messages = resultCheckNumber.message;
            console.log(`[!] ${chalk.red(messages)}`)
        }
    } else if (inputFeatures === `2`) {
        const inputEmail = readlineSync.question(`[?] Masukkan Email Untuk Login : `)
        const inputPassword = readlineSync.question(`[?] Masukkan Password : `)

        const resultLogin = await getLogin(inputEmail, inputPassword);
        // console.log(resultLogin)

        if (resultLogin.status === 200) {
            const messages = resultLogin.message;
            console.log(`[!] ${chalk.green(messages)}`);

            const accessToken = resultLogin.data.accessToken;
            const inputOtp = readlineSync.question(`[?] Masukkan Kode OTP : `);

            const resultValidateOtp = await validateOtpLogin(inputOtp, accessToken);
            // console.log(resultValidateOtp)

            if (resultValidateOtp.status === 200) {
                const messages = resultValidateOtp.message;
                console.log(`[!] ${chalk.green(messages)}`);
                console.log();

                const accessToken = resultValidateOtp.data.accessToken;

                // console.log(textChooseFeature())
                // const inputPilihan = readlineSync.question(`[!] Masukkan Pilihan Kamu : `);

                let externalId;
                while (true) {
                    console.log(textChooseFeature())
                    const inputPilihan = readlineSync.question(`[!] Masukkan Pilihan Kamu : `);
                    if (inputPilihan === `1`) {
                        // console.log(textChooseFeature())
                        // inputPilihan = readlineSync.question(`[!] Masukkan Pilihan Kamu : `);

                        const resultProfileAccount = await getProfileAccount(accessToken);
                        // console.log(resultProfileAccount)
                        if (resultProfileAccount.status === 200) {
                            const messages = resultProfileAccount.message;
                            const firstName = resultProfileAccount.data.first_name;
                            const lastName = resultProfileAccount.data.last_name;
                            const dob = resultProfileAccount.data.dob;
                            const refferallCode = resultProfileAccount.data.refererCode;
                            const email = resultProfileAccount.data.email;
                            const phoneNumber = resultProfileAccount.data.phone_number;
                            externalId = resultProfileAccount.data.external_id;

                            console.log(textProfileAccount(messages, firstName, lastName, dob, email, phoneNumber, refferallCode))
                        }
                    } else if (inputPilihan === `2`) {
                        const resultCheckVoucher = await getCheckVoucher(externalId, accessToken);
                        // console.log(resultCheckVoucher)
                        const jumlahVoucher = resultCheckVoucher.data.length;
                        // console.log(jumlahVoucher)
                        if (jumlahVoucher >= 1) {
                            if (resultCheckVoucher.status === 200) {
                                console.log(`[!] ${chalk.yellow(`Get List Voucher Account Success`)}`);
                                resultCheckVoucher.data.forEach((voucher, index) => {
                                    // console.log(voucher)
                                    const nameVoucher = voucher.Reward;
                                    const descVoucher = voucher.description;
                                    const statusVoucher = voucher.status;
                                    const rewardDate = voucher.rewardDate;
                                    const expiredDate = voucher.expiredDate;
                                    const idVoucher = voucher.id;

                                    console.log(textVoucher(index, nameVoucher, descVoucher, statusVoucher, rewardDate, expiredDate))
                                });
                            } else {
                                console.log(`[!] ${chalk.red(`Voucher Account Tidak Ada!`)}`)
                            }
                        } else {
                            console.log(`[!] ${chalk.red(`Gagal Check Voucher Account!`)}`)
                        }
                    } else if (inputPilihan === `3`) {
                        console.log(`[!] Keluar Dari Program!`)
                        break; //Keluar dari loop
                    } else {
                        console.log(`[!] ${chalk.red(`Tidak Ada Pilihan!`)}`)
                    }
                }
            }
        } else {
            const messages = resultLogin.message;
            console.log(`[!] ${chalk.red(messages)}`)
        }
    } else {
        console.log(`[!] ${chalk.red(`Tidak ada pilihan!`)}`)
    }
})();