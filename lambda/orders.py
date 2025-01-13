import os
import boto3
import uuid

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["ORDERS_TABLE"])

def lambda_handler(event, context):
    args = event["arguments"]

    order = {
        "order_id": str(uuid.uuid4()),
        "client": args["client"],
        "shoeRef": args["shoeRef"],
        "size": args["size"],
        "shippingInfo": args["shippingInfo"]
    }

    table.put_item(item=order)
    return order