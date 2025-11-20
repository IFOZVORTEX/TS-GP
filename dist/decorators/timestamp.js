"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamp = timestamp;
function timestamp(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        const now = new Date().toISOString();
        console.log(`[${now}] Appel de ${propertyKey}()`);
        const result = originalMethod.apply(this, args);
        return result;
    };
    return descriptor;
}
//# sourceMappingURL=timestamp.js.map