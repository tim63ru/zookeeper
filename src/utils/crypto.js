import * as bcrypt from 'bcrypt-nodejs';

export function encode64(val) {
    return new Buffer(val || '').toString('base64');
}

export function decode64(val) {
    return new Buffer(val || '', 'base64').toString('utf8');
}

export function generateHash(password) {
    //salt will be auto-generated & included in hash value
    return bcrypt.hashSync(password);
}

export function checkPassword(password, hashed) {
    return bcrypt.compareSync(password, hashed);
}
