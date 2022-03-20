import { updateItem } from '../services/updateItem';
import { parseRequest, success, error } from '../helpers/general';

module.exports.sendPatientResults = async evt => {
    const req = parseRequest(evt);

    // input validation
    if (req.apiPass === undefined) {
        return error('API password not included.', 401);
    }

    if (req.apiPass !== process.env.PASS) {
        return error('API password incorrect.', 401);
    }

    if (req.patientId === undefined) {
        return error(`Did not receive patientId.`, 400);
    }

    if (req.result === undefined) {
        return error(`Did not receive result (0 or 1).`, 400);
    }

    if (req.imageUri === undefined) {
        return error(`Did not receive imageUri.`, 400);
    }

    // update patient result
    try {
        await updateItem(
            req.patientId,
            {
                result: req.result,
                imageUri: req.imageUri,
                date: req.date,
                patientName: req.patientName
            });
    } catch (err) {
        console.error(`ERROR while updating patient result: ${err.name}: ${err.message}`);
        return error(`Updating patient result failed. ${err.name}: ${err.message}`, 500);
    }

    return success('success');
};