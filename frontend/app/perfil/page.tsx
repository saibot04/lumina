"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import SelectorOpciones from "@/components/SelectorOpciones";
import Toggle from "@/components/Toggle";
import BotonAccion from "@/components/BotonAccion";
import FilaConfiguracion from "@/components/FilaConfiguracion";
import Seccion from "@/components/Seccion";

type Stats = {
    peliculas: number;
    esteAnio: number;
    seguidores: number;
};

const INITIAL_STATS: Stats = { peliculas: 128, esteAnio: 45, seguidores: 247 };

export default function CuentaYPerfilPage() {
    const router = useRouter();
    const [stats] = useState<Stats>(INITIAL_STATS);
    
    // --- LÓGICA PARA CAMBIAR FOTO ---
    const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleCambiarFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFotoPerfil(imageUrl);
        }
    };

    // --- LÓGICA PARA DATOS DINÁMICOS DEL USUARIO ---
    const [emailUsuario, setEmailUsuario] = useState("Cargando...");
    const [nombreUsuario, setNombreUsuario] = useState("Cargando...");
    const [handleUsuario, setHandleUsuario] = useState("...");

    useEffect(() => {
        const emailGuardado = localStorage.getItem("lumina_user_email");
        const nombreGuardado = localStorage.getItem("lumina_real_username"); // Buscamos el nombre del registro

        if (emailGuardado) {
            setEmailUsuario(emailGuardado);
            
            // Si el usuario viene del registro, usamos su nombre real. 
            // Si vino directo al Login sin registrarse, usamos el truco de cortar el email.
            if (nombreGuardado) {
                setNombreUsuario(nombreGuardado.charAt(0).toUpperCase() + nombreGuardado.slice(1));
                setHandleUsuario("@" + nombreGuardado.toLowerCase().replace(/\s+/g, ''));
            } else {
                const parteNombre = emailGuardado.split('@')[0]; 
                setNombreUsuario(parteNombre.charAt(0).toUpperCase() + parteNombre.slice(1));
                setHandleUsuario("@" + parteNombre);
            }
        } else {
            setEmailUsuario("carlitos@gmail.com"); 
            setNombreUsuario("Carlitos Johnson");
            setHandleUsuario("@carlitos22");
        }
    }, []);

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="px-10 py-8 max-w-4xl mx-auto pb-32">
                
                <p className="text-gray-500 text-sm tracking-[0.2em] font-medium mb-6 uppercase">Tu Perfil & Cuenta</p>

                {/* --- CABECERA --- */}
                <div className="flex justify-between items-start mb-12">
                    <div>
                        {/* Acá inyectamos el nombre y el arroba dinámicos */}
                        <h1 className="text-6xl font-semibold text-white mb-2 tracking-tight">{nombreUsuario}</h1>
                        <p className="text-gray-400 text-lg mb-4">{handleUsuario}</p>
                        <div className="inline-block border border-[#fccb30]/30 px-3 py-1 rounded text-[#fccb30] text-xs font-medium tracking-widest uppercase bg-[#fccb30]/5">
                            Plan Cinéfilo
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-24 h-24 rounded-full bg-[#1c1c1c] flex items-center justify-center text-4xl text-white font-medium border border-white/5 shadow-xl overflow-hidden">
                            {fotoPerfil ? (
                                <img src={fotoPerfil} alt="Perfil" className="w-full h-full object-cover" />
                            ) : (
                                /* Inyecta automáticamente la primera letra de tu nombre */
                                nombreUsuario.charAt(0).toUpperCase()
                            )}
                        </div>
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            ref={fileInputRef} 
                            onChange={handleCambiarFoto} 
                        />
                        <button 
                            onClick={() => fileInputRef.current?.click()} 
                            className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
                        >
                            Cambiar foto
                        </button>
                    </div>
                </div>

                {/* --- ESTADÍSTICAS --- */}
                <div className="flex gap-16 border-b border-white/10 pb-8 mb-10">
                    <div>
                        <p className="text-4xl font-normal text-white mb-1">{stats.peliculas}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Películas Vistas</p>
                    </div>
                    <div>
                        <p className="text-4xl font-normal text-gray-400 mb-1">{stats.esteAnio}</p>
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest">Este Año</p>
                    </div>
                    <div>
                        <p className="text-4xl font-normal text-gray-400 mb-1">{stats.seguidores}</p>
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest">Seguidores</p>
                    </div>
                </div>

                {/* --- CONFIGURACIONES --- */}
                
                <Seccion titulo="Perfil Público">
                    {/* Acá también reemplazamos los textos estáticos por tus variables */}
                    <FilaConfiguracion titulo="Nombre visible" descripcion="Aparece en las salas y en los foros." accion={<span className="text-gray-300 text-sm">{nombreUsuario}</span>} />
                    <FilaConfiguracion titulo="Usuario" descripcion="Tu identificador único en Lumina." accion={<span className="text-gray-300 text-sm">{handleUsuario}</span>} />
                    <FilaConfiguracion titulo="Perfil visible para la comunidad" descripcion="Otros usuarios pueden ver tus ciclos y tus aportes." accion={<Toggle activoInicial={true} />} />
                </Seccion>

                <Seccion titulo="Funciones y Salas">
                    <FilaConfiguracion titulo="Chat en vivo activado por defecto" descripcion="Podés apagarlo en cualquier función sin salir de la sala." accion={<Toggle activoInicial={true} />} />
                    <FilaConfiguracion titulo="Entrar en silencio" descripcion="Ingresás a las salas sin anunciar tu llegada." accion={<Toggle activoInicial={false} />} />
                    <FilaConfiguracion 
                        titulo="Recordatorio antes de la función" 
                        descripcion="Aviso para no llegar tarde a una función agendada." 
                        accion={<SelectorOpciones opciones={["5 minutos antes", "15 minutos antes", "30 minutos antes", "Desactivado"]} seleccionInicial="15 minutos antes" />} 
                    />
                </Seccion>

                <Seccion titulo="Reproducción">
                    <FilaConfiguracion 
                        titulo="Calidad de video" 
                        descripcion="En salas sincronizadas se ajusta según tu conexión." 
                        accion={<SelectorOpciones opciones={["Automática", "Ahorro de datos (720p)", "Full HD (1080p)", "4K (Ultra HD)"]} seleccionInicial="Automática" />} 
                    />
                    <FilaConfiguracion 
                        titulo="Idioma de audio" 
                        descripcion="Preferencia por defecto al abrir una función." 
                        accion={<SelectorOpciones opciones={["Original con subtítulos", "Español Latino", "Español España", "Inglés"]} seleccionInicial="Original con subtítulos" />} 
                    />
                    <FilaConfiguracion 
                        titulo="Subtítulos" 
                        descripcion="Idioma de los subtítulos." 
                        accion={<SelectorOpciones opciones={["Apagados", "Español", "Inglés", "CC (Personas sordas)"]} seleccionInicial="Español" />} 
                    />
                </Seccion>

                <Seccion titulo="Suscripción">
                    <FilaConfiguracion 
                        titulo="Plan Cinéfilo" 
                        descripcion="Salas ilimitadas, salas privadas, 4K y descargas." 
                        accion={
                            <div className="flex items-center gap-3">
                                <span className="text-gray-400 text-sm mr-2">$50.000/ mes</span>
                                <BotonAccion texto="Cambiar plan" onClick={() => router.push('/suscripciones')} />
                                <BotonAccion texto="Cancelar plan" />
                            </div>
                        } 
                    />
                    <FilaConfiguracion titulo="Próxima renovación" descripcion="Se renueva automáticamente." accion={<span className="text-gray-400 text-sm">18 de diciembre de 2026</span>} />
                    <FilaConfiguracion titulo="Método de pago" descripcion="Procesado por una pasarela externa certificada." accion={<div className="flex items-center gap-4"><span className="text-gray-400 text-sm">•••• 4271</span><BotonAccion texto="Actualizar" /></div>} />
                </Seccion>

                <Seccion titulo="Cuenta y Privacidad">
                    <FilaConfiguracion 
                        titulo="Correo electrónico" 
                        descripcion="Se usa para iniciar sesión y recuperar la cuenta." 
                        accion={
                            <div className="flex items-center gap-4">
                                <span className="text-gray-400 text-sm">{emailUsuario}</span>
                                <BotonAccion texto="Cambiar" />
                            </div>
                        } 
                    />
                    <FilaConfiguracion titulo="Contraseña" descripcion="Actualizada hace 2 meses." accion={<div className="flex items-center gap-4"><span className="text-gray-400 text-sm">••••••••</span><BotonAccion texto="Cambiar" /></div>} />
                    <FilaConfiguracion titulo="Descargar mis datos" descripcion="Recibís un archivo con tu actividad en Lumina." accion={<BotonAccion texto="Solicitar" />} />
                </Seccion>

            </div>
        </main>
    );
}