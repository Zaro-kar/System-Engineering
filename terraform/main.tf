terraform {
  backend "azurerm" {
    resource_group_name  = "webapp-backend-rg"
    storage_account_name = "webapptfstate143101a"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
  client_id       = var.client_id
  client_secret   = var.client_secret
  tenant_id       = var.tenant_id
}

resource "azurerm_resource_group" "backend" {
  name     = "webapp-backend-rg"
  location = "West Europe"
}

resource "azurerm_storage_account" "backend" {
  name                     = "webapptfstate143101a"
  resource_group_name      = azurerm_resource_group.backend.name
  location                 = azurerm_resource_group.backend.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_container" "backend" {
  name                  = "tfstate"
  storage_account_name  = azurerm_storage_account.backend.name
  container_access_type = "private"
}

resource "azurerm_resource_group" "main" {
  name     = "webapp-rg"
  location = "West Europe"
}

resource "azurerm_container_registry" "main" {
  name                = "webappacr143101a"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_kubernetes_cluster" "main" {
  name                = "webapp-aks"
  location            = "East US"
  resource_group_name = azurerm_resource_group.main.name
  dns_prefix          = "webapp"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "Standard_B2ms"
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    environment = "dev"
  }
}