const DATOS_BODA = {

    nombres: {
        primero: "Lola",
        segundo: "Sergio"
    },

    fecha: "2026-11-28T15:30:00",

    historia: "Nuestro universo está a punto de recibir a alguien muy especial. Una pequeña Saiyajin viene en camino y, aunque todavía guardamos el secreto de su nombre, ya sabemos que ha conquistado nuestros corazones. Su poder más grande ya se hace sentir: el amor que nos une y la felicidad de esperarla. Queremos compartir esta aventura contigo. ¡Prepárate para celebrar la llegada de nuestra pequeña guerrera!",

    ceremonia: {
        nombre: "Lugar del Baby Shower",
        direccion: "Próximamente compartiremos la dirección",
        mapa: ""
    },

    recepcion: {
        nombre: "Celebración de nuestra pequeña Saiyajin",
        direccion: "Te esperamos para compartir una tarde llena de amor, alegría y sorpresas.",
        mapa: ""
    },

    vestimenta: {
        titulo: "Casual / Cómodo",
        descripcion: "Ven con tu mejor energía y muchas ganas de celebrar. Nuestro universo se llenará de rosa, alegría y poder Saiyajin. ¡Te esperamos!",
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
            hora: "15:30",
            titulo: "¡Bienvenida, guerrero!",
            descripcion: "Comienza nuestra aventura. Lola y Sergio estarán felices de recibirte."
        },
        {
            hora: "16:00",
            titulo: "Desafíos Saiyajin",
            descripcion: "Demuestra tu energía y participa en nuestros divertidos juegos."
        },
        {
            hora: "17:00",
            titulo: "Sorpresas para nuestra pequeña",
            descripcion: "Un momento especial para celebrar a la nueva integrante de nuestro universo."
        },
        {
            hora: "17:30",
            titulo: "Merienda y celebración",
            descripcion: "Compartamos una tarde deliciosa rodeados de cariño."
        },
        {
            hora: "18:30",
            titulo: "¡Poderosos recuerdos!",
            descripcion: "Fotografías, abrazos y momentos inolvidables para recordar esta hermosa espera."
        }
    ],

    regalos: [
        {
            titulo: "Un regalo para nuestra pequeña",
            descripcion: "Si deseas obsequiarle algo, cualquier detalle será recibido con muchísimo amor y gratitud.",
            enlace: ""
        },
        {
            titulo: "Lluvia de sobres",
            descripcion: "Si prefieres contribuir a sus primeras aventuras, también será recibido con mucho cariño.",
            enlace: ""
        }
    ],

    videoUrl: "",

    albumUrl: "",

    // Conexión original del sistema GLAM.
    rsvpEndpoint: "https://script.google.com/macros/s/AKfycbyCNw7z1eAWgfhUT-tpO7wNErQLXyZu9VvUVTBEWJLMwX2FuUYr3NbWaJUphT7yjkkXvg/exec",

    // Código de invitación BABY-01.
    // Debe configurarse también en el sistema de invitados.
    codigoInvitacion: "BABY-01-LOLA-SERGIO"

};


// COMPROBACIÓN DE CONFIGURACIÓN
console.log("BABY-01: DATOS cargados correctamente.");
console.log("FUTUROS PAPÁS:", DATOS_BODA.nombres.primero, "&", DATOS_BODA.nombres.segundo);
console.log("FECHA:", DATOS_BODA.fecha);
console.log("ENDPOINT GLAM CONFIGURADO:", DATOS_BODA.rsvpEndpoint);
