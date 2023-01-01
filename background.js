var Lang = 'ka';
var Url = 'https://www.myauto.ge/';
var auctionSites = {
    'beforward.jp': {name: 'beforward', urlPatterns: ['*://*.beforward.jp/*']},
    'iaai.com': {name: 'iaai', urlPatterns: ['*://*.iaai.com/*']},
    'copart.com': {name: 'copart', urlPatterns: ['*://*.copart.com/*']},
    'cars.com': {name: 'cars', urlPatterns: ['*://*.cars.com/*']},
    'mobile.de': {name: 'mobile', urlPatterns: ['*://*.mobile.de/*']},
    'manheim.com': {name: 'manheim', urlPatterns: ['*://*.manheim.com/*']}
}

function getParserName(tab) {
    var parserName = Object.keys(auctionSites).find(function(key) { return tab.indexOf(key) > -1 });
    return auctionSites[parserName] ? auctionSites[parserName].name : '';
}

function getDocumentUrlPatterns() {
    return Object.values(auctionSites).map((value) => { return value.urlPatterns.join() });
}

function setLangID() {
    chrome.cookies.get({url: Url, name: 'Lang'}, function (cookie) {
        if (cookie) {
            Lang = cookie.value;
        }
    });
}

function transformData(data) {
    return {
        lang: Lang,
        url: Url,
        manufacturer: data.manufacturer,
        model: data.model,
        category: data.category,
        price: data.price,
        currency: data.currency,
        vin: data.vin,
        loc: data.loc,
        prod_year: data.prod_year,
        prod_month: data.prod_month,
        mileage: data.mileage,
        airbags: data.airbags,
        engine: data.engine,
        cylinder: data.cylinder,
        color: data.color,
        saloon_color: data.saloon_color,
        saloon_material: data.saloon_material,
        steering: data.steering,
        fuel: data.fuel,
        drive_type: data.drive_type,
        doors: data.doors,
        transmission: data.transmission,
        abs: data.abs,
        el_windows: data.el_windows,
        cond: data.cond,
        climat_cont: data.climat_cont,
        leather: data.leather,
        disks: data.disks,
        right_wheel: data.right_wheel,
        navigation: data.navigation,
        central_lock: data.central_lock,
        hatch: data.hatch,
        alarm: data.alarm,
        board_comp: data.board_comp,
        hidraulics: data.hidraulics,
        esd: data.esd,
        auction: data.auction,
        auction_day: data.auction_day,
        auction_month: data.auction_month,
        auction_year: data.auction_year,
        chair_warming: data.chair_warming,
        parking_control: data.parking_control,
        turbo: data.turbo,
        car_run: data.car_run,
        car_run_dim: data.car_run_dim,
        gear_type: data.gear_type,
        img: data.img,
        img_counter: data.img_counter,
        proxy: data.proxy,
    };
}

function tabClicked() {
    // set lang
    setLangID();
    //
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        if (tabs.length) {
            chrome.tabs.sendMessage(tabs[0].id, {greeting: getParserName(tabs[0].url)}, function(response) {
                if (typeof response == 'undefined') {
                    console.log('not parsed');
                    return false;
                }
                chrome.tabs.create({url: Url + Lang + '/add'}, function (tab) {
                    var transfered = false;
                    if (typeof response == 'undefined' || transfered) {
                        return;
                    }
                    chrome.tabs.onUpdated.addListener(function (tabid, info) {
                        if (info.status === 'complete' && !transfered) {
                            transfered = true;
                            chrome.tabs.sendMessage(
                                tab.id, transformData(response),
                                function () {
                                    //console.log('Finished')
                                }
                            );
                        }
                    });
                });
            });
        }
    });
}


function activateContextMenu() {
 
    chrome.contextMenus.removeAll();

    chrome.contextMenus.create({
        id: 'myauto-transfer-data',
        title: 'გადავიტანოთ Myauto.ge - ზე',
        contexts: ['all'],
        documentUrlPatterns: getDocumentUrlPatterns()
    });

    chrome.contextMenus.onClicked.addListener(function(info, tab) {
        if (info.menuItemId) {
            tabClicked();
        }
    });
}

activateContextMenu();



