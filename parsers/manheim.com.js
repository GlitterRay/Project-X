chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting == "manheim") {
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

    // create material array
    let material_arr = [];
    document.querySelectorAll('.Overview__container  div.dont-break-columns').forEach(el => {
      material_arr.push(el.querySelectorAll('div')[0]?.innerText.trim().toLowerCase());
      material_arr.push(el.querySelectorAll('div')[1]?.innerText.trim().toLowerCase())
    })

    function getMainSpec(title) {
      return $(`.VehicleInformation__container .ListingTitle__title span[data-test-id=${title}]`)[0]?.innerText.trim().toUpperCase()
    }

    function get_material(str) {
      for (var i = 0; i < material_arr.length; i++) {
        if (material_arr[i] == str) {
          return material_arr[i + 1].trim();
        }
      }
      return "";
    }

    // manufacturer
    // var material = get_material("Make:");
    // material = material.toUpperCase();
    // material = material.trim();
    // manufacturer = material.toUpperCase();


    manufacturer = getMainSpec('make').toUpperCase();
    if (manufacturer !== "") {
      if (typeof arr_manufacturers[manufacturer] !== "undefined") {
        manufacturer = arr_manufacturers[manufacturer];
      }
    }

    // model
    var model = getMainSpec('model');

    var modelLong = get_material('trim');
    if (typeof model !== 'undefined' && typeof modelLong !== 'undefined') {
      modelLong = searchStringInArray(modelLong, arr_models, manufacturer);
      if (modelLong > 0) model = modelLong;
      else model = searchStringInArray(model, arr_models, manufacturer);
    }

    // prod year
    prod_year = getMainSpec('year');

    // price
    //material = $('#mmrHover').text();
    material = $(".BidWidget__BidBuyButtons .bid-buy__amount").text();
    if (typeof material !== "undefined" && material.trim()) {
      price = material.split("$");
      if (typeof price[2] !== "undefined")
        price = parseInt(price[2].replace(/\D/g, "") / 100);
      else price = parseInt(price[1].replace(/\D/g, "") / 100);
    }

    if (price == 0 || price == "") {
      material = $('a[onclick*="product=VVT"]').text();
      price = parseInt(material.replace(/\D/g, ""));
    }

    // currency dollar
    currency = 1;
    // mileage
    material = $('span.OdometerInfo__container')[0]?.innerText;
    if (typeof material !== "undefined") {
      car_run = material.replace(/\D/g, "");
    }
    // car run dim
    car_run_dim = 2;
    // cylinder
    material = $('.EngineInfo__engine')[0]?.innerText;
    if (typeof material !== "undefined") {
      cylinder = material.replace(/\D/g, "");
    }
    // engine
    material = get_material("Displacement:");
    material = material.replace(/\D/g, "");
    material = material * 100;
    if (typeof material !== "undefined") {
      engine = material;
    }
    // gear type
    gear_type = 2;
    material = $('.EngineInfo__transmission')[0]
    if (typeof material !== 'undefined') {
      material = material.innerText.trim().toLowerCase();
      if (material === 'man') {
        gear_type = 1;
      }
    }
    // color
    material = get_material("exterior color").toUpperCase();
    if (material.indexOf("GREEN") > -1) color = 5;
    else if (material.indexOf("BLACK") > -1) color = 16;
    else if (material.indexOf("WHITE") > -1) color = 1;
    else if (material.indexOf("YELLOW") > -1) color = 4;
    else if (material.indexOf("RED") > -1) color = 8;
    else if (material.indexOf("SILVER") > -1) color = 12;
    else if (material.indexOf("BLUE") > -1) color = 14;
    else if (material.indexOf("GRAY") > -1) color = 13;
    else if (material.indexOf("ORANGE") > -1) color = 9;
    else if (material.indexOf("BEIGE") > -1) color = 2;
    else if (material.indexOf("BROWN") > -1) color = 7;
    else color = 0;
    // saloon color
    material = get_material("interior color").toUpperCase();
    if (material.indexOf("GREEN") > -1) saloon_color = 5;
    else if (material.indexOf("BLACK") > -1) saloon_color = 16;
    else if (material.indexOf("WHITE") > -1) saloon_color = 1;
    else if (material.indexOf("YELLOW") > -1) saloon_color = 4;
    else if (material.indexOf("RED") > -1) saloon_color = 8;
    else if (material.indexOf("SILVER") > -1) saloon_color = 12;
    else if (material.indexOf("BLUE") > -1) saloon_color = 14;
    else if (material.indexOf("GRAY") > -1) saloon_color = 13;
    else if (material.indexOf("ORANGE") > -1) saloon_color = 9;
    else if (material.indexOf("BROWN") > -1) saloon_color = 7;
    else saloon_color = 0;

    //interior material
    material = get_material('interior type').toUpperCase();
    if (material.indexOf('CLOTH') > -1)  saloon_material = 2;
    else if (material.indexOf('LEATHER') > -1) saloon_material = 1
    else if (material.indexOf('VINYL') > -1) saloon_material = 5
    else saloon_material = 0
    // VIN
    material = $('.Vin__container.Listing__vin')[0]
    if (typeof material !== 'undefined') {
      vin = material.innerText;
    }
    // category
    material = get_material("body style");
    switch (material) {
      case "coupe":
        {
          category = 4;
          doors = 1;
        }
        break;
      case "convertible":
        {
          category = 6;
          doors = 2;
        }
        break;
      case "suv":
        {
          category = 5;
          doors = 2;
        }
        break;
      case "sedan":
        {
          category = 1;
          doors = 2;
        }
        break;
      case "hatchback":
        {
          category = 2;
          doors = 2;
        }
        break;
      case "crew cab pickup":
        {
          category = 29;
          doors = 2;
        }
        break;
      case "cargo van":
        {
          category = 30;
          doors = 2;
        }
        break;
      case "wagon":
        {
          category = 5;
          doors = 2;
        }
        break;
      case "mpv":
        {
          category = 5;
          doors = 2;
        }
        break;
      case "extended cab":
        {
          category = 29;
          doors = 2;
        }
        break;
      default:
        category = 0;
    }

    // fuel
    material = get_material("fuel type");
    if (material.indexOf("petrol") > -1) {
      fuel = 2;
    } else if (material.indexOf("gasoline") > -1) {
      fuel = 2;
    } else if (material.indexOf("diesel") > -1) {
      fuel = 3;
    }
    // location
    loc = 21;

    //@ options and airbag
    material = $(".linkBullets").text();
    // condencioner, climat control
    if (material.indexOf("Air Conditioning") > -1) {
      climat_cont = cond = 1;
    } else {
      climat_cont = cond = 0;
    }
    // airbags
    //	if(material.indexOf('Airbags') > -1){ airbags = 4; } else {  airbags = 0; }
    // hidraulics
    if (material.indexOf("Power Steering") > -1) {
      hidraulics = 1;
    } else {
      hidraulics = 0;
    }
    // el windows
    if (material.indexOf("Power Windows") > -1) {
      el_windows = 1;
    } else {
      el_windows = 0;
    }
    // disks
    if (material.indexOf("AlloyWheel") > -1) {
      disks = 1;
    } else {
      disks = 0;
    }
    // abs
    if (material.indexOf("ABS") > -1) {
      abs = 1;
    } else {
      abs = 0;
    }
    // abs
    if (material.indexOf("Navigation") > -1) {
      navigation = 1;
    } else {
      navigation = 0;
    }
    // hatch
    if (material.indexOf("Sunroof") > -1) {
      hatch = 1;
    } else {
      hatch = 0;
    }
    // hatch
    if (material.indexOf("LeatherSeat") > -1) {
      leather = 1;
    } else {
      leather = 0;
    }

    // drive type
    material = get_material("drive train");
    switch (material) {
      case "4 wheel drive":
        drive_type = 3;
        break;
      case "all wheel drive":
        drive_type = 3;
        break;
      case "2 wheel drive":
        {
          if (manufacturer == 3 || manufacturer == 25) {
            drive_type = 2;
          } else {
            drive_type = 1;
          }
        }
        break;
      default:
        drive_type = 0;
    }
    var img_counter = 0;
    let images = [];
    // old version
    // let imagesContainer = document.querySelectorAll('.image-gallery-slide');

    let imagesContainer = document.querySelectorAll('.filmstrip-slide');

    if (!imagesContainer.length) {
      imagesContainer = document.querySelectorAll('.svfy_scroller div');
    }

    imagesContainer.forEach(el => {
      if (img_counter < 10) {
        images.push(el.querySelector('img').src.replace('_thumb', ''))
        img_counter++
      }
    })

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
      saloon_color: saloon_color,
      saloon_material: saloon_material,
      airbags: airbags,
      steering: steering,
      fuel: fuel,
      right_wheel: 1,
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
      img: images,
      img_counter: img_counter,
      proxy: true,
    });
  }
});
