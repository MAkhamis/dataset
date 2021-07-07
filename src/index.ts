const oId = /^[a-f\d]{24}$/i;
function isId(id: any) {
  try {
    return oId.test(id.toString());
  } catch (e) {
    return false;
  }
}
interface Options {
  found: boolean;
  autoIndex: boolean;
}
const isDate = (d: any) =>
  Object.prototype.toString.call(d) === "[object Date]";
export default class DataSet {
  load = function load(data: any[]) {
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
  };
  found = new Set();
  res: any[] = [];
  stores: any[] = [];
  counter: number = 0;
  indexes: any = {};
  db: any[] = [];
  options: Options;

  constructor(
    data: any[],
    options: Options = { found: true, autoIndex: true }
  ) {
    this.options = options;
    if (data) this.db = data;
    if (data && !Array.isArray(data)) {
      console.error("DataSet type must be an array");
      return;
    }
    this.load(data);
  }
  createIndex = function (obj: any, path = "") {
    for (let key in obj) {
      if (typeof obj[key] == "object" && !isId(obj[key]) && !isDate(obj[key])) {
        let p = `${key}`;
        let _obj = obj[key];
        this.createIndex(_obj, path?.length ? `${path}.${p}` : p);
      } else {
        let _path = path?.length ? `${path}.` : "";
        if (this.indexes[`${_path}${key}`]) {
          let k = this.counter;
          let v =
            isId(obj[key]) || isDate(obj[key]) ? obj[key].toString() : obj[key];
          if (this.indexes[`${_path}${key}`][v] != undefined) {
          } else {
            this.indexes[`${_path}${key}`][v] = [];
          }
        } else {
          let k = this.counter;
          let v =
            isId(obj[key]) || isDate(obj[key]) ? obj[key].toString() : obj[key];
          this.indexes[`${_path}${key}`] = {};
          if (this.indexes[`${_path}${key}`][v] != undefined) {
          } else {
            this.indexes[`${_path}${key}`][v] = [];
          }
        }
      }
    }
  };
  index = function (obj: any, path = "") {
    for (let key in obj) {
      if (typeof obj[key] == "object" && !isId(obj[key]) && !isDate(obj[key])) {
        let p = `${key}`;
        let _obj = obj[key];
        this.index(_obj, path?.length ? `${path}.${p}` : p);
      } else {
        let _path = path?.length ? `${path}.` : "";
        if (this.indexes[`${_path}${key}`]) {
          let k = this.counter;
          let v =
            isId(obj[key]) || isDate(obj[key]) ? obj[key].toString() : obj[key];
          if (this.indexes[`${_path}${key}`][v] != undefined) {
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
            if (this.indexes[`${_path}${key}`][v] != undefined) {
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
  };
  find = function (obj: any, path = "") {
    for (let key in obj) {
      if (typeof obj[key] == "object" && !isId(obj[key]) && !isDate(obj[key])) {
        let p = `${key}`;
        let _obj = obj[key];
        this.find(_obj, path?.length ? `${path}.${p}` : p);
      } else {
        let _path = path?.length ? `${path}.` : "";
        if (this.indexes[`${_path}${key}`]) {
          let k = this.counter;
          let v =
            isId(obj[key]) || isDate(obj[key]) ? obj[key].toString() : obj[key];
          if (this.indexes[`${_path}${key}`][v]) {
            this.stores.push(this.indexes[`${_path}${key}`][v]);
          } else {
            this.stores.push([]);
            return;
          }
        } else {
          throw `index not found for key ${_path}${key} `;
          return;
        }
      }
    }
    return;
  };
  intersect = function (arrays = this.stores) {
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
  };
  search = function (arg: any) {
    this.find(arg);
    this.intersect();
    let res: any[] = [];
    this.res.forEach((i: number) => res.push(this.db[i]));
    this.stores = [];
    this.options.found ? this.found.add(...this.res) : 0;
    this.res = [];
    return res;
  };
  whereFound = () => {
    if (!this.options.found)
      throw "choose found:true in options when creating data set to enable whereFound/whereNotFound methods";
    let res: any[] = [];
    this.found.forEach((i: any) => res.push(this.db[i]));
    return res;
  };
  whereNotFound = () => {
    if (!this.options.found)
      throw "choose found:true in options when creating data set to enable whereFound/whereNotFound methods";
    let res: any[] = [];
    let full = new Set(this.db.keys());
    this.found.forEach((i: any) => full.delete(i));
    full.forEach((i) => res.push(this.db[i]));
    return res;
  };
}
