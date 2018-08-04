export declare class DocSets {
    private static gList;
    private static gTitle;
    static add(content: any, file: string): void;
    static loadList(file?: string): Promise<void>;
    static get(lib?: string, id?: number | string): any;
    private static loadIndexSet;
    static title(): string;
}
