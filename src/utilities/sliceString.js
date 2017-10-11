const sliceString = (string, number) => {
    if(string.length > number) {
        while(number < string.length) {
            if(string[number] === ' ') {
                return `${string.substring(0, number)}...`;
            }
            number++;
        }
    }
    return string;
};

export default sliceString;
