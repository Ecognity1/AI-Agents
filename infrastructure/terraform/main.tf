module "folio" {
  source = "./modules/folio"

  subscription_id                 = var.subscription_id
  location                        = var.location
  environment                     = var.environment
  resource_group_name             = var.resource_group_name
  service_plan_name               = var.service_plan_name
  service_plan_sku                = var.service_plan_sku
  web_app_name                    = var.web_app_name
  deployment_storage_account_name = var.deployment_storage_account_name
  application_package_url         = var.application_package_url
}
