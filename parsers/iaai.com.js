chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting == "iaai") {
    // parse end send info
    var manufacturer = (model = modelLong = prod_year = prod_month = mileage = price = currency = engine = color = saloon_color = steering = fuel = doors = transmission = loc = abs = el_windows = cond = climat_cont = leather = disks = navigation = central_lock = hatch = alarm = board_comp = hidraulics = esd = driveLineType = exterior = bodyStyle = chair_warming = parking_control = turbo = right_wheel = auction = gear_type = car_run = car_run_dim = drive_type = category = airbags = img_counter = cylinder = vin = auction_day = auction_month = auction_year =
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
    var material = $(".vehicle-header .heading-2").text();

    if (material) {
      material = material.trim();

      var myarr = material.split(" ");

      if (myarr[1]) {
        manufacturer = myarr[1].toUpperCase();

        if (manufacturer !== "") {
          if (typeof arr_manufacturers[manufacturer] !== "undefined") {
            manufacturer = arr_manufacturers[manufacturer];
          }
        }
      } else manufacturer = "";

      if (!isNaN(Number(myarr[0]))) {
        prod_year = Number(myarr[0]);
      }
    }

    $(".data-list.data-list--details li").each(function () {
      var _html = $(this).find(".data-list__label").html();

      if (_html == undefined) return;
      // model
      if (-1 != _html.indexOf("Model")) {
        model = $(this).find(".data-list__value").html().trim().toUpperCase();
      }
      // series
      if (-1 != _html.indexOf("Series")) {
        var series = $(this)
          .find(".data-list__value")
          .html()
          .trim()
          .toUpperCase();
        if (typeof series !== "undefined" && series !== " ") {
          modelLong = model + series;
        }
      }
      // fuel
      if (-1 != _html.indexOf("Fuel Type")) {
        fuel = $(this).find(".data-list__value").html().trim();
      }
      // cylinder
      if (-1 != _html.indexOf("Cylinders")) {
        cylinder = $(this).find(".data-list__value").html().replace(/\D/g, "");
      }
      // engine
      if (-1 != _html.indexOf("Engine")) {
        engine = $(this).find("#engine_novideo").html();
      }
      // engine
      if (-1 != _html.indexOf("Drive Line Type")) {
        driveLineType = $(this).find(".data-list__value").html().trim();
      }
      // engine
      if (
        -1 !=
        $(this).find(".data-list__label").html().indexOf("Exterior/Interior")
      ) {
        exterior = $(this).find(".data-list__value").html().trim();
      }
      // engine
      if (-1 != _html.indexOf("Body Style")) {
        bodyStyle = $(this).find(".data-list__value").html().trim();
        bodyStyle = bodyStyle.split(" ");
      }
      // price
      if (-1 != _html.indexOf(" Current Bid")) {
        price = $(this).find(".data-list__value").html().trim();
        // price = price.replace(/[^0-9^.^,]/g, '');
        price = price.replace(/\$/g, "");
        // price = price.replace(/,/g, '.');
        price = price.replace(/,/g, "");

        price = parseFloat(price);
      }

      if (-1 != _html.indexOf("Odometer")) {
        car_run = $(this).find(".data-list__value").html().trim();
        car_run = car_run.split(" ")[0];
      }
    });

    modelLong = searchStringInArray(modelLong, arr_models, manufacturer);

    if (modelLong > 0) model = modelLong;
    else model = searchStringInArray(model, arr_models, manufacturer);

    // prod year
    /*var year = $('.flex-item .pd-title-ymm').text();
            year = year.split(" ");
            if(year.length > 0){
                prod_year = year[0];
            }*/

    // location
    loc = 21;
    // car run dim
    car_run_dim = 2;

    // price
    /*material = $('.btn-buy-wrapper').children().children('.high-price').text();
            if(material == ''){
                material = $('.btn-prebid-wrapper').children().children('.high-price').text();    
            }
            var a = material.split('$');
            if (typeof a[1] !== 'undefined') {
                price = a[1].replace(/\D/g, '');
            }
            */
    // currency dollar
    currency = 1;
    // mileage
    /*$('.pd-condition-wrapper .row.flex').each(function(){
                if(-1 != $(this).find('div:first-child > p').html().indexOf('Odometer')){
                    car_run = $(this).find('div:last-child > p').html().trim().replace(/\D/g, '');
                }
            })*/

    // fuel
    switch (fuel) {
      case "Gasoline":
        fuel = 2;
        break;
      case "Diesel":
        fuel = 3;
        break;
      case "Hybrid":
        fuel = 6;
        break;
      default:
        fuel = 0;
    }

    // engine
    material = $(".tab-vehicle div:nth-child(9)")
      .children(".col-7")
      .children()
      .text();
    var a = engine.split("L");
    if (typeof engine !== "undefined") {
      engine = a[0].replace(/\D/g, "");
      engine = engine * 100;
    }

    // drive type
    switch (driveLineType) {
      case "Four Wheel Drive":
        drive_type = 3;
        break;
      case "All Wheel Drive":
        drive_type = 3;
        break;
      case "Front Wheel Drive":
        drive_type = 1;
        break;
      case "Rear Wheel Drive":
        drive_type = 2;
        break;
    }

    // right wheel
    right_wheel = 1;
    // gear type
    material = $(".vehicle-stats:eq(1) li:nth-child(4) dd").text();
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
        gear_type = 2;
    }

    // get car and salom colors
    colors = exterior.split("/");
    exterior = colors[0].toUpperCase().trim();
    Interior = colors[1].toUpperCase().trim();
    // color
    if (exterior.indexOf("GREEN") > -1) color = 5;
    else if (exterior.indexOf("BLACK") > -1) color = 16;
    else if (exterior.indexOf("WHITE") > -1) color = 1;
    else if (exterior.indexOf("YELLOW") > -1) color = 4;
    else if (exterior.indexOf("RED") > -1) color = 8;
    else if (exterior.indexOf("SILVER") > -1) color = 12;
    else if (exterior.indexOf("BLUE") > -1) color = 14;
    else if (exterior.indexOf("GRAY") > -1) color = 13;
    else if (exterior.indexOf("ORANGE") > -1) color = 9;
    else if (exterior.indexOf("BEIGE") > -1) color = 2;
    else if (exterior.indexOf("BROWN") > -1) color = 7;
    else color = 0;
    // saloon color
    if (Interior.indexOf("GREEN") > -1) saloon_color = 5;
    else if (Interior.indexOf("BLACK") > -1) saloon_color = 16;
    else if (Interior.indexOf("WHITE") > -1) saloon_color = 1;
    else if (Interior.indexOf("YELLOW") > -1) saloon_color = 4;
    else if (Interior.indexOf("RED") > -1) saloon_color = 8;
    else if (Interior.indexOf("SILVER") > -1) saloon_color = 12;
    else if (Interior.indexOf("BLUE") > -1) saloon_color = 14;
    else if (Interior.indexOf("GRAY") > -1) saloon_color = 13;
    else if (Interior.indexOf("ORANGE") > -1) saloon_color = 9;
    else if (Interior.indexOf("BEIGE") > -1) saloon_color = 2;
    else if (Interior.indexOf("BROWN") > -1) saloon_color = 7;
    else saloon_color = 0;

    // airbags
    /*material = $('.vehicle-stats:eq(3) li:nth-child(2) dd').text();
            airbags = material;*/

    // category

    material = $(".vehicle-stats:eq(2) li:nth-child(4) dd").text();
    switch (bodyStyle[0]) {
      case "Coupe":
        {
          category = 4;
        }
        break;
      case "Convertible":
        {
          category = 6;
        }
        break;
      case "SUV":
        {
          category = 5;
        }
        break;
      case "Sedan":
        {
          category = 1;
        }
        break;
      case "Hatchback":
        {
          category = 2;
        }
        break;
      case "Crew Cab Pickup":
        {
          category = 29;
        }
        break;
      case "Van":
        {
          category = 30;
        }
        break;
      case "Wagon":
        {
          category = 5;
        }
        break;
      case "MPV":
        {
          category = 5;
        }
        break;
      case "Extended Cab":
        {
          category = 29;
        }
        break;
      case "CONVERTIBLE":
        {
          category = 6;
        }
        break;
      default:
        category = 0;
    }

    if (
      bodyStyle[0] + " " + bodyStyle[1] + " " + bodyStyle[2] ===
      "Sport Utility Vehicle"
    ) {
      category = 5;
    }

    //doors
    if (bodyStyle[1] % 1 === 0) {
      doors = 2;
    } else {
      doors = 2;
    }

    //auction
    auction = 1;
    // auction date

    // var mS = {'Jan' : '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'June': '06', 'July': '07', 'Aug': '08', 'Sept': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'};
    // $('.additional-info-inner .row.flex').each(function(){
    //     if(-1 != $(this).find('div:first-child > p').html().indexOf('Auction Date and Time')){
    //         material = $(this).find('div:last-child > p').html().trim();
    //         material = material.split(" ");
    //     }
    // })
    //
    // if(material){
    //     if(material[2] < 9){
    //         auction_day = '0'+parseInt(material[2]);
    //     }else{
    //         auction_day = parseInt(material[2]);
    //     }
    //     auction_month = mS[material[1]];
    //     auction_year = new Date().getFullYear();
    // }

    materialURL = $(".data-list__label:contains('Auction Date and Time:')")
      .closest(".data-list__item")
      .find(".link")
      .attr("href");
    materialURLParams = new URLSearchParams(materialURL);
    material = materialURLParams.get("aucDate");

    if (material) {
      auction_day = material.substr(2, 2);
      auction_month = material.substr(0, 2);
      auction_year = material.substr(4, 4);
    }

    /*console.log('0'+parseInt(material[2]));return;*/
    // vin
    vinValue = $("#VIN_vehicleStats1").text();
    vin = vinValue.includes("*") ? "" : vinValue;
    /*var img_counter = 0;

            $('#spacedthumbs1strow div').each(function () {
                
                if (img_counter < 10) {
                    var a = $(this).attr('style');
                    var b = a.split("?imageKeys=");
                    if(typeof b[1] != 'undefined')
                    {
                        var c = b[1].split(");");
                        var d = c[0];
                        img_counter++;
                        
                        img.push("https://vis.iaai.com/resizer?imageKeys=" + d + "~S0~I" + img_counter + "~RW1280~H960~TH0&width=640&height=480");
                    }

                }
            });*/

    // var img_count = $('#spacedthumbs1strow img').length;
    // var img_count2 = 0;//$('#spacedthumbs2ndrow div').length;
    // var img_count = (img_count+img_count2);
    // var imgSrc = $('#fullViewImg').attr("src");
    //
    // imgSrc = imgSrc.split(/~I.~/);

    // if (img_count <= 12) {
    //     for (var i = 1; i <= img_count; i++) {
    //         data = imgSrc[0] + '~I' + i + '~' + imgSrc[1];
    //         img.push(data);
    //     }
    // }
    var imgs = $("#spacedthumbs1strow img");
    var img_count = imgs.length;

    // console.log(imgs.eq(0));
    for (var i = 0; i < img_count; i++) {
      if (
        !imgs.eq(i).hasClass("vehicle-image__thumb--360") &&
        !imgs.eq(i).hasClass("vehicle-image__thumb--engine") &&
          i < 16
      ) {
        data = imgs.eq(i).attr("src");
        data = data.replace("width=161&height=120", "width=845&height=633");
        img.push(data);
      }
    }

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
      img_counter: img.length,
    });
  }
});
