terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "2.68.0"
    }
  }

  backend "azurerm" {
  }
}

provider "azurerm" {
  features {}
}

locals {
  tags = {
    Environment = "${var.environment}"
  }
  app_id = "cuatomer-portal-ui"
  app_id_short = "cprtl"
  short_environment = var.short_environment
  location = var.location
  app_tier = var.web_tier
  app_size = var.web_size
  health_check_path = ""
  admin_group_id = var.admin_group_id
  certificate_name = var.certificate_name
  certificate_path = var.certificate_path
  certificate_password = var.certificate_password
  deployment_agent_group_id = var.deployment_agent_group_id
  hostname = var.hostname
  certificate_thumbprint = var.certificate_thumbprint
}

data "azurerm_client_config" "current" {}

module "web_app" {
  source = "./tf_modules/Airslip.Terraform.Modules/recipes/node_js_web_app"

  app_configuration = {
    app_id = local.app_id,
    hostname = local.hostname,
    app_id_short = local.app_id_short,
    short_environment = local.short_environment,
    location = local.location,
    tags = local.tags,
    app_tier = local.app_tier,
    app_size = local.app_size,
    health_check_path = local.health_check_path, 
    certificate_name = local.certificate_name, 
    certificate_path = local.certificate_path, 
    certificate_password = local.certificate_password,
    tenant_id = data.azurerm_client_config.current.tenant_id,
    admin_group_id = local.admin_group_id,
    deployer_id = local.deployment_agent_group_id,
    certificate_thumbprint = local.certificate_thumbprint
  }
}