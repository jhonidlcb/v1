
// Script completo para probar el sistema de WhatsApp de SoftwarePar
// Ejecutar con: node test_whatsapp_complete.js

const { sendWhatsAppMessage, whatsappTemplates, validateWhatsAppNumber, formatWhatsAppNumber } = require('./server/whatsapp');

// Datos de prueba (reemplazar con datos reales)
const testData = {
  userName: 'Juan Carlos Pérez',
  projectName: 'Sistema de Gestión Empresarial',
  ticketNumber: '001',
  stageName: 'Entrega Final',
  amount: '250.00',
  senderName: 'Admin SoftwarePar',
  link: 'https://softwarepar.lat/client/projects',
  // REEMPLAZAR CON TU NÚMERO REAL DE WHATSAPP PARA TESTING
  testPhoneNumber: '+595981234567',
};

async function testAllTemplates() {
  console.log('🧪 INICIANDO PRUEBAS COMPLETAS DE WHATSAPP - SOFTWAREPAR\n');
  
  // Validar número de teléfono
  console.log('1️⃣ Validando número de WhatsApp...');
  const isValid = validateWhatsAppNumber(testData.testPhoneNumber);
  console.log(`📱 Número ${testData.testPhoneNumber} es válido: ${isValid ? '✅' : '❌'}\n`);
  
  if (!isValid) {
    console.error('❌ Número de teléfono inválido. Formato correcto: +595981234567');
    return;
  }

  const tests = [
    {
      name: '🎫 Nuevo Ticket Creado',
      template: 'ticketCreated',
      variables: [testData.userName, 'Problema con el login del sistema', testData.link]
    },
    {
      name: '🎫 Respuesta a Ticket',
      template: 'newTicketResponse',
      variables: [testData.userName, testData.ticketNumber, testData.link]
    },
    {
      name: '📋 Actualización de Proyecto',
      template: 'projectUpdate',
      variables: [testData.userName, testData.projectName, testData.link]
    },
    {
      name: '💰 Recordatorio de Pago',
      template: 'paymentReminder',
      variables: [testData.userName, testData.stageName, testData.amount, testData.link]
    },
    {
      name: '🚀 Proyecto Creado',
      template: 'projectCreated',
      variables: [testData.userName, testData.projectName, testData.link]
    },
    {
      name: '💬 Nuevo Mensaje',
      template: 'newMessage',
      variables: [testData.userName, testData.senderName, testData.projectName, testData.link]
    },
    {
      name: '💵 Negociación de Presupuesto',
      template: 'budgetNegotiation',
      variables: [testData.userName, testData.projectName, testData.amount, false, testData.link]
    },
    {
      name: '✅ Pago Exitoso',
      template: 'paymentSuccess',
      variables: [testData.userName, testData.projectName, testData.amount, testData.link]
    }
  ];

  console.log('2️⃣ Enviando mensajes de prueba...\n');
  
  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    
    try {
      console.log(`${i + 1}. ${test.name}`);
      console.log('─'.repeat(50));
      
      // Generar mensaje desde template
      const template = whatsappTemplates[test.template];
      if (!template) {
        console.error(`❌ Template '${test.template}' no encontrado`);
        continue;
      }
      
      const message = template(...test.variables);
      console.log('📝 Mensaje a enviar:');
      console.log(message);
      console.log('─'.repeat(50));
      
      // Enviar mensaje
      const result = await sendWhatsAppMessage({
        to: testData.testPhoneNumber,
        message: message,
      });
      
      console.log(`✅ Enviado exitosamente - SID: ${result.sid}`);
      console.log(`📊 Estado: ${result.status}`);
      console.log(`📅 Fecha: ${result.dateCreated}\n`);
      
      // Pausa entre mensajes para evitar spam
      if (i < tests.length - 1) {
        console.log('⏳ Esperando 3 segundos antes del siguiente mensaje...\n');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      
    } catch (error) {
      console.error(`❌ Error enviando ${test.name}:`, error.message);
      
      if (error.code) {
        console.error(`🔍 Código de error Twilio: ${error.code}`);
      }
      
      console.log('');
    }
  }
  
  console.log('🎉 PRUEBAS COMPLETADAS');
  console.log('📱 Revisa tu WhatsApp para verificar que llegaron todos los mensajes');
  console.log('📊 Si algunos mensajes fallaron, revisa tu configuración de Twilio');
}

// Función para probar solo un template específico
async function testSingleTemplate(templateName, ...variables) {
  console.log(`🧪 Probando template: ${templateName}`);
  
  try {
    const template = whatsappTemplates[templateName];
    if (!template) {
      console.error(`❌ Template '${templateName}' no encontrado`);
      return;
    }
    
    const message = template(...variables);
    console.log('📝 Mensaje generado:');
    console.log(message);
    console.log('─'.repeat(50));
    
    const result = await sendWhatsAppMessage({
      to: testData.testPhoneNumber,
      message: message,
    });
    
    console.log(`✅ Enviado exitosamente - SID: ${result.sid}`);
  } catch (error) {
    console.error(`❌ Error:`, error.message);
  }
}

// Ejecutar según argumentos de línea de comandos
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    // Ejecutar todas las pruebas
    testAllTemplates();
  } else {
    // Ejecutar prueba específica
    const [templateName, ...variables] = args;
    testSingleTemplate(templateName, ...variables);
  }
}

module.exports = {
  testAllTemplates,
  testSingleTemplate,
  testData,
};
