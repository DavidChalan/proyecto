#!groovy

import jenkins.model.*
import hudson.security.*

def instance = Jenkins.getInstance()

println "--> Configurando usuario admin predeterminado..."

def hudsonRealm = new HudsonPrivateSecurityRealm(false)
hudsonRealm.createAccount("admin", "admin123")
instance.setSecurityRealm(hudsonRealm)

def strategy = new FullControlOnceLoggedInAuthorizationStrategy()
strategy.setAllowAnonymousRead(false)
instance.setAuthorizationStrategy(strategy)

instance.save()
println "--> Usuario admin creado con exito."
println "--> Configuracion de seguridad de Jenkins completada."
println "--> Reiniciando Jenkins para aplicar los cambios..."
instance.doSafeRestart()
println "--> Jenkins reiniciado."
println "--> Configuracion de seguridad de Jenkins finalizada."
println "--> Puedes acceder a Jenkins en http://localhost:8080 con el usuario 'admin' y la contraseña 'admin123'."
// Fin del script de configuracion de seguridad de Jenkins                  