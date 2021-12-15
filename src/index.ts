const oId = /^[a-f\d]{24}$/i;
function isId(id: any) {
  try {
    return oId.test(id.toString().replace('ObjectId("', "").replace('"', ""));
  } catch (e) {
    return false;
  }
}
interface Options {
  found?: boolean;
  autoIndex?: boolean;
  ignoreUnIndexed?: boolean;
}
const isDate = (d: any) =>
  Object.prototype.toString.call(d) === "[object Date]";
export default class DataSet {
  load = function load(data: any[]) {
    try {
      if (this.loaded) throw `Loading is not permitted after first loading`;
      this.db = data;
      if (!Array.isArray(data)) {
        console.error("DataSet type must be an array");
        return;
      }
      for (let i: number = 0; i < data.length; i++) {
        this.counter = i;
        let d: any = data[i];
        if (typeof d != "object") {
          console.error("DataSet elements must be objects");
          return;
        }
        this.index(d);
        //   this.data.push(d);
      }
      if (data.length) this.loaded = true;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  found = new Set();
  res: any[] = [];
  stores: any[] = [];
  counter: number = 0;
  indexes: any = {};
  db: any[] = [];
  options: Options;
  loaded: boolean = false;

  constructor(
    data: any[],
    options: Options = { found: true, autoIndex: true, ignoreUnIndexed: false }
  ) {
    try {
      this.options = options;
      if (data) this.db = data;
      if (data && !Array.isArray(data)) {
        console.error("DataSet type must be an array");
        return;
      }
      this.load(data);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  /** @method createIndex creates indices based on the keys of the object passed in the first argument (takes only one argument)*/
  /** @param obj The keys of the object passed .*/
  /** @param path internal argument  */

  createIndex = function (obj: any, path = "") {
    try {
      for (let key in obj) {
        if (
          typeof obj[key] == "object" &&
          obj[key] !== null &&
          !isId(obj[key]) &&
          !isDate(obj[key])
        ) {
          let p = `${key}`;
          let _obj = obj[key];
          this.createIndex(_obj, path?.length ? `${path}.${p}` : p);
        } else {
          let _path = path?.length ? `${path}.` : "";
          if (this.indexes[`${_path}${key}`]) {
            let k = this.counter;
            let v =
              isId(obj[key]) || isDate(obj[key])
                ? obj[key].toString()
                : obj[key];
            if (this.indexes[`${_path}${key}`][v] !== undefined) {
            } else {
              this.indexes[`${_path}${key}`][v] = [];
            }
          } else {
            let k = this.counter;
            let v =
              isId(obj[key]) || isDate(obj[key])
                ? obj[key].toString()
                : obj[key];
            this.indexes[`${_path}${key}`] = {};
            if (this.indexes[`${_path}${key}`][v] !== undefined) {
            } else {
              this.indexes[`${_path}${key}`][v] = [];
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  /**  @method index internal method */
  index = function (obj: any, path = "") {
    try {
      for (let key in obj) {
        if (
          typeof obj[key] == "object" &&
          obj[key] !== null &&
          !isId(obj[key]) &&
          !isDate(obj[key])
        ) {
          let p = `${key}`;
          let _obj = obj[key];
          this.index(_obj, path?.length ? `${path}.${p}` : p);
        } else {
          let _path = path?.length ? `${path}.` : "";
          if (this.indexes[`${_path}${key}`] !== undefined) {
            let k = this.counter;
            let v =
              isId(obj[key]) || isDate(obj[key])
                ? obj[key].toString()
                : obj[key];
            if (this.indexes[`${_path}${key}`][v] !== undefined) {
              this.indexes[`${_path}${key}`][v].push(k);
            } else {
              this.indexes[`${_path}${key}`][v] = [k];
            }
          } else {
            if (this.options.autoIndex) {
              let k = this.counter;
              let v =
                isId(obj[key]) || isDate(obj[key])
                  ? obj[key].toString()
                  : obj[key];
              this.indexes[`${_path}${key}`] = {};
              if (this.indexes[`${_path}${key}`][v] !== undefined) {
                this.indexes[`${_path}${key}`][v].push(k);
              } else {
                this.indexes[`${_path}${key}`][v] = [k];
              }
            } else {
              // throw `As no Auto Indexing is activated , searching on un indexed key ${_path}${key} is not allowed `;
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  /**  @method find internal method */
  find = function (obj: any, path = "") {
    try {
      for (let key in obj) {
        if (
          typeof obj[key] == "object" &&
          obj[key] !== null &&
          !isId(obj[key]) &&
          !isDate(obj[key])
        ) {
          let p = `${key}`;
          let _obj = obj[key];
          this.find(_obj, path?.length ? `${path}.${p}` : p);
        } else {
          let _path = path?.length ? `${path}.` : "";
          if (this.indexes[`${_path}${key}`]) {
            let k = this.counter;
            let v =
              isId(obj[key]) || isDate(obj[key])
                ? obj[key].toString()
                : obj[key];
            if (this.indexes[`${_path}${key}`][v] !== undefined) {
              this.stores.push(this.indexes[`${_path}${key}`][v]);
            } else {
              this.stores.push([]);
              return;
            }
          } else if (!this.options.ignoreUnIndexed) {
            throw `index not found for key ${_path}${key} `;
            return;
          }
        }
      }
      return;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  /**  @method intersect internal method */
  intersect = function (arrays = this.stores) {
    try {
      if (!arrays.length) return [];
      let a = arrays[0];
      this.res = a.filter((value: any) => {
        for (let i = 1; i < arrays.length; i++) {
          let b = arrays[i];
          if (!b.includes(value)) return false;
        }
        return true;
      });
      return;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  /**  @method search searchs for documents with matching keys */
  /**  @param arg object with keys to be matched */
  search = function (arg: any) {
    try {
      this.find(arg);
      this.intersect();
      let res: any[] = [];
      this.res.forEach((i: number) => res.push(this.db[i]));
      this.stores = [];
      this.options.found && this.res.length ? this.found.add(...this.res) : 0;
      this.res = [];
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  /**  @method whereFound data that was not found in any search before flushing */
  whereFound = () => {
    try {
      if (!this.options.found)
        throw "choose found:true in options when creating data set to enable whereFound/whereNotFound methods";
      let res: any[] = [];
      this.found.forEach((i: any) => res.push(this.db[i]));
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  /**  @method whereNotFound data that was not found in any search before flushing */
  whereNotFound = () => {
    try {
      if (!this.options.found)
        throw "choose found:true in options when creating data set to enable whereFound/whereNotFound methods";
      let res: any[] = [];
      let full = new Set(this.db.keys());
      this.found.forEach((i: any) => full.delete(i));
      full.forEach((i) => res.push(this.db[i]));
      return res;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  flush = () => {
    try {
      this.found = new Set();
      this.res = [];
      this.stores = [];
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
}
