export function errorNombreUsuario(valor) {
if (!/^[A-Za-z0-9_]{3,30}$/.test(valor)) {
    return "Usá de 3 a 30 caracteres: letras, números o guion bajo.";
}
}

export function errorEmail(valor) {
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor) || valor.length > 255) {
    return "Ingresá un email válido.";
}
}

export function errorPassword(valor) {
if (valor.length < 8 || valor.length > 72) {
    return "La contraseña debe tener entre 8 y 72 caracteres.";
}
}