
const DATOS_BODA = {

    nombres: {
        primero: "Lola",
        segundo: "Sergio"
    },

    // PENDIENTE: confirmar fecha y hora del Baby Shower
    fecha: "2027-11-20T16:00:00",

    historia: "Nuestro universo está a punto de recibir a alguien muy especial. Una pequeña guerrera viene en camino y, aunque todavía no conocemos su nombre, ya sabemos que ha conquistado nuestros corazones. Queremos celebrar su próxima llegada junto a las personas que más queremos. ¡Prepárate para conocer a nuestra pequeña Saiyajin!",

    ceremonia: {
        nombre: "Lugar del Baby Shower",
        direccion: "Próximamente compartiremos la dirección",
        mapa: ""
    },

    recepcion: {
        nombre: "Celebración de nuestra pequeña",
        direccion: "Te esperamos para compartir una tarde especial",
        mapa: ""
    },

    vestimenta: {
        titulo: "Casual / Cómodo",
        descripcion: "Ven con tu mejor energía y muchas ganas de celebrar. ¡El universo se llenará de rosa, alegría y poder Saiyajin!",
        colores: [
            "#F6B8D0",
            "#F9DDE9",
            "#E8C8F2",
            "#F5B44C",
            "#F4D76B"
        ]
    },

    itinerario: [
        {
            hora: "16:00",
            titulo: "¡Bienvenida!",
            descripcion: "Comienza nuestra aventura. Nos encantará recibirte."
        },
        {
            hora: "16:30",
            titulo: "Juegos Saiyajin",
            descripcion: "Prepárate para demostrar tu energía y participar."
        },
        {
            hora: "17:30",
            titulo: "Sorpresas y regalos",
            descripcion: "Compartiremos momentos especiales para nuestra pequeña guerrera."
        },
        {
            hora: "18:00",
            titulo: "Brindis y merienda",
            descripcion: "Celebremos juntos esta hermosa espera."
        },
        {
            hora: "19:00",
            titulo: "¡A celebrar!",
            descripcion: "Una tarde llena de alegría, fotografías y recuerdos."
        }
    ],

    regalos: [
        {
            titulo: "Un detalle para nuestra pequeña",
            descripcion: "Si deseas regalarle algo, cualquier detalle será recibido con muchísimo cariño.",
            enlace: ""
        },
        {
            titulo: "Lluvia de sobres",
            descripcion: "Si prefieres contribuir a sus primeras aventuras, también será muy agradecido.",
            enlace: ""
        }
    ],

    videoUrl: "",

    albumUrl: "",

    // Conservar la conexión del sistema que ya funciona.
    rsvpEndpoint: "https://script.google.com/macros/s/AKfycbyCNw7z1eAWgfhUT-tpO7wNErQLXyZu9VvUVTBEWJLMwX2FuUYr3NbWaJUphT7yjkkXvg/exec",

    // Mantener el código actual hasta configurar el nuevo evento
    // en el sistema de invitados y álbum compartido.
    codigoInvitacion: "BODA-2027-AV"

};


// COMPROBACIÓN DE CONFIGURACIÓN
console.log("BABY-01: DATOS cargados correctamente.");
console.log("INVITACIÓN:", DATOS_BODA.nombres.primero, "&", DATOS_BODA.nombres.segundo);
console.log("ENDPOINT GLAM CONFIGURADO:", DATOS_BODA.rsvpEndpoint);
