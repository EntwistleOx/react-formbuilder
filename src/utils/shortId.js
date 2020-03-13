import shortid from 'shortid';

export const getShortid = () => {
    shortid.characters(
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@'
    );
    return shortid.generate();
}