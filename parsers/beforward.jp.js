chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting == "beforward") {
    // parse end send info
    var manufacturer = (model = modelLong = prod_year = prod_month = mileage = price = currency = engine = color = saloon_color = steering = fuel = doors = transmission = loc = abs = el_windows = cond = climat_cont = leather = disks = navigation = central_lock = hatch = alarm = board_comp = hidraulics = esd = chair_warming = parking_control = turbo = right_wheel = auction = gear_type = car_run = car_run_dim = drive_type = category = airbags = img_counter = cylinder = vin = auction_day = auction_month = auction_year =
      "");
    var img = [];

    function searchStringInArray(str, strArray, manufacturer) {
      if (str === "" || str === " ") return -1;
      str = str.toUpperCase();
      for (k in strArray) {
        if (strArray[k][0].match(str) && strArray[k][1] === manufacturer)
          return k;
      }
      return -1;
    }

    // manufacturer
    var material = $(".car-info-area h1").html();
    var myarr = material.split(" ");
    manufacturer = myarr[1].toUpperCase();

    if (manufacturer !== "") {
      if (typeof arr_manufacturers[manufacturer] !== "undefined") {
        manufacturer = arr_manufacturers[manufacturer];
      }
    }
    // model
    model = myarr[2];
    if (typeof myarr[3] !== "undefined" && myarr[3] !== " ") {
      var modelLong = model + myarr[3];
    }
    modelLong = searchStringInArray(modelLong, arr_models, manufacturer);
    if (modelLong > 0) model = modelLong;
    else model = searchStringInArray(model, arr_models, manufacturer);

    // prod year
    prod_year = myarr[0];
    // location
    loc = 22;
    // car run dim
    car_run_dim = 1;
    // price
    material = $(".list-detail-box .green").html();

    if (material == null) material = $(".list-detail-box").html();

    price = material.replace(/\D/g, "");
    // currency dollar
    currency = 1;
    // mileage
    material = $(".specification tr:nth-child(3) td:nth-child(4)").html();
    car_run = material.replace(",", "").replace(/\D/g, "");
    // mileage
    material = $(".specification tr:nth-child(4) td:nth-child(2)").html();
    material = material.replace(",", "");
    material = material.replace("cc", "");
    engine = Math.round(material / 100) * 100;
    // right wheel
    material = $(".specification tr:nth-child(5) td:nth-child(4)").html();
    material == "Right" ? (right_wheel = 1) : (right_wheel = 0);
    // gear type
    material = $(".specification tr:nth-child(6) td:nth-child(2)").html();
    switch (material) {
      case "Automatic":
        gear_type = 2;
        break;
      case "Manual":
        gear_type = 1;
        break;
      case "Automanual":
        gear_type = 3;
        break;
      default:
        gear_type = 0;
    }
    // color
    material = $(".specification tr:nth-child(6) td:nth-child(4)").html();
    if (material.indexOf("Green") > -1) color = 5;
    else if (material.indexOf("Black") > -1) color = 16;
    else if (material.indexOf("White") > -1) color = 1;
    else if (material.indexOf("yellow") > -1) color = 4;
    else if (material.indexOf("Red") > -1) color = 8;
    else if (material.indexOf("Silver") > -1) color = 12;
    else if (material.indexOf("Blue") > -1) color = 14;
    else if (material.indexOf("Gray") > -1) color = 13;
    else if (material.indexOf("Orange") > -1) color = 9;
    else if (material.indexOf("Brown") > -1) color = 9;
    else if (material.indexOf("Beige") > -1) color = 2;
    else color = 0;

    // month
    material = $(".specification tr:nth-child(7) td:nth-child(2)").html();
    var a = material.split("/");
    prod_month = a[1];
    // fuel
    material = $(".specification tr:nth-child(7) td:nth-child(4)").html();
    switch (material) {
      case "Gasoline/Petrol":
        fuel = 2;
        break;
      case "Petrol":
        fuel = 2;
        break;
      case "Diesel":
        fuel = 3;
        break;
      case "Electric":
        fuel = 7;
        break;
      case "CNG":
        fuel = 5;
        break;
      default:
        fuel = 0;
    }
    // doors
    material = $(".specification tr:nth-child(9) td:nth-child(2)").html();
    switch (material) {
      case "1":
        doors = 3;
        break;
      case "2":
        doors = 1;
        break;
      case "4":
        doors = 2;
        break;
      case "5":
        doors = 2;
        break;
      default:
        doors = 0;
    }

    // drive type
    material = $(".specification tr:nth-child(5) td:nth-child(2)").html();
    material == "4wheel drive" ? (drive_type = 3) : (drive_type = "");

    //@ options and airbag
    $(".attached_on").each(function (i, obj) {
      material = $(obj).text();

      // condencioner, climat control
      if (material.match("A/C") instanceof Array) {
        climat_cont = cond = 1;
      }
      // airbugs
      if (material.match("Airbag") instanceof Array) {
        airbags = 4;
      }
      // hidraulics
      if (material.match("Power Steering") instanceof Array) {
        hidraulics = 1;
      }
      // el windows
      if (material.match("Power Window") instanceof Array) {
        el_windows = 1;
      }
      // disks
      if (material.match("Alloy Wheel") instanceof Array) {
        disks = 1;
      }
      // abs
      if (material.match("ABS") instanceof Array) {
        abs = 1;
      }
      // abs
      if (material.match("Navigation") instanceof Array) {
        navigation = 1;
      }
      // hatch
      if (material.match("Central Locking") instanceof Array) {
        hatch = 1;
      }
      // hatch
      if (material.match("Leather Seat") instanceof Array) {
        leather = 1;
      }
    });

    // images
    var img_counter = 0;
    $("#gallery li a").each(function () {
      if (img_counter < 12) {
        img.push($(this).attr("href"));
        img_counter++;
      }
    });

    sendResponse({
      manufacturer: manufacturer,
      model: model,
      category: category,
      prod_year: prod_year,
      prod_month: prod_month,
      price: price,
      currency: currency,
      vin: vin,
      mileage: mileage,
      engine: engine,
      cylinder: cylinder,
      color: color,
      airbags: airbags,
      steering: steering,
      fuel: fuel,
      right_wheel: right_wheel,
      doors: doors,
      drive_type: drive_type,
      auction: auction,
      auction_day: auction_day,
      auction_month: auction_month,
      auction_year: auction_year,
      transmission: transmission,
      loc: loc,
      abs: abs,
      el_windows: el_windows,
      cond: cond,
      climat_cont: climat_cont,
      leather: leather,
      disks: disks,
      navigation: navigation,
      central_lock: central_lock,
      hatch: hatch,
      alarm: alarm,
      board_comp: board_comp,
      hidraulics: hidraulics,
      esd: esd,
      chair_warming: chair_warming,
      parking_control: parking_control,
      turbo: turbo,
      car_run: car_run,
      car_run_dim: car_run_dim,
      gear_type: gear_type,
      img: img,
      img_counter: img_counter,
    });
  }
});
