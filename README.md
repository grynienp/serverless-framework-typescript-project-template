[![Checkout Finland Oy](https://extranet.checkout.fi/static/img/checkout-logo.png)](http://www.checkout.fi/)

---

# Typescript serverless framework template

Uses [Serverless Framework](https://serverless.com/) with [AWS Lambdas](https://aws.amazon.com/lambda/) & AWS API Gateway to create Node.js/TypeScript REST-APIs.

## Development environment

First install npm packages and Serverless Framework:

    npm install
    # tested with Serverless 1.5.1
    npm install -g serverless

To run devenv:

    npm run build:watch

Then:

    npm run dev

in another terminal tab. Now your changes will automatically be used.

### Tests
To run tests:

    npm run test

## Deployment

First config the AWS credentials:

    serverless config credentials --provider aws --key <key> --secret <secretKey>

Then you can run:

    sls deploy --stage <your stage>
    # for example:
    sls deploy --stage production