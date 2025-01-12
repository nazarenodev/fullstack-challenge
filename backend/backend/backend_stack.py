from aws_cdk import (    
    Stack,
    CfnOutput,
    aws_dynamodb as dynamodb
)
from constructs import Construct

class BackendStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # DynamoDB Tables
        shoes_table = dynamodb.Table(
            self, "ShoesTable",
            partition_key = {"name": "id", "type": dynamodb.AttributeType.STRING}
        )

        orders_table = dynamodb.Table(
            self, "OrdersTable",
            partition_key={"name": "order_id", "type": dynamodb.AttributeType.STRING}
        )
