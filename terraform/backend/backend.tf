terraform {
  backend "azurerm" {
    storage_account_name = "examplestorageaccount"
    container_name       = "terraform-state"
    key                  = "terraform.tfstate"
    resource_group_name  = "example-resource-group"
    subscription_id      = "your_subscription_id"
    tenant_id            = "your_tenant_id"
  }
}

provider "azurerm" {
  features {}
}
