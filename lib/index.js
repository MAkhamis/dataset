const oId = /^[a-f\d]{24}$/i;
function isId(id) {
  try {
    return oId.test(id.toString());
  } catch (e) {
    return false;
  }
}
const isDate = (d) => Object.prototype.toString.call(d) === "[object Date]";
export default class DataSet {
  constructor(data, options = { found: true, autoIndex: true }) {
    this.load = function load(data) {
      this.db = data;
      if (!Array.isArray(data)) {
        console.error("DataSet type must be an array");
        return;
      }
      for (let i = 0; i < data.length; i++) {
        this.counter = i;
        let d = data[i];
        if (typeof d != "object") {
          console.error("DataSet elements must be objects");
          return;
        }
        this.index(d);
        //   this.data.push(d);
      }
    };
    this.found = new Set();
    this.res = [];
    this.stores = [];
    this.counter = 0;
    this.indexes = {};
    this.db = [];
    this.options = { found: true, autoIndex: true };
    this.createIndex = function (obj, path = "") {
      for (let key in obj) {
        if (
          typeof obj[key] == "object" &&
          !isId(obj[key]) &&
          !isDate(obj[key])
        ) {
          let p = `${key}`;
          let _obj = obj[key];
          this.createIndex(
            _obj,
            (path === null || path === void 0 ? void 0 : path.length)
              ? `${path}.${p}`
              : p
          );
        } else {
          let _path = (path === null || path === void 0 ? void 0 : path.length)
            ? `${path}.`
            : "";
          if (this.indexes[`${_path}${key}`]) {
            let k = this.counter;
            let v =
              isId(obj[key]) || isDate(obj[key])
                ? obj[key].toString()
                : obj[key];
            if (this.indexes[`${_path}${key}`][v] != undefined) {
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
            if (this.indexes[`${_path}${key}`][v] != undefined) {
            } else {
              this.indexes[`${_path}${key}`][v] = [];
            }
          }
        }
      }
    };
    this.index = function (obj, path = "") {
      for (let key in obj) {
        if (
          typeof obj[key] == "object" &&
          !isId(obj[key]) &&
          !isDate(obj[key])
        ) {
          let p = `${key}`;
          let _obj = obj[key];
          this.index(
            _obj,
            (path === null || path === void 0 ? void 0 : path.length)
              ? `${path}.${p}`
              : p
          );
        } else {
          let _path = (path === null || path === void 0 ? void 0 : path.length)
            ? `${path}.`
            : "";
          if (this.indexes[`${_path}${key}`]) {
            let k = this.counter;
            let v =
              isId(obj[key]) || isDate(obj[key])
                ? obj[key].toString()
                : obj[key];
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
    this.find = function (obj, path = "") {
      for (let key in obj) {
        if (
          typeof obj[key] == "object" &&
          !isId(obj[key]) &&
          !isDate(obj[key])
        ) {
          let p = `${key}`;
          let _obj = obj[key];
          this.find(
            _obj,
            (path === null || path === void 0 ? void 0 : path.length)
              ? `${path}.${p}`
              : p
          );
        } else {
          let _path = (path === null || path === void 0 ? void 0 : path.length)
            ? `${path}.`
            : "";
          if (this.indexes[`${_path}${key}`]) {
            let k = this.counter;
            let v =
              isId(obj[key]) || isDate(obj[key])
                ? obj[key].toString()
                : obj[key];
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
    this.intersect = function (arrays = this.stores) {
      if (!arrays.length) return [];
      let a = arrays[0];
      this.res = a.filter((value) => {
        for (let i = 1; i < arrays.length; i++) {
          let b = arrays[i];
          if (!b.includes(value)) return false;
        }
        return true;
      });
      return;
    };
    this.search = function (arg) {
      this.find(arg);
      this.intersect();
      let res = [];
      this.res.forEach((i) => res.push(this.db[i]));
      this.stores = [];
      this.options.found ? this.found.add(...this.res) : 0;
      this.res = [];
      return res;
    };
    this.whereFound = () => {
      if (!this.options.found)
        throw "chosse found:true in options when creating data set to enable whereFound/whereNotFound methods";
      let res = [];
      this.found.forEach((i) => res.push(this.db[i]));
      return res;
    };
    this.whereNotFound = () => {
      let res = [];
      let full = new Set(this.db.keys());
      this.found.forEach((i) => full.delete(i));
      full.forEach((i) => res.push(this.db[i]));
      return res;
    };
    options = options;
    if (data) this.db = data;
    if (data && !Array.isArray(data)) {
      console.error("DataSet type must be an array");
      return;
    }
    this.load(data);
  }
}
