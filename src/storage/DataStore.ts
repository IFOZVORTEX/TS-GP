import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

export class DataStore<T extends { id: string }> {
  private filePath: string;
  private filedir: string;
  private data: T[];

  constructor(fileName: string) {
    this.filedir = "../data/";
    this.filePath = path.join(__dirname, `${this.filedir}${fileName}.json`);
    this.data = this.load();
  }

  private load(): T[] {
    if (!fs.existsSync(this.filedir)) {
      fs.mkdirSync(this.filedir);
    }
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, "[]", "utf8");
    }
    let dataList: T[] = [];
    try {
      const data = fs.readFileSync(this.filePath, "utf8");
      dataList = JSON.parse(data);
    } catch (err) {
      console.log("Error reading file:", err);
      dataList = [];
    }
    return dataList;
  }

  private save(): void {
    let taskListJson = JSON.stringify(this.data);
    fs.writeFile(this.filePath, taskListJson, (err) => {
      if (err) {
        console.log("Error writing file:", err);
      } else {
        console.log("Successfully wrote file");
      }
    });
  }

  create(item: Omit<T, "id">): T {
    const newItem = { ...item, id: randomUUID() } as T;
    this.data.push(newItem);
    this.save();
    return newItem;
  }

  find(id?: string): T | T[] {
    if (typeof id === "undefined") {
      return this.data;
    }
    const tasks: T[] = [];
    if (this.data.find((data) => data.id === id) === undefined) {
      return [];
    } else {
      tasks.push(this.data.find((data) => data.id === id) as T);
      return tasks;
    }
  }

  update(id: string, datafield: Partial<T>): T | undefined {
    const index = this.data.findIndex((item) => item.id === id);

    if (index === -1) {
      return undefined;
    }

    // Met à jour l'objet en fusionnant les champs
    this.data[index] = {
      ...this.data[index],
      ...datafield,
    };

    return this.data[index]; // Retourne l'objet mis à jour
  }

  delete(id: string): boolean {
    const index = this.data.findIndex((data) => data.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      this.save();
      return true;
    }
    return false;
  }
}
