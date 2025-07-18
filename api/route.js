import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();

    const token = process.env.TOKEN;
    if (!token) {
      return NextResponse.json(
        { status: 'error', message: 'Token no configurado' },
        { status: 500 }
      );
    }

    const response = await axios.post(
      'https://bm.i6.inconcertcc.com/inconcert/api/batch_management/add_address_to_batch/',
      {
        type: 'WHATSAPP',
        campaign: 'adv_wp@advance',
        account: 'WHATSAPP_adv_wp@advance_F15D1506BB4072434E82550BBE4BE08D',
        account_name: 'WHATSAPP_adv_wp',
        batchId: 'TM1',
        address: body.address || '593996683880',
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
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    return NextResponse.json({ status: 'success', data: response.data });

  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: error.message, details: error.response?.data },
      { status: 500 }
    );
  }
}
