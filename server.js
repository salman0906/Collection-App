const express = require("express");
const bodyParser = require("body-parser");
var iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
const app = express();
global.code = "";
app.set("view engine", "ejs");
let ejs = require("ejs");
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");
tdate = new Date();
ACCOUNT_SID = "ACac4b0eeaa5f41eeffacba00f9d8fbedf";
AUTH_TOKEN = "69213db7f2d597d9536fc6759932e4f3";
SERVICE_SID = "ISd191298ae8d8d252cf187baef8b7c069";
const client = require("twilio")(ACCOUNT_SID, AUTH_TOKEN);
mongoose.connect(
  "mongodb+srv://admin-magus:1306@collections.rgdh6.mongodb.net/cash",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
function dte(a) {
  if (a != null && a != "") {
    var date =
      String(a.getDate()).length == 1
        ? "0" + String(a.getDate())
        : String(a.getDate());
    var mon =
      String(a.getMonth() + 1).length == 1
        ? "0" + String(a.getMonth() + 1)
        : String(a.getMonth() + 1);
    return date + "/" + mon + "/" + String(a.getFullYear());
  } else {
    var date =
      String(tdate.getDate()).length == 1
        ? "0" + String(tdate.getDate())
        : String(tdate.getDate());
    var mon =
      String(tdate.getMonth() + 1).length == 1
        ? "0" + String(tdate.getMonth() + 1)
        : String(tdate.getMonth() + 1);
    return date + "/" + mon + "/" + String(tdate.getFullYear());
  }
}
const assignSchema = new mongoose.Schema({
  Name: String,
  Type: String,
  Bname: String,
  code: String,
});

const beatSchema = new mongoose.Schema({
  Beatname: String,
  Shopname: String,
  Phone: String,
  code: String,
  b1: String,
  b2: String,
  b3: String,
  b4: String,
  b5: String,
  d1: String,
  d2: String,
  d3: String,
  d4: String,
  d5: String,
  a1: String,
  a2: String,
  a3: String,
  a4: String,
  a5: String,
});

const discountSchema = new mongoose.Schema({
  Beatname: String,
  Shopname: String,
  amt: String,
  code: String,
  date: String,
});

const tempschema = new mongoose.Schema({
  Beatname: String,
  Shopname: String,
  code: String,
  billn: String,
  amt: String,
});

const collSchema = new mongoose.Schema({
  date: String,
  Shopname: String,
  Beatname: String,
  amt: String,
  code: String,
});

const createrSchema = new mongoose.Schema({
  Company: String,
  gst: String,
  phone: String,
  username: String,
  psw: String,
  Address: String,
  email: String,
  code: String,
  state: String,
  pan: String,
  sac: String,
  cin: String,
  cst: String,
});

const saleSchema = new mongoose.Schema({
  Name: String,
  Uname: String,
  Phone: String,
  psw: String,
  code: String,
});

const Sale = mongoose.model("Sale", saleSchema);

const Collection = mongoose.model("Collection", collSchema);

const Creater = mongoose.model("Creater", createrSchema);

function de(s) {
  if (s == "") {
    return dte(null);
  }
  var y = s.slice(0, 4);
  var m = s.slice(5, 7);
  var d = s.slice(8, 10);
  return d + "/" + m + "/" + y;
}
function ed(s) {
  var y = s.slice(6, 10);
  var m = s.slice(3, 5);
  var d = s.slice(0, 2);
  return y + "-" + m + "-" + d;
}
const Beat = mongoose.model("Beat", beatSchema);

const Assign = mongoose.model("Assign", assignSchema);

function sendBulkMessages(messageBody, numberList) {
  var numbers = [];
  for (i = 0; i < numberList.length; i++) {
    numbers.push(
      JSON.stringify({
        binding_type: "sms",
        address: numberList[i],
      })
    );
  }

  const notificationOpts = {
    toBinding: numbers,
    body: messageBody,
  };

  client.notify
    .services(SERVICE_SID)
    .notifications.create(notificationOpts)
    .then((notification) => console.log(notification.sid))
    .catch((error) => console.log(error));
}

const Temp = mongoose.model("Temp", tempschema);

const Discount = mongoose.model("Discount", discountSchema);

global.un = "";
global.psw = "";
global.shop = "";
global.beat = "";
global.ph = "";
global.a11 = "";
global.a22 = "";
global.a33 = "";
global.a44 = "";
global.a55 = "";
global.b11 = "";
global.b22 = "";
global.b33 = "";
global.b44 = "";
global.b55 = "";
global.d11 = "";
global.d22 = "";
global.d33 = "";
global.d55 = "";
global.d44 = "";
global.cname = "";
global.gst = "";
global.cpno = "";
global.cemail = "";
global.address = "";
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/slogin.html");
});
app.post("/", function (req, res) {
  global.code = req.body.code;
  global.un = req.body.uname;
  global.psw = req.body.psw;
  Creater.find({ code: req.body.code }, function (err, admin) {
    admin.forEach(function (admins) {
      if (admins != null) {
        global.cname = admins.Company;
        global.gst = admins.gst;
        global.cpno = admins.phone;
        global.cemail = admins.email;
        global.address = admins.Address;
        global.code = admins.code;
        res.redirect("/process");
      } else {
        res.sendFile(__dirname + "/invalid.html");
      }
    });
  });
});
app.get("/process", function (req, res) {
  Sale.find({ code: global.code, Uname: global.un }, function (err, sales) {
    sales.forEach(function (sale) {
      if (sale != null && sale.psw == global.psw) {
        var name = sale.Name;
        Assign.find({ code: global.code, Name: name }, function (err, assigns) {
          assigns.forEach(function (assign) {
            global.name = sale.Name;
            global.beat = assign.Bname;
            global.type = assign.Type;
            if (assign.Type == "salesman") {
              res.redirect("/salesapp");
            } else {
              res.redirect("/delivery");
            }
          });
        });
      } else {
        res.sendFile(__dirname + "/invalid.html");
      }
    });
  });
});
app.get("/salesapp", function (req, res) {
  Assign.find(
    { code: global.code, Name: global.name },
    function (err, assigns) {
      assigns.forEach(function (assign) {
        global.beat = assign.Bname;
      });
    }
  );
  Beat.find({ code: global.code }, function (err, beats) {
    var a = [],
      ss = [],
      p = [],
      s = "";
    beats.forEach(function (beat) {
      a = 0;
      p = [];
      s = "";
      if (global.beat == beat.Beatname) {
        if (beat.a2 == "0") {
          c = 1;
          a = beat.a1;
        } else if (beat.a3 == "0") {
          c = 2;
          a = beat.a1 + beat.a2;
        } else if (beat.a4 == "0") {
          c = 3;
          a = beat.a1 + beat.a2 + beat.a3;
        } else if (beat.a5 == "0") {
          c = 4;
          a = beat.a1 + beat.a2 + beat.a3 + beat.a4;
        } else {
          c = 5;
          a = beat.a1 + beat.a2 + beat.a3 + beat.a4 + beat.a5;
        }
        p.push(beat.Phone);
        s =
          "Remainder from " +
          global.cname +
          " : You got " +
          c +
          " number of bills worth Rs." +
          a +
          ". Our Staff will reach you soon. Please arrange for the amount. Thank you";
        sendBulkMessages(s, p);
        ss.push(beat.Shopname);
      }
    });
    ss.sort();
    res.render("salesapp", {
      shops: ss,
      bname: global.beat,
      company: global.cname,
    });
  });
});
app.post("/salesapp", function (req, res) {
  var c,
    b = [],
    a = [],
    d = [];
  global.shop = req.body.shop;
  Beat.find(
    { code: global.code, Shopname: req.body.shop },
    function (err, sales) {
      sales.forEach(function (sale) {
        if (sale.a1 == "0") {
          c = 1;
        } else if (sale.a2 == "0") {
          c = 2;
        } else if (sale.a3 == "0") {
          c = 3;
        } else if (sale.a3 == "0") {
          c = 3;
        } else if (sale.a4 == "0") {
          c = 4;
        } else {
          c = 5;
        }
        b.push(sale.b1);
        b.push(sale.b2);
        b.push(sale.b3);
        b.push(sale.b4);
        b.push(sale.b5);
        a.push(sale.a1);
        a.push(sale.a2);
        a.push(sale.a3);
        a.push(sale.a4);
        a.push(sale.a5);
        d.push(sale.d1);
        d.push(sale.d2);
        d.push(sale.d3);
        d.push(sale.d4);
        d.push(sale.d5);
        res.render("salesapp1", {
          sname: req.body.shop,
          c: c,
          b: b,
          d: d,
          a: a,
          company: global.cname,
        });
      });
    }
  );
});
app.post("/sapp", function (req, res) {
  global.amt = Number(req.body.amt);
  Beat.find(
    { code: global.code, Shopname: global.shop, Beatname: global.beat },
    function (err, shs) {
      shs.forEach(function (sh) {
        global.ph = sh.Phone;
        global.a11 = Number(sh.a1);
        global.a22 = Number(sh.a2);
        global.a33 = Number(sh.a3);
        global.a44 = Number(sh.a4);
        global.a55 = Number(sh.a5);
        global.b11 = sh.b1;
        global.b22 = sh.b2;
        global.b33 = sh.b3;
        global.b44 = sh.b4;
        global.b55 = sh.b5;
        global.d11 = sh.d1;
        global.d22 = sh.d2;
        global.d33 = sh.d3;
        global.d55 = sh.d5;
        global.d44 = sh.d4;
      });
      res.redirect("/sapp2");
    }
  );
});
app.get("/sapp2", function (req, res) {
  if (global.amt < global.a11) {
    global.a11 = global.a11 - global.amt;
  } else {
    global.a11 = global.a11 - global.amt;
    if (global.a11 < 0) {
      global.a22 = global.a22 + global.a11;
      global.a11 = 0;
      if (global.a22 < 0) {
        global.a33 = global.a33 + global.a22;
        global.a22 = 0;
        if (global.a33 < 0) {
          global.a44 = global.a44 + global.a33;
          global.a33 = 0;
          if (global.a44 < 0) {
            global.a55 = global.a55 + global.a44;
          }
        }
      }
    }
  }
  while (global.a11 == 0) {
    global.a11 = global.a22;
    global.d11 = global.d22;
    global.b11 = global.b22;
    global.a22 = global.a33;
    global.d22 = global.d33;
    global.b22 = global.b33;
    global.a33 = global.a44;
    global.d33 = global.d44;
    global.b33 = global.b44;
    global.a44 = global.a55;
    global.d44 = global.d55;
    global.b44 = global.b55;
    global.a55 = 0;
  }
  Beat.findOne(
    { Shopname: global.shop, Beatname: global.beat },
    function (err, bb) {
      bb.remove();
    }
  );
  res.redirect("/sapp1");
});
app.get("/sapp1", function (req, res) {
  const beat = new Beat({
    code: global.code,
    Beatname: global.beat,
    Shopname: global.shop,
    Phone: String(global.ph),
    b1: String(global.b11),
    b2: String(global.b22),
    b3: String(global.b33),
    b4: String(global.b44),
    b5: String(global.b55),
    d1: String(global.d11),
    d2: String(global.d22),
    d3: String(global.d33),
    d4: String(global.d44),
    d5: String(global.d55),
    a1: String(global.a11),
    a2: String(global.a22),
    a3: String(global.a33),
    a4: String(global.a44),
    a5: String(global.a55),
  });
  beat.save();
  var a =
    "Recieved Sum of Rs." +
    global.amt.toString() +
    " on " +
    dte(null) +
    " to " +
    global.name +
    " against bills in " +
    global.cname +
    ". Outstanding Amount: " +
    (global.a11 + global.a22 + global.a33 + global.a44 + global.a55);
  var p = [];
  p.push("+91" + global.ph);
  sendBulkMessages(a, p);
  const collection = new Collection({
    code: global.code,
    Beatname: global.beat,
    date: dte(null),
    Shopname: global.shop,
    amt: global.amt,
  });
  collection.save();
  res.redirect("/salesapp");
});
app.get("/delivery", function (req, res) {
  var ss = [];
  Temp.find(
    { code: global.code, Beatname: global.beat },
    function (err, temps) {
      temps.forEach(function (temp) {
        ss.push(temp.Shopname);
      });
      ss.sort();
      res.render("delapp", {
        shops: ss,
        bname: global.beat,
        company: global.cname,
      });
    }
  );
});
app.post("/delivery1", function (req, res) {
  global.shop = req.body.shop;
  Temp.find(
    { code: global.code, Shopname: req.body.shop, Beatname: global.beat },
    function (err, temps) {
      temps.forEach(function (temp) {
        global.b111 = temp.billn;
        global.amt = Number(temp.amt);
        res.render("delnote1", {
          b: global.b111,
          a: global.amt,
          sname: global.shop,
          company: global.cname,
        });
      });
    }
  );
});
app.post("/delivery2", function (req, res) {
  Temp.findOne(
    { code: global.code, Shopname: global.shop, Beatname: global.beat },
    function (err, tt) {
      tt.remove();
    }
  );
  Beat.find(
    { code: global.code, Shopname: global.shop, Beatname: global.beat },
    function (err, beats) {
      beats.forEach(function (beat) {
        global.a11 = Number(beat.a1);
        global.a22 = Number(beat.a2);
        global.a33 = Number(beat.a3);
        global.a44 = Number(beat.a4);
        global.a55 = Number(beat.a5);
        global.b11 = beat.b1;
        global.b22 = beat.b2;
        global.b33 = beat.b3;
        global.b44 = beat.b4;
        global.b55 = beat.b5;
        global.d11 = beat.d1;
        global.d22 = beat.d2;
        global.d33 = beat.d3;
        global.d44 = beat.d4;
        global.d55 = beat.d5;
        global.ph = beat.Phone;
      });
      if (req.body.status == "returned") {
        res.redirect("/ret");
      } else {
        res.redirect("/delivery3");
      }
    }
  );
});
app.get("/ret", function (req, res) {
  const retur = new Return({
    code: global.code,
    shop: global.shop,
    billn: global.b111,
    date: dte(null),
    amt: global.amt,
  });
  retur.save();
  res.redirect("/delivery4");
});
app.get("/delivery4", function (req, res) {
  var c,
    b = [],
    a = [],
    d = [];
  Beat.find(
    { code: global.code, Shopname: global.shop },
    function (err, sales) {
      sales.forEach(function (sale) {
        if (sale.a1 == "0") {
          c = 0;
        } else if (sale.a2 == "0") {
          c = 1;
        } else if (sale.a3 == "0") {
          c = 2;
        } else if (sale.a4 == "0") {
          c = 4;
        } else {
          c = 5;
        }
        b.push(sale.b1);
        b.push(sale.b2);
        b.push(sale.b3);
        b.push(sale.b4);
        b.push(sale.b5);
        a.push(sale.a1);
        a.push(sale.a2);
        a.push(sale.a3);
        a.push(sale.a4);
        a.push(sale.a5);
        d.push(sale.d1);
        d.push(sale.d2);
        d.push(sale.d3);
        d.push(sale.d4);
        d.push(sale.d5);
        console.log(c);
        res.render("delapp1", {
          sname: global.shop,
          c: c,
          b: b,
          d: d,
          a: a,
          bname: global.beat,
          company: global.cname,
        });
      });
    }
  );
});
app.get("/delivery3", function (req, res) {
  if (global.a11 == 0) {
    global.a11 = global.amt;
    global.d11 = dte(null);
    global.b11 = global.b111;
  } else {
    if (global.a22 == 0) {
      global.a22 = global.amt;
      global.d22 = dte(null);
      global.b22 = global.b111;
    } else {
      if (global.a33 == 0) {
        global.a33 = global.amt;
        global.d33 = dte(null);
        global.b33 = global.b111;
      } else {
        if (global.a44 == 0) {
          global.a44 = global.amt;
          global.d44 = dte(null);
          global.b44 = global.b111;
        } else {
          if (global.a55 == 0) {
            global.a55 = global.amt;
            global.d55 = dte(null);
            global.b55 = global.b111;
          }
        }
      }
    }
  }
  Beat.findOne(
    { code: global.code, Shopname: global.shop, Beatname: global.beat },
    function (err, bb) {
      bb.remove();
    }
  );
  const beat = new Beat({
    code: global.code,
    Beatname: global.beat,
    Shopname: global.shop,
    Phone: String(global.ph),
    b1: String(global.b11),
    b2: String(global.b22),
    b3: String(global.b33),
    b4: String(global.b44),
    b5: String(global.b55),
    d1: String(global.d11),
    d2: String(global.d22),
    d3: String(global.d33),
    d4: String(global.d44),
    d5: String(global.d55),
    a1: String(global.a11),
    a2: String(global.a22),
    a3: String(global.a33),
    a4: String(global.a44),
    a5: String(global.a55),
  });
  beat.save();
  res.redirect("/delivery4");
});
app.post("/dapp", function (req, res) {
  global.amt = Number(req.body.amt);
  Beat.find(
    { code: global.code, Shopname: global.shop, Beatname: global.beat },
    function (err, shs) {
      shs.forEach(function (sh) {
        global.ph = sh.Phone;
        global.a11 = Number(sh.a1);
        global.a22 = Number(sh.a2);
        global.a33 = Number(sh.a3);
        global.a44 = Number(sh.a4);
        global.a55 = Number(sh.a5);
        global.b11 = sh.b1;
        global.b22 = sh.b2;
        global.b33 = sh.b3;
        global.b44 = sh.b4;
        global.b55 = sh.b5;
        global.d11 = sh.d1;
        global.d22 = sh.d2;
        global.d33 = sh.d3;
        global.d55 = sh.d5;
        global.d44 = sh.d4;
        if (amt < global.a11) {
          global.a11 = global.a11 - amt;
        } else {
          global.a11 = global.a11 - amt;
          if (global.a11 < 0) {
            global.a22 = global.a22 + global.a11;
            global.a11 = 0;
            if (global.a22 < 0) {
              global.a33 = global.a33 + global.a22;
              global.a22 = 0;
              if (global.a33 < 0) {
                global.a44 = global.a44 + global.a33;
                global.a33 = 0;
                if (global.a44 < 0) {
                  global.a55 = global.a55 + global.a44;
                }
              }
            }
          }
        }
        while (global.a11 == 0) {
          global.a11 = global.a22;
          global.d11 = global.d22;
          global.b11 = global.b22;
          global.a22 = global.a33;
          global.d22 = global.d33;
          global.b22 = global.b33;
          global.a33 = global.a44;
          global.d33 = global.d44;
          global.b33 = global.b44;
          global.a44 = global.a55;
          global.d44 = global.d55;
          global.b44 = global.b55;
          global.a55 = 0;
        }
      });
    }
  );
  Beat.findOne(
    { code: global.code, Shopname: global.shop, Beatname: global.beat },
    function (err, bb) {
      bb.remove();
    }
  );
  res.redirect("/dapp1");
});
app.get("/dapp1", function (req, res) {
  const beat = new Beat({
    code: global.code,
    Beatname: global.beat,
    Shopname: global.shop,
    Phone: String(global.ph),
    b1: String(global.b11),
    b2: String(global.b22),
    b3: String(global.b33),
    b4: String(global.b44),
    b5: String(global.b55),
    d1: String(global.d11),
    d2: String(global.d22),
    d3: String(global.d33),
    d4: String(global.d44),
    d5: String(global.d55),
    a1: String(global.a11),
    a2: String(global.a22),
    a3: String(global.a33),
    a4: String(global.a44),
    a5: String(global.a55),
  });
  beat.save();
  var a =
    "Recieved Sum of Rs." +
    global.amt.toString() +
    " on " +
    dte(null) +
    "for bills in Magus Softwares. Outstanding Amount: " +
    (global.a11 + global.a22 + global.a33 + global.a44 + global.a55) +
    "Paid to " +
    global.name;
  var p = [];
  p.push("+91" + global.ph);
  sendBulkMessages(a, p);
  const collection = new Collection({
    code: global.code,
    Beatname: global.beat,
    date: dte(null),
    Shopname: global.shop,
    amt: global.amt,
  });
  collection.save();
  res.redirect("/delivery");
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, function () {
  console.log("Server Start");
});
