// Función para enviar un correo cuando el usuario se registra
function sendEmailOnRegister(userEmail) {
    emailjs.send('service_vxn0mkm', 'template_kb1bz58', {
        to_email: userEmail,
        subject: 'Bienvenido a nuestra tienda',
        message: 'Gracias por registrarte en GUSSI. ¡Disfruta de tus compras!',
    })
    .then(response => {
        console.log('Correo enviado: ', response);
    })
    .catch(error => {
        console.log('Error al enviar el correo: ', error);
    });
}

// Función para enviar un correo cuando se finaliza el pedido
function sendEmailOnOrder(userEmail, orderDetails) {
    // Si 'orderDetails' es un objeto, podemos convertirlo en una cadena para enviar en el correo
    const formattedOrderDetails = JSON.stringify(orderDetails, null, 2);

    emailjs.send('service_vxn0mkm', 'template_kb1bz58', {
        to_email: userEmail,
        subject: 'Pedido Confirmado',
        message: `Gracias por tu compra. Los detalles de tu pedido:\n\n${formattedOrderDetails}`,
    })
    .then(response => {
        console.log('Correo de pedido enviado: ', response);
    })
    .catch(error => {
        console.log('Error al enviar el correo de pedido: ', error);
    });
}
