"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BotonVolver from "@/components/BotonVolver";

export default function MetodoDePagoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planSeleccionado = searchParams.get("plan") || "Plan Cinéfilo";
  const precioSeleccionado = searchParams.get("precio") || "$50.000";

  const [metodo, setMetodo] = useState<"tarjeta" | "mercadopago" | "transferencia">("tarjeta");
  const [procesando, setProcesando] = useState(false);
  const [pagado, setPagado] = useState(false);

  // Campos de tarjeta
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [nombreTitular, setNombreTitular] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePagar = (e: React.FormEvent) => {
    e.preventDefault();
    setProcesando(true);

    setTimeout(() => {
      setProcesando(false);
      setPagado(true);
      // Guardamos en localStorage la actualización de método de pago y plan
      localStorage.setItem("lumina_plan_activo", planSeleccionado);
      localStorage.setItem("lumina_metodo_pago", metodo === "tarjeta" ? `Visa •••• ${numeroTarjeta.slice(-4) || "4271"}` : "Mercado Pago / Transferencia");
    }, 2000);
  };

  if (pagado) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
        <div className="bg-[#141414] border border-white/10 p-8 rounded-2xl max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-[#fccb30]/10 border border-[#fccb30]/30 text-[#fccb30] rounded-full flex items-center justify-center mx-auto text-3xl">
            ✓
          </div>
          <h1 className="text-2xl font-bold">¡Pago procesado con éxito!</h1>
          <p className="text-sm text-gray-400">
            Tu suscripción a <strong className="text-white">{planSeleccionado}</strong> se activó correctamente. Ya podés disfrutar de todo el contenido.
          </p>
          <button
            onClick={() => router.push("/CuentaPerfil")}
            className="w-full bg-[#fccb30] text-black font-semibold py-3 rounded-xl text-xs uppercase tracking-wider hover:brightness-110 transition"
          >
            Volver a mi cuenta
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-12 pb-32">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <BotonVolver />

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finalizar Suscripción y Pago</h1>
          <p className="text-sm text-gray-400 mt-1">Ingresá tus datos de pago de forma segura.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-8">
          
          {/* FORMULARIO DE PAGO */}
          <form onSubmit={handlePagar} className="space-y-6">
            
            {/* Selección de medio de pago */}
            <div className="bg-[#141414] border border-white/10 p-6 rounded-2xl space-y-4">
              <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Seleccioná medio de pago</h2>
              
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setMetodo("tarjeta")}
                  className={`p-4 rounded-xl border text-xs font-medium uppercase tracking-wider transition cursor-pointer flex flex-col items-center gap-2 ${
                    metodo === "tarjeta" ? "border-[#fccb30] bg-[#fccb30]/10 text-[#fccb30]" : "border-white/10 bg-black/40 text-gray-400 hover:border-white/30"
                  }`}
                >
                  💳 Tarjeta
                </button>
                <button
                  type="button"
                  onClick={() => setMetodo("mercadopago")}
                  className={`p-4 rounded-xl border text-xs font-medium uppercase tracking-wider transition cursor-pointer flex flex-col items-center gap-2 ${
                    metodo === "mercadopago" ? "border-[#fccb30] bg-[#fccb30]/10 text-[#fccb30]" : "border-white/10 bg-black/40 text-gray-400 hover:border-white/30"
                  }`}
                >
                  📱 Mercado Pago
                </button>
                <button
                  type="button"
                  onClick={() => setMetodo("transferencia")}
                  className={`p-4 rounded-xl border text-xs font-medium uppercase tracking-wider transition cursor-pointer flex flex-col items-center gap-2 ${
                    metodo === "transferencia" ? "border-[#fccb30] bg-[#fccb30]/10 text-[#fccb30]" : "border-white/10 bg-black/40 text-gray-400 hover:border-white/30"
                  }`}
                >
                  🏦 Transferencia
                </button>
              </div>
            </div>

            {/* Datos de la tarjeta (Si elige tarjeta) */}
            {metodo === "tarjeta" && (
              <div className="bg-[#141414] border border-white/10 p-6 rounded-2xl space-y-4">
                <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Datos de la tarjeta</h2>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Número de tarjeta</label>
                    <input 
                      type="text" 
                      required
                      placeholder="4271 •••• •••• ••••"
                      value={numeroTarjeta}
                      onChange={(e) => setNumeroTarjeta(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#fccb30]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Nombre del titular</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Como figura en la tarjeta"
                      value={nombreTitular}
                      onChange={(e) => setNombreTitular(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#fccb30]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Vencimiento</label>
                      <input 
                        type="text" 
                        required
                        placeholder="MM/AA"
                        value={vencimiento}
                        onChange={(e) => setVencimiento(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#fccb30]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">CVV</label>
                      <input 
                        type="password" 
                        required
                        placeholder="123"
                        maxLength={4}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#fccb30]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {metodo === "mercadopago" && (
              <div className="bg-[#141414] border border-white/10 p-6 rounded-2xl text-center space-y-4">
                <p className="text-sm text-gray-300">Al hacer clic en pagar, te redirigiremos de forma segura a Mercado Pago para escanear el código QR o autorizar el cobro.</p>
              </div>
            )}

            {metodo === "transferencia" && (
              <div className="bg-[#141414] border border-white/10 p-6 rounded-2xl space-y-2 text-sm text-gray-300">
                <p className="font-semibold text-white mb-2">Datos bancarios (CBU / Alias):</p>
                <p>CVU: <code className="text-[#fccb30]">0000003100028475928173</code></p>
                <p>Alias: <code className="text-[#fccb30]">LUMINA.CINE.MP</code></p>
                <p className="text-xs text-gray-500 mt-2">La acreditación puede demorar hasta 2 horas hábiles.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={procesando}
              className="w-full bg-[#fccb30] text-black font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider hover:brightness-110 transition cursor-pointer disabled:opacity-50"
            >
              {procesando ? "Procesando pago seguro..." : `Confirmar y pagar ${precioSeleccionado}`}
            </button>
          </form>

          {/* RESUMEN DEL PEDIDO */}
          <div className="bg-[#141414] border border-white/10 p-6 rounded-2xl h-fit space-y-6">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 font-semibold border-b border-white/10 pb-3">Resumen de compra</h2>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Plan seleccionado</span>
              <span className="font-semibold text-white">{planSeleccionado}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Facturación</span>
              <span className="text-gray-400">Mensual</span>
            </div>

            <div className="border-t border-white/10 pt-4 flex justify-between items-center">
              <span className="font-bold text-white">Total a pagar</span>
              <span className="text-xl font-bold text-[#fccb30]">{precioSeleccionado}</span>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}