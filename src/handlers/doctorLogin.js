import { scan } from '../services/scan';
import { parseRequest, success, error } from '../helpers/general';
import { doctors, doctorPatient } from '../helpers/constants';

module.exports.doctorLogin = async evt => {
    const req = parseRequest(evt);

    // input validation
    if (req.apiPass === undefined) {
        return error('API password not included.', 401);
    }

    if (req.apiPass !== process.env.PASS) {
        return error('API password incorrect.', 401);
    }

    if (req.username === undefined) {
        return error('Username not included.', 401);
    }

    if (req.pass === undefined) {
        return error('Password not included.', 401);
    }

    if (doctors[req.username] === undefined) {
        return error('Username not found.', 401);
    }

    if (req.pass !== doctors[req.username].pass) {
        return error('Incorrect password.', 401);
    }

    let results = [];
    try {
        results = (await scan()).filter(r => doctorPatient[req.username].includes(r.id));
    } catch (err) {
        console.error(`ERROR while getting results: ${err.name}: ${err.message}`);
        return error('Something went wrong. Please try again or contact support.', 500);
    }

    return success({
        doctor: {
            firstName: doctors[req.username].firstName,
            lastName: doctors[req.username].lastName,
        },
        results,
    });
};