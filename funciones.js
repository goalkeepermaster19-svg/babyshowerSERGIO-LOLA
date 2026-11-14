
/* ==========================================
   BABY-01 | FUNCIONES GENERALES
   DRAGON BALL Z + INTEGRACIÓN GLAM
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const $ = (id) => document.getElementById(id);


    /* ==========================================
       VARIABLES GENERALES GLAM
    ========================================== */

    window.glamInvitadoActual = null;

    let tokenInvitacionGLAM = null;

    let fotografiasSeleccionadas = [];

    let fotografiasVisorGLAM = [];

    let indiceVisorGLAM = 0;


    /* ======================================
       APERTURA DE LA INVITACIÓN
    ====================================== */

    const sobre = $("sobreInicial");
    const invitacion = $("invitacion");
    const botonAbrir = $("botonAbrir");

    if (botonAbrir) {

        botonAbrir.addEventListener("click", () => {

            if (sobre) {
                sobre.classList.add("sobre-abierto");
            }

            setTimeout(() => {

                if (sobre) {
                    sobre.style.display = "none";
                }

                if (invitacion) {
                    invitacion.classList.remove("oculto");
                    invitacion.classList.add("visible");
                }

                document.body.classList.add("invitacion-activa");

                iniciarContador();

            }, 700);

        });

    }


    /* ======================================
       DATOS GENERALES
    ====================================== */

    function cargarDatos() {

        const nombres = DATOS_BODA.nombres || {};

        const nombreCompleto =
            `${nombres.primero || ""} y ${nombres.segundo || ""}`;

        if ($("nombrePortada1")) {
            $("nombrePortada1").textContent = "NUESTRA";
        }

        if ($("nombrePortada2")) {
            $("nombrePortada2").textContent = "PEQUEÑA SAIYAJIN";
        }

        if ($("nombresFinales")) {
            $("nombresFinales").textContent = nombreCompleto;
        }


        /* UBICACIÓN PRINCIPAL */

        if (DATOS_BODA.ceremonia) {

            if ($("nombreCeremonia")) {
                $("nombreCeremonia").textContent =
                    DATOS_BODA.ceremonia.nombre || "";
            }

            if ($("direccionCeremonia")) {
                $("direccionCeremonia").textContent =
                    DATOS_BODA.ceremonia.direccion || "";
            }

            if ($("mapaCeremonia")) {

                if (DATOS_BODA.ceremonia.mapa) {

                    $("mapaCeremonia").href =
                        DATOS_BODA.ceremonia.mapa;

                    $("mapaCeremonia").style.display = "";

                } else {

                    $("mapaCeremonia").style.display = "none";

                }

            }

        }


        /* UBICACIÓN SECUNDARIA */

        if (DATOS_BODA.recepcion) {

            if ($("nombreRecepcion")) {
                $("nombreRecepcion").textContent =
                    DATOS_BODA.recepcion.nombre || "";
            }

            if ($("direccionRecepcion")) {
                $("direccionRecepcion").textContent =
                    DATOS_BODA.recepcion.direccion || "";
            }

            if ($("mapaRecepcion")) {

                if (DATOS_BODA.recepcion.mapa) {

                    $("mapaRecepcion").href =
                        DATOS_BODA.recepcion.mapa;

                    $("mapaRecepcion").style.display = "";

                } else {

                    $("mapaRecepcion").style.display = "none";

                }

            }

        }


        /* VESTIMENTA */

        if (DATOS_BODA.vestimenta) {

            if ($("vestimentaTitulo")) {
                $("vestimentaTitulo").textContent =
                    DATOS_BODA.vestimenta.titulo || "";
            }

            if ($("vestimentaTexto")) {
                $("vestimentaTexto").textContent =
                    DATOS_BODA.vestimenta.descripcion || "";
            }

        }


        /* REGALOS */

        if ($("textoRegalos")) {

            $("textoRegalos").textContent =
                "Tu cariño y compañía son nuestro mayor regalo. " +
                "Si deseas tener un detalle con nuestra pequeña, " +
                "cualquier gesto será recibido con muchísimo amor.";

        }


        cargarFecha();
        cargarItinerario();
        cargarRegalos();
        cargarPaletaColores();

    }


    /* ======================================
       FECHA DEL EVENTO
    ====================================== */

    function cargarFecha() {

        const fecha = new Date(DATOS_BODA.fecha);

        if (isNaN(fecha.getTime())) {
            console.error("La fecha del evento no es válida.");
            return;
        }

        const opciones = {
            day: "2-digit",
            month: "long",
            year: "numeric"
        };

        const fechaTexto = fecha.toLocaleDateString(
            "es-BO",
            opciones
        );

        if ($("fechaPortada")) {
            $("fechaPortada").textContent =
                fechaTexto.toUpperCase();
        }

        if ($("diaEvento")) {
            $("diaEvento").textContent =
                fecha.getDate().toString().padStart(2, "0");
        }

        if ($("mesEvento")) {
            $("mesEvento").textContent =
                fecha.toLocaleDateString("es-BO", {
                    month: "long"
                }).toUpperCase();
        }

        if ($("anioEvento")) {
            $("anioEvento").textContent =
                fecha.getFullYear();
        }

        if ($("fechaFinal")) {
            $("fechaFinal").textContent =
                fechaTexto.toUpperCase();
        }

        if ($("paseFecha")) {
            $("paseFecha").textContent = fechaTexto;
        }

        if ($("paseNombres")) {
            $("paseNombres").textContent =
                `Baby Shower de ${DATOS_BODA.nombres.primero} y ${DATOS_BODA.nombres.segundo}`;
        }

    }


    /* ======================================
       CONTADOR REGRESIVO
    ====================================== */

    let intervaloContador = null;

    function iniciarContador() {

        if (intervaloContador) {
            clearInterval(intervaloContador);
        }

        actualizarContador();

        intervaloContador = setInterval(
            actualizarContador,
            1000
        );

    }


    function actualizarContador() {

        const fechaEvento =
            new Date(DATOS_BODA.fecha).getTime();

        const ahora = new Date().getTime();

        const diferencia = fechaEvento - ahora;

        if (isNaN(fechaEvento) || diferencia <= 0) {

            ["dias", "horas", "minutos", "segundos"].forEach(id => {

                if ($(id)) {
                    $(id).textContent = "00";
                }

            });

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

        if ($("dias")) {
            $("dias").textContent =
                String(dias).padStart(2, "0");
        }

        if ($("horas")) {
            $("horas").textContent =
                String(horas).padStart(2, "0");
        }

        if ($("minutos")) {
            $("minutos").textContent =
                String(minutos).padStart(2, "0");
        }

        if ($("segundos")) {
            $("segundos").textContent =
                String(segundos).padStart(2, "0");
        }

    }


    /* ======================================
       ITINERARIO
    ====================================== */

    function cargarItinerario() {

        const contenedor = $("listaItinerario");

        if (!contenedor) return;

        contenedor.innerHTML = "";

        const itinerario = DATOS_BODA.itinerario || [];

        itinerario.forEach((item, indice) => {

            const tarjeta = document.createElement("article");

            tarjeta.className = "itinerario-item";

            tarjeta.innerHTML = `
                <div class="itinerario-hora">
                    ${item.hora || ""}
                </div>

                <div class="itinerario-contenido">

                    <span class="itinerario-numero">
                        ${String(indice + 1).padStart(2, "0")}
                    </span>

                    <h3>${item.titulo || ""}</h3>

                    <p>${item.descripcion || ""}</p>

                </div>

                <div class="itinerario-estrella">
                    ★
                </div>
            `;

            contenedor.appendChild(tarjeta);

        });

    }


    /* ======================================
       REGALOS
    ====================================== */

    function cargarRegalos() {

        const contenedor = $("listaRegalos");

        if (!contenedor) return;

        contenedor.innerHTML = "";

        const regalos = DATOS_BODA.regalos || [];

        regalos.forEach(regalo => {

            const tarjeta = document.createElement("article");

            tarjeta.className = "regalo-tarjeta";

            tarjeta.innerHTML = `
                <div class="regalo-icono">★</div>

                <h3>${regalo.titulo || ""}</h3>

                <p>${regalo.descripcion || ""}</p>

                ${
                    regalo.enlace
                    ? `<a href="${regalo.enlace}" target="_blank" rel="noopener noreferrer">Ver detalle</a>`
                    : ""
                }
            `;

            contenedor.appendChild(tarjeta);

        });

    }


    /* ======================================
       MENÚ LATERAL
    ====================================== */

    const botonMenu = $("botonMenu");
    const cerrarMenu = $("cerrarMenu");
    const menuLateral = $("menuLateral");
    const fondoMenu = $("fondoMenu");


    function abrirMenu() {

        if (menuLateral) {
            menuLateral.classList.add("menu-activo");
        }

        if (fondoMenu) {
            fondoMenu.classList.add("fondo-menu-activo");
        }

    }


    function cerrarMenuFuncion() {

        if (menuLateral) {
            menuLateral.classList.remove("menu-activo");
        }

        if (fondoMenu) {
            fondoMenu.classList.remove("fondo-menu-activo");
        }

    }


    if (botonMenu) {
        botonMenu.addEventListener("click", abrirMenu);
    }

    if (cerrarMenu) {
        cerrarMenu.addEventListener("click", cerrarMenuFuncion);
    }

    if (fondoMenu) {
        fondoMenu.addEventListener("click", cerrarMenuFuncion);
    }

    document.querySelectorAll(".menu-lateral a").forEach(enlace => {

        enlace.addEventListener("click", cerrarMenuFuncion);

    });


    /* ======================================
       MÚSICA
    ====================================== */

    const musica = $("musica");
    const botonMusica = $("botonMusica");

    if (botonMusica && musica) {

        botonMusica.addEventListener("click", async () => {

            try {

                if (musica.paused) {

                    await musica.play();

                    botonMusica.classList.add("musica-activa");

                } else {

                    musica.pause();

                    botonMusica.classList.remove("musica-activa");

                }

            } catch (error) {

                console.error(
                    "No se pudo reproducir la música:",
                    error
                );

            }

        });

    }


    /* ==========================================
       GLAM - INVITACIÓN PERSONALIZADA
    ========================================== */

    function cargarInvitadoGLAM() {

        const parametros = new URLSearchParams(
            window.location.search
        );

        tokenInvitacionGLAM = parametros.get("token");

        const formulario = $("formularioRSVP");
        const mensaje = $("mensajeRSVP");

        if (!formulario || !mensaje) return;

        formulario.style.display = "none";

        if (!tokenInvitacionGLAM) {

            mensaje.textContent =
                "No se encontró el código de tu invitación. Verifica el enlace que recibiste.";

            return;

        }

        if (!DATOS_BODA.rsvpEndpoint) {

            mensaje.textContent =
                "No se encuentra configurada la conexión GLAM.";

            return;

        }

        mensaje.textContent =
            "Identificando tu invitación...";


        window.glamInvitacionCallback = function(respuesta) {

            if (
                !respuesta ||
                !respuesta.correcto ||
                !respuesta.invitado
            ) {

                mensaje.textContent =
                    respuesta?.mensaje ||
                    "No se pudo identificar tu invitación.";

                return;

            }

            window.glamInvitadoActual = respuesta;

            const invitado = respuesta.invitado;

            const pases = Number(
                invitado.pasesAsignados || 0
            );


            /* NOMBRE DEL INVITADO */

            if ($("nombreInvitado")) {

                $("nombreInvitado").value =
                    invitado.nombre || "";

                $("nombreInvitado").readOnly = true;

            }


            /* PASES ASIGNADOS */

            if ($("pasesAsignadosTexto")) {

                $("pasesAsignadosTexto").textContent =
                    "Tienes " +
                    pases +
                    (pases === 1
                        ? " pase asignado."
                        : " pases asignados.");

            }


            /* SELECTOR DE PASES */

            const selector = $("cantidadPases");

            if (selector) {

                selector.innerHTML =
                    '<option value="">Selecciona la cantidad</option>';

                for (let i = 1; i <= pases; i++) {

                    const opcion =
                        document.createElement("option");

                    opcion.value = i;

                    opcion.textContent =
                        i === 1
                            ? "1 persona"
                            : i + " personas";

                    selector.appendChild(opcion);

                }

            }


            if (pases < 1) {

                mensaje.textContent =
                    "Esta invitación no tiene pases disponibles.";

                return;

            }


            /* MOSTRAR FORMULARIO */

            formulario.style.display = "";


            /* ESTADO DE CONFIRMACIÓN */

            if (invitado.estadoRSVP === "CONFIRMADO") {

                mensaje.textContent =
                    "Tu asistencia ya fue registrada. Si necesitas modificarla, puedes actualizar tu respuesta aquí.";

            } else if (invitado.estadoRSVP === "NO ASISTIRÁ") {

                mensaje.textContent =
                    "Tu respuesta anterior fue registrada. Puedes actualizarla aquí.";

            } else {

                mensaje.textContent =
                    "¡Invitación identificada! Confirma tu asistencia.";

            }


            /* RESPUESTA ANTERIOR */

            if (
                selector &&
                invitado.pasesConfirmados
            ) {

                selector.value =
                    String(invitado.pasesConfirmados);

            }

            if ($("acompanantes")) {

                $("acompanantes").value =
                    invitado.acompanantes || "";

            }


            /* CARGAR ÁLBUM */

            cargarGaleriaPublicaGLAM();

        };


        /* SOLICITUD JSONP */

        const script = document.createElement("script");

        const separador =
            DATOS_BODA.rsvpEndpoint.includes("?")
                ? "&"
                : "?";

        script.src =
            DATOS_BODA.rsvpEndpoint +
            separador +
            "token=" +
            encodeURIComponent(tokenInvitacionGLAM) +
            "&callback=glamInvitacionCallback";

        script.onerror = function() {

            mensaje.textContent =
                "No pudimos conectar con GLAM. Inténtalo nuevamente más tarde.";

        };

        document.body.appendChild(script);

    }


    /* ==========================================
       GLAM - MOSTRAR CAMPOS SEGÚN ASISTENCIA
    ========================================== */

    const selectorAsistencia = $("asistencia");

    function actualizarCamposAsistencia() {

        const datosAsistencia = $("datosAsistencia");

        if (!selectorAsistencia || !datosAsistencia) return;

        if (selectorAsistencia.value === "NO") {

            datosAsistencia.style.display = "none";

        } else {

            datosAsistencia.style.display = "";

        }

    }

    if (selectorAsistencia) {

        selectorAsistencia.addEventListener(
            "change",
            actualizarCamposAsistencia
        );

    }


    /* ==========================================
       GLAM - MENSAJES RSVP
    ========================================== */

    function mostrarMensajeRSVP(texto, correcto) {

        const mensaje = $("mensajeRSVP");

        if (!mensaje) return;

        mensaje.textContent = texto;

        mensaje.classList.remove(
            "mensaje-exito",
            "mensaje-error"
        );

        mensaje.classList.add(
            correcto ? "mensaje-exito" : "mensaje-error"
        );

    }


    /* ==========================================
       GLAM - ENVÍO DE CONFIRMACIÓN
    ========================================== */

    const formulario = $("formularioRSVP");

    if (formulario) {

        formulario.addEventListener("submit", async evento => {

            evento.preventDefault();

            const boton = formulario.querySelector(
                'button[type="submit"]'
            );

            const invitado = window.glamInvitadoActual;

            if (!invitado || !tokenInvitacionGLAM) {

                mostrarMensajeRSVP(
                    "No se pudo identificar tu invitación.",
                    false
                );

                return;

            }


            const asistencia = $("asistencia").value;

            if (!asistencia) {

                mostrarMensajeRSVP(
                    "Selecciona si podrás acompañarnos.",
                    false
                );

                return;

            }


            const cantidadPases =
                asistencia === "SI"
                    ? Number($("cantidadPases").value)
                    : 0;

            const acompanantes =
                asistencia === "SI" && $("acompanantes")
                    ? $("acompanantes").value.trim()
                    : "";

            const mensajePersonal =
                $("mensajeInvitado")
                    ? $("mensajeInvitado").value.trim()
                    : "";


            const pasesAsignados = Number(
                invitado.invitado.pasesAsignados || 0
            );


            if (
                asistencia === "SI" &&
                (
                    !cantidadPases ||
                    cantidadPases > pasesAsignados
                )
            ) {

                mostrarMensajeRSVP(
                    "La cantidad de personas supera los pases asignados.",
                    false
                );

                return;

            }


            /* DATOS QUE RECIBE GLAM */

            const datos = {

                token: tokenInvitacionGLAM,

                asistencia: asistencia,

                cantidadPases: cantidadPases,

                acompanantes: acompanantes,

                mensaje: mensajePersonal

            };


            if (boton) {

                boton.disabled = true;

                boton.textContent =
                    "Enviando confirmación...";

            }


            try {

                await fetch(DATOS_BODA.rsvpEndpoint, {

                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type": "text/plain;charset=utf-8"
                    },

                    body: JSON.stringify(datos)

                });


                mostrarMensajeRSVP(
                    "¡Gracias! Tu respuesta fue enviada a GLAM. 💗",
                    true
                );


                /* ACTUALIZAR ESTADO LOCAL */

                invitado.invitado.estadoRSVP =
                    asistencia === "SI"
                        ? "CONFIRMADO"
                        : "NO ASISTIRÁ";

                invitado.invitado.pasesConfirmados =
                    cantidadPases;

                invitado.invitado.acompanantes =
                    acompanantes;


            } catch (error) {

                console.error(
                    "Error al enviar RSVP:",
                    error
                );

                mostrarMensajeRSVP(
                    "No pudimos enviar tu respuesta. Inténtalo nuevamente.",
                    false
                );

            } finally {

                if (boton) {

                    boton.disabled = false;

                    boton.innerHTML =
                        'Confirmar asistencia <span>★</span>';

                }

            }

        });

    }


    /* ==========================================
       GLAM - VISTA PREVIA DE FOTOGRAFÍAS
    ========================================== */

    const selectorFotos = $("seleccionarFotos");

    const vistaPrevia = $("vistaPreviaFotos");

    const botonEnviarFotos = $("botonEnviarFotos");

    const mensajeFotos = $("mensajeFotos");


    if (selectorFotos && botonEnviarFotos) {

        selectorFotos.addEventListener("change", () => {

            fotografiasSeleccionadas = Array.from(
                selectorFotos.files || []
            );

            if (vistaPrevia) {
                vistaPrevia.innerHTML = "";
            }


            /* MÁXIMO 5 FOTOGRAFÍAS */

            if (fotografiasSeleccionadas.length > 5) {

                if (mensajeFotos) {

                    mensajeFotos.textContent =
                        "Puedes seleccionar hasta 5 fotografías por envío.";

                }

                fotografiasSeleccionadas = [];

                selectorFotos.value = "";

                botonEnviarFotos.disabled = true;

                return;

            }


            /* CREAR VISTA PREVIA */

            fotografiasSeleccionadas.forEach(archivo => {

                if (!archivo.type.startsWith("image/")) return;

                const imagen = document.createElement("img");

                imagen.src = URL.createObjectURL(archivo);

                imagen.alt = "Fotografía seleccionada";

                if (vistaPrevia) {
                    vistaPrevia.appendChild(imagen);
                }

            });


            botonEnviarFotos.disabled =
                fotografiasSeleccionadas.length === 0;


            if (mensajeFotos) {

                mensajeFotos.textContent =
                    fotografiasSeleccionadas.length
                        ? fotografiasSeleccionadas.length +
                          " fotografía(s) seleccionada(s)."
                        : "";

            }

        });


        /* ======================================
           ENVÍO DE FOTOGRAFÍAS
        ====================================== */

        botonEnviarFotos.addEventListener(
            "click",
            async () => {

                if (!fotografiasSeleccionadas.length) return;

                if (
                    !tokenInvitacionGLAM ||
                    !DATOS_BODA.rsvpEndpoint
                ) {

                    if (mensajeFotos) {

                        mensajeFotos.textContent =
                            "No se pudo identificar tu invitación.";

                    }

                    return;

                }


                botonEnviarFotos.disabled = true;

                selectorFotos.disabled = true;


                try {

                    for (
                        let i = 0;
                        i < fotografiasSeleccionadas.length;
                        i++
                    ) {

                        if (mensajeFotos) {

                            mensajeFotos.textContent =
                                "Enviando fotografía " +
                                (i + 1) +
                                " de " +
                                fotografiasSeleccionadas.length +
                                "...";

                        }


                        const foto =
                            fotografiasSeleccionadas[i];


                        /* REDUCIR IMAGEN */

                        const imagenReducida =
                            await reducirFotoGLAM(foto);

                        const base64 =
                            imagenReducida.split(",")[1];


                        /* DATOS PARA EL SISTEMA GLAM */

                        const datos = {

                            tipo: "subir_foto",

                            token: tokenInvitacionGLAM,

                            nombreArchivo: foto.name,

                            tipoMime: "image/jpeg",

                            base64: base64

                        };


                        await fetch(DATOS_BODA.rsvpEndpoint, {

                            method: "POST",

                            mode: "no-cors",

                            headers: {
                                "Content-Type": "text/plain;charset=utf-8"
                            },

                            body: JSON.stringify(datos)

                        });

                    }


                    if (mensajeFotos) {

                        mensajeFotos.textContent =
                            "¡Gracias por compartir tus recuerdos! 💗";

                    }


                    /* LIMPIAR SELECCIÓN */

                    fotografiasSeleccionadas = [];

                    selectorFotos.value = "";

                    if (vistaPrevia) {
                        vistaPrevia.innerHTML = "";
                    }


                    /* ACTUALIZAR GALERÍA */

                    cargarGaleriaPublicaGLAM();


                } catch (error) {

                    console.error(
                        "Error al enviar fotografías:",
                        error
                    );

                    if (mensajeFotos) {

                        mensajeFotos.textContent =
                            "No se pudieron enviar las fotografías. Inténtalo nuevamente.";

                    }

                } finally {

                    selectorFotos.disabled = false;

                    botonEnviarFotos.disabled = true;

                }

            }
        );

    }


    /* ==========================================
       GLAM - REDUCIR TAMAÑO DE FOTOGRAFÍAS
    ========================================== */

    function reducirFotoGLAM(archivo) {

        return new Promise((resolve, reject) => {

            const imagen = new Image();

            const lector = new FileReader();


            lector.onload = evento => {

                imagen.onload = () => {

                    const maximo = 1600;

                    let ancho = imagen.width;

                    let alto = imagen.height;


                    if (ancho > alto && ancho > maximo) {

                        alto = Math.round(
                            alto * maximo / ancho
                        );

                        ancho = maximo;

                    } else if (alto > maximo) {

                        ancho = Math.round(
                            ancho * maximo / alto
                        );

                        alto = maximo;

                    }


                    const lienzo =
                        document.createElement("canvas");

                    lienzo.width = ancho;

                    lienzo.height = alto;


                    const contexto =
                        lienzo.getContext("2d");

                    if (!contexto) {

                        reject(
                            new Error("No se pudo procesar la fotografía.")
                        );

                        return;

                    }


                    contexto.drawImage(
                        imagen,
                        0,
                        0,
                        ancho,
                        alto
                    );


                    resolve(
                        lienzo.toDataURL("image/jpeg", 0.75)
                    );

                };


                imagen.onerror = () => {

                    reject(
                        new Error("No se pudo cargar la imagen.")
                    );

                };

                imagen.src = evento.target.result;

            };


            lector.onerror = () => {

                reject(
                    new Error("No se pudo leer el archivo.")
                );

            };

            lector.readAsDataURL(archivo);

        });

    }


    /* ==========================================
       GLAM - CARGAR GALERÍA PÚBLICA
    ========================================== */

    function cargarGaleriaPublicaGLAM() {

        const contenedor = $("galeriaPublicaGLAM");

        if (
            !contenedor ||
            !tokenInvitacionGLAM ||
            !DATOS_BODA.rsvpEndpoint
        ) return;


        contenedor.innerHTML =
            "<p>Cargando recuerdos...</p>";


        const callback = "glamGaleriaCallback";


        window[callback] = function(respuesta) {

            delete window[callback];


            if (!respuesta || !respuesta.correcto) {

                contenedor.innerHTML =
                    "<p>No se pudieron cargar los recuerdos.</p>";

                return;

            }


            const fotografias =
                respuesta.fotografias || [];


            if (!fotografias.length) {

                contenedor.innerHTML =
                    "<p>¡Pronto aparecerán aquí nuestros recuerdos!</p>";

                return;

            }


            contenedor.innerHTML = "";


            fotografias.forEach((foto, indice) => {

                const imagen =
                    document.createElement("img");


                imagen.src =
                    "data:" +
                    foto.tipoMime +
                    ";base64," +
                    foto.base64;

                imagen.alt =
                    foto.nombre || "Recuerdo compartido";

                imagen.className =
                    "foto-publica-glam";


                imagen.addEventListener("click", () => {

                    abrirVisorVintageGLAM(
                        fotografias,
                        indice
                    );

                });


                contenedor.appendChild(imagen);

            });

        };


        const script =
            document.createElement("script");


        const separador =
            DATOS_BODA.rsvpEndpoint.includes("?")
                ? "&"
                : "?";


        script.src =
            DATOS_BODA.rsvpEndpoint +
            separador +
            "galeria=1" +
            "&token=" +
            encodeURIComponent(tokenInvitacionGLAM) +
            "&callback=" +
            callback;


        script.onerror = function() {

            contenedor.innerHTML =
                "<p>No se pudo conectar con el álbum.</p>";

            delete window[callback];

        };


        document.body.appendChild(script);

    }


    /* ==========================================
       GLAM - ABRIR VISOR DE FOTOGRAFÍAS
    ========================================== */

    function abrirVisorVintageGLAM(fotografias, indice) {

        fotografiasVisorGLAM = fotografias;

        indiceVisorGLAM = indice;


        const visor = $("visorFotos");

        const ampliada = $("imagenAmpliada");


        if (!visor || !ampliada) return;


        let navegacion =
            visor.querySelector(".navegacion-vintage");


        if (!navegacion) {

            navegacion =
                document.createElement("div");

            navegacion.className =
                "navegacion-vintage";


            navegacion.innerHTML = `
                <button type="button" class="anterior-vintage">‹</button>
                <button type="button" class="siguiente-vintage">›</button>
            `;


            visor.appendChild(navegacion);


            navegacion
                .querySelector(".anterior-vintage")
                .addEventListener("click", evento => {

                    evento.stopPropagation();

                    cambiarFotoVintageGLAM(-1);

                });


            navegacion
                .querySelector(".siguiente-vintage")
                .addEventListener("click", evento => {

                    evento.stopPropagation();

                    cambiarFotoVintageGLAM(1);

                });

        }


        let contador =
            visor.querySelector(".contador-vintage");


        if (!contador) {

            contador =
                document.createElement("div");

            contador.className =
                "contador-vintage";

            visor.appendChild(contador);

        }


        mostrarFotoVintageGLAM();

        visor.classList.add("visor-activo");

    }


    /* ==========================================
       GLAM - MOSTRAR FOTOGRAFÍA AMPLIADA
    ========================================== */

    function mostrarFotoVintageGLAM() {

        const ampliada = $("imagenAmpliada");

        const visor = $("visorFotos");


        if (
            !ampliada ||
            !visor ||
            !fotografiasVisorGLAM.length
        ) return;


        const foto =
            fotografiasVisorGLAM[indiceVisorGLAM];


        ampliada.src =
            "data:" +
            foto.tipoMime +
            ";base64," +
            foto.base64;

        ampliada.alt =
            foto.nombre || "Recuerdo compartido";


        const contador =
            visor.querySelector(".contador-vintage");


        if (contador) {

            contador.textContent =
                (indiceVisorGLAM + 1) +
                " / " +
                fotografiasVisorGLAM.length;

        }

    }


    /* ==========================================
       GLAM - CAMBIAR FOTOGRAFÍA
    ========================================== */

    function cambiarFotoVintageGLAM(direccion) {

        if (!fotografiasVisorGLAM.length) return;


        indiceVisorGLAM += direccion;


        if (indiceVisorGLAM < 0) {

            indiceVisorGLAM =
                fotografiasVisorGLAM.length - 1;

        }


        if (
            indiceVisorGLAM >=
            fotografiasVisorGLAM.length
        ) {

            indiceVisorGLAM = 0;

        }


        mostrarFotoVintageGLAM();

    }


    /* ======================================
       VISOR DE FOTOGRAFÍAS
    ====================================== */

    const visor = $("visorFotos");

    const imagenAmpliada = $("imagenAmpliada");

    const cerrarVisor = $("cerrarVisor");


    document.querySelectorAll(".foto-galeria").forEach(foto => {

        foto.addEventListener("click", () => {

            const ruta = foto.dataset.imagen;

            if (imagenAmpliada) {
                imagenAmpliada.src = ruta;
            }

            if (visor) {
                visor.classList.add("visor-activo");
            }

        });

    });


    if (cerrarVisor) {

        cerrarVisor.addEventListener("click", () => {

            if (visor) {
                visor.classList.remove("visor-activo");
            }

        });

    }


    if (visor) {

        visor.addEventListener("click", evento => {

            if (evento.target === visor) {

                visor.classList.remove("visor-activo");

            }

        });

    }


    /* ======================================
       VIDEO
    ====================================== */

    if (DATOS_BODA.videoUrl && $("videoContenedor")) {

        $("videoContenedor").innerHTML = `
            <video controls playsinline preload="metadata">
                <source src="${DATOS_BODA.videoUrl}" type="video/mp4">
                Tu navegador no puede reproducir este video.
            </video>
        `;

    }


    /* ======================================
       PALETA DE COLORES
    ====================================== */

    function cargarPaletaColores() {

        const paleta = $("paletaColores");

        if (!paleta) return;

        paleta.innerHTML = "";

        const colores =
            DATOS_BODA.vestimenta?.colores || [];


        colores.forEach(color => {

            const muestra =
                document.createElement("span");

            muestra.style.backgroundColor = color;

            paleta.appendChild(muestra);

        });

    }


    /* ======================================
       CÓDIGO QR
    ====================================== */

    if (
        $("codigoQR") &&
        typeof QRCode !== "undefined" &&
        DATOS_BODA.codigoInvitacion
    ) {

        $("codigoQR").innerHTML = "";

        new QRCode($("codigoQR"), {

            text: DATOS_BODA.codigoInvitacion,

            width: 120,

            height: 120

        });

    }


    /* ======================================
       ENTRENAMIENTO SAIYAJIN
    ====================================== */

    const botonKi = $("botonKi");

    const nivelPoder = $("nivelPoder");

    const barraEnergia = $("barraEnergia");

    const mensajeKi = $("mensajeKi");


    let poderAcumulado = 0;

    const poderMaximo = 9000;

    const energiaPorClick = 1000;


    if (botonKi) {

        botonKi.addEventListener("click", () => {

            if (poderAcumulado >= poderMaximo) return;


            poderAcumulado = Math.min(
                poderAcumulado + energiaPorClick,
                poderMaximo
            );


            if (nivelPoder) {

                nivelPoder.textContent =
                    poderAcumulado.toLocaleString("es-BO");

            }


            if (barraEnergia) {

                barraEnergia.style.width =
                    (poderAcumulado / poderMaximo * 100) + "%";

            }


            if (poderAcumulado < poderMaximo) {

                if (mensajeKi) {

                    mensajeKi.textContent =
                        poderAcumulado >= 5000
                            ? "🔥 ¡Tu energía está aumentando! ¡Sigue adelante!"
                            : "⚡ ¡Excelente! ¡Estás liberando tu poder Saiyajin!";

                }

            } else {

                if (mensajeKi) {

                    mensajeKi.textContent =
                        "🐉 ¡PODER MÁXIMO ALCANZADO! ¡MISIÓN CUMPLIDA!";

                }

                botonKi.textContent =
                    "★ ¡PODER MÁXIMO!";

                botonKi.disabled = true;

                botonKi.classList.add("ki-completado");

            }

        });

    }


    /* ==========================================
       JUEGO DE LAS SIETE ESFERAS DEL DRAGÓN
    ========================================== */

    const esferas = document.querySelectorAll(
        "#aventuraSaiyajin .esfera-dragon"
    );

    const contadorEsferas = $("contadorEsferas");

    const mensajeRadar = $("mensajeRadar");

    const indicadores = document.querySelectorAll(
        "#aventuraSaiyajin .esfera-mini"
    );

    const modalShenlong = $("modalShenlong");

    const botonCerrarShenlong = $("cerrarShenlong");


    let esferasEncontradas = new Set();


    if (esferas.length) {

        esferas.forEach(esfera => {

            esfera.addEventListener("click", evento => {

                evento.preventDefault();

                const numero = esfera.dataset.esfera;


                if (esferasEncontradas.has(numero)) {

                    if (mensajeRadar) {

                        mensajeRadar.textContent =
                            "✨ ¡Ya encontraste esta esfera! Busca otra.";

                    }

                    return;

                }


                esferasEncontradas.add(numero);


                esfera.classList.add("encontrada");

                esfera.disabled = true;

                esfera.setAttribute(
                    "aria-label",
                    "Esfera " + numero + " encontrada"
                );


                if (contadorEsferas) {

                    contadorEsferas.textContent =
                        esferasEncontradas.size + " / 7";

                }


                if (indicadores[numero - 1]) {

                    indicadores[numero - 1].classList.add(
                        "encontrada"
                    );

                }


                if (esferasEncontradas.size < 7) {

                    if (mensajeRadar) {

                        mensajeRadar.textContent =
                            "🌟 ¡Esfera encontrada! Ya tienes " +
                            esferasEncontradas.size +
                            " de 7. ¡Sigue buscando!";

                    }

                } else {

                    if (mensajeRadar) {

                        mensajeRadar.textContent =
                            "🐉 ¡MISIÓN CUMPLIDA! Has encontrado las siete esferas.";

                    }


                    if (modalShenlong) {

                        modalShenlong.classList.add("activo");

                        modalShenlong.style.display = "flex";

                    }

                }

            });

        });

    }


    /* CERRAR MODAL SHENLONG */

    if (botonCerrarShenlong) {

        botonCerrarShenlong.addEventListener("click", () => {

            if (modalShenlong) {

                modalShenlong.classList.remove("activo");

                modalShenlong.style.display = "none";

            }

        });

    }


    /* ======================================
       INICIALIZACIÓN GENERAL
    ====================================== */

    cargarDatos();

    cargarInvitadoGLAM();

});
