export function timestamp(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const now = new Date().toISOString();
    console.log(`[${now}] Appel de ${propertyKey}()`);

    const result = originalMethod.apply(this, args);

    return result;
  };

  return descriptor;
}
