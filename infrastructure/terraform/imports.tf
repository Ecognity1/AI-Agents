# Adopt the existing development resources into the recovered backend state.
# These imports are idempotent after the first successful apply.
import {
  to = module.folio.azurerm_resource_group.this
  id = "/subscriptions/${var.subscription_id}/resourceGroups/${var.resource_group_name}"
}

import {
  to = module.folio.azurerm_service_plan.this
  id = "/subscriptions/${var.subscription_id}/resourceGroups/${var.resource_group_name}/providers/Microsoft.Web/serverFarms/${var.service_plan_name}"
}

import {
  to = module.folio.azurerm_linux_web_app.this
  id = "/subscriptions/${var.subscription_id}/resourceGroups/${var.resource_group_name}/providers/Microsoft.Web/sites/${var.web_app_name}"
}

import {
  to = module.folio.azurerm_storage_account.deployments
  id = "/subscriptions/${var.subscription_id}/resourceGroups/${var.resource_group_name}/providers/Microsoft.Storage/storageAccounts/${var.deployment_storage_account_name}"
}

import {
  to = module.folio.azurerm_storage_container.deployments
  id = "https://${var.deployment_storage_account_name}.blob.core.windows.net/deployments"
}

import {
  to = module.folio.azurerm_role_assignment.package_reader
  id = "/subscriptions/${var.subscription_id}/resourceGroups/${var.resource_group_name}/providers/Microsoft.Storage/storageAccounts/${var.deployment_storage_account_name}/providers/Microsoft.Authorization/roleAssignments/c52b1860-a0c7-c873-45b2-c999c5883b23"
}
