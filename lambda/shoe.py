import os
import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["SHOES_TABLE"])

def lambda_handler(event, context):
    brand_filter = event.get("arguments", {}).get("brand", None)

    if brand_filter:
        response = table.scan(FilterExpression="brand = :brand", ExpressionAttributeValues={":brand": brand_filter})
    else:
        response = table.scan()

    return response["Items"]