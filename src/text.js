import chalk from "chalk";

export const banner = () => {
    const value = `
    
    █▀ █▄▄ █░█ ▀▄▀   █▀▀ █▀█ █▀▀ ▄▀█ ▀█▀ █▀█ █▀█
    ▄█ █▄█ █▄█ █░█   █▄▄ █▀▄ ██▄ █▀█ ░█░ █▄█ █▀▄
                           create : IqbalGanteng
    `
    return value
}

export const mainFeatures = () => {
    const text = `[!] ${chalk.yellow(`Pilih pilihan dibawah!`)}
    [1] Create Account Manual
    [2] Login Account With Cryptogmail (${chalk.yellow(`Check Voucher, Check Profile`)}) [${chalk.green(`Auto Login`)}]
    [3] Login Account Manual (${chalk.yellow(`Check Voucher, Check Profile`)}) [${chalk.green(`Manual Login`)}]
    `;
    return text
}

export const textChooseFeature = () => {
    const text = `[!] ${chalk.yellow(`Pilih pilihan dibawah!`)}
    [1] Input OTP Menggunakan CryptoMail
    [2] Input OTP Manual
    `;
    return text
}

export const textProfileAccount = (messages, firstName, lastName, dob, email, phoneNumber, refferallCode) => {
    const text = `[!] ${chalk.yellow(messages)}
    Full Name Account : ${chalk.green(`${firstName} ${lastName}`)}
    Tanggal Lahir     : ${chalk.green(dob)}
    Email Account     : ${chalk.green(email)}
    Nomer HP Account  : ${chalk.green(phoneNumber)}
    Code Refferall    : ${chalk.green(refferallCode)}
    `;
    return text;
}

export const textVoucher = (index, nameVoucher, descVoucher, statusVoucher, rewardDate, expiredDate) => {
    const textValue = `[!] ${chalk.yellow(`Check Voucher ${index + 1}!`)}
    Nama Voucher        : ${chalk.green(nameVoucher)}
    Description Voucher : ${descVoucher}
    Status Voucher      : ${statusVoucher}
    Reward Date         : ${rewardDate}
    Expired Date        : ${expiredDate}
    `
    return textValue
}