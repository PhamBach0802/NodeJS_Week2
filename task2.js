const fs = require("fs");
const formatDistance = require("date-fns/formatDistance");
const viLocale = require("date-fns/locale/vi");
const format = require("date-fns/format");
const XLSX = require("xlsx");

var dataObj = {};
fs.readFile("./products.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  dataObj = JSON.parse(data);
  console.log(`Total number of products: ${dataObj.length}`);

  dataObj.forEach((value, index) => {
    value.dateUpdated = new Date(value.dateUpdated);
    var fromNow = formatDistance(value.dateUpdated, new Date(), {
      locale: viLocale
    });
    console.log(
      `${index + 1} - ${
        value.name
      } - ${value.price.toLocaleString()}VND - ${fromNow}`
    );

    value.updated = format(value.dateUpdated, "mm/dd/yyyy");
    delete value.dateUpdated;
  });

  // create 'worksheet' object from json
  const ws = XLSX.utils.json_to_sheet(dataObj);

  // Optional: config columns width (character length)
  ws["!cols"] = [
    { width: 20 },
    { width: 15 },
    { width: 20 },
    { width: 20 },
    { width: 20 }
  ];

  // create 'workbook' object (which contains multiple sheet)
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Products");

  // convert to Microsoft EXCEL workbook and write to a Buffer object
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  fs.writeFile("products.xlsx", buf, err => {
    console.log("Write success");
  });
});
