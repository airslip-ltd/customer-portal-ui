output "resource_group_name" {
  value = "${module.web_app.resource_group_name}"
}

output "app_service_name" {
  value = "${module.web_app.app_service_name}"
}
