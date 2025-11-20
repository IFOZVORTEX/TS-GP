"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = void 0;
const DataStore_1 = require("../storage/DataStore");
const crypto_1 = require("crypto");
const validate_1 = require("../decorators/validate");
const timestamp_1 = require("../decorators/timestamp");
class TaskManager {
    constructor() {
        this.store = new DataStore_1.DataStore("tasks");
    }
    createTask(task) {
        const newTask = {
            id: (0, crypto_1.randomUUID)(),
            name: task.name,
            description: task.description || "",
            priority: task.priority,
            completed: false,
            created_at: new Date(),
        };
        return this.store.create(newTask);
    }
    getTasks(id) {
        if (id) {
            return this.store.find(id);
        }
        else {
            return this.store.find();
        }
    }
    updateTask(id, updates) {
        return this.store.update(id, updates);
    }
    deleteTask(id) {
        return this.store.delete(id);
    }
}
exports.TaskManager = TaskManager;
__decorate([
    validate_1.validate,
    timestamp_1.timestamp,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], TaskManager.prototype, "createTask", null);
__decorate([
    validate_1.validate,
    timestamp_1.timestamp,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], TaskManager.prototype, "getTasks", null);
__decorate([
    validate_1.validate,
    timestamp_1.timestamp,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Object)
], TaskManager.prototype, "updateTask", null);
__decorate([
    validate_1.validate,
    timestamp_1.timestamp,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Boolean)
], TaskManager.prototype, "deleteTask", null);
exports.default = TaskManager;
//# sourceMappingURL=Task.js.map