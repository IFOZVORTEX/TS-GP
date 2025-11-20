export function validate(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;
  const minLength = 2;
  const maxLength = 100;

  descriptor.value = function (...args: any[]) {
    // Validation selon la méthode appelée
    if (propertyKey === "createTask" || propertyKey === "updateTask") {
      const task = args[0];

      if (!task.name || typeof task.name !== "string") {
        throw new Error("Le nom est obligatoire et doit être une chaîne");
      }
      if (
        task.name.trim().length < minLength ||
        task.name.trim().length > maxLength
      ) {
        throw new Error(
          `Le nom doit contenir entre ${minLength} et ${maxLength} caractères`,
        );
      }

      const validPriorities = ["not important", "normal", "very important"];
      if (!task.priority || !validPriorities.includes(task.priority)) {
        throw new Error(`La priorité doit être: ${validPriorities.join(", ")}`);
      }
    }

    if (propertyKey === "deleteTask") {
      const id = args[0];
      if (!id || typeof id !== "string" || id.trim().length === 0) {
        throw new Error("ID invalide");
      }
    }

    return originalMethod.apply(this, args);
  };

  return descriptor;
}
