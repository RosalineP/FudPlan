export const isValidDate = dateString => {
    if (!/(\d{1,2})-(\d{1,2})-(\d{4})/.test(dateString)) {
        return false;
    }

    const parts = dateString.split('-');
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[2], 10);

    if (year < 1000 || year > 3000 || month === 0 || month > 12) {
        return false;
    }

    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        monthLength[1] = 29;
    }

    return day > 0 && day <= monthLength[month - 1];
};

export const freshness = expiry => {
    const currentDate = new Date();
    const splitDate = currentDate.toISOString().split('T')[0].split('-');
    const currDateStr = parseInt(splitDate[0] + splitDate[1] + splitDate[2]);

    const splitExpiry = expiry.split('-');
    const expDateStr = parseInt(splitExpiry[2] + splitExpiry[0] + splitExpiry[1]);

    const dateDiff = expDateStr - currDateStr;
    if (dateDiff <= -2) {
        return 'fudRed';
    }
    // else if (dateDiff === -1) { return 'fudYellow'; } // todo: keep?
    else if (dateDiff < 7) {
        return 'fudOrange';
    } else {
        return 'fudGreen';
    }
};
