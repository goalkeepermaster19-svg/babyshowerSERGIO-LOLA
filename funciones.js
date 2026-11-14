/* ==========================================
   BABY-01 | FUNCIONES GENERALES
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const $ = (id) => document.getElementById(id);


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

        const nombres = DATOS_BODA.nombres;

        const nombreCompleto =
            `${nombres.primero} y ${nombres.segundo}`;

           if ($("nombrePortada1")) {
             $("nombrePortada1").textContent = "NUESTRA";
         }
        if ($("nombrePortada2")) {
            $("nombrePortada2").textContent = "PEQUEÑA SAIYAJIN";
        }

        if ($("nombresFinales")) {
            $("nombresFinales").textContent = nombreCompleto;
        }

        if ($("nombreCeremonia")) {
            $("nombreCeremonia").textContent =
                DATOS_BODA.ceremonia.nombre;
        }

        if ($("direccionCeremonia")) {
            $("direccionCeremonia").textContent =
                DATOS_BODA.ceremonia.direccion;
        }

        if ($("mapaCeremonia")) {

            if (DATOS_BODA.ceremonia.mapa) {
                $("mapaCeremonia").href =
                    DATOS_BODA.ceremonia.mapa;
            } else {
                $("mapaCeremonia").style.display = "none";
            }

        }

        if ($("nombreRecepcion")) {
            $("nombreRecepcion").textContent =
                DATOS_BODA.recepcion.nombre;
        }

        if ($("direccionRecepcion")) {
            $("direccionRecepcion").textContent =
                DATOS_BODA.recepcion.direccion;
        }

        if ($("mapaRecepcion")) {

            if (DATOS_BODA.recepcion.mapa) {
                $("mapaRecepcion").href =
                    DATOS_BODA.recepcion.mapa;
            } else {
                $("mapaRecepcion").style.display = "none";
            }

        }

        if ($("vestimentaTitulo")) {
            $("vestimentaTitulo").textContent =
                DATOS_BODA.vestimenta.titulo;
        }

        if ($("vestimentaTexto")) {
            $("vestimentaTexto").textContent =
                DATOS_BODA.vestimenta.descripcion;
        }

        if ($("textoRegalos")) {
            $("textoRegalos").textContent =
                "Tu cariño y compañía son nuestro mayor regalo. Si deseas tener un detalle con nuestra pequeña, cualquier gesto será recibido con muchísimo amor.";
        }

        cargarFecha();
        cargarItinerario();
        cargarRegalos();

    }


    /* ======================================
       FECHA DEL EVENTO
    ====================================== */

    function cargarFecha() {

        const fecha = new Date(DATOS_BODA.fecha);

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

        const fechaEvento = new Date(DATOS_BODA.fecha).getTime();
        const ahora = new Date().getTime();

        const diferencia = fechaEvento - ahora;

        if (diferencia <= 0) {

            ["dias", "horas", "minutos", "segundos"].forEach(id => {
                if ($(id)) $(id).textContent = "00";
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

        if ($("dias")) $("dias").textContent =
            String(dias).padStart(2, "0");

        if ($("horas")) $("horas").textContent =
            String(horas).padStart(2, "0");

        if ($("minutos")) $("minutos").textContent =
            String(minutos).padStart(2, "0");

        if ($("segundos")) $("segundos").textContent =
            String(segundos).padStart(2, "0");

    }


    /* ======================================
       ITINERARIO
    ====================================== */

    function cargarItinerario() {

        const contenedor = $("listaItinerario");

        if (!contenedor) return;

        contenedor.innerHTML = "";

        DATOS_BODA.itinerario.forEach((item, indice) => {

            const tarjeta = document.createElement("article");

            tarjeta.className = "itinerario-item";

            tarjeta.innerHTML = `
                <div class="itinerario-hora">
                    ${item.hora}
                </div>

                <div class="itinerario-contenido">
                    <span class="itinerario-numero">
                        ${String(indice + 1).padStart(2, "0")}
                    </span>

                    <h3>${item.titulo}</h3>

                    <p>${item.descripcion}</p>
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

        DATOS_BODA.regalos.forEach(regalo => {

            const tarjeta = document.createElement("article");

            tarjeta.className = "regalo-tarjeta";

            tarjeta.innerHTML = `
                <div class="regalo-icono">★</div>

                <h3>${regalo.titulo}</h3>

                <p>${regalo.descripcion}</p>

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

                console.error("No se pudo reproducir la música:", error);

            }

        });

    }


    /* ======================================
       CONFIRMACIÓN DE ASISTENCIA
    ====================================== */

    const formulario = $("formularioRSVP");

    if (formulario) {

        formulario.addEventListener("submit", async (evento) => {

            evento.preventDefault();

            const boton = formulario.querySelector(
                'button[type="submit"]'
            );

            const nombre = $("nombreInvitado").value.trim();
            const asistencia = $("asistencia").value;
            const acompanantes = $("cantidadAcompanantes").value;
            const mensaje = $("mensajeInvitado").value.trim();

            if (!nombre || !asistencia) {

                mostrarMensajeRSVP(
                    "Por favor, completa los campos obligatorios.",
                    false
                );

                return;

            }

            const datos = {

                nombre: nombre,

                asistencia: asistencia,

                acompanantes: acompanantes,

                mensaje: mensaje,

                codigoInvitacion: DATOS_BODA.codigoInvitacion,

                fechaEvento: DATOS_BODA.fecha,

                fechaRegistro: new Date().toISOString()

            };

            if (boton) {
                boton.disabled = true;
                boton.textContent = "Enviando confirmación...";
            }

            try {

                await fetch(DATOS_BODA.rsvpEndpoint, {

                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(datos)

                });

                mostrarMensajeRSVP(
                    "¡Gracias por confirmar! Tu respuesta ha sido registrada. 💗",
                    true
                );

                formulario.reset();

            } catch (error) {

                console.error("Error al enviar RSVP:", error);

                mostrarMensajeRSVP(
                    "No pudimos enviar tu respuesta. Por favor, intenta nuevamente.",
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


    /* ======================================
       ÁLBUM: VISTA PREVIA DE FOTOGRAFÍAS
    ====================================== */

    const selectorFotos = $("seleccionarFotos");
    const vistaPrevia = $("vistaPreviaFotos");
    const botonEnviarFotos = $("botonEnviarFotos");
    const mensajeFotos = $("mensajeFotos");

    let fotografiasSeleccionadas = [];

    if (selectorFotos) {

        selectorFotos.addEventListener("change", () => {

            fotografiasSeleccionadas = Array.from(
                selectorFotos.files || []
            );

            if (vistaPrevia) {
                vistaPrevia.innerHTML = "";
            }

            fotografiasSeleccionadas.forEach(archivo => {

                if (!archivo.type.startsWith("image/")) return;

                const lector = new FileReader();

                lector.onload = (evento) => {

                    const imagen = document.createElement("img");

                    imagen.src = evento.target.result;

                    imagen.alt = "Fotografía seleccionada";

                    if (vistaPrevia) {
                        vistaPrevia.appendChild(imagen);
                    }

                };

                lector.readAsDataURL(archivo);

            });

            if (botonEnviarFotos) {
                botonEnviarFotos.disabled =
                    fotografiasSeleccionadas.length === 0;
            }

            if (mensajeFotos) {
                mensajeFotos.textContent =
                    fotografiasSeleccionadas.length
                    ? `${fotografiasSeleccionadas.length} fotografía(s) seleccionada(s).`
                    : "";
            }

        });

    }

    if (botonEnviarFotos) {

        botonEnviarFotos.addEventListener("click", () => {

            if (!fotografiasSeleccionadas.length) return;

            if (DATOS_BODA.albumUrl) {

                window.open(
                    DATOS_BODA.albumUrl,
                    "_blank",
                    "noopener,noreferrer"
                );

                if (mensajeFotos) {
                    mensajeFotos.textContent =
                        "Se abrió el álbum compartido. Allí podrás completar la carga de tus fotografías.";
                }

            } else {

                if (mensajeFotos) {
                    mensajeFotos.textContent =
                        "Las fotografías están seleccionadas. El enlace de subida del álbum todavía no está disponible.";
                }

            }

        });

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

    if ($("paletaColores")) {

        $("paletaColores").innerHTML = "";

        DATOS_BODA.vestimenta.colores.forEach(color => {

            const muestra = document.createElement("span");

            muestra.style.backgroundColor = color;

            $("paletaColores").appendChild(muestra);

        });

    }


    /* ======================================
       CÓDIGO QR
    ====================================== */

    if ($("codigoQR") && typeof QRCode !== "undefined") {

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

            botonKi.textContent = "★ ¡PODER MÁXIMO!";
            botonKi.disabled = true;
            botonKi.classList.add("ki-completado");

        }

    });

}


    /* ======================================
       INICIALIZACIÓN
    ====================================== */

    cargarDatos();

});

/* ==========================================
   JUEGO DE LAS SIETE ESFERAS DEL DRAGÓN
   CORRECCIÓN DE INTERACTIVIDAD
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const esferas = document.querySelectorAll(
        "#aventuraSaiyajin .esfera-dragon"
    );

    const contador = document.getElementById("contadorEsferas");
    const mensaje = document.getElementById("mensajeRadar");
    const indicadores = document.querySelectorAll(
        "#aventuraSaiyajin .esfera-mini"
    );
    const modal = document.getElementById("modalShenlong");
    const botonCerrar = document.getElementById("cerrarShenlong");

    let encontradas = new Set();

    if (!esferas.length) {
        console.error("No se encontraron las esferas del Dragón.");
        return;
    }

    esferas.forEach(function (esfera) {

        esfera.addEventListener("click", function (evento) {

            evento.preventDefault();

            const numero = esfera.dataset.esfera;

            if (encontradas.has(numero)) {
                mensaje.textContent = "✨ ¡Ya encontraste esta esfera! Busca otra.";
                return;
            }

            encontradas.add(numero);

            esfera.classList.add("encontrada");
            esfera.disabled = true;
            esfera.setAttribute("aria-label", "Esfera " + numero + " encontrada");

            if (contador) {
                contador.textContent = encontradas.size + " / 7";
            }

            if (indicadores[numero - 1]) {
                indicadores[numero - 1].classList.add("encontrada");
            }

            if (encontradas.size < 7) {
                mensaje.textContent =
                    "🌟 ¡Esfera encontrada! Ya tienes " +
                    encontradas.size +
                    " de 7. ¡Sigue buscando!";
            } else {
                mensaje.textContent =
                    "🐉 ¡MISIÓN CUMPLIDA! Has encontrado las siete esferas.";

                if (modal) {
                    modal.classList.add("activo");
                    modal.style.display = "flex";
                }
            }

        });

    });

    if (botonCerrar) {
        botonCerrar.addEventListener("click", function () {
            if (modal) {
                modal.classList.remove("activo");
                modal.style.display = "none";
            }
        });
    }

});
