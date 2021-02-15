# Serverless Lambda -> ApiGateway & DynamoDb
udacity - Cloud Developer -Serverless exercise 2 - Lambda function that utilizes ApiGateway & calls DynamoDb

## Purpose
Application that shows the use of pagination. It is called with a URL with the parameters 'limit' and next key.

- Limit is the number of items to return
- NextKey is the key of the first item of the next set of data to return



## Testing
Tested using the API Gateway Test and Postman.

Call signature is: 
https://{{apiId}}.execute-api.us-west-2.amazonaws.com/dev/groups

apiid is obtained from API Gateway