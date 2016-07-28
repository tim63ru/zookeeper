import * as bcrypt from 'bcrypt-nodejs';

export function encode64(val) {
    return new Buffer(val, 'base64').toString();
}

export function decode64(val) {
    return new Buffer(val).toString('base64');
}

export function genHash(password) {
    //salt will be auto-generated & included in hash value
    return bcrypt.hashSync(password);
}

export function checkPassword(password, hashed) {
    return bcrypt.compareSync(password, hashed);
}
