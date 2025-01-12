from aws_cdk import (    
    Stack,
    CfnOutput,
    aws_dynamodb as dynamodb,
    aws_lambda as _lambda,
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

        # Lambda Functions
        shoes_lambda = _lambda.Function(
            self, "ShoesFunction",
            runtime = _lambda.Runtime.PYTHON_3_9,
            handler = "shoes.lambda_handler",
            code = _lambda.Code.from_asset("lambda"),
            environment = {"SHOES_TABLE", shoes_table.table_name} 
        )

        orders_lambda = _lambda.Function(
            self, "OrdersFunction",
            runtime = _lambda.Runtime.PYTHON_3_9,
            handler = "orders.lambda_handler",
            code = _lambda.Code.from_asset("lambda"),
            environment = {"ORDERS_TABLE", orders_table.table_name} 
        )

        # Grant Lambda access to DynamoDB
        shoes_table.grant_read_data(shoes_lambda)
        orders_table.grant_write_data(orders_lambda)
