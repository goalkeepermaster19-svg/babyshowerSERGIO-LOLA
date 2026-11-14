/* =========================================================
   BABY SHOWER · DRAGON BALL Z
   Motor funcional compatible con GLAM / BODA
   No modifica estilos ni estructura visual.
   ========================================================= */

(() => {
  "use strict";

  const $ = id => document.getElementById(id);
  const texto = (id, valor) => {
    const el = $(id);
    if (el) el.textContent = valor ?? "";
  };

  // Lee DATOS_BODA aunque esté declarado como const en datos.js.
  const datos = typeof DATOS_BODA !== "undefined"
    ? DATOS_BODA
    : (window.DATOS_BODA || {});

  let invitadoGLAM = null;
  let tokenGLAM = "";
  let archivosSeleccionados = [];
  let fotosPublicas = [];
  let indiceFoto = 0;
  let intervaloCuenta = null;

  document.addEventListener("DOMContentLoaded", iniciar);

  function iniciar() {
    cargarDatos();
    configurarSobre();
    configurarMenu();
    configurarMusica();
    configurarGaleria();
    configurarVideo();
    configurarFormularioGLAM();
    iniciarCuentaRegresiva();
    configurarAlbum();
    configurarPaseQR();
    configurarKiSaiyajin();
    configurarEsferasDragon();
    configurarAnimaciones();
    cargarInvitadoGLAM();
  }

  /* =========================================================
     DATOS GENERALES
     ========================================================= */

  function cargarDatos() {
    const nombres = datos.nombres || {};
    const fecha = convertirFechaEvento(datos.fecha);
    const nombreEvento = "Nuestra pequeña Saiyajin";

    texto("nombrePortada1", "NUESTRA");
    texto("nombrePortada2", "PEQUEÑA SAIYAJIN");
    texto("nombresFinales", nombreEvento);
    texto("paseNombres", nombreEvento);

    texto(
      "firmaHistoria",
      `Con amor, ${nombres.primero || "Lola"} y ${nombres.segundo || "Sergio"}`
    );

    texto(
      "textoHistoria",
      datos.historia || "Una pequeña guerrera está por llegar."
    );

    if (fecha) {
      texto(
        "fechaPortada",
        fecha.toLocaleDateString("es-BO", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        }).toUpperCase().replace(/ DE /g, " · ")
      );

      texto("diaEvento", String(fecha.getDate()).padStart(2, "0"));

      texto(
        "mesEvento",
        fecha.toLocaleDateString("es-BO", { month: "long" }).toUpperCase()
      );

      texto("anioEvento", fecha.getFullYear());

      texto(
        "fechaFinal",
        `${fecha.getDate()} · ${fecha.getMonth() + 1} · ${fecha.getFullYear()}`
      );

      texto(
        "paseFecha",
        fecha.toLocaleDateString("es-BO", {
          day: "numeric",
          month: "long",
          year: "numeric"
        })
      );
    }

    const ceremonia = datos.ceremonia || {};

    texto(
      "nombreCeremonia",
      ceremonia.nombre || "Lugar de celebración"
    );

    texto("direccionCeremonia", ceremonia.direccion || "");

    configurarMapa("mapaCeremonia", ceremonia.mapa);

    if (datos.recepcion) {
      texto("nombreRecepcion", datos.recepcion.nombre || "");
      texto("direccionRecepcion", datos.recepcion.direccion || "");
      configurarMapa("mapaRecepcion", datos.recepcion.mapa);
    } else {
      const recepcion = $("nombreRecepcion")?.closest("article");
      if (recepcion) recepcion.hidden = true;
    }

    const itinerario = $("listaItinerario");

    if (itinerario) {
      itinerario.replaceChildren();

      (Array.isArray(datos.itinerario) ? datos.itinerario : [])
        .forEach(ev => {
          const tarjeta = document.createElement("article");
          tarjeta.className = "itinerario-item revelar";

          const titulo = document.createElement("h3");
          const descripcion = document.createElement("p");

          titulo.textContent = `${ev.hora || ""} · ${ev.titulo || ""}`;
          descripcion.textContent = ev.descripcion || "";

          tarjeta.append(titulo, descripcion);
          itinerario.appendChild(tarjeta);
        });
    }

    const regalos = $("listaRegalos");

    if (regalos) {
      regalos.replaceChildren();

      (Array.isArray(datos.regalos) ? datos.regalos : [])
        .forEach(regalo => {
          const tarjeta = document.createElement("article");
          tarjeta.className = "regalo-tarjeta revelar";

          const titulo = document.createElement("h3");
          const descripcion = document.createElement("p");

          titulo.textContent = regalo.titulo || "";
          descripcion.textContent = regalo.descripcion || "";

          tarjeta.append(titulo, descripcion);

          if (regalo.enlace) {
            const enlace = document.createElement("a");

            enlace.href = regalo.enlace;
            enlace.target = "_blank";
            enlace.rel = "noopener noreferrer";
            enlace.textContent = "Ver información ↗";

            tarjeta.appendChild(enlace);
          }

          regalos.appendChild(tarjeta);
        });
    }

    if (datos.vestimenta) {
      texto("vestimentaTitulo", datos.vestimenta.titulo || "");
      texto("vestimentaTexto", datos.vestimenta.descripcion || "");

      const paleta = $("paletaColores");

      if (paleta && Array.isArray(datos.vestimenta.colores)) {
        paleta.replaceChildren();

        datos.vestimenta.colores.forEach(color => {
          const muestra = document.createElement("span");
          muestra.className = "color-muestra";
          muestra.style.backgroundColor = color;
          paleta.appendChild(muestra);
        });
      }
    }
  }

  function convertirFechaEvento(valor) {
    if (!valor) return null;

    // Si no tiene zona horaria, se interpreta como hora de La Paz.
    const cadena = String(valor);

    const fecha = new Date(
      cadena.length === 16
        ? `${cadena}:00-04:00`
        : cadena.includes("T") &&
          !/(Z|[+-]\d{2}:?\d{2})$/.test(cadena)
          ? `${cadena}-04:00`
          : cadena
    );

    return Number.isNaN(fecha.getTime()) ? null : fecha;
  }

  function configurarMapa(id, url) {
    const enlace = $(id);
    if (!enlace) return;

    if (url) {
      enlace.href = url;
      enlace.target = "_blank";
      enlace.rel = "noopener noreferrer";
      enlace.hidden = false;
    } else {
      enlace.hidden = true;
    }
  }

  /* =========================================================
     SOBRE DE APERTURA
     ========================================================= */

  function configurarSobre() {
    const boton = $("botonAbrir");
    const sobre = $("sobreInicial");
    const invitacion = $("invitacion");

    if (!boton || !sobre || !invitacion) return;

    boton.addEventListener("click", () => {
      sobre.classList.add("sobre-abierto", "cerrado");

      window.setTimeout(() => {
        sobre.style.display = "none";
        invitacion.classList.remove("oculto");

        document.body.classList.add("invitacion-activa");
        document.body.style.overflow = "auto";

        configurarAnimaciones();
      }, 700);
    });
  }

  /* =========================================================
     MENÚ
     ========================================================= */

  function configurarMenu() {
    const menu = $("menuLateral");
    const fondo = $("fondoMenu");

    if (!menu || !fondo) return;

    const abrir = () => {
      menu.classList.add("menu-activo", "abierto");
      fondo.classList.add("fondo-menu-activo", "visible");
    };

    const cerrar = () => {
      menu.classList.remove("menu-activo", "abierto");
      fondo.classList.remove("fondo-menu-activo", "visible");
    };

    $("botonMenu")?.addEventListener("click", abrir);
    $("cerrarMenu")?.addEventListener("click", cerrar);

    fondo.addEventListener("click", cerrar);

    menu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", cerrar);
    });
  }

  /* =========================================================
     MÚSICA
     ========================================================= */

  function configurarMusica() {
    const audio = $("musica");
    const boton = $("botonMusica");

    if (!audio || !boton) return;

    boton.addEventListener("click", async () => {
      try {
        if (audio.paused) {
          await audio.play();

          boton.classList.add("musica-activa", "activo");
          boton.setAttribute("aria-label", "Pausar música");
        } else {
          audio.pause();

          boton.classList.remove("musica-activa", "activo");
          boton.setAttribute("aria-label", "Reproducir música");
        }
      } catch (error) {
        console.error(
          "No se pudo reproducir recursos/musica.mp3",
          error
        );
      }
    });
  }

  /* =========================================================
     CUENTA REGRESIVA
     ========================================================= */

  function iniciarCuentaRegresiva() {
    const objetivo = convertirFechaEvento(datos.fecha);
    const contador = $("contador");

    if (!objetivo || !contador) {
      console.error(
        "Cuenta regresiva: revisa DATOS_BODA.fecha en datos.js."
      );
      return;
    }

    if (intervaloCuenta) {
      clearInterval(intervaloCuenta);
    }

    const actualizar = () => {
      const diferencia = objetivo.getTime() - Date.now();

      if (diferencia <= 0) {
        texto("dias", "00");
        texto("horas", "00");
        texto("minutos", "00");
        texto("segundos", "00");

        const pie = document.querySelector(".contador-pie");

        if (pie) {
          pie.textContent = "¡Hoy comienza nuestra aventura!";
        }

        return;
      }

      texto(
        "dias",
        String(Math.floor(diferencia / 86400000)).padStart(2, "0")
      );

      texto(
        "horas",
        String(Math.floor(diferencia / 3600000) % 24).padStart(2, "0")
      );

      texto(
        "minutos",
        String(Math.floor(diferencia / 60000) % 60).padStart(2, "0")
      );

      texto(
        "segundos",
        String(Math.floor(diferencia / 1000) % 60).padStart(2, "0")
      );
    };

    actualizar();
    intervaloCuenta = window.setInterval(actualizar, 1000);
  }

  /* =========================================================
     GALERÍA ORIGINAL Y VISOR
     ========================================================= */

  function configurarGaleria() {
    const visor = $("visorFotos");
    const imagen = $("imagenAmpliada");

    if (!visor || !imagen) return;

    document.querySelectorAll(".foto-galeria").forEach(foto => {
      foto.addEventListener("click", () => {
        const src =
          foto.dataset.imagen ||
          foto.querySelector("img")?.src;

        if (!src) return;

        imagen.src = src;
        visor.classList.add("visible");
      });
    });

    $("cerrarVisor")?.addEventListener("click", cerrar);

    visor.addEventListener("click", e => {
      if (e.target === visor) cerrar();
    });

    function cerrar() {
      visor.classList.remove("visible");
    }
  }

  /* =========================================================
     VIDEO
     ========================================================= */

  function configurarVideo() {
    const contenedor = $("videoContenedor");

    if (!contenedor || !datos.videoUrl) return;

    const iframe = document.createElement("iframe");

    iframe.src = datos.videoUrl;
    iframe.title = "Mensaje para nuestra pequeña";
    iframe.allow = "autoplay; encrypted-media; picture-in-picture";
    iframe.allowFullscreen = true;

    contenedor.replaceChildren(iframe);
  }

  /* =========================================================
     CONFIRMACIÓN DE ASISTENCIA GLAM / BODA
     ========================================================= */

  function configurarFormularioGLAM() {
    const form = $("formularioRSVP");

    if (!form) return;

    form.addEventListener("submit", async evento => {
      evento.preventDefault();

      const mensaje = $("mensajeRSVP");
      const boton = form.querySelector('button[type="submit"]');
      const nombre = $("nombreInvitado")?.value.trim() || "";
      const respuesta = normalizarAsistencia(
        $("asistencia")?.value || ""
      );

      const selector = $("cantidadAcompanantes");

      if (!tokenGLAM || !invitadoGLAM) {
        mensaje.textContent =
          "Abre el enlace personal de tu invitación para confirmar tu asistencia.";
        return;
      }

      if (!nombre || !respuesta) {
        mensaje.textContent = "Completa los campos obligatorios.";
        return;
      }

      const pasesAsignados = Number(
        invitadoGLAM.pasesAsignados || 0
      );

      let cantidadPases = 0;

      if (respuesta === "SI") {
        const extras = Number(selector?.value || 0);
        cantidadPases = 1 + extras;

        if (
          !Number.isInteger(cantidadPases) ||
          cantidadPases > pasesAsignados
        ) {
          mensaje.textContent =
            `Esta invitación tiene ${pasesAsignados} pase(s) en total.`;
          return;
        }
      }

      const payload = new URLSearchParams({
        token: tokenGLAM,
        asistencia: respuesta,
        cantidadPases: String(cantidadPases),
        acompanantes: ""
      });

      if (boton) {
        boton.disabled = true;
        boton.dataset.textoOriginal = boton.innerHTML;
        boton.textContent = "Enviando confirmación...";
      }

      mensaje.textContent = "Enviando tu respuesta...";

      try {
        await fetch(datos.rsvpEndpoint, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          },
          body: payload.toString()
        });

        mensaje.textContent =
          "¡Gracias! Tu respuesta fue enviada. 💗";

        if (invitadoGLAM) {
          invitadoGLAM.estadoRSVP =
            respuesta === "SI" ? "CONFIRMADO" : "NO ASISTIRÁ";

          invitadoGLAM.pasesConfirmados = cantidadPases;
        }
      } catch (error) {
        console.error("Error al enviar RSVP GLAM:", error);

        mensaje.textContent =
          "No se pudo enviar tu respuesta. Inténtalo nuevamente.";
      } finally {
        if (boton) {
          boton.disabled = false;
          boton.innerHTML =
            boton.dataset.textoOriginal ||
            'Confirmar asistencia <span>★</span>';
        }
      }
    });

    $("asistencia")?.addEventListener("change", () => {
      const selector = $("cantidadAcompanantes");
      const asistencia = normalizarAsistencia(
        $("asistencia").value
      );

      if (selector) {
        selector.disabled = asistencia === "NO";
      }
    });
  }

  function normalizarAsistencia(valor) {
    const limpio = String(valor)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    if (limpio.includes("no")) return "NO";

    if (
      limpio.includes("si") ||
      limpio.includes("asist")
    ) {
      return "SI";
    }

    return "";
  }

  /* =========================================================
     IDENTIFICACIÓN DEL INVITADO
     ========================================================= */

  function cargarInvitadoGLAM() {
    const mensaje = $("mensajeRSVP");
    const formulario = $("formularioRSVP");

    tokenGLAM =
      new URLSearchParams(window.location.search).get("token") || "";

    if (!tokenGLAM) {
      if (mensaje) {
        mensaje.textContent =
          "Esta invitación es personal. Utiliza el enlace que recibiste para confirmar tu asistencia.";
      }

      const boton = formulario?.querySelector('button[type="submit"]');

      if (boton) boton.disabled = true;

      return;
    }

    if (!datos.rsvpEndpoint) {
      if (mensaje) {
        mensaje.textContent =
          "Falta configurar rsvpEndpoint en datos.js.";
      }

      return;
    }

    window.glamInvitacionCallback = respuesta => {
      if (
        !respuesta ||
        !respuesta.correcto ||
        !respuesta.invitado
      ) {
        if (mensaje) {
          mensaje.textContent =
            respuesta?.mensaje ||
            "No se pudo validar esta invitación.";
        }

        return;
      }

      invitadoGLAM = respuesta.invitado;

      const campoNombre = $("nombreInvitado");

      if (campoNombre) {
        campoNombre.value = invitadoGLAM.nombre || "";
        campoNombre.readOnly = true;
      }

      const selector = $("cantidadAcompanantes");

      const pases = Math.max(
        0,
        Number(invitadoGLAM.pasesAsignados || 0)
      );

      if (selector) {
        selector.replaceChildren();

        for (
          let extra = 0;
          extra <= Math.max(0, pases - 1);
          extra++
        ) {
          const opcion = document.createElement("option");

          opcion.value = String(extra);

          opcion.textContent =
            extra === 0
              ? "Solo yo"
              : `${extra} acompañante${extra > 1 ? "s" : ""}`;

          selector.appendChild(opcion);
        }

        selector.disabled = pases <= 1;
      }

      if (pases < 1) {
        if (mensaje) {
          mensaje.textContent =
            "Esta invitación no tiene pases disponibles. Comunícate con los anfitriones.";
        }

        const boton =
          formulario?.querySelector('button[type="submit"]');

        if (boton) boton.disabled = true;

        return;
      }

      if (
        invitadoGLAM.estadoRSVP === "CONFIRMADO" ||
        invitadoGLAM.estadoRSVP === "NO ASISTIRÁ"
      ) {
        if (mensaje) {
          mensaje.textContent =
            "Ya existe una respuesta para esta invitación. Puedes actualizarla si lo necesitas.";
        }
      }

      if (
        selector &&
        invitadoGLAM.pasesConfirmados > 0
      ) {
        selector.value = String(
          Math.min(
            pases - 1,
            Math.max(
              0,
              Number(invitadoGLAM.pasesConfirmados) - 1
            )
          )
        );
      }

      cargarGaleriaPublicaGLAM();
    };

    const script = document.createElement("script");

    const separador = datos.rsvpEndpoint.includes("?")
      ? "&"
      : "?";

    script.src =
      `${datos.rsvpEndpoint}${separador}` +
      `token=${encodeURIComponent(tokenGLAM)}` +
      `&callback=glamInvitacionCallback`;

    script.onerror = () => {
      if (mensaje) {
        mensaje.textContent =
          "No pudimos conectar con GLAM. Recarga la página e inténtalo otra vez.";
      }
    };

    document.head.appendChild(script);
  }

  /* =========================================================
     ÁLBUM: SELECCIÓN Y VISTA PREVIA
     ========================================================= */

  function configurarAlbum() {
    const input = $("seleccionarFotos");
    const preview = $("vistaPreviaFotos");
    const boton = $("botonEnviarFotos");
    const mensaje = $("mensajeFotos");

    if (!input || !preview || !boton) return;

    input.addEventListener("change", () => {
      archivosSeleccionados = Array
        .from(input.files || [])
        .filter(f => f.type.startsWith("image/"))
        .slice(0, 5);

      preview.replaceChildren();

      archivosSeleccionados.forEach(archivo => {
        const imagen = document.createElement("img");

        imagen.alt = "Vista previa de fotografía";
        imagen.src = URL.createObjectURL(archivo);

        preview.appendChild(imagen);
      });

      boton.disabled = archivosSeleccionados.length === 0;

      if (mensaje) {
        mensaje.textContent = archivosSeleccionados.length
          ? `${archivosSeleccionados.length} fotografía(s) seleccionada(s).`
          : "Selecciona tus fotografías.";
      }

      if (input.files.length > 5 && mensaje) {
        mensaje.textContent =
          "Puedes enviar hasta 5 fotografías por vez. Se seleccionaron las primeras 5.";
      }
    });

    boton.addEventListener("click", async () => {
      if (!archivosSeleccionados.length) return;

      if (!datos.albumUploadEndpoint) {
        if (mensaje) {
          mensaje.textContent =
            "La vista previa funciona, pero GLAM todavía no tiene configurado el servicio de publicación de fotografías para este evento.";
        }

        return;
      }

      boton.disabled = true;

      if (mensaje) {
        mensaje.textContent = "Preparando fotografías...";
      }

      try {
        for (
          let i = 0;
          i < archivosSeleccionados.length;
          i++
        ) {
          const comprimida = await comprimirImagen(
            archivosSeleccionados[i]
          );

          const formData = new FormData();

          formData.append(
            "foto",
            comprimida,
            `foto-${Date.now()}-${i}.jpg`
          );

          formData.append("token", tokenGLAM);

          formData.append(
            "codigoEvento",
            datos.codigoInvitacion || ""
          );

          const respuesta = await fetch(
            datos.albumUploadEndpoint,
            {
              method: "POST",
              body: formData
            }
          );

          if (!respuesta.ok) {
            throw new Error(
              `No se pudo subir la fotografía ${i + 1}.`
            );
          }
        }

        if (mensaje) {
          mensaje.textContent =
            "¡Fotografías enviadas! Gracias por compartir estos recuerdos.";
        }

        input.value = "";
        archivosSeleccionados = [];
        preview.replaceChildren();

        cargarGaleriaPublicaGLAM();

      } catch (error) {
        console.error("Error al cargar fotografías:", error);

        if (mensaje) {
          mensaje.textContent =
            error.message ||
            "No se pudieron subir las fotografías.";
        }

      } finally {
        boton.disabled = archivosSeleccionados.length === 0;
      }
    });
  }

  function comprimirImagen(archivo) {
    return new Promise((resolve, reject) => {
      const lector = new FileReader();

      lector.onerror = () => {
        reject(new Error("No se pudo leer una fotografía."));
      };

      lector.onload = () => {
        const imagen = new Image();

        imagen.onerror = () => {
          reject(new Error("Una fotografía no es válida."));
        };

        imagen.onload = () => {
          const escala = Math.min(
            1,
            1600 / Math.max(imagen.width, imagen.height)
          );

          const canvas = document.createElement("canvas");

          canvas.width = Math.round(imagen.width * escala);
          canvas.height = Math.round(imagen.height * escala);

          const contexto = canvas.getContext("2d");

          contexto.drawImage(
            imagen,
            0,
            0,
            canvas.width,
            canvas.height
          );

          canvas.toBlob(
            blob => {
              if (blob) {
                resolve(blob);
              } else {
                reject(
                  new Error("No se pudo comprimir la fotografía.")
                );
              }
            },
            "image/jpeg",
            0.78
          );
        };

        imagen.src = lector.result;
      };

      lector.readAsDataURL(archivo);
    });
  }

  /* =========================================================
     GALERÍA PÚBLICA GLAM
     ========================================================= */

  function cargarGaleriaPublicaGLAM() {
    const contenedor = $("galeriaPublicaGLAM");

    if (
      !contenedor ||
      !datos.rsvpEndpoint ||
      !tokenGLAM
    ) {
      return;
    }

    window.glamGaleriaCallback = respuesta => {
      if (
        !respuesta ||
        !respuesta.correcto ||
        !Array.isArray(respuesta.fotografias)
      ) {
        contenedor.textContent =
          "¡Pronto aparecerán aquí nuestros recuerdos!";

        return;
      }

      fotosPublicas = respuesta.fotografias
        .map(f => {
          if (f.url) return f.url;

          if (f.base64) {
            return `data:${f.tipoMime || "image/jpeg"};base64,${f.base64}`;
          }

          return "";
        })
        .filter(Boolean);

      contenedor.replaceChildren();

      if (!fotosPublicas.length) {
        contenedor.textContent =
          "¡Pronto aparecerán aquí nuestros recuerdos!";

        return;
      }

      const rejilla = document.createElement("div");

      rejilla.className = "galeria-publica-grid";

      fotosPublicas.forEach((src, indice) => {
        const imagen = document.createElement("img");

        imagen.src = src;
        imagen.alt = `Recuerdo compartido ${indice + 1}`;
        imagen.loading = "lazy";

        imagen.addEventListener("click", () => {
          abrirFotoPublica(indice);
        });

        rejilla.appendChild(imagen);
      });

      contenedor.appendChild(rejilla);
    };

    const separador = datos.rsvpEndpoint.includes("?")
      ? "&"
      : "?";

    const script = document.createElement("script");

    script.src =
      `${datos.rsvpEndpoint}${separador}` +
      `galeria=1&token=${encodeURIComponent(tokenGLAM)}` +
      `&callback=glamGaleriaCallback`;

    script.onerror = () => {
      contenedor.textContent =
        "No se pudo cargar el álbum compartido.";
    };

    document.head.appendChild(script);
  }

  function abrirFotoPublica(indice) {
    indiceFoto = indice;

    const visor = $("visorFotos");
    const imagen = $("imagenAmpliada");

    if (
      !visor ||
      !imagen ||
      !fotosPublicas[indice]
    ) {
      return;
    }

    imagen.src = fotosPublicas[indice];
    visor.classList.add("visible");
  }

  /* =========================================================
     CÓDIGO QR DEL PASE
     ========================================================= */

  function configurarPaseQR() {
    const caja = $("codigoQR");

    if (
      !caja ||
      typeof window.QRCode !== "function"
    ) {
      return;
    }

    const url = window.location.href;

    caja.replaceChildren();

    new QRCode(caja, {
      text: url,
      width: 150,
      height: 150,
      correctLevel: QRCode.CorrectLevel.M
    });
  }

  /* =========================================================
     ENTRENAMIENTO KI SAIYAJIN
     ========================================================= */

  function configurarKiSaiyajin() {
    const boton = $("botonKi");
    const barra = $("barraEnergia");
    const mensaje = $("mensajeKi");

    if (!boton) return;

    let poder = 0;
    const maximo = 9000;

    boton.addEventListener("click", () => {
      poder = Math.min(maximo, poder + 1000);

      texto(
        "nivelPoder",
        poder.toLocaleString("es-BO")
      );

      if (barra) {
        barra.style.width = `${(poder / maximo) * 100}%`;
      }

      if (mensaje) {
        mensaje.textContent =
          poder >= maximo
            ? "🐉 ¡PODER MÁXIMO ALCANZADO! ¡MISIÓN CUMPLIDA!"
            : "¡Sigue entrenando, guerrero! Tu Ki está aumentando.";
      }

      if (poder >= maximo) {
        boton.disabled = true;
        boton.textContent = "★ ¡PODER MÁXIMO!";
        boton.classList.add("ki-completado");
      }
    });
  }

  /* =========================================================
     LAS SIETE ESFERAS DEL DRAGÓN
     ========================================================= */

  function configurarEsferasDragon() {
    const esferas = Array.from(
      document.querySelectorAll(".esfera-dragon[data-esfera]")
    );

    if (!esferas.length) return;

    const reunidas = new Set();

    const contador = $("contadorEsferas");
    const radar = $("mensajeRadar");
    const modal = $("modalShenlong");

    esferas.forEach(esfera => {
      esfera.addEventListener("click", () => {
        const numero = esfera.dataset.esfera;

        if (reunidas.has(numero)) return;

        reunidas.add(numero);

        esfera.classList.add("reunida", "encontrada");

        texto(
          "contadorEsferas",
          `${reunidas.size}/7`
        );

        document
          .querySelectorAll(
            `.esfera-mini[data-esfera="${numero}"]`
          )
          .forEach(mini => {
            mini.classList.add("activa", "encontrada");
          });

        if (radar) {
          radar.textContent =
            reunidas.size === 7
              ? "¡Has reunido las siete esferas!"
              : `¡Esfera ${numero} encontrada! El radar detecta ${7 - reunidas.size} más.`;
        }

        if (reunidas.size === 7 && modal) {
          modal.classList.add("activo");
          modal.style.display = "flex";
        }
      });
    });

    $("cerrarShenlong")?.addEventListener("click", () => {
      if (modal) {
        modal.classList.remove("activo");
        modal.style.display = "none";
      }
    });

    modal?.addEventListener("click", e => {
      if (e.target === modal) {
        modal.classList.remove("activo");
        modal.style.display = "none";
      }
    });

    texto("contadorEsferas", "0/7");
  }

  /* =========================================================
     ANIMACIONES AL DESPLAZARSE
     ========================================================= */

  function configurarAnimaciones() {
    if (!("IntersectionObserver" in window)) return;

    const elementos = document.querySelectorAll(
      ".seccion, .itinerario-item, .evento-itinerario, .ubicacion-tarjeta, .regalo-item, .regalo-tarjeta"
    );

    const observador = new IntersectionObserver(
      (entradas, obs) => {
        entradas.forEach(entrada => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            obs.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elementos.forEach(elemento => {
      elemento.classList.add("revelar");
      observador.observe(elemento);
    });
  }

})();
