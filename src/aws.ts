import AWS from "aws-sdk";
import { AWSRegions } from "./types/aws";
import { Vendor } from "./types/twitter";
import { marshall } from "@aws-sdk/util-dynamodb";

AWS.config.update({ region: AWSRegions.AP_NORTHEAST_1 });

const { DynamoDB } = AWS;
const dynamodb = new DynamoDB();

// create a tablel
export const dynamodbCreateTable = async (
  params: AWS.DynamoDB.CreateTableInput
) => {
  try {
    const result = await dynamodb.createTable(params).promise();
    console.log("table created", result);
    return result;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
    throw new Error(`dynamodbCreateTable error object unknown type`);
  }
};

// describe a table
export const dynamodbDescribeTable = async (tableName: string) => {
  try {
    const table = await dynamodb
      .describeTable({
        TableName: tableName,
      })
      .promise();
    console.log("table retrieved", table);
    return table;
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }
    throw new Error(`dynamodbDescribeTable error object unknown type`);
  }
};

// delete a table
export const dynamodbDeleteTable = async (tableName: string) => {
  try {
    const result = await dynamodb
      .deleteTable({
        TableName: tableName,
      })
      .promise();
    console.log("table deleted", result);
    return result;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
    throw new Error(`dynamodbDescribeTable error object unknown type`);
  }
};

// create a record
export const dynamodbCreateRecord = async (
  tableName: string,
  vendor: Vendor
) => {
  try {
    await dynamodb
      .putItem({
        TableName: tableName,
        Item: marshall(vendor),
      })
      .promise();
    console.log("Record created");
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }
    throw new Error(`dynamodbCreateRecord error object unknown type`);
  }
};
