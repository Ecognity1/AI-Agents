# Adopt only the authorized bootstrap resource group into the isolated South India state.
import {
  to = module.folio.azurerm_resource_group.this
  id = "/subscriptions/${var.subscription_id}/resourceGroups/${var.resource_group_name}"
}
