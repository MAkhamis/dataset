import mongodb from "mongodb";
import DATA from "./data.js";
import DataSet from "./../lib/index.js";
//DATA.splice(5, DATA.length - 1);
//console.log(DATA);
let ObjectId = mongodb.ObjectId; // Types.ObjectId(d); //d.toString()
console.log("full length", DATA.length);

console.time("loading");

let db = new DataSet([], { found: true, autoIndex: false });
//db.createIndex({ weight: 1, product: { vendor_name: "GM" } });
db.createIndex({
  _id: ObjectId("60e432ac44ed176f20753369"),
  height: 10,
  company_namespace: ["japatest"],
  product: { description: "desc" },
  barcode: 1,
});
db.load(DATA);
console.log("indexes");
console.dir(db.indexes, { depth: 2 });

console.timeEnd("loading");
console.time("searching");
//let res = db.search({ weight: 1, product: { vendor_name: "GM" } });
const used = process.memoryUsage();
for (let key in used) {
  console.log(`${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`);
}
let res2 = db.search({
  // _id: ObjectId("60e432ac44ed176f20753369"),
  height: 10,
  barcode: "054881000468",
  //  company_namespace: ["japatest"],
  //  product: { description: "desc" },
});
console.log(db.found.size);
console.log("not foind", db.whereNotFound().length);
console.timeEnd("searching");
console.log("Res2");
console.dir(res2, { depth: 2 });
