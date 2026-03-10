# Diagrama Lógico - Arquitectura de Telecomunicaciones ACA

## Sistema de Telecomunicaciones Integrado

```mermaid
graph TB
    subgraph "Ciudad (Sensores y Ciudadanos)"
        A["Sensores IoT<br/>(Alumbrado, Medidores)"]
        B["Ciudadano<br/>(Portal Web - WebRTC)"]
    end

    subgraph "Red de Acceso IoT"
        C["Gateway LoRaWAN 1"]
        D["Gateway LoRaWAN 2"]
        E["Gateway LoRaWAN N"]
    end

    subgraph "Núcleo de Red Central (On-Premise)"
        F["Controlador SDN<br/>(Plano de Control - OpenDaylight)"]
        G["Switches de Fabric<br/>(Plano de Datos - OpenFlow)"]
        H["Clúster NFV (MANO)"]
        I["VNF: vFirewall"]
        J["VNF: vLoad Balancer"]
        K["VNF: Servidor Red LoRaWAN"]
        L["VNF: Session Border Controller (SBC)"]
    end

    subgraph "Plataforma Cloud (AWS)"
        M["VPC Pública"]
        N["VPC Privada"]
        O["Internet Gateway"]
        P["Application Load Balancer (ALB)"]
        Q["Servidores Web (Frontend)"]
        R["Clúster Kubernetes (EKS)<br/>(Microservicios IoT)"]
        S["Bases de Datos (RDS - Cifradas)"]
        T["Almacenamiento (S3 - Cifrado)"]
    end

    subgraph "Centro de Emergencias (911)"
        U["Agente 911<br/>(Teléfono IP - SIP)"]
        V["Consola WebRTC"]
    end

    subgraph "Oficinas Gubernamentales"
        W["UCaaS (Microsoft Teams Phone)"]
    end

    A --> C & D & E
    B -- "Llamada WebRTC" --> V
    
    C & D & E -- "Tráfico IoT (Fibra/Microondas)" --> G
    G -- "Gestión de Flujos" --> F
    G --> I --> J --> H
    G --> K
    G --> L

    L -- "Señalización SIP" --> U
    L -- "Integración SIP Trunk" --> W

    J -- "Tráfico Web Balanceado" --> O
    O --> M --> P --> Q
    P --> R
    R --> S
    R --> T
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style F fill:#ff9,stroke:#333,stroke-width:4px
    style H fill:#ff9,stroke:#333,stroke-width:2px
    style M fill:#9cf,stroke:#333,stroke-width:2px
    style N fill:#9cf,stroke:#333,stroke-width:2px
    style U fill:#f99,stroke:#333,stroke-width:2px