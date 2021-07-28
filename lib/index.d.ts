interface Options {
    found?: boolean;
    autoIndex?: boolean;
    ignoreUnIndexed?: boolean;
}
export default class DataSet {
    load: (data: any[]) => void;
    found: Set<unknown>;
    res: any[];
    stores: any[];
    counter: number;
    indexes: any;
    db: any[];
    options: Options;
    constructor(data: any[], options?: Options);
    createIndex: (obj: any, path?: string) => void;
    index: (obj: any, path?: string) => void;
    find: (obj: any, path?: string) => void;
    intersect: (arrays?: any) => never[] | undefined;
    search: (arg: any) => any[];
    whereFound: () => any[];
    whereNotFound: () => any[];
}
export {};
