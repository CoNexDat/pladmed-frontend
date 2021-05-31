export function LoginError(message) {
    this.message = message;
}

LoginError.prototype.Message = function () {
    return this.message;
}


export function RegisterError(message) {
    this.message = message;
}

RegisterError.prototype.Message = function () {
    switch (this.message["Type"]) {
        case "ET_INVALID_EMAIL":
            return "Email en formato inválido, o no existe el dominio"
        case "ET_INVALID_PWD":
            return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un caracter especial (!"@#$%^&*()-+?_=,/)';
        case "ET_MISSING_EMAIL":
            return "Falta especificar el email";
        case "ET_MISSING_PWD":
            return "Falta definir la contraseña";
        default:
            return this.message["Error"];
    }
}

export function UserDataError(message) {
    this.message = message;
}

UserDataError.prototype.Message = function () {
    return this.message;
}

export function AllProbesError(message) {
    this.message = message;
}

AllProbesError.prototype.Message = function () {
    return this.message;
}

export function MyProbesError(message) {
    this.message = message;
}

MyProbesError.prototype.Message = function () {
    return this.message;
}

export function CreateProbeError(message) {
    this.message = message;
}

CreateProbeError.prototype.Message = function () {
    return this.message;
}

export function MyOperationsError(message) {
    this.message = message;
}

MyOperationsError.prototype.Message = function () {
    return this.message;
}

export function CreateOperationsError(message) {
    this.message = message;
}

CreateOperationsError.prototype.Message = function () {
    return this.message;
}

export function FindOperationError(message) {
    this.message = message;
}

FindOperationError.prototype.Message = function () {
    return this.message;
}
