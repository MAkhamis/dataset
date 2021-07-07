**Usage Examble**
boost json query speed using RAM insted of CPU iterations ....

    import  mongodb  from  "mongodb";

    let  ObjectId = d  =>  mongodb.ObjectId(d);

    let  ISODate = d  =>  Date(d);

    let DATA=  [

    {

    _id:  ObjectId("5e4e712e9c9f17288d6e0b11"),

    uuid:  "",

    name:  "default",

    local_name:  "",

    sku:  "",

    barcode:  "054881000468",

    price:  1350,

    weight:  1,

    length:  0,

    width:  0,

    height:  10,

    position:  0,

    disabled:  false,

    company_namespace: ["gard"],

    product: {

    _id:  ObjectId("5e369b09d4b0fb60e1379575"),

    sub_category: [ObjectId("5e1ecee8e9348574c80813f2")],

    assigned_to: [],

    manufacturer:  "",

    vendor_name:  "GM",

    vendor_part_no:  "",

    mfr_part_no:  "",

    brand:  null,

    barcode:  "054881000468",

    tax:  null,

    description:  "",

    product_img:

    "https://corp-gard.s3.amazonaws.com/image/2020/2/2/4ccb4ba2-498c-42f3-a972-bc4557e80bca.jpeg",

    promotion: [],

    active:  true,

    product_type:  "all",

    sv_tax:  null,

    assigned_media: [],

    uuid:  null,

    modifiers_group: [],

    name:  "ahmad tea premium blend 200 gr",

    category: {

    _id:  ObjectId("5e1ece6335e42053121b4ff3"),

    name:  "cat1",

    type:  "main"

    },

    sku:  "",

    serial_no:  "",

    auditable:  true,

    vat:  0,

    base_price:  1.35,

    prime_cost:  0,

    bottom_price:  0,

    reorder_level:  0,

    units_of_measure: [

    {

    name:  "piece",

    piece:  1,

    _id:  ObjectId("5e369b09d4b0fb60e1379576")

    }

    ],

    price_list: [],

    company_namespace: ["gard"],

    __v:  0,

    createdAt:  ISODate("2020-02-02T09:48:57.928Z"),

    updatedAt:  ISODate("2020-10-11T10:51:03.002Z"),

    measureunit_family:  null,

    channel:  null

    },

    __v:  0,

    createdAt:  ISODate("2020-02-20T11:44:46.404Z"),

    updatedAt:  ISODate("2020-02-20T11:44:46.404Z")

    },

    {

    _id:  ObjectId("5e4e71319c9f17288d6e0b34"),

    uuid:  "",

    name:  "default",

    local_name:  "",

    sku:  "",

    barcode:  "054881005876",

    price:  830,

    weight:  0,

    length:  0,

    width:  0,

    height:  0,

    position:  0,

    disabled:  false,

    company_namespace: ["gard"],

    product: {

    _id:  ObjectId("5e369b09d4b0fb60e1379587"),

    sub_category: [ObjectId("5e1ecee8e9348574c80813f2")],

    assigned_to: [],

    manufacturer:  "",

    vendor_name:  "GM",

    vendor_part_no:  "",

    mfr_part_no:  "",

    brand:  null,

    barcode:  "054881005876",

    tax:  null,

    description:  "",

    product_img:

    "https://corp-gard.s3.amazonaws.com/image/2020/2/2/ab3163c3-17a6-4432-9717-a2df31ac0b01.jpeg",

    promotion: [],

    active:  true,

    product_type:  "all",

    sv_tax:  null,

    assigned_media: [],

    uuid:  null,

    modifiers_group: [],

    name:  "Ahmad Tea London Cardamon Tea 25 Bag",

    category:  ObjectId("5e1ece6335e42053121b4ff3"),

    sku:  "",

    serial_no:  "",

    auditable:  true,

    vat:  0,

    base_price:  0.83,

    prime_cost:  0,

    bottom_price:  0,

    reorder_level:  0,

    units_of_measure: [

    {

    name:  "piece",

    piece:  1,

    _id:  ObjectId("5e369b09d4b0fb60e1379588")

    }

    ],

    price_list: [],

    company_namespace: ["gard"],

    __v:  0,

    createdAt:  ISODate("2020-02-02T09:48:57.929Z"),

    updatedAt:  ISODate("2020-10-11T10:51:03.002Z"),

    measureunit_family:  null,

    channel:  null

    },

    __v:  0,

    createdAt:  ISODate("2020-02-20T11:44:49.561Z"),

    updatedAt:  ISODate("2020-02-20T11:44:49.561Z")

    },

    {

    _id:  ObjectId("5e4e71489c9f17288d6e0c23"),

    uuid:  "",

    name:  "default",

    local_name:  "",

    sku:  "",

    barcode:  "8434165503557",

    price:  1260,

    weight:  0,

    length:  0,

    width:  0,

    height:  0,

    position:  0,

    disabled:  false,

    company_namespace: ["gard"],

    product: {

    _id:  ObjectId("5e369b09d4b0fb60e1379751"),

    sub_category: [ObjectId("5e1ecee8e9348574c80813e3")],

    assigned_to: [],

    manufacturer:  "",

    vendor_name:  "",

    vendor_part_no:  "",

    mfr_part_no:  "",

    brand:  null,

    barcode:  "8434165503557",

    tax:  ObjectId("5e1ec75064b38574f1538a12"),

    description:  "",

    product_img:

    "https://corp-gard.s3.amazonaws.com/image/2020/2/2/6f48f8d2-72cc-4e10-b40d-f2e3606e534b.jpeg",

    promotion: [],

    active:  true,

    product_type:  "all",

    sv_tax:  null,

    assigned_media: [],

    uuid:  null,

    modifiers_group: [],

    name:  "Cuetara choco flakes 150gr in 3packs *12",

    category:  ObjectId("5e1ece6335e42053121b4ffd"),

    sku:  "",

    serial_no:  "",

    auditable:  true,

    vat:  0,

    base_price:  1.26,

    prime_cost:  0,

    bottom_price:  0,

    reorder_level:  0,

    units_of_measure: [

    {

    name:  "piece",

    piece:  1,

    _id:  ObjectId("5e369b09d4b0fb60e1379752")

    }

    ],

    price_list: [],

    company_namespace: ["gard"],

    __v:  0,

    createdAt:  ISODate("2020-02-02T09:48:57.952Z"),

    updatedAt:  ISODate("2020-10-11T10:51:03.002Z"),

    measureunit_family:  null,

    channel:  null

    },

    __v:  0,

    createdAt:  ISODate("2020-02-20T11:45:12.077Z"),

    updatedAt:  ISODate("2020-02-20T11:45:12.077Z")

    },

    {

    _id:  ObjectId("5e4e71499c9f17288d6e0c35"),

    uuid:  "",

    name:  "default",

    local_name:  "",

    sku:  "",

    barcode:  "8434165450493",

    price:  1080,

    weight:  0,

    length:  0,

    width:  0,

    height:  0,

    position:  0,

    disabled:  false,

    company_namespace: ["gard"],

    product: {

    _id:  ObjectId("5e369b09d4b0fb60e1379735"),

    sub_category: [ObjectId("5e1ecee8e9348574c80813e3")],

    assigned_to: [],

    manufacturer:  "",

    vendor_name:  "",

    vendor_part_no:  "",

    mfr_part_no:  "",

    brand:  null,

    barcode:  "8434165450493",

    tax:  ObjectId("5e1ec75064b38574f1538a12"),

    description:  "",

    product_img:

    "https://corp-gard.s3.amazonaws.com/image/2020/2/2/35b3d719-3ed1-49ab-88d1-7b3234476f43.jpeg",

    promotion: [],

    active:  true,

    product_type:  "all",

    sv_tax:  null,

    assigned_media: [],

    uuid:  null,

    modifiers_group: [],

    name:  "Cuetara Digesta 200gr*12",

    category:  ObjectId("5e1ece6335e42053121b4ffd"),

    sku:  "",

    serial_no:  "",

    auditable:  true,

    vat:  0,

    base_price:  1.08,

    prime_cost:  0,

    bottom_price:  0,

    reorder_level:  0,

    units_of_measure: [

    {

    name:  "piece",

    piece:  1,

    _id:  ObjectId("5e369b09d4b0fb60e1379736")

    }

    ],

    price_list: [],

    company_namespace: ["gard"],

    __v:  0,

    createdAt:  ISODate("2020-02-02T09:48:57.951Z"),

    updatedAt:  ISODate("2020-10-11T10:51:03.002Z"),

    measureunit_family:  null,

    channel:  null

    },

    __v:  0,

    createdAt:  ISODate("2020-02-20T11:45:13.636Z"),

    updatedAt:  ISODate("2020-02-20T11:45:13.636Z")

    }

    ];




    import  DataSet  from  "data-set-query";
    let  db = new  DataSet([], { found:  true, autoIndex:  false });
    db.createIndex({

    _id:  ObjectId("60e432ac44ed176f20753369"),

    height:  10,

    company_namespace: ["japatest"],

    product: { description:  "desc" },

    barcode:  1

    });

    db.load(DATA);

    let res = db.search({ weight: 1, product: { vendor_name: "GM" } });
    let  res2 = db.search({

    // _id: ObjectId("60e432ac44ed176f20753369"),

    height:  10,

    barcode:  "054881000468"

    // company_namespace: ["japatest"],

    // product: { description: "desc" },

    });
