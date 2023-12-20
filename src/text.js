import chalk from "chalk";

export const mainFeatures = () => {
    const text = `[!] ${chalk.yellow(`Pilih pilihan dibawah!`)}
    [1] Create Account Manual
    [2] Login Account, Check Profile Account, Check Voucher Account
    `;
    return text
}

export const textChooseFeature = () => {
    const text = `[!] ${chalk.yellow(`Pilih pilihan dibawah!`)}
    [1] Check Profile Account
    [2] Check Voucher Account
    [3] Keluar Dari Program/CTRL + C
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