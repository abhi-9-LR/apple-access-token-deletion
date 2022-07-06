require('dotenv').config();
const unirest = require('unirest');
var webhookPayload = (req, res, next) => {

    try {
        let webhookResponse = req.body ? (req.body.Data ? (req.body.Data.Identities ? req.body.Data.Identities : null) : null) : null;
        let appleAccessToken;
        if (webhookResponse) {
            for (key in webhookResponse) {
                if (webhookResponse[key].Provider = 'apple') {
                    appleAccessToken = webhookResponse[key].ProviderAccessCredential ? (webhookResponse[key].ProviderAccessCredential.AccessToken ? webhookResponse[key].ProviderAccessCredential.AccessToken : null) : null
                }
            }
        }
        if (!appleAccessToken) {
            let errorResponse = {
                message: 'Access Token is required',
                description: 'Apple Access token not found in the user webhook response',
                statusCode: 403
            };

            res.status(403).json(errorResponse)
        } else {


            let element = {
                appleEndpoint: "https://appleid.apple.com/auth/revoke"
            }
            let payload = {

                client_id: process.env.client_id,
                client_secret: process.env.client_secret,
                token: appleAccessToken,
                token_type_hint: "access_token"
            }
            var client = unirest.post(element.appleEndpoint)
                .headers({
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
                .send(payload);


            client.end(function (response) {
                if (response.error) {
                    var errorResponse = {
                        message: JSON.stringify(response.body),
                        description: '',
                        statusCode: response.status || 200,
                        stackTrace: response.error.stack,
                        requestPath: element.Url
                    };

                    res.status(errorResponse.statusCode).json(errorResponse)
                } else {
                    var successResponse = {
                        message: JSON.stringify(response.body),
                        description: '',
                        statusCode: response.status || 200

                    }
                    res.status(successResponse.statusCode).json(successResponse)
                }
            });
        }
    } catch (err) {
        let errorResponse = {
            message: JSON.stringify(err),
            description: '',
            statusCode: err.status || 500
        };

        res.status(errorResponse.statusCode).json(errorResponse)

    }
};

module.exports = { webhookPayload }
