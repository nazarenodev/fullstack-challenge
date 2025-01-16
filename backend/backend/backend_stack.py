from aws_cdk import (    
    Stack,
    CfnOutput,
    aws_dynamodb as dynamodb,
    aws_lambda as lambda_,
    aws_appsync as appsync
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
        shoes_lambda = lambda_.Function(
            self, "ShoesFunction",
            runtime = lambda_.Runtime.PYTHON_3_9,
            handler = "shoes.lambda_handler",
            code = lambda_.Code.from_asset("lambda"),
            environment = {"SHOES_TABLE": shoes_table.table_name} 
        )

        orders_lambda = lambda_.Function(
            self, "OrdersFunction",
            runtime = lambda_.Runtime.PYTHON_3_9,
            handler = "orders.lambda_handler",
            code = lambda_.Code.from_asset("lambda"),
            environment = {"ORDERS_TABLE": orders_table.table_name} 
        )

        seeder_lambda = lambda_.Function(
            self, "SeederFunction",
            runtime = lambda_.Runtime.PYTHON_3_9,
            handler = "seeder.lambda_handler",
            code = lambda_.Code.from_asset("lambda"),
            environment = {"SHOES_TABLE": shoes_table.table_name}
        )

        # Grant Lambda access to DynamoDB
        shoes_table.grant_read_data(shoes_lambda)
        shoes_table.grant_write_data(seeder_lambda)
        orders_table.grant_write_data(orders_lambda)

        # AppSync API
        api = appsync.GraphqlApi(
            self, "ShoeStoreApi",
            name = "ShoeStoreApi",
            schema = appsync.SchemaFile.from_asset("schema/schema.graphql")
        )

        # AppSync Data Sources
        shoes_data_source = api.add_lambda_data_source("ShoesDataSource", shoes_lambda)
        orders_data_source = api.add_lambda_data_source("OrdersDataSource", orders_lambda)

        # AppSync Resolvers
        shoes_data_source.create_resolver(
            id = "getshoesresolver",
            type_name = "Query",
            field_name = "getShoes"
        )

        orders_data_source.create_resolver(
            id = "createorderresolver",
            type_name = "Mutation",
            field_name = "createOrder"
        )

        # Outputs
        CfnOutput(self, id="GraphQLAPIURL", value=api.graphql_url, export_name="MyGraphQLAPIURL")
        CfnOutput(self, id="GraphQLAPIKey", value=api.api_key, export_name="MyGraphQLAPIKey")
        CfnOutput(self, id="SeederFunctionName", value=seeder_lambda.function_name, export_name="SeederFunctionName")
