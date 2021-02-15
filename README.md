# Serverless Lambda -> ApiGateway & DynamoDb
udacity - Cloud Developer -Serverless exercise 2 - Lambda function that utilizes ApiGateway & calls DynamoDb

## Purpose
Application that shows the use of pagination. It is called with a URL with the parameters 'limit' and next key.

- Limit is the number of items to return
- NextKey is the key of the first item of the next set of data to return


## Installation
1. Copy the code from index.js to Lambda
1b. Set the environment variable 'GROUPS_TABLE' to the value 'Groups'

2. Setup API Gateway with a resource: /groups
 Method Get: 
    Authorizaton: None

    apiid is obtained from API Gateway


Integration Type: Lambda
Use Lambda Proxy integration ((this will provide all event data))


3. Setup DynamoDb
    Table: Groups
    Don't use default. For capacity, don't use 'provisioned', use 'on-demand'

4. Setup Security
    In IAM
    - Create a policy giving access to Dynamo DB
    (See iam-policy.json for an example)
    - Create a role with that policy and the ability to access logs
    - Assing that role to the Lamda function
    


## Testing
First test using AWS API Gateway, then test using Postman.

Call signature is: 
```
https://{{apiId}}.execute-api.us-west-2.amazonaws.com/dev/groups
# *note:* apiid is obtained from API Gateway

https://{{apiId}}.execute-api.us-west-2.amazonaws.com/dev/groups?limit=1

https://{{apiId}}.execute-api.us-west-2.amazonaws.com/dev/groups?limit=1&nextKey="%7B%22id%22%3A%221%22%7D"
# *note:* nextKey should be obtained from the prevous http response
```

