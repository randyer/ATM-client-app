
exports.handler = async (event) => {
    console.log(event);
    const customerPhone = event.pathParameters.customerPhone;
    const customer = {'customerPhone':customerPhone, 'customerName': "customer " + customerPhone};
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
     headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "*"
     },
        body: JSON.stringify(customer),
    };
    return response
};
