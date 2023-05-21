import {
  dynamodbCreateRecord,
  dynamodbCreateTable,
  dynamodbDeleteTable,
  dynamodbDescribeTable,
} from "./aws";
import vendors from "./data/vendors";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const init = async () => {
  const vendorsTableName = "vendors";

  const vendorsTable = await dynamodbDescribeTable(vendorsTableName);

  if (!(vendorsTable instanceof Error)) {
    // DELETE THE TABLE
    await dynamodbDeleteTable(vendorsTableName);
    await delay(6000);
  }

  const vendorsTableParams: AWS.DynamoDB.CreateTableInput = {
    TableName: vendorsTableName,
    KeySchema: [{ AttributeName: "twitterId", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "twitterId", AttributeType: "S" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };
  await dynamodbCreateTable(vendorsTableParams);
  await delay(6000);

  const firstVendor = vendors[0];
  await dynamodbCreateRecord(vendorsTableName, firstVendor);
};

init();
