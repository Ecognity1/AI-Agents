locals {
  tags = {
    application = "folio-online-bookstore"
    environment = var.environment
    managed-by  = "terraform"
  }
}

resource "azurerm_resource_group" "this" {
  name     = var.resource_group_name
  location = var.location
  tags     = local.tags
}

resource "azurerm_service_plan" "this" {
  name                = var.service_plan_name
  resource_group_name = azurerm_resource_group.this.name
  location            = azurerm_resource_group.this.location
  os_type             = "Linux"
  sku_name            = var.service_plan_sku
  tags                = local.tags
}

resource "azurerm_storage_account" "deployments" {
  name                             = var.deployment_storage_account_name
  resource_group_name              = azurerm_resource_group.this.name
  location                         = azurerm_resource_group.this.location
  account_tier                     = "Standard"
  account_replication_type         = "LRS"
  min_tls_version                  = "TLS1_2"
  allow_nested_items_to_be_public  = false
  cross_tenant_replication_enabled = false
  default_to_oauth_authentication  = true
  local_user_enabled               = false
  tags                             = local.tags
}

resource "azurerm_storage_container" "deployments" {
  name                  = "deployments"
  storage_account_name  = azurerm_storage_account.deployments.name
  container_access_type = "private"
}

resource "azurerm_linux_web_app" "this" {
  name                                           = var.web_app_name
  resource_group_name                            = azurerm_resource_group.this.name
  location                                       = azurerm_resource_group.this.location
  service_plan_id                                = azurerm_service_plan.this.id
  https_only                                     = true
  client_affinity_enabled                        = false
  ftp_publish_basic_authentication_enabled       = false
  webdeploy_publish_basic_authentication_enabled = false
  tags                                           = local.tags

  identity { type = "SystemAssigned" }

  site_config {
    always_on                         = var.service_plan_sku != "F1"
    app_command_line                  = "npm start"
    ftps_state                        = "Disabled"
    health_check_path                 = "/api/v1/status"
    health_check_eviction_time_in_min = 5
    minimum_tls_version               = "1.2"
    application_stack { node_version = "20-lts" }
  }

  app_settings = merge({
    FOLIO_DATA_FILE                              = "/home/data/folio.json"
    SCM_DO_BUILD_DURING_DEPLOYMENT               = "false"
    WEBSITE_RUN_FROM_PACKAGE_BLOB_MI_RESOURCE_ID = "SystemAssigned"
    }, var.application_package_url == "" ? {} : {
    WEBSITE_RUN_FROM_PACKAGE = var.application_package_url
  })

  logs {
    detailed_error_messages = true
    failed_request_tracing  = true
    http_logs {
      file_system {
        retention_in_days = 7
        retention_in_mb   = 35
      }
    }
  }
}

resource "azurerm_role_assignment" "package_reader" {
  scope                = azurerm_storage_account.deployments.id
  role_definition_name = "Storage Blob Data Reader"
  principal_id         = azurerm_linux_web_app.this.identity[0].principal_id
}
