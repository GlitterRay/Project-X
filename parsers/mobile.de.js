chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.greeting == "mobile") {
            // parse end send info
            var manufacturer = model = modelLong = prod_year = prod_month = mileage = price = currency = engine = color = saloon_color = steering = fuel = doors = transmission = loc =
                abs = el_windows = cond = climat_cont = leather = disks = navigation = central_lock = hatch = alarm = board_comp = hidraulics = esd =
                    chair_warming = parking_control = turbo = right_wheel = auction = gear_type = car_run = car_run_dim = drive_type = category = airbags = img_counter = cylinder = vin = auction_day = auction_month = auction_year = '';
            var img = [];

            function searchStringInArray (str, strArray, manufacturer) {
                if(str === '' || str === ' ')
                    return -1;
                str = str.toUpperCase();
                for (k in strArray) {
                    if (strArray[k][0].match(str) && strArray[k][1] === manufacturer) return k;
                }
                return -1;
            }

            // create material array
            var material_arr = [];
            $('.g-row.u-margin-bottom-9').find('div').each(function () {
                material_arr.push($(this).text().trim());
            });

            function get_material(str) {
                for (var i = 0; i < material_arr.length; i++) {
                    if (material_arr[i] == str) {
                        return material_arr[i + 1].trim();
                    }
                }
                return '';
            }


            //@ manufacturer, model, prod year
            // manufacturer
            var material = $('#rbt-ad-title').text().toUpperCase();
            material = material.trim();

            var myarr = material.split(" ");
            manufacturer = myarr[0].toUpperCase();

            if (manufacturer !== '') {
                if(typeof arr_manufacturers[manufacturer] !== 'undefined'){
                    manufacturer = arr_manufacturers[manufacturer];
                }
            }

            // model
            model = myarr[1];

            if(typeof myarr[2] !== 'undefined' && myarr[2] !== ' '){
                modelLong = model +  myarr[2];
            }

            modelLong = searchStringInArray(modelLong, arr_models, manufacturer);

            if(modelLong > 0)
                model = modelLong;
            else
                model = searchStringInArray(model, arr_models, manufacturer);

            // price
            material = $('.h3.rbt-prime-price').text();
            if (typeof material !== 'undefined') {
                price = material.replace(/\D/g, '');
            }
            // currency
            currency = 2; // Euro

            // prod year
            material = $('#rbt-firstRegistration-v').find('strong').text();
            var year = material.split('/');
            prod_year = parseInt(year[1]);
            prod_month = parseInt(year[0]);

            // location
            loc = 19;
            // car run dim
            car_run_dim = 1;
            // mileage
            material = $('#rbt-mileage-v').find('strong').text();
            var a = material.split('km');
            var b = a[0].trim();
            var c = b.split(" ");
            var r = c[c.length - 1];
            if (typeof r !== 'undefined') {
                car_run = r.replace(/\D/g, '');
            }

            // fuel
            material = $('#rbt-fuel-v').find('strong').text();
            if (material.indexOf('Petrol') > -1) {
                fuel = 2;
            } else if (material.indexOf('Gasoline') > -1) {
                fuel = 2;
            } else if (material.indexOf('Diesel') > -1) {
                fuel = 3;
            }

            // gear type
            material = $('#rbt-transmission-v').find('strong').text();
            if (material.indexOf('Automatic') > -1) {
                gear_type = 2;
            } else if (material.indexOf('Automanual') > -1) {
                gear_type = 3;
            } else if (material.indexOf('Manual') > -1) {
                gear_type = 1;
            }

            // color
            material = get_material("Colour").toUpperCase();
            if (material.indexOf('GREEN') > -1) color = 5;
            else if (material.indexOf('BLACK') > -1) color = 16;
            else if (material.indexOf('WHITE') > -1) color = 1;
            else if (material.indexOf('YELLOW') > -1) color = 4;
            else if (material.indexOf('RED') > -1) color = 8;
            else if (material.indexOf('SILVER') > -1) color = 12;
            else if (material.indexOf('BLUE') > -1) color = 14;
            else if (material.indexOf('GRAY') > -1) color = 13;
            else if (material.indexOf('ORANGE') > -1) color = 9;
            else if (material.indexOf('BEIGE') > -1) color = 2;
            else if (material.indexOf('BROWN') > -1) color = 7;
            else color = 0;
            // engine
            material = get_material("Cubic Capacity");
            material = material.replace(/\D/g, '');
            material = Math.round(material / 100) * 100;
            if (typeof material !== 'undefined') {
                engine = material;
            }
            // doors
            material = get_material("Door Count");
            var a = material.split('/');
            var doors = a[0];
            switch (doors) {
                case '2':
                    doors = 1;
                    break;
                case '4':
                    doors = 2;
                    break;
                default:
                    doors = 0;
            }


            var img_counter = 0;
            $('.thumbnail').each(function () {

                if (img_counter < 13) {
                    var src = $(this).attr('src');
                    src = src.replace("$_23", "$_20");
                    if (!src.match(/_14/)) {
                        img.push(src);
                    }
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
                img_counter: img.length
            });

        }
    });
