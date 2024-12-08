terraform {
  backend "azurerm" {
    resource_group_name  = "webapp-rg"
    storage_account_name = "webapptfstate143101a"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
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
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  dns_prefix          = "webapp"

  default_node_pool {
    name       = "default"
    node_count = 2                     # Anzahl der Nodes im Cluster
    vm_size    = "Standard_B2ms"       # Größe der virtuellen Maschinen
  }

  identity {
    type = "SystemAssigned"            # Verwaltete Identität
  }

  tags = {
    environment = "dev"
  }
}
