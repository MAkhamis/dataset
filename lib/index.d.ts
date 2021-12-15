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
  loaded: boolean;
  constructor(data: any[], options?: Options);
  /** @method createIndex creates indices based on the keys of the object passed in the first argument (takes only one argument)*/
  /** @param obj The keys of the object passed .*/
  /** @param path internal argument  */
  createIndex: (obj: any, path?: string) => void;
  /**  @method index internal method */
  index: (obj: any, path?: string) => void;
  /**  @method find internal method */
  find: (obj: any, path?: string) => void;
  /**  @method intersect internal method */
  intersect: (arrays?: any) => never[] | undefined;
  /**  @method search searchs for documents with matching keys */
  /**  @param arg object with keys to be matched */
  search: (arg: any) => any[];
  /**  @method whereFound data that was not found in any search before flushing */
  whereFound: () => any[];
  /**  @method whereNotFound data that was not found in any search before flushing */
  whereNotFound: () => any[];
  flush: () => void;
}
export {};
