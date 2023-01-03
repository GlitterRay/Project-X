chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.greeting == "copart") {
            // parse end send info
            var manufacturer = model = modelLong = prod_year = prod_month = mileage = price = currency = engine = color = saloon_color = steering = fuel = doors = transmission = loc =
                abs = el_windows = cond = climat_cont = leather = disks = navigation = central_lock = hatch = alarm = board_comp = hidraulics = esd =
                    chair_warming = parking_control = turbo = right_wheel = auction = gear_type = car_run = car_run_dim = drive_type = category = airbags = img_counter = cylinder = vin = auction_day = auction_month = auction_year = '';
            var img = [];

            function get_material(str) {
                for (var i = 0; i < material_arr.length; i++) {

                    if (material_arr[i].indexOf(str) > -1) {
                        return material_arr[i];
                    }
                }
            }

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
            // $('.details').each(function () {
            $('.lot-information').find('.f-g2').find('>div').each(function () {
                var text = $(this).find('label').text();
                text = text.replace(/\s+/g, " ");
                text = text.trim();
                material_arr.push(text);
            });

            // manufacturer
            var material = $('.title').text();
            material = material.trim();

            var myarr = material.split(" ");
            manufacturer = myarr[1].toUpperCase();

            if (manufacturer !== '') {
                if(typeof arr_manufacturers[manufacturer] !== 'undefined'){
                    manufacturer = arr_manufacturers[manufacturer];
                }
            }

            // model
            model = myarr[2];
            if(typeof myarr[3] !== 'undefined' && myarr[3] !== ' '){
                var modelLong = model + myarr[3];
            }
            modelLong = searchStringInArray(modelLong, arr_models, manufacturer);
            if(modelLong > 0)
                model = modelLong;
            else
                model = searchStringInArray(model, arr_models, manufacturer);

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
            // material = get_material("Current Bid:");
            // var a = material ? material.split('$') : undefined;
            //
            // if (typeof a !== 'undefined' && typeof a[1] !== 'undefined') {
            //     price = a[1].replace(/\D/g, '');
            // }
            material = $.trim($('.bid-price').text());
            var a = material ? material.split('$') : undefined;

            if (typeof a !== 'undefined' && typeof a[1] !== 'undefined') {
                a = a[1].split(' ');
                price = a[0].replace(',', '');
            }

            // if (typeof a !== 'undefined' && typeof a[1] !== 'undefined') {
            //     price = a[1].replace(/\D/g, '');
            // }
            // currency dollar
            currency = 1;
            // fuel
            // material = get_material("Fuel:");
            // switch (material) {
            //     case 'Fuel: GAS':
            //         fuel = 2;
            //         break;
            //     case 'Fuel: FLEXIBLE FUEL':
            //         fuel = 2;
            //         break;
            //     case 'Fuel: DIESEL':
            //         fuel = 3;
            //         break;
            //     case 'Fuel: HYBRID ENGINE':
            //         fuel = 6;
            //         break;
            //     default:
            //         fuel = 0;
            // }
            material = $.trim($('[data-uname=lotdetailFuelvalue]').text());
            switch (material) {
                case 'GAS':
                    fuel = 2;
                    break;
                case 'FLEXIBLE FUEL':
                    fuel = 2;
                    break;
                case 'DIESEL':
                    fuel = 3;
                    break;
                case 'HYBRID ENGINE':
                    fuel = 6;
                    break;
                default:
                    fuel = 0;
            }
            // cylinder
            // material = get_material("Cylinders:");
            // if (typeof material !== 'undefined') {
            //     cylinder = material.replace(/\D/g, '');
            // }
            material = $.trim($('[data-uname=lotdetailCylindervalue]').text());
            if (typeof material !== 'undefined') {
                cylinder = material;
            }

            // engine
            // material = get_material("Engine Type:");
            // material = material.replace('Engine Type: ', '');
            // var a = material.split("L");
            // if (typeof material !== 'undefined') {
            //     material = a[0].replace(/\D/g, '');
            //     engine = material * 100;
            // }
            material = $.trim($('[data-uname=lotdetailEnginetype]').text());
            var a = material.split("L");
            if (typeof material !== 'undefined') {
                material = a[0].replace(/\D/g, '');
                engine = material * 100;
            }

            // color
            // material = get_material("Color:");
            // if (material.indexOf('GREEN') > -1) color = 5;
            // else if (material.indexOf('BLACK') > -1) color = 16;
            // else if (material.indexOf('WHITE') > -1) color = 1;
            // else if (material.indexOf('YELLOW') > -1) color = 4;
            // else if (material.indexOf('RED') > -1) color = 8;
            // else if (material.indexOf('SILVER') > -1) color = 12;
            // else if (material.indexOf('BLUE') > -1) color = 14;
            // else if (material.indexOf('GRAY') > -1) color = 13;
            // else if (material.indexOf('ORANGE') > -1) color = 9;
            // else if (material.indexOf('BROWN') > -1) color = 7;
            // else color = 0;
            material = $.trim($('[data-uname=lotdetailColorvalue]').text());
            if (material.indexOf("GREEN") > -1) color = 5;
            else if (material.indexOf("BLACK") > -1) color = 16;
            else if (material.indexOf("WHITE") > -1) color = 1;
            else if (material.indexOf("BEIGE") > -1) color = 2;
            else if (material.indexOf("cisferi") > -1) color = 3;
            else if (material.indexOf("YELLOW") > -1) color = 4;
            else if (material.indexOf("oqrosferi") > -1) color = 6;
            else if (material.indexOf("BURGUNDY") > -1) color = 10;
            else if (material.indexOf("RED") > -1) color = 8;
            else if (material.indexOf("SILVER") > -1) color = 11;
            else if (material.indexOf("BLUE") > -1) color = 13;
            else if (material.indexOf("GRAY") > -1) color = 12;
            else if (material.indexOf("ORANGE") > -1) color = 9;
            else if (material.indexOf("BROWN") > -1) color = 7;
            else if (material.indexOf("PINK") > -1) color = 14;
            else if (material.indexOf("PURPLE") > -1) color = 15;
            else color = 0;
            // drive type
            // material = get_material("Drive:");
            // switch (material) {
            //     case 'Drive: All wheel drive':
            //         drive_type = 3;
            //         break;
            //     case 'Drive: Front-wheel Drive':
            //         drive_type = 1;
            //         break;
            //     case 'Drive: Rear-wheel drive':
            //         drive_type = 2;
            //         break;
            // }
            material = $.trim($('[data-uname=DriverValue]').text());
            switch (material) {
                case 'All wheel drive':
                    drive_type = 3;
                    break;
                case 'Front-wheel Drive':
                    drive_type = 1;
                    break;
                case 'Rear-wheel drive':
                    drive_type = 2;
                    break;
            }
            // category
            // material = get_material("Body Style:");
            // switch (material) {
            //     case 'Body Style: COUPE':
            //     {
            //         category = 4;
            //         doors = 1;
            //         break;
            //     }
            //     case 'Body Style: HATCHBAC':
            //     {
            //         category = 2;
            //         doors = 2;
            //         break;
            //     }
            //     case 'Body Style: SEDAN 4D':
            //     {
            //         category = 1;
            //         doors = 2;
            //         break;
            //     }
            //     case 'Body Style: 4DR SPOR':
            //     {
            //         category = 5;
            //         doors = 2;
            //         break;
            //     }
            //     case 'Body Style: PICKUP':
            //     {
            //         category = 29;
            //         doors = 2;
            //         break;
            //     }
            //     case 'Body Style: CLUB CAB':
            //     {
            //         category = 29;
            //         doors = 2;
            //         break;
            //     }
            //     default:
            //         category = 0;
            // }
            material = $.trim($('[data-uname=lotdetailBodystylevalue]').text());
            switch (material) {
                case 'COUPE':
                {
                    category = 4;
                    doors = 1;
                    break;
                }
                case 'HATCHBAC':
                {
                    category = 2;
                    doors = 2;
                    break;
                }
                case 'CONVERTI':
                {
                    category = 6;
                    doors = 2;
                    break;
                }
                case 'SEDAN 4D':
                {
                    category = 1;
                    doors = 2;
                    break;
                }
                case '4DR SPOR':
                {
                    category = 5;
                    doors = 2;
                    break;
                }
                case 'PICKUP':
                {
                    category = 29;
                    doors = 2;
                    break;
                }
                case 'CLUB CAB':
                {
                    category = 29;
                    doors = 2;
                    break;
                }
                default:
                    category = 0;
            }

            // gear
            material = get_material("Transmission:");
            switch (material) {
                case 'Transmission: AUTOMATIC': {
                    gear_type = 2;
                    break;
                }
                case 'Transmission: MANUAL': {
                    gear_type = 1;
                    break;
                }
                default:
                    gear_type = 2;
            }
            // mileage
            // material = get_material("Odometer:");
            // var a = material.split("Odometer:");
            // material = a[1];
            // if (typeof material !== 'undefined') {
            //     material = material.replace(/\D/g, '');
            //     car_run = material;
            // }
            car_run = $('[data-uname=lotdetailOdometer]').closest('[lot-data-if]').attr('lot-data-if');
            // vin
            var vinValue = $.trim($('#vinDiv').find('span').text());
            vin = vinValue.includes('*') ? '' : vinValue;

            // right wheel
            right_wheel = 1;
            //auction
            auction = 1;
            // auction date
            material = $('#addToCalendar').attr('href');
            if (typeof material != 'undefined') {
                var a = material.split('/');
                var b = a[5].split('-');
                var d = b[2].split('T');

                auction_day = d[0];
                auction_month = b[1];
                auction_year = b[0];
                if (auction_day.length == 1) auction_day = '0' + auction_day;
                if (auction_month.length == 1) auction_month = '0' + auction_month;
            } else {
                // var dateObj = new Date();
                // var auction_day = dateObj.getUTCDate();
                // var auction_month = dateObj.getUTCMonth() + 2; //months from 1-12
                // var auction_year = dateObj.getUTCFullYear();
                // if (auction_day < 10)  auction_day = '0' + auction_day;
                // if (auction_month < 10) auction_month = '0' + auction_month;
                // if (auction_month == 12) {
                //     auction_month = '01';
                //     auction_year = auction_year + 1;
                // }
                var auction_day = '';
                var auction_month = '';
                var auction_year = '';
            }

            var img_counter = 0;
            $('img.thumbnailImg ').each(function () {
                if (img_counter <= 10 ) {
                    if(typeof $(this).attr('full-url') != undefined){
                        img.push($(this).attr('full-url'));
                        img_counter++;
                    }
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
                img_counter: img_counter
            });

        }
    });
