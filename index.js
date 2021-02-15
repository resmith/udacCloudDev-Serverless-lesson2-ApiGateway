'use strict'

const AWS = require('aws-sdk')

const docClient = new AWS.DynamoDB.DocumentClient()

const groupsTable = process.env.GROUPS_TABLE
const LIMIT_MAX = 10;


exports.handler = async (event) => {
  console.log('Processing event: ', event);
  console.log("table: ", groupsTable);

  let nextKey = getParameter(event, 'nextKey') ;
  let limit = getParameter(event, 'limit');

  console.log('nextkey: ',nextKey );
  console.log('limit: ',limit );

  // Scan operation parameters
  const scanParams = {
    TableName: groupsTable,
    Limit: limit,
    ExclusiveStartKey: nextKey
  }
  console.log('Scan params: ', scanParams)

  const result = await docClient.scan(scanParams).promise()

  const items = result.Items

  console.log('Result: ', result)

  // Return result
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items,
      // Encode the JSON object so a client can return it in a URL as is
      nextKey: encodeNextKey(result.LastEvaluatedKey)
    })
  }
}


/**
 * Get a query parameter or return "undefined"
 *
 * @param {Object} event HTTP event passed to a Lambda function
 * @param {string} name a name of a query parameter to return
 *
 * @returns {string} a value of a query parameter value or "undefined" if a parameter is not defined
 */

function getParameter(event, fieldName) { 
  const queryParams = event.queryStringParameters;
  let returnValue;
  let queryVal;

  if (queryParams) {
    queryVal = queryParams[fieldName]
  } else {
    return undefined
  } 

  // Validation checking & final conversions
  switch (fieldName){
    case 'limit':
      if (parseInt(queryVal, 10) > 0 && parseInt(queryVal, 10) < 11 ) 
      { returnValue = parseInt(queryVal, 10) }
      else 
      { returnValue = 2 }
      break;
    case 'nextKey':
      if (queryVal) {
        return JSON.parse(decodeURIComponent(nextKeyStr))
      } else {
        return undefined
      }
      break;
    default:
      returnValue = queryVal;
  }

  return returnValue
}


/**
 * Encode last evaluated key using
 *
 * @param {Object} lastEvaluatedKey a JS object that represents last evaluated key
 *
 * @return {string} URI encoded last evaluated key
 */
function encodeNextKey(lastEvaluatedKey) {
  if (!lastEvaluatedKey) {
    return null
  }

  return encodeURIComponent(JSON.stringify(lastEvaluatedKey))
}
