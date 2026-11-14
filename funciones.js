/* =====================================================
   BABY-01 | LOLA Y SERGIO
   FUNCIONES PRINCIPALES
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    cargarDatos();

    configurarSobre();

    configurarMenu();

    configurarMusica();

    configurarVideo();

    configurarAlbum();

    configurarFormulario();

    iniciarCuentaRegresiva();

    configurarAnimaciones();

});


/* =====================================================
   UTILIDAD: EVITAR ERRORES POR ELEMENTOS INEXISTENTES
===================================================== */

function establecerTexto(id, texto) {

    const elemento = document.getElementById(id);

    if (elemento) {
        elemento.textContent = texto;
    }

}


/* =====================================================
   CARGAR INFORMACIÓN
===================================================== */

function cargarDatos() {

    if (typeof DATOS_BODA === "undefined") {
        console.error("No se encontró el archivo datos.js");
        return;
    }

    const nombres = DATOS_BODA.nombres;

    const nombreCompleto =
        `${nombres.primero} & ${nombres.segundo}`;

    establecerTexto("nombrePortada1", nombres.primero);

    establecerTexto("nombrePortada2", nombres.segundo);

    establecerTexto("nombresFinales", nombreCompleto);

    establecerTexto("textoHistoria", DATOS_BODA.historia);

    establecerTexto("firmaHistoria", nombreCompleto);


    /* FECHA DEL EVENTO */

    const fecha = new Date(DATOS_BODA.fecha);

    if (isNaN(fecha.getTime())) {
        console.error("La fecha del evento no es válida.");
        return;
    }

    const fechaTexto = fecha.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    const fechaPortada = fecha.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    }).toUpperCase().replace(/ DE /g, " · ");

    establecerTexto("fechaPortada", fechaPortada);

    establecerTexto(
        "diaEvento",
        fecha.getDate().toString().padStart(2, "0")
    );

    establecerTexto(
        "mesEvento",
        fecha.toLocaleDateString("es-ES", {
            month: "long"
        }).toUpperCase()
    );

    establecerTexto("anioEvento", fecha.getFullYear());

    establecerTexto(
        "fechaFinal",
        `${fecha.getDate()} · ${fecha.getMonth() + 1} · ${fecha.getFullYear()}`
    );


    /* CARGAR SECCIONES */

    cargarUbicaciones();

    cargarItinerario();

    cargarRegalos();

}


/* =====================================================
   UBICACIÓN
===================================================== */

function cargarUbicaciones() {

    if (!DATOS_BODA.ceremonia) return;

    const ceremonia = DATOS_BODA.ceremonia;

    establecerTexto(
        "nombreCeremonia",
        ceremonia.nombre
    );

    establecerTexto(
        "direccionCeremonia",
        ceremonia.direccion
    );

    configurarEnlaceMapa(
        "mapaCeremonia",
        ceremonia.mapa
    );

}


function configurarEnlaceMapa(id, enlace) {

    const elemento = document.getElementById(id);

    if (!elemento) return;

    elemento.href = enlace || "https://www.google.com/maps";

    elemento.target = "_blank";

    elemento.rel = "noopener noreferrer";

}


/* =====================================================
   ITINERARIO
===================================================== */

function cargarItinerario() {

    const contenedor = document.getElementById("listaItinerario");

    if (!contenedor || !DATOS_BODA.itinerario) return;

    contenedor.innerHTML = "";

    DATOS_BODA.itinerario.forEach(evento => {

        const elemento = document.createElement("div");

        elemento.className = "evento-itinerario revelar";

        elemento.innerHTML = `
            <div class="evento-hora">
                ${evento.hora}
            </div>

            <div class="evento-punto"></div>

            <div class="evento-descripcion">
                <h3>${evento.titulo}</h3>
                <p>${evento.descripcion}</p>
            </div>
        `;

        contenedor.appendChild(elemento);

    });

}


/* =====================================================
   REGALOS
===================================================== */

function cargarRegalos() {

    const contenedor = document.getElementById("listaRegalos");

    if (!contenedor || !DATOS_BODA.regalos) return;

    contenedor.innerHTML = "";

    DATOS_BODA.regalos.forEach(regalo => {

        const elemento = document.createElement("article");

        elemento.className = "regalo-item";

        elemento.innerHTML = `
            <h3>${regalo.titulo}</h3>

            <p>${regalo.descripcion}</p>

            ${
                regalo.enlace
                    ? `
                        <a
                            href="${regalo.enlace}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ver información ↗
                        </a>
                    `
                    : ""
            }
        `;

        contenedor.appendChild(elemento);

    });

}


/* =====================================================
   APERTURA DE LA INVITACIÓN
===================================================== */

function configurarSobre() {

    const boton = document.getElementById("botonAbrir");

    const sobre = document.getElementById("sobreInicial");

    const invitacion = document.getElementById("invitacion");

    if (!boton || !sobre || !invitacion) {

        console.error(
            "No se encontraron los elementos necesarios para abrir la invitación."
        );

        return;

    }


    /* MANTENER LA INVITACIÓN OCULTA AL INICIO */

    invitacion.classList.add("oculto");

    document.body.style.overflow = "hidden";


    /* EVENTO DEL BOTÓN */

    boton.addEventListener("click", function (evento) {

        evento.preventDefault();

        if (boton.dataset.abriendo === "true") return;

        boton.dataset.abriendo = "true";

        boton.style.pointerEvents = "none";


        /* INICIAR ANIMACIÓN DE CIERRE */

        sobre.classList.add("cerrado");


        /*
           ESPERAR A QUE TERMINE LA ANIMACIÓN
           ANTES DE MOSTRAR LA INVITACIÓN
        */

        setTimeout(() => {

            sobre.style.display = "none";

            invitacion.classList.remove("oculto");

            document.body.style.overflow = "auto";


            /* INICIAR ANIMACIONES DEL CONTENIDO */

            configurarAnimaciones();


            /* COMENZAR DESDE EL PRINCIPIO */

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

        }, 900);

    });

}


/* =====================================================
   MENÚ LATERAL
===================================================== */

function configurarMenu() {

    const menu = document.getElementById("menuLateral");

    const fondo = document.getElementById("fondoMenu");

    const botonMenu = document.getElementById("botonMenu");

    const botonCerrar = document.getElementById("cerrarMenu");


    if (!menu || !fondo || !botonMenu || !botonCerrar) {
        return;
    }


    botonMenu.addEventListener("click", abrirMenu);

    botonCerrar.addEventListener("click", cerrarMenu);

    fondo.addEventListener("click", cerrarMenu);


    document.querySelectorAll(".menu-lateral a").forEach(enlace => {

        enlace.addEventListener("click", cerrarMenu);

    });


    function abrirMenu() {

        menu.classList.add("abierto");

        fondo.classList.add("visible");

    }


    function cerrarMenu() {

        menu.classList.remove("abierto");

        fondo.classList.remove("visible");

    }

}


/* =====================================================
   MÚSICA
===================================================== */

function configurarMusica() {

    const musica = document.getElementById("musica");

    const boton = document.getElementById("botonMusica");

    if (!musica || !boton) return;

    let reproduciendo = false;


    boton.addEventListener("click", async () => {

        if (!reproduciendo) {

            try {

                await musica.play();

                reproduciendo = true;

                boton.textContent = "♫";

                boton.classList.add("activo");

            } catch (error) {

                console.error("Error al reproducir música:", error);

                alert(
                    "No se pudo reproducir la música. Comprueba que exista el archivo recursos/musica.mp3."
                );

            }

        } else {

            musica.pause();

            reproduciendo = false;

            boton.textContent = "♪";

            boton.classList.remove("activo");

        }

    });


    musica.addEventListener("ended", () => {

        reproduciendo = false;

        boton.textContent = "♪";

        boton.classList.remove("activo");

    });

}


/* =====================================================
   CUENTA REGRESIVA
===================================================== */

function iniciarCuentaRegresiva() {

    const contador = document.getElementById("contador");

    const fechaObjetivo = new Date(DATOS_BODA.fecha).getTime();

    if (isNaN(fechaObjetivo)) return;


    function actualizar() {

        const ahora = Date.now();

        const diferencia = fechaObjetivo - ahora;


        if (diferencia <= 0) {

            if (contador) {

                contador.innerHTML = `
                    <h3>¡Hoy comienza nuestra aventura!</h3>
                `;

            }

            clearInterval(intervalo);

            return;

        }


        const dias = Math.floor(
            diferencia / (1000 * 60 * 60 * 24)
        );

        const horas = Math.floor(
            (diferencia / (1000 * 60 * 60)) % 24
        );

        const minutos = Math.floor(
            (diferencia / (1000 * 60)) % 60
        );

        const segundos = Math.floor(
            (diferencia / 1000) % 60
        );


        establecerTexto(
            "dias",
            dias.toString().padStart(2, "0")
        );

        establecerTexto(
            "horas",
            horas.toString().padStart(2, "0")
        );

        establecerTexto(
            "minutos",
            minutos.toString().padStart(2, "0")
        );

        establecerTexto(
            "segundos",
            segundos.toString().padStart(2, "0")
        );

    }


    actualizar();

    const intervalo = setInterval(actualizar, 1000);

}


/* =====================================================
   VIDEO
===================================================== */

function configurarVideo() {

    const contenedor = document.getElementById("videoContenedor");

    if (!contenedor) return;

    if (!DATOS_BODA.videoUrl) return;


    contenedor.innerHTML = `
        <iframe
            src="${DATOS_BODA.videoUrl}"
            title="Un mensaje especial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>
    `;

}


/* =====================================================
   ÁLBUM COMPARTIDO
===================================================== */

function configurarAlbum() {

    const seccion = document.getElementById("albumSeccion");

    if (!seccion) return;


    /*
       NO OCULTAMOS LA SECCIÓN PORQUE EL ÁLBUM
       SE UTILIZARÁ PARA QUE LOS INVITADOS
       COMPARTAN SUS FOTOGRAFÍAS.
    */

    seccion.classList.remove("oculto");


    const enlace = document.getElementById("enlaceAlbum");

    if (enlace && DATOS_BODA.albumUrl) {

        enlace.href = DATOS_BODA.albumUrl;

        enlace.target = "_blank";

        enlace.rel = "noopener noreferrer";

    }

}


/* =====================================================
   CONFIRMACIÓN DE ASISTENCIA
===================================================== */

function configurarFormulario() {

    const formulario = document.getElementById("formularioRSVP");

    if (!formulario) return;


    formulario.addEventListener("submit", async evento => {

        evento.preventDefault();


        const boton = formulario.querySelector("button");

        const mensaje = document.getElementById("mensajeRSVP");


        const datos = {

            nombre: document.getElementById("nombreInvitado")?.value.trim() || "",

            asistencia: document.getElementById("asistencia")?.value || "",

            acompanantes: document.getElementById("cantidadAcompanantes")?.value || "",

            mensaje: document.getElementById("mensajeInvitado")?.value.trim() || "",

            codigo: DATOS_BODA.codigoInvitacion,

            fechaRegistro: new Date().toISOString()

        };


        if (!datos.nombre || !datos.asistencia) {

            if (mensaje) {

                mensaje.textContent =
                    "Completa los campos obligatorios.";

            }

            return;

        }


        if (boton) {

            boton.disabled = true;

            boton.textContent = "Enviando confirmación...";

        }


        try {

            if (DATOS_BODA.rsvpEndpoint) {

                await fetch(DATOS_BODA.rsvpEndpoint, {

                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(datos)

                });


                if (mensaje) {

                    mensaje.textContent =
                        "¡Gracias! Tu respuesta ha sido enviada.";

                }

            } else {

                const respuestas = JSON.parse(

                    localStorage.getItem("respuestasBoda") || "[]"

                );


                respuestas.push(datos);


                localStorage.setItem(

                    "respuestasBoda",

                    JSON.stringify(respuestas)

                );


                if (mensaje) {

                    mensaje.textContent =
                        "¡Gracias! Tu respuesta quedó registrada en este dispositivo.";

                }

            }


            formulario.reset();


        } catch (error) {

            console.error("Error al enviar la confirmación:", error);

            if (mensaje) {

                mensaje.textContent =
                    "No pudimos enviar tu respuesta. Inténtalo nuevamente.";

            }

        }


        if (boton) {

            boton.disabled = false;

            boton.innerHTML =
                'Confirmar asistencia <span>♥</span>';

        }

    });

}


/* =====================================================
   ANIMACIONES DE APARICIÓN
===================================================== */

function configurarAnimaciones() {

    const elementos = document.querySelectorAll(
        ".seccion, .evento-itinerario, .ubicacion-tarjeta, .regalo-item"
    );


    elementos.forEach(elemento => {

        elemento.classList.add("revelar");

    });


    if (!("IntersectionObserver" in window)) {

        elementos.forEach(elemento => {

            elemento.classList.add("visible");

        });

        return;

    }


    const observador = new IntersectionObserver(

        (entradas, observer) => {

            entradas.forEach(entrada => {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("visible");

                    observer.unobserve(entrada.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    elementos.forEach(elemento => {

        observador.observe(elemento);

    });

}
