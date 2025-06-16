# Usa Jenkins oficial como base
FROM jenkins/jenkins:lts

# Cambia a root para instalar herramientas
USER root

# Instala herramientas necesarias: Docker CLI, Node.js 20, kubectl y git
RUN apt-get update && \
    apt-get install -y curl ca-certificates gnupg2 lsb-release git && \
    \
    # Agrega Docker GPG y repositorio
    install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc && \
    chmod a+r /etc/apt/keyrings/docker.asc && \
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
    https://download.docker.com/linux/debian \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
    > /etc/apt/sources.list.d/docker.list && \
    \
    # Instala Docker CLI
    apt-get update && \
    apt-get install -y docker-ce-cli && \
    \
    # Instala Node.js 20
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    \
    # Instala kubectl (versión fija)
    curl -LO https://dl.k8s.io/release/v1.30.1/bin/linux/amd64/kubectl && \
    install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl && \
    rm kubectl && \
    \
    # Limpieza
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

    # Añade usuario Jenkins al grupo docker (si usas Docker-in-Docker o el socket)
RUN groupadd docker && usermod -aG docker jenkins

    # Añade usuario Jenkins al grupo docker (si usas Docker-in-Docker o el socket)
RUN usermod -aG docker jenkins

    
COPY jenkins-security.groovy /usr/share/jenkins/ref/init.groovy.d/

# Vuelve a usuario Jenkins
USER jenkins
