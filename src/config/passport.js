import {Strategy as JwtStrategy} from 'passport-jwt';
import {ExtractJwt} from 'passport-jwt';
import config from '../config/main';
import {logger} from '../utils/logger';


// Setup work and export for the JWT passport strategy
export default function(passport) {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: config.secret
    };
    passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
        /*
        User.findOne({id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
        */

        logger.debug('jwt_payload.email = ' + jwtPayload.email);
        done(null, {email: 'tor@ggg111.ru'});
    }));
};
