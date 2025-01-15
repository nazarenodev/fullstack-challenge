import aws_cdk as core
from aws_cdk import App, assertions
import pytest

from backend.backend_stack import BackendStack

@pytest.fixture
def synth_stack():
    app = App()
    stack = BackendStack(app, "TestBackendStack")
    template = assertions.Template.from_stack(stack)
    return template

def test_dynamodb_tables(synth_stack):
    template = synth_stack

    # Assert that the DynamoDB ShoesTable is created
    template.has_resource_properties("AWS::DynamoDB::Table", {
        "KeySchema": [{"AttributeName": "id", "KeyType": "HASH"}],
        "AttributeDefinitions": [{"AttributeName": "id", "AttributeType": "S"}],
    })

    # Assert that the DynamoDB OrdersTable is created
    template.has_resource_properties("AWS::DynamoDB::Table", {
        "KeySchema": [{"AttributeName": "order_id", "KeyType": "HASH"}],
        "AttributeDefinitions": [{"AttributeName": "order_id", "AttributeType": "S"}],
    })

def test_lambda_functions(synth_stack):
    template = synth_stack

    # Assert that the ShoesFunction Lambda is created with correct environment variable
    template.has_resource_properties("AWS::Lambda::Function", {
        "Handler": "shoes.lambda_handler",
        "Runtime": "python3.9",
        "Environment": {
            "Variables": {"SHOES_TABLE": {"Ref": assertions.Match.any_value()}}
        }
    })

    # Assert that the OrdersFunction Lambda is created with correct environment variable
    template.has_resource_properties("AWS::Lambda::Function", {
        "Handler": "orders.lambda_handler",
        "Runtime": "python3.9",
        "Environment": {
            "Variables": {"ORDERS_TABLE": {"Ref": assertions.Match.any_value()}}
        }
    })

    # Assert that the SeederFunction Lambda is created with correct environment variable
    template.has_resource_properties("AWS::Lambda::Function", {
        "Handler": "seeder.lambda_handler",
        "Runtime": "python3.9",
        "Environment": {
            "Variables": {"SHOES_TABLE": {"Ref": assertions.Match.any_value()}}
        }
    })

def test_appsync_api(synth_stack):
    template = synth_stack

    # Assert that the AppSync API is created
    template.has_resource_properties("AWS::AppSync::GraphQLApi", {
        "Name": "ShoeStoreApi"
    })

    # Assert that the AppSync API key is created
    template.has_resource_properties("AWS::AppSync::ApiKey", {})

def test_appsync_resolvers(synth_stack):
    template = synth_stack

    # Assert that the AppSync Resolver for getShoes exists
    template.resource_count_is("AWS::AppSync::Resolver", 2)
    template.has_resource_properties("AWS::AppSync::Resolver", {
        "FieldName": "getShoes",
        "TypeName": "Query",
    })

    # Assert that the AppSync Resolver for createOrder exists
    template.has_resource_properties("AWS::AppSync::Resolver", {
        "FieldName": "createOrder",
        "TypeName": "Mutation",
    })