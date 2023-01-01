chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.greeting == "cars") {
            // parse end send info
            var manufacturer = model = prod_year = prod_month = mileage = price = currency = engine = color = saloon_color = steering = fuel = doors = transmission = loc =
                abs = el_windows = cond = climat_cont = leather = disks = navigation = central_lock = hatch = alarm = board_comp = hidraulics = esd =
                    chair_warming = parking_control = turbo = right_wheel = auction = gear_type = car_run = car_run_dim = drive_type = category = airbags = img_counter = cylinder = vin = auction_day = auction_month = auction_year = '';
            var img = [];


            // create material array
            var material_arr = [];
            $('.vdp-details-basics__list li').each(function () {
                material_arr.push($(this).text().trim());
            });

            function get_material(str) {
                for (var i = 0; i < material_arr.length; i++) {
                    if (material_arr[i] == str) {
                        return material_arr[i + 1];
                    }
                }
                return '';
            }


            //@ manufacturer, model, prod year
            // manufacturer
            var material = $('h1.title').text().toUpperCase();
            material = material.trim();

            var myarr = material.split(" ");
            if(typeof myarr[1] !== 'undefined')
                manufacturer = myarr[1].toUpperCase();

            if (manufacturer !== '') {
                if(typeof arr_manufacturers[manufacturer] !== 'undefined'){
                    manufacturer = arr_manufacturers[manufacturer];
                }
            }

            // model

            if(typeof myarr[2] !== 'undefined')
                model = myarr[2].toUpperCase();

            if (model !== '') {
                if(typeof arr_models[model] !== 'undefined')
                    model = arr_models[model];
            }

            // prod year
            var year = myarr[0];
            if (year != '') {
                prod_year = year;
            }
            // location
            loc = 21;
            // car run dim
            car_run_dim = 2;

            // price
            material = $('.vehicle-price').text();
            var a = material.split('$');
            if (typeof a[1] !== 'undefined') {
                price = a[1].replace(/\D/g, '');
            }
            // currency
            currency = 1;
            // fuel
            material = get_material("Fuel");
            switch (material) {
                case 'Gasoline':
                    fuel = 2;
                    break;
                case 'Diesel':
                    fuel = 3;
                    break;
                default:
                    fuel = 0;
            }

            // color
            material = get_material("Exterior Color").toUpperCase();
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
            // saloon color
            material = get_material("Interior Color").toUpperCase();
            if (material.indexOf('GREEN') > -1) saloon_color = 5;
            else if (material.indexOf('BLACK') > -1) saloon_color = 16;
            else if (material.indexOf('WHITE') > -1) saloon_color = 1;
            else if (material.indexOf('YELLOW') > -1) saloon_color = 4;
            else if (material.indexOf('RED') > -1) saloon_color = 8;
            else if (material.indexOf('SILVER') > -1) saloon_color = 12;
            else if (material.indexOf('BLUE') > -1) saloon_color = 14;
            else if (material.indexOf('GRAY') > -1) saloon_color = 13;
            else if (material.indexOf('ORANGE') > -1) saloon_color = 9;
            else if (material.indexOf('BEIGE') > -1) color = 2;
            else if (material.indexOf('BROWN') > -1) color = 7;
            else saloon_color = 0;
            // doors
            material = get_material("Doors")
            switch (material) {
                case '1':
                    doors = 3;
                    break;
                case '2':
                    doors = 1;
                    break;
                case '4':
                    doors = 2;
                    break;
                case '5':
                    doors = 2;
                    break;
                default:
                    doors = 0;
            }
            // gear type
            material = get_material("Transmission");
            material = material.toUpperCase();
            switch (material) {
                case 'AUTOMATIC':
                    gear_type = 2;
                    break;
                case 'MANUAL':
                    gear_type = 1;
                    break;
                case 'AUTOMANUAL':
                    gear_type = 3;
                    break;
                default:
                    gear_type = 0;
            }
            // category
            material = get_material("Body Style");
            switch (material) {
                case 'Coupe':
                    category = 4;
                    break;
                case 'Convertible':
                    category = 6;
                    break;
                case 'SUV':
                    category = 5;
                    break;
                case 'Sedan':
                    category = 1111111;
                    break;
                case 'Hatchback':
                    category = 2;
                    break;
                case 'Crew Cab Pickup':
                    category = 29;
                    break;
                case 'Cargo Van':
                    category = 7;
                    break;
                case 'Wagon':
                    category = 13;
                    break;
                default:
                    category = 0;

            }
            // engine
            material = get_material("Engine");
            var a = material.split("L");
            if (typeof material !== 'undefined') {
                material = a[0].replace(/\D/g, '');
                engine = material * 100;
            }
            // cylinder
            material = get_material("Engine");
            var a = material.split("V");
            var b = a[1].split(" ");
            if (typeof material !== 'undefined') {
                cylinder = b[0].replace(/\D/g, '');
            }

            var ex = $('.items img').attr('src');
            var a = ex.split('/');
            var f = '';
            var img_counter = 0;
            if (typeof a[6] != 'undefined') {
                for (var i = 1; i <= 10; i++) {
                    if (i < 10) {
                        f = '0' + i;
                    } else {
                        f = i;
                    }
                    img.push("http://images.cars.com/supersized/DMI/" + a[5] + "/" + a[6] + "/" + f + ".jpg");
                    img_counter++;
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
                img_counter: img_counter
            });

        }
    });
