/**
 * Created by sabir on 22.06.16.
 */

var ErrorCodesRegistry = {

    ACCESS_DENIED: {
        code: 700
    },

    INCORRECT_INPUT_DATA: {
        code: 701
    },

    INCORRECT_LOGIN_CREDENTIALS: {
        code: 781
    },


    NOT_FOUND: {
        code: 404
    },

    UNKNOWN_ERROR: {
        code: 705
    },

    INCORRECT_SIGNUP_CREDENTIALS: {
        code: 782
    },

    USER_WITH_SPECIFIED_EMAIL_ALREADY_EXISTS: {
        code: 706
    },

    USER_WITH_SPECIFIED_ID_IS_NOT_FOUND: {
        code: 707
    },

    AIRCRAFT_IS_NOT_FOUND: {
        code: 708
    }

};

module.exports = ErrorCodesRegistry;