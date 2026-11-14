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


/* ==========================================
   UTILIDAD PARA CARGAR ELEMENTOS
========================================== */

function establecerTexto(id, texto) {

    const elemento = document.getElementById(id);

    if (elemento) {
        elemento.textContent = texto;
    }

}


/* ==========================================
   CARGAR INFORMACIÓN
========================================== */

function cargarDatos() {

    const nombres = DATOS_BODA.nombres;

    const nombreCompleto = `${nombres.primero} & ${nombres.segundo}`;

    establecerTexto("nombrePortada1", nombres.primero);
    establecerTexto("nombrePortada2", nombres.segundo);

    establecerTexto("nombresFinales", "Nuestra pequeña Saiyajin");

    establecerTexto("textoHistoria", DATOS_BODA.historia);
    establecerTexto("firmaHistoria", nombreCompleto);

    const fecha = new Date(DATOS_BODA.fecha);

    const opciones = {
        day: "2-digit",
        month: "long",
        year: "numeric"
    };

    const fechaTexto = fecha.toLocaleDateString("es-ES", opciones);

    establecerTexto(
        "fechaPortada",
        fechaTexto.toUpperCase()
            .replace(" DE ", " · ")
            .replace(" DE ", " · ")
    );

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

    cargarUbicaciones();
    cargarItinerario();
    cargarRegalos();

}


/* ==========================================
   UBICACIÓN
========================================== */

function cargarUbicaciones() {

    const ceremonia = DATOS_BODA.ceremonia;

    establecerTexto("nombreCeremonia", ceremonia.nombre);
    establecerTexto("direccionCeremonia", ceremonia.direccion);

    configurarEnlaceMapa("mapaCeremonia", ceremonia.mapa);

}


function configurarEnlaceMapa(id, enlace) {

    const elemento = document.getElementById(id);

    if (!elemento) return;

    if (enlace) {

        elemento.href = enlace;
        elemento.style.display = "inline-flex";

    } else {

        elemento.style.display = "none";

    }

}


/* ==========================================
   ITINERARIO
========================================== */

function cargarItinerario() {

    const contenedor = document.getElementById("listaItinerario");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    DATOS_BODA.itinerario.forEach((evento) => {

        const elemento = document.createElement("div");

        elemento.className = "evento-itinerario revelar";

        elemento.innerHTML = `
            <div class="evento-hora">${evento.hora}</div>

            <div class="evento-punto"></div>

            <div class="evento-descripcion">
                <h3>${evento.titulo}</h3>
                <p>${evento.descripcion}</p>
            </div>
        `;

        contenedor.appendChild(elemento);

    });

}


/* ==========================================
   REGALOS
========================================== */

function cargarRegalos() {

    const contenedor = document.getElementById("listaRegalos");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    DATOS_BODA.regalos.forEach(regalo => {

        const elemento = document.createElement("article");

        elemento.className = "regalo-item";

        elemento.innerHTML = `
            <h3>${regalo.titulo}</h3>

            <p>${regalo.descripcion}</p>

            ${
                regalo.enlace
                    ? `<a href="${regalo.enlace}" target="_blank" rel="noopener noreferrer">Ver información ↗</a>`
                    : ""
            }
        `;

        contenedor.appendChild(elemento);

    });

}


/* ==========================================
   SOBRE DE BIENVENIDA
========================================== */

function configurarSobre() {

    const boton = document.getElementById("botonAbrir");
    const sobre = document.getElementById("sobreInicial");
    const invitacion = document.getElementById("invitacion");

    if (!boton || !sobre || !invitacion) return;

    boton.addEventListener("click", () => {

        sobre.classList.add("cerrado");

        setTimeout(() => {

            sobre.style.display = "none";

            invitacion.classList.remove("oculto");

            document.body.style.overflow = "auto";

            configurarAnimaciones();

        }, 900);

    });

    document.body.style.overflow = "hidden";

}


/* ==========================================
   MENÚ LATERAL
========================================== */

function configurarMenu() {

    const menu = document.getElementById("menuLateral");
    const fondo = document.getElementById("fondoMenu");

    const botonMenu = document.getElementById("botonMenu");
    const botonCerrar = document.getElementById("cerrarMenu");

    if (!menu || !fondo || !botonMenu || !botonCerrar) return;

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


/* ==========================================
   MÚSICA
========================================== */

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

}


/* ==========================================
   CUENTA REGRESIVA
========================================== */

function iniciarCuentaRegresiva() {

    const contador = document.getElementById("contador");

    if (!contador) return;

    const fechaObjetivo = new Date(DATOS_BODA.fecha).getTime();

    function actualizar() {

        const ahora = Date.now();

        const diferencia = fechaObjetivo - ahora;

        if (diferencia <= 0) {

            contador.innerHTML = `
                <h3>¡Hoy es nuestro gran día!</h3>
            `;

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

    setInterval(actualizar, 1000);

}


/* ==========================================
   VIDEO
========================================== */

function configurarVideo() {

    const contenedor = document.getElementById("videoContenedor");

    if (!contenedor || !DATOS_BODA.videoUrl) return;

    contenedor.innerHTML = `
        <iframe
            src="${DATOS_BODA.videoUrl}"
            title="Un mensaje desde nuestro universo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>
    `;

}


/* ==========================================
   ÁLBUM COMPARTIDO GLAM
========================================== */

function configurarAlbum() {

    const seccion = document.getElementById("albumSeccion");

    if (!seccion) return;

    /*
       IMPORTANTE:

       El álbum compartido debe permanecer visible,
       aunque albumUrl esté vacío.

       No ocultamos la sección porque contiene
       los elementos de carga de fotografías de GLAM.
    */

    seccion.classList.remove("oculto");

}


/* ==========================================
   FORMULARIO RSVP
========================================== */

function configurarFormulario() {

    const formulario = document.getElementById("formularioRSVP");

    if (!formulario) return;

    formulario.addEventListener("submit", async evento => {

        evento.preventDefault();

        const boton = formulario.querySelector("button");

        const mensaje = document.getElementById("mensajeRSVP");

        const datos = {

            nombre: document.getElementById("nombreInvitado").value.trim(),

            asistencia: document.getElementById("asistencia").value,

            acompanantes: document.getElementById("cantidadAcompanantes").value,

            mensaje: document.getElementById("mensajeInvitado").value.trim(),

            codigo: DATOS_BODA.codigoInvitacion,

            fechaRegistro: new Date().toISOString()

        };


        if (!datos.nombre || !datos.asistencia) {

            mensaje.textContent = "Completa los campos obligatorios.";

            return;

        }


        boton.disabled = true;

        boton.textContent = "Enviando confirmación...";


        try {

            if (DATOS_BODA.rsvpEndpoint) {
