Hier ist ein Vorschlag für eine initiale `README.md`, die dein Projekt beschreibt:

```markdown
# System Engineering & Management: Webanwendung mit AKS und Terraform

Dieses Projekt ist Teil der Vorlesung "System Engineering & Management" und beinhaltet die Entwicklung und Bereitstellung einer containerisierten Webanwendung auf **Azure Kubernetes Service (AKS)**. Die Infrastruktur wird mit **Terraform** verwaltet.

## Projektstruktur

```plaintext
projektordner/
├── terraform/                     # Terraform-Konfigurationen
│   ├── main.tf                    # Hauptdatei für Ressourcen
│   ├── variables.tf               # Definierte Variablen (optional)
│   ├── outputs.tf                 # Outputs (optional)
│   ├── terraform.tfstate          # Terraform-Zustand (nicht in Git einchecken)
│   └── .terraform/                # Terraform-Caches (nicht in Git einchecken)
├── webapp/                        # Webanwendung (Node.js, Docker)
│   ├── Dockerfile                 # Docker-Konfigurationsdatei
│   ├── package.json               # Abhängigkeiten der Web-App
│   ├── server.js                  # Beispielserver
├── .gitignore                     # Dateien, die nicht ins Git-Repo gehören
├── README.md                      # Projektbeschreibung
```

## Infrastruktur-Komponenten

1. **Azure Resource Group**:
   - Organisiert alle Azure-Ressourcen.
   - Name: `webapp-rg`.

2. **Azure Container Registry (ACR)**:
   - Speichert Docker-Images für die Anwendung.
   - Name: `webappacr`.

3. **Azure Kubernetes Service (AKS)**:
   - Orchestriert und skaliert containerisierte Anwendungen.
   - Cluster-Name: `webapp-aks`.

## Voraussetzungen

- **Azure-Konto**: Studenten- oder Standardkonto für Azure-Dienste.
- **Terraform**: [Installation](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
- **Docker**: [Installation](https://www.docker.com/products/docker-desktop/)
- **Azure CLI**: [Installation](https://learn.microsoft.com/de-de/cli/azure/install-azure-cli)
- **Node.js** (für die Web-App, falls nötig): [Installation](https://nodejs.org/)

## Schritte zur Bereitstellung

1. **Terraform initialisieren**:
   ```bash
   cd terraform
   terraform init
   ```

2. **Plan erstellen**:
   ```bash
   terraform plan
   ```

3. **Ressourcen bereitstellen**:
   ```bash
   terraform apply
   ```

4. **Kubernetes konfigurieren**:
   - Anmeldeinformationen abrufen:
     ```bash
     az aks get-credentials --resource-group webapp-rg --name webapp-aks
     ```
   - Testen:
     ```bash
     kubectl get nodes
     ```

5. **Docker-Image erstellen und pushen**:
   Sobald der Entwickler das Docker-Image bereitstellt:
   ```bash
   docker build -t webappacr.azurecr.io/webapp:latest .
   docker push webappacr.azurecr.io/webapp:latest
   ```

6. **Web-App in AKS bereitstellen**:
   Kubernetes-Manifestdateien verwenden (z. B. `deployment.yaml`).

## Nützliche Befehle

- **Docker bei ACR anmelden**:
  ```bash
  az acr login --name webappacr
  ```

- **Kubernetes-Cluster testen**:
  ```bash
  kubectl get nodes
  ```

- **Container-Logs anzeigen**:
  ```bash
  kubectl logs <pod-name>
  ```

## To-Do

- [ ] Docker-Image für Webanwendung erstellen.
- [ ] Kubernetes-Deployment für die Web-App bereitstellen.
- [ ] CI/CD-Pipeline einrichten (z. B. mit GitHub Actions).

---

**Hinweis:** Bitte stelle sicher, dass sensible Daten wie Zugangsdaten nicht in das Git-Repository eincheckt werden. Nutze `.gitignore`, um Dateien wie `terraform.tfstate` auszuschließen.
```

Falls du etwas Spezielles hinzufügen möchtest, lass es mich wissen! 😊