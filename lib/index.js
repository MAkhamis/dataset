const oId = /^[a-f\d]{24}$/i;
function isId(id) {
  try {
    return oId.test(id.toString().replace('ObjectId("', "").replace('"', ""));
  } catch (e) {
    return false;
  }
}
const isDate = (d) => Object.prototype.toString.call(d) === "[object Date]";
export default class DataSet {
  constructor(
    data,
    options = { found: true, autoIndex: true, ignoreUnIndexed: false }
  ) {
    this.load = function load(data) {
      try {
        if (this.loaded) throw `Loading is not permitted after first loading`;
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
        if (data.length) this.loaded = true;
      } catch (e) {
        console.error(e);
        throw e;
      }
    };
    this.found = new Set();
    this.res = [];
    this.stores = [];
    this.counter = 0;
    this.indexes = {};
    this.db = [];
    this.loaded = false;
    /** @method createIndex creates indices based on the keys of the object passed in the first argument (takes only one argument)*/
    /** @param obj The keys of the object passed .*/
    /** @param path internal argument  */
    this.createIndex = function (obj, path = "") {
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
            this.createIndex(
              _obj,
              (path === null || path === void 0 ? void 0 : path.length)
                ? `${path}.${p}`
                : p
            );
          } else {
            let _path = (
              path === null || path === void 0 ? void 0 : path.length
            )
              ? `${path}.`
              : "";
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
    this.index = function (obj, path = "") {
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
            this.index(
              _obj,
              (path === null || path === void 0 ? void 0 : path.length)
                ? `${path}.${p}`
                : p
            );
          } else {
            let _path = (
              path === null || path === void 0 ? void 0 : path.length
            )
              ? `${path}.`
              : "";
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
    this.find = function (obj, path = "") {
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
            this.find(
              _obj,
              (path === null || path === void 0 ? void 0 : path.length)
                ? `${path}.${p}`
                : p
            );
          } else {
            let _path = (
              path === null || path === void 0 ? void 0 : path.length
            )
              ? `${path}.`
              : "";
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
    this.intersect = function (arrays = this.stores) {
      try {
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
      } catch (e) {
        console.error(e);
        throw e;
      }
    };
    /**  @method search searchs for documents with matching keys */
    /**  @param arg object with keys to be matched */
    this.search = function (arg) {
      try {
        this.find(arg);
        this.intersect();
        let res = [];
        this.res.forEach((i) => res.push(this.db[i]));
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
    this.whereFound = () => {
      try {
        if (!this.options.found)
          throw "choose found:true in options when creating data set to enable whereFound/whereNotFound methods";
        let res = [];
        this.found.forEach((i) => res.push(this.db[i]));
        return res;
      } catch (e) {
        console.error(e);
        throw e;
      }
    };
    /**  @method whereNotFound data that was not found in any search before flushing */
    this.whereNotFound = () => {
      try {
        if (!this.options.found)
          throw "choose found:true in options when creating data set to enable whereFound/whereNotFound methods";
        let res = [];
        let full = new Set(this.db.keys());
        this.found.forEach((i) => full.delete(i));
        full.forEach((i) => res.push(this.db[i]));
        return res;
      } catch (e) {
        console.error(e);
        throw e;
      }
    };
    this.flush = () => {
      try {
        this.found = new Set();
        this.res = [];
        this.stores = [];
      } catch (e) {
        console.error(e);
        throw e;
      }
    };
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
}
