const parseRequest = event => {
    const req = JSON.parse(event.body);

    return req === undefined || req === null ? {} : req;
};

const success = body => ({
    statusCode: 200,
    body: JSON.stringify(body),
});

const error = (message, statusCode = 500) => ({
    statusCode,
    body: JSON.stringify({ message }),
});

export { parseRequest, success, error };