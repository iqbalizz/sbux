import chalk from "chalk";
import delay from "delay";
import cheerio from "cheerio";
import { promises as fs } from 'fs';
import readlineSync from "readline-sync";
import {
    banner,
    mainFeatures,
    textChooseFeature,
    textProfileAccount,
    textVoucher
} from "./src/text.js";
import {
    checkPhoneNumber,
    validateOtp,
    getRegistration,
    getLogin,
    validateOtpLogin,
    getProfileAccount,
    getCheckVoucher
} from "./src/httpRequest.js";
import {
    chooseDomain,
    chooseEmail,
    checkEmailText
} from "./src/cryptoEmail.js";

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

//!Function Random Angka
const randstr = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "1234567890";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });

(async () => {
    console.log(banner())
    console.log(mainFeatures());
    const inputFeatures = readlineSync.question(`[?] Masukkan Pilihan : `)
    //!PILIHAN 1
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

                    const password = dataProfile.password;
                    const firstName = dataProfile.firstName;
                    const lastName = dataProfile.lastName;
                    const dob = dataProfile.dob;
                    const refferallCode = dataProfile.referralCode;
                    // console.log(`${email} ${password} ${firstName} ${lastName} ${dob} ${refferallCode}`)

                    const resultDomainEmail = await chooseDomain();
                    console.log(`[!] ${chalk.yellow(`List Domain Yang Tersedia!`)}`)
                    resultDomainEmail.domains.forEach((domain, index) => {
                        const listDomain = `   - ${domain}`
                        console.log(listDomain)

                    });
                    const domain = resultDomainEmail.domains;
                    const randomIndex = Math.floor(Math.random() * domain.length);
                    const selectedDomain = domain[randomIndex];
                    // console.log(resultDomainEmail);
                    // console.log(domain)
                    console.log(`[!] Domain yang dipilih : ${chalk.green(selectedDomain)}`)

                    const email = `${firstName}${lastName}${await randstr(2)}${selectedDomain}`
                    console.log(`[!] Email Use : ${chalk.green(email)}`)

                    const resultRegistration = await getRegistration(email, password, firstName, lastName, dob, inputNumber, refferallCode, inputOtp);
                    // console.log(resultRegistration);
                    if (resultRegistration.status === 200) {
                        const messages = resultRegistration.message;
                        console.log(`[!] ${chalk.green(messages)}`);

                        const savedAccount = `Email: ${email}\nPassword: ${password}\nFullName: ${firstName} ${lastName}\nRefferall Code: ${refferallCode}\n\n`;

                        const savedAccountToCheckVoc = `${email}|${password}\n`

                        fs.appendFile('AkunSaved.txt', savedAccount, (err) => {
                            if (err) {
                                console.log(chalk.red('[!] Gagal menyimpan data akun.'));
                            } else {
                                console.log(chalk.green('[!] Data akun berhasil disimpan dalam file akun.txt.'));
                            }
                        });

                        fs.appendFile('listAkun.txt', savedAccountToCheckVoc, (err) => {
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
        //!PILIHAN 2
    } else if (inputFeatures === `2`) {
        const fileContent = await fs.readFile('listAkun.txt', 'utf-8');
        const accounts = fileContent.trim().split('\n').map(line => {
            const [inputEmail, inputPassword] = line.split('|');
            return {
                inputEmail: inputEmail.trim(),
                inputPassword: inputPassword.trim()
            };
        });

        for (let i = 0; i < accounts.length; i++) {
            const { inputEmail, inputPassword } = accounts[i];
            console.log(`[!] ${chalk.blue(`CHECK ACCOUNT KE-${i + 1}`)}`);

            console.log(`[!] Email Use : ${chalk.green(inputEmail)}`)
            // console.log(`[!] Password Use : ${chalk.green(inputPassword)}`)

            const resultLogin = await getLogin(inputEmail, inputPassword);
            // console.log(resultLogin)
            if (resultLogin.status === 200) {
                const messages = resultLogin.message;
                console.log(`[!] ${chalk.green(messages)}`);

                // console.log(email)
                console.log(`[!] ${chalk.yellow(`Checking Message!`)}`)

                // let titleValue;
                let checking;
                let bodyResult;
                do {
                    const resultEmail = await chooseEmail(inputEmail);
                    const check = resultEmail.body;
                    const result = JSON.parse(check);
                    checking = result.data;

                    bodyResult = resultEmail.body;

                    console.log(`[!] Status Message Email : ${chalk.yellow(`Belum Ada Email Masuk..`)}`);

                    if (checking.length < 1) {
                        await delay(3 * 1000);
                    }

                } while (checking.length < 1);

                console.log(`[!] ${chalk.green(`Messages In Email Found!`)}`)
                const result = JSON.parse(bodyResult)
                // console.log(result)
                let resultId;

                if (result.data.length > 0) {
                    resultId = result.data[0].id; // Mengambil ID dari email pertama
                    console.log(`   - ${resultId}`);
                    console.log(`[!] Check Email With Id : ${chalk.green(resultId)}`);
                } else {
                    console.log('[!] No emails found!');
                }

                const resultCheckEmail = await checkEmailText(resultId)
                // console.log(resultCheckEmail)
                const resultBodyText = resultCheckEmail.body;
                // console.log(resultBodyText)

                const $ = cheerio.load(resultBodyText)
                const kodeOtp = $('h1 strong').first().text().trim();
                console.log(`[!] Kode OTP : ${chalk.green(kodeOtp)}`)

                const accessToken = resultLogin.data.accessToken;
                // const inputOtp = readlineSync.question(`[?] Masukkan Kode OTP : `);
                const inputOtp = kodeOtp

                const resultValidateOtp = await validateOtpLogin(inputOtp, accessToken);
                // console.log(resultValidateOtp)

                if (resultValidateOtp.status === 200) {
                    const messages = resultValidateOtp.message;
                    console.log(`[!] ${chalk.green(messages)}`);
                    console.log();

                    const accessToken = resultValidateOtp.data.accessToken;

                    const resultProfileAccount = await getProfileAccount(accessToken);
                    // console.log(resultProfileAccount)

                    let externalId;
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
                            console.log(`[!] ${chalk.red(`Gagal Check Voucher Account!`)}`)
                            console.log();
                        }
                    } else {
                        console.log(`[!] ${chalk.red(`Voucher Account Tidak Ada!`)}`)
                        console.log();
                    }
                }
            } else {
                const messages = resultLogin.message;
                console.log(`[!] ${chalk.red(messages)}`)
            }
            await delay(3 * 1000)
        }
        //!PILIHAN 3
    } else if (inputFeatures === `3`) {
        const fileContent = await fs.readFile('listAkunManual.txt', 'utf-8');
        const accounts = fileContent.trim().split('\n').map(line => {
            const [inputEmail, inputPassword] = line.split('|');
            return {
                inputEmail: inputEmail.trim(),
                inputPassword: inputPassword.trim()
            };
        });

        for (let i = 0; i < accounts.length; i++) {
            const { inputEmail, inputPassword } = accounts[i];
            console.log(`[!] ${chalk.blue(`CHECK ACCOUNT KE-${i + 1}`)}`);

            console.log(`[!] Email Use : ${chalk.green(inputEmail)}`)
            console.log(`[!] Password Use : ${chalk.green(inputPassword)}`)

            const resultLogin = await getLogin(inputEmail, inputPassword);
            // console.log(resultLogin)
            if (resultLogin.status === 200) {
                const messages = resultLogin.message;
                console.log(`[!] ${chalk.green(messages)}`);

                const kodeOtp = readlineSync.question(`[?] Masukkan Kode OTP : `)
                const accessToken = resultLogin.data.accessToken;
                const inputOtp = kodeOtp

                const resultValidateOtp = await validateOtpLogin(inputOtp, accessToken);
                // console.log(resultValidateOtp)

                if (resultValidateOtp.status === 200) {
                    const messages = resultValidateOtp.message;
                    console.log(`[!] ${chalk.green(messages)}`);
                    console.log();

                    const accessToken = resultValidateOtp.data.accessToken;

                    const resultProfileAccount = await getProfileAccount(accessToken);
                    // console.log(resultProfileAccount)

                    let externalId;
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
                            console.log(`[!] ${chalk.red(`Gagal Check Voucher Account!`)}`)
                            console.log();
                        }
                    } else {
                        console.log(`[!] ${chalk.red(`Voucher Account Tidak Ada!`)}`)
                        console.log();
                    }
                }
            } else {
                const messages = resultLogin.message;
                console.log(`[!] ${chalk.red(messages)}`)
            }
            await delay(3 * 1000)
        }
    } else {
        console.log(`[!] ${chalk.red(`Tidak ada pilihan!`)}`)
    }
})();