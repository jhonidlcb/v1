
const { sendWhatsAppMessage, whatsappTemplates } = require('./server/whatsapp');

// Configuración de prueba - REEMPLAZA CON TUS DATOS REALES
const DATOS_PRUEBA = {
  // Tu número de WhatsApp para recibir las pruebas
  numeroWhatsApp: '+595981234567', // ⚠️ CAMBIA ESTE NÚMERO
  
  // Datos de ejemplo para las pruebas
  nombreUsuario: 'Juan Carlos',
  nombreProyecto: 'Sistema de Gestión Web',
  numeroTicket: '001',
  montoEtapa: '2500.00',
  linkDashboard: 'https://softwarepar.lat/client/dashboard'
};

async function probarSistemaCompleto() {
  console.log('🧪 INICIANDO PRUEBAS COMPLETAS DEL SISTEMA WHATSAPP');
  console.log('=' * 60);
  
  const pruebas = [
    {
      nombre: '1️⃣ Proyecto Creado',
      template: 'projectCreated',
      params: [DATOS_PRUEBA.nombreUsuario, DATOS_PRUEBA.nombreProyecto, DATOS_PRUEBA.linkDashboard]
    },
    {
      nombre: '2️⃣ Actualización de Proyecto', 
      template: 'projectUpdate',
      params: [DATOS_PRUEBA.nombreUsuario, DATOS_PRUEBA.nombreProyecto, DATOS_PRUEBA.linkDashboard]
    },
    {
      nombre: '3️⃣ Nuevo Mensaje',
      template: 'newMessage',
      params: [DATOS_PRUEBA.nombreUsuario, 'Administrador', DATOS_PRUEBA.nombreProyecto, DATOS_PRUEBA.linkDashboard]
    },
    {
      nombre: '4️⃣ Ticket Creado',
      template: 'ticketCreated',
      params: [DATOS_PRUEBA.nombreUsuario, 'Problema con el sistema', DATOS_PRUEBA.linkDashboard]
    },
    {
      nombre: '5️⃣ Respuesta a Ticket',
      template: 'newTicketResponse', 
      params: [DATOS_PRUEBA.nombreUsuario, DATOS_PRUEBA.numeroTicket, DATOS_PRUEBA.linkDashboard]
    },
    {
      nombre: '6️⃣ Pago Disponible',
      template: 'paymentReminder',
      params: [DATOS_PRUEBA.nombreUsuario, 'Entrega Final', DATOS_PRUEBA.montoEtapa, DATOS_PRUEBA.linkDashboard]
    },
    {
      nombre: '7️⃣ Pago Exitoso',
      template: 'paymentSuccess',
      params: [DATOS_PRUEBA.nombreUsuario, DATOS_PRUEBA.nombreProyecto, DATOS_PRUEBA.montoEtapa, DATOS_PRUEBA.linkDashboard]
    },
    {
      nombre: '8️⃣ Negociación de Presupuesto',
      template: 'budgetNegotiation',
      params: [DATOS_PRUEBA.nombreUsuario, DATOS_PRUEBA.nombreProyecto, '3500.00', false, DATOS_PRUEBA.linkDashboard]
    }
  ];

  let exitosos = 0;
  let fallidos = 0;

  for (let i = 0; i < pruebas.length; i++) {
    const prueba = pruebas[i];
    
    try {
      console.log(`\n${prueba.nombre}`);
      console.log('-'.repeat(50));
      
      // Generar mensaje desde template
      const mensaje = whatsappTemplates[prueba.template](...prueba.params);
      
      console.log('📝 Mensaje generado:');
      console.log(mensaje);
      console.log('-'.repeat(50));
      
      // Enviar WhatsApp
      const resultado = await sendWhatsAppMessage({
        to: DATOS_PRUEBA.numeroWhatsApp,
        message: mensaje
      });
      
      console.log(`✅ Enviado exitosamente`);
      console.log(`📱 SID: ${resultado.sid}`);
      console.log(`📊 Estado: ${resultado.status}`);
      
      exitosos++;
      
      // Pausa entre mensajes para evitar spam
      if (i < pruebas.length - 1) {
        console.log('\n⏳ Esperando 3 segundos...');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      
    } catch (error) {
      console.error(`❌ Error en ${prueba.nombre}:`, error.message);
      fallidos++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMEN DE PRUEBAS:');
  console.log(`✅ Exitosos: ${exitosos}`);
  console.log(`❌ Fallidos: ${fallidos}`);
  console.log(`📱 Total: ${pruebas.length}`);
  
  if (exitosos === pruebas.length) {
    console.log('\n🎉 ¡TODAS LAS PRUEBAS PASARON! El sistema WhatsApp está funcionando correctamente.');
    console.log('📲 Revisa tu WhatsApp para ver todos los mensajes recibidos.');
  } else {
    console.log('\n⚠️ Algunas pruebas fallaron. Revisa la configuración de Twilio.');
  }
}

// Ejecutar solo si se llama directamente
if (require.main === module) {
  probarSistemaCompleto().catch(console.error);
}

module.exports = { probarSistemaCompleto };
