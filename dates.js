const padString = (str, expectedLength = 2, padChar = '0') => {
    let string = str;
    while (string.length < expectedLength) string = padChar + string;
    return string;
};

const formatDate = (date, options) => {
    const mergedOptionsWithDefaults = Object.assign(
        {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            minute: 'numeric',
            hour: 'numeric',
        },
        options
    );

    const results = {};

    Object.entries(mergedOptionsWithDefaults).forEach(([option, setting]) => {
        const formatSettings = {};
        formatSettings[option] = setting;
        if (option === 'hour') {
            formatSettings['hour12'] =
                mergedOptionsWithDefaults['hour12'] || false;
        }

        const value = new Intl.DateTimeFormat('en-CA', formatSettings).format(
            date
        );

        results[option] =
            option === 'month' ||
            option === 'minute' ||
            (option === 'second' && setting === 'numeric')
                ? padString(value)
                : value;
    });

    if (mergedOptionsWithDefaults) {
        const hourData = results.hour.split(' ');
        results.ampm = hourData[1];
        results.hour = hourData[0];
    }

    return results;
};

export { padString, formatDate };
