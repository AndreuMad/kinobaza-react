export const areDifferent = (x, y, byField) => {
    let lol = true;

    x.forEach(xItem => {

        y.forEach(yItem => {
            if(xItem[byField] === yItem[byField]) {
                lol = false;
            }
        })
    });
    return lol;
};
