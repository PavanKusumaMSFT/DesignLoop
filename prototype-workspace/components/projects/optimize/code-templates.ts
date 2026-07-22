/** Code templates and CloudShell command sequences for OptimizationAgent. */

// ---------------------------------------------------------------------------
// Terraform HCL
// ---------------------------------------------------------------------------

export const TERRAFORM_CODE = `1   locals {
2     tags                          = { azd-env-name : var.environment_name }
3     sha                           = base64encode(sha256("\${var.environment_name}\${var.location}\${data.azurerm_client_config.current.subscription_id}"))
4     resource_token                = substr(replace(lower(local.sha), "[^A-Za-z0-9_]", ""), 0, 13)
5     api_command_line              = "gunicorn --workers 4 --threads 2 --timeout 60 --access-logfile"
6     cosmos_connection_string_key  = "AZURE-COSMOS-CONNECTION-STRING"
7   }
8   
9   #
10  # Deploy resource Group
11  #
12  
13  resource "azurerm_resource_group" "rg" {
14    name     = "\${var.environment_name}-\${var.location}"
15    location = var.location
16    tags     = local.tags
17  }
18  
19  #
20  # Deploy application insights
21  #
22  
23  module "applicationinsights" {
24    source              = "./modules/applicationinsights"
25    location            = var.location
26    rg_name             = azurerm_resource_group.rg_name.result
27    environment_name    = var.environment_name
28    workspace_id        = module.loganalytics.LOGANALYTICS_WORKSPACE_ID
29    tags                = local.tags
30    resource_token      = local.resource_token
31  }
32  
33  #
34  # Deploy log analytics
35  #
36  
37  module "loganalytics" {
38    source              = "./modules/loganalytics"
39    location            = var.location
40    rg_name             = azurerm_resource_group.rg_name.result
41    tags                = local.tags
42  }` as const;

// ---------------------------------------------------------------------------
// Bicep template
// ---------------------------------------------------------------------------

export const BICEP_CODE = `1   // Parameters
2   param vmName string = 'VM01-clone'
3   param location string = resourceGroup().location
4   param vmSize string = 'Standard_D2s_v3'
5   
6   // Variables
7   var nicName = '\${vmName}-nic'
8   var osDiskName = '\${vmName}-osdisk'
9   var sourceVmId = resourceId('Microsoft.Compute/virtualMachines', 'VM01')
10  
11  // Network Interface
12  resource networkInterface 'Microsoft.Network/networkInterfaces@2023-04-01' = {
13    name: nicName
14    location: location
15    properties: {
16      ipConfigurations: [
17        {
18          name: 'ipconfig1'
19          properties: {
20            subnet: {
21              id: reference(sourceVmId, '2023-03-01').networkProfile.networkInterfaces[0].id
22            }
23            privateIPAllocationMethod: 'Dynamic'
24          }
25        }
26      ]
27    }
28  }
29  
30  // Virtual Machine
31  resource virtualMachine 'Microsoft.Compute/virtualMachines@2023-03-01' = {
32    name: vmName
33    location: location
34    properties: {
35      hardwareProfile: {
36        vmSize: vmSize
37      }
38      storageProfile: {
39        imageReference: {
40          id: reference(sourceVmId, '2023-03-01').storageProfile.imageReference.id
41        }
42        osDisk: {
43          name: osDiskName
44          createOption: 'FromImage'
45          managedDisk: {
46            storageAccountType: 'Premium_LRS'
47          }
48        }
49      }
50      networkProfile: {
51        networkInterfaces: [
52          {
53            id: networkInterface.id
54          }
55        ]
56      }
57    }
58  }
59  
60  // Output
61  output vmId string = virtualMachine.id
62  output vmName string = virtualMachine.name
63  output vmLocation string = virtualMachine.location` as const;

// ---------------------------------------------------------------------------
// CloudShell command/output objects
// ---------------------------------------------------------------------------

export interface CloudShellEntry {
  command: string;
  outputs: string[];
}

export const TERRAFORM_CLOUD_SHELL_COMMANDS: CloudShellEntry[] = [
  {
    command: "terraform init",
    outputs: [
      "# Initializing Terraform...",
      "# Terraform has been successfully initialized!",
    ],
  },
  {
    command: "terraform plan",
    outputs: [
      "# Planning infrastructure deployment...",
      "# Plan: 15 to add, 0 to change, 0 to destroy",
      "# Resources: App Service, Cosmos DB, Application Insights, Log Analytics",
    ],
  },
  {
    command: "terraform apply -auto-approve",
    outputs: [
      "# Deploying React web app with Python API and MongoDB...",
      "# Creating resource group...",
      "# Provisioning Cosmos DB...",
      "# Deployment in progress...",
    ],
  },
] as const;

export const AZURE_CLI_CLOUD_SHELL_COMMANDS: CloudShellEntry[] = [
  {
    command:
      "az vm create \\\n --resource-group RG1 \\\n --name VM01-clone \\\n --image UbuntuLTS \\\n --size Standard_D2s_v3 \\\n --admin-username azureuser",
    outputs: [
      "# Creating VM01-clone...",
      "# Allocating resources...",
      "# VM created successfully",
    ],
  },
] as const;
