"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStore = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = require("crypto");
class DataStore {
    constructor(fileName) {
        this.filedir = "../data/";
        this.filePath = path_1.default.join(__dirname, `${this.filedir}${fileName}.json`);
        this.data = this.load();
    }
    load() {
        if (!fs_1.default.existsSync(this.filedir)) {
            fs_1.default.mkdirSync(this.filedir);
        }
        if (!fs_1.default.existsSync(this.filePath)) {
            fs_1.default.writeFileSync(this.filePath, "[]", "utf8");
        }
        let dataList = [];
        try {
            const data = fs_1.default.readFileSync(this.filePath, "utf8");
            dataList = JSON.parse(data);
        }
        catch (err) {
            console.log("Error reading file:", err);
            dataList = [];
        }
        return dataList;
    }
    save() {
        let taskListJson = JSON.stringify(this.data);
        fs_1.default.writeFile(this.filePath, taskListJson, (err) => {
            if (err) {
                console.log("Error writing file:", err);
            }
            else {
                console.log("Successfully wrote file");
            }
        });
    }
    create(item) {
        const newItem = Object.assign(Object.assign({}, item), { id: (0, crypto_1.randomUUID)() });
        this.data.push(newItem);
        this.save();
        return newItem;
    }
    find(id) {
        if (typeof id === "undefined") {
            return this.data;
        }
        const tasks = [];
        if (this.data.find((data) => data.id === id) === undefined) {
            return [];
        }
        else {
            tasks.push(this.data.find((data) => data.id === id));
            return tasks;
        }
    }
    update(id, datafield) {
        const index = this.data.findIndex((item) => item.id === id);
        if (index === -1) {
            return undefined;
        }
        // Met à jour l'objet en fusionnant les champs
        this.data[index] = Object.assign(Object.assign({}, this.data[index]), datafield);
        return this.data[index]; // Retourne l'objet mis à jour
    }
    delete(id) {
        const index = this.data.findIndex((data) => data.id === id);
        if (index !== -1) {
            this.data.splice(index, 1);
            this.save();
            return true;
        }
        return false;
    }
}
exports.DataStore = DataStore;
//# sourceMappingURL=DataStore.js.map