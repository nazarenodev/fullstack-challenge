import os
import boto3
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ["SHOES_TABLE"])

def lambda_handler(event, context):    
    shoes = [
        {"id": str(uuid.uuid4()), "brand": "Nike", "availableSizes": [7, 8, 9, 10], "price": 100},
        {"id": str(uuid.uuid4()), "brand": "Adidas", "availableSizes": [6, 7, 8], "price": 120},
        {"id": str(uuid.uuid4()), "brand": "Puma", "availableSizes": [8, 9, 10], "price": 90},
        {"id": str(uuid.uuid4()), "brand": "Reebok", "availableSizes": [7, 8], "price": 110},
    ]

    for shoe in shoes:
        table.put_item(Item=shoe)
    
    return {"statusCode": 200, "body": "Shoes table populated successfully!"}