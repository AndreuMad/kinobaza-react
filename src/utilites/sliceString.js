const sliceString = (string, number) => {

    return string.length > number ? `${string.substring(0, number)}...` : string;
};

export default sliceString;
