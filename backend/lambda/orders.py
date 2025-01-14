import os
import boto3
import uuid
from decimal import Decimal

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["ORDERS_TABLE"])

def lambda_handler(event, context):
    args = event["arguments"]

    items = [
        {
            "shoeId": item["shoeId"],
            "brand": item["brand"],
            "size": item["size"],
            "quantity": item["quantity"],
            "price": Decimal(str(item["price"])),
        }
        for item in args["items"]
    ]

    order = {
        "order_id": str(uuid.uuid4()),
        "client": args["client"],
        "items": items,
        "totalPrice": Decimal(str(args["totalPrice"])),
        "shippingInfo": args["shippingInfo"]
    }

    table.put_item(Item=order)
    return order