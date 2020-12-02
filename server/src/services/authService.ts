import { Profile as ProfileGoogle } from 'passport-google-oauth20';
import { Profile as ProfileFacebook } from 'passport-facebook';
import passport from 'passport';
import bcrypt from 'bcrypt';

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

const { GOOGLE_AUTH_ID, GOOGLE_AUTH_SECRET, FACEBOOK_AUTH_ID, FACEBOOK_AUTH_SECRET } = require('../config/keys');

type ErrorType = null | Error | string;
type Profile = ProfileGoogle | ProfileFacebook;
interface VerifyCallback {
    (err: ErrorType, user: any, msg?: string): void;
}

const GOOGLE_DB_NAME = 'idGoogle';
const FACEBOOK_DB_NAME = 'idFacebook';

passport.serializeUser((user: any, done: VerifyCallback) => {
    done(null, user?.id);
});

passport.deserializeUser((id: string, done: VerifyCallback) => {
    User.findById(id, (_err: ErrorType, user: any) => {
        done(null, user);
    });
});

const handleSocialAuth = async (dbName: string, profile: Profile, done: VerifyCallback): Promise<void> => {
    try {
        const existingUser = await User.findOne({ [dbName]: profile.id });

        if (existingUser) {
            done(null, existingUser);
        } else {
            const { displayName, id, provider } = profile;
            const user = new User({
                username: displayName,
                [dbName]: id,
                socialProvider: provider,
            });
            const createdUser = await user.save();
            done(null, createdUser);
        }
    } catch (err) {
        console.error(err.message);
        done(err, null);
    }
};

const handleLoginAuth = async (email: string, password: string, done: VerifyCallback) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return done(null, false, 'Brak użytkownika o podanym adresie email');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (isPasswordMatched) {
            return done(null, user);
        }

        return done(null, false, 'Podane hasło nie pasuje do adresu email');
    } catch (err) {
        return done(err, false);
    }
};

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_AUTH_ID,
            clientSecret: GOOGLE_AUTH_SECRET,
            callbackURL: '/auth/google/callback',
            proxy: true,
        },
        (_accessToken: string, _refreshToken: string, profile: ProfileGoogle, done: VerifyCallback): void => {
            console.log('here');
            handleSocialAuth(GOOGLE_DB_NAME, profile, done);
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: FACEBOOK_AUTH_ID,
            clientSecret: FACEBOOK_AUTH_SECRET,
            callbackURL: '/auth/facebook/callback',
            proxy: true,
        },

        (_accessToken: string, _refreshToken: string, profile: ProfileFacebook, done: VerifyCallback) => {
            console.log('here');
            handleSocialAuth(FACEBOOK_DB_NAME, profile, done);
        }
    )
);

passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email: string, password: string, done: VerifyCallback) => {
        handleLoginAuth(email, password, done);
    })
);
