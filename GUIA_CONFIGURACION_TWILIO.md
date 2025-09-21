
# 🚀 GUÍA COMPLETA: CONFIGURACIÓN DE TWILIO PARA WHATSAPP - SOFTWAREPAR

## 📋 REQUISITOS PREVIOS
- ✅ Cuenta creada en [Twilio Console](https://console.twilio.com/)
- ✅ Acceso admin a tu sistema SoftwarePar
- ✅ Número de WhatsApp Business (recomendado)

---

## 🔧 PASO 1: CONFIGURACIÓN INICIAL EN TWILIO

### 1.1 Obtener Credenciales de Twilio
1. Ve a [Twilio Console](https://console.twilio.com/)
2. En el Dashboard principal, copia:
   - **Account SID** (ejemplo: `AC1234567890abcdef1234567890abcdef`)
   - **Auth Token** (ejemplo: `ab12cd34ef56gh78ij90kl12mn34op56`)

### 1.2 Configurar WhatsApp Sandbox (Para Testing)
1. Ve a **Develop > Messaging > Try it out > Send a WhatsApp message**
2. Sigue las instrucciones para unir tu número personal al sandbox
3. Envía el código que te dan (ej: `join <código>`) al número sandbox
4. Copia el **WhatsApp Sandbox Number** (ej: `+14155238886`)

---

## ⚙️ PASO 2: CONFIGURACIÓN EN SOFTWAREPAR

### 2.1 Acceder al Panel de Admin
```
https://tu-dominio.com/admin
```

### 2.2 Configurar Twilio en el Sistema
1. Ve a **Configuración > Integración Twilio**
2. Completa los campos:
   ```
   Account SID: AC1234567890abcdef1234567890abcdef
   Auth Token: ab12cd34ef56gh78ij90kl12mn34op56
   WhatsApp Number: +14155238886
   Modo: Sandbox (para testing)
   ```
3. Click **Guardar Configuración**
4. Verifica el estado: debe aparecer **✅ Conectado**

---

## 🧪 PASO 3: TESTING DEL SISTEMA

### 3.1 Actualizar Número de Prueba
Edita el archivo `test_whatsapp_complete.js`:
```javascript
testPhoneNumber: '+595981234567', // TU NÚMERO REAL
```

### 3.2 Ejecutar Pruebas
```bash
node test_whatsapp_complete.js
```

### 3.3 Verificar Resultados
- ✅ Deberías recibir 8 mensajes diferentes en tu WhatsApp
- ✅ En consola verás el SID de cada mensaje enviado
- ❌ Si hay errores, revisa la configuración

---

## 📱 PASO 4: CONFIGURACIÓN DE USUARIOS

### 4.1 Agregar WhatsApp a Usuarios
Los usuarios pueden agregar su WhatsApp en:
1. **Perfil > Configuración**
2. Campo **WhatsApp**: seleccionar país + número
3. Formato automático: `+595981234567`

### 4.2 Validación Automática
El sistema valida automáticamente:
- ✅ Formato internacional (+código)
- ✅ Longitud del número (8-15 dígitos)
- ✅ Código de país válido

---

## 🚀 PASO 5: PRODUCCIÓN (WhatsApp Business API)

### 5.1 Solicitar Número de WhatsApp Business
1. En Twilio Console: **Develop > Messaging > Services**
2. **Create Messaging Service**
3. Agregar **WhatsApp Sender** con tu número business
4. Seguir proceso de verificación (puede tomar 1-3 días)

### 5.2 Actualizar Configuración
Una vez aprobado:
```javascript
WhatsApp Number: +595981234567 // TU NÚMERO BUSINESS
Modo: Producción
```

---

## 📊 MONITOREO Y LOGS

### 6.1 Ver Logs en Tiempo Real
```bash
# En Replit, ver logs del servidor
tail -f logs/server.log
```

### 6.2 Logs de WhatsApp
Busca en logs:
```
✅ WhatsApp enviado exitosamente a: +595981234567
❌ Error enviando WhatsApp: [Error details]
```

### 6.3 Estadísticas en Twilio
- Ve a **Monitor > Logs > Messaging** en Twilio Console
- Revisa delivery status, errores y costos

---

## 💰 COSTOS ESTIMADOS

### Sandbox (Gratis)
- ✅ Testing ilimitado
- ❌ Solo números pre-registrados

### WhatsApp Business API
- 💰 ~$0.0055 por mensaje (Paraguay)
- 💰 Mensajes de plantilla: variables según país
- 💰 Mensajes conversacionales: 24h gratis después del primer mensaje

---

## 🔍 TROUBLESHOOTING

### Error: "Token authentication failed"
```bash
# Verificar en .env o BD:
TWILIO_ACCOUNT_SID=correcto
TWILIO_AUTH_TOKEN=correcto
```

### Error: "WhatsApp number not registered"
```bash
# Para sandbox: el número debe unirse primero
# Para producción: verificar que el número esté aprobado
```

### Error: "Message failed to send"
```bash
# Revisar:
1. Formato de número correcto (+código país + número)
2. Límites de rate (no más de 1 mensaje por segundo)
3. Saldo en cuenta Twilio
```

---

## ✅ CHECKLIST FINAL

- [ ] Credenciales Twilio configuradas
- [ ] WhatsApp Sandbox funcionando
- [ ] Todos los tests pasando
- [ ] Usuarios pueden agregar WhatsApp
- [ ] Notificaciones llegando en tiempo real
- [ ] Logs mostrando envíos exitosos
- [ ] (Opcional) WhatsApp Business aprobado para producción

---

## 📞 SOPORTE

Si tienes problemas:
1. **Logs del sistema**: Revisar consola de Replit
2. **Twilio Logs**: Console.twilio.com > Monitor > Logs
3. **WhatsApp Business**: Centro de ayuda de WhatsApp Business API

¡Tu sistema de notificaciones WhatsApp está listo! 🎉
