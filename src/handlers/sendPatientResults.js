import { updateItem } from '../../services/updateItem';
import { parseRequest, success, error } from '../../helpers/general';

module.exports.sendPatientResults = async evt => {
    const req = parseRequest(evt);

    // input validation
    if (req.pass === undefined) {
        return error('Password not included.', 401);
    }

    if (req.pass !== process.env.PASS) {
        return error('Incorrect password.', 401);
    }

    if (req.patientId === undefined) {
        return error(`Did not receive patientId. Received input: ${JSON.stringify(req, null, 2)}`, 400);
    }

    if (req.result === undefined) {
        return error(`Did not receive result (0 or 1). Received input: ${JSON.stringify(req, null, 2)}`, 400);
    }

    if (req.note === undefined) {
        return error(`Did not receive note. Received input: ${JSON.stringify(req, null, 2)}`, 400);
    }

    // update patient result
    try {
        await updateItem(
                req.patientId,
                {
                    result: req.result,
                    note: req.note,
                });
    } catch (err) {
        console.error(`ERROR while updating patient result: ${err.name}: ${err.message}`);
        return error(`Updating patient result failed. ${err.name}: ${err.message}`, 500);
    }

    return success('success');
};