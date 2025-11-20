export declare class DataStore<T extends {
    id: string;
}> {
    private filePath;
    private filedir;
    private data;
    constructor(fileName: string);
    private load;
    private save;
    create(item: Omit<T, "id">): T;
    find(id?: string): T | T[];
    update(id: string, datafield: Partial<T>): T | undefined;
    delete(id: string): boolean;
}
//# sourceMappingURL=DataStore.d.ts.map