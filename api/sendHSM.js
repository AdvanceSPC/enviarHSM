export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { address } = req.body;

    const payload = {
      type: 'WHATSAPP',
      campaign: 'adv_wp@advance',
      account: 'WHATSAPP_adv_wp@advance_F15D1506BB4072434E82550BBE4BE08D',
      account_name: 'WHATSAPP_adv_wp',
      batchId: 'TM1',
      address: '593996683880',
      message: {
        msgtype: 'template',
        text: `Hola, \nContinuamos con tu solicitud de Crédito.\nPara avanzar, necesitamos que nos entregues los siguientes documentos:\n\nCopia de cédula\n\n- Planilla de luz actual\n- Certificado de ingresos\n- Puedes enviarlos por correo o acercarte a nuestras oficinas.\n- Equipo de Créditos – Cooperativa Andalucía`,
        template: {
          group: 'ba9ddec7_aa79_4eeb_967b_146a2611a134',
          id: 'entrega_documentacion',
          language: 'es',
          parameters: [],
          hsm_buttons: [],
          text: `Hola, \nContinuamos con tu solicitud de Crédito.\nPara avanzar, necesitamos que nos entregues los siguientes documentos:\n\nCopia de cédula\n\n- Planilla de luz actual\n- Certificado de ingresos\n- Puedes enviarlos por correo o acercarte a nuestras oficinas.\n- Equipo de Créditos – Cooperativa Andalucía`
        }
      }
    };

    const response = await fetch(
      'https://bm.i6.inconcertcc.com/inconcert/api/batch_management/add_address_to_batch/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.TOKEN}`
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(`HTTP error! status: ${response.status}`, { cause: errorData });
    }

    const data = await response.json();
    
    res.status(200).json({ success: true, data });

  } catch (error) {
    console.error('Error in sendHSM:', error);
    
    res.status(500).json({
      success: false,
      message: error.message,
      details: error.cause || null
    });
  }
}