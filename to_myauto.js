chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  var lari_currency_id = 3;
  if (typeof jQuery !== "undefined") {
    //console.log('jQuery loaded');
  } else {
    console.log("jQuery not loaded");
  }
  var url = request.url + request.lang + "/";
  // manufacturer
  $("[name=man_id]").val(request.manufacturer);
  // model
  $.post(
    url + "add/getModels/",
    { Ajax: true, id: request.manufacturer },
    function (data) {
      data = $.parseJSON(data);
      var html = "";
      for (m in data) {
        var selected = "";
        if (data[m].model_id == request.model) {
          selected = "selected";
        }
        html +=
          '<option value="' +
          data[m].model_id +
          '" ' +
          selected +
          ">" +
          data[m].model_name +
          "</option>";
      }
      $("#models").html(html);
    }
  );
  // prod year
  $("[name=prod_year]").val(request.prod_year);
  // prod month
  $("[name=prod_month]").val(request.prod_month);
  // location
  $("[name=location_id]").val(request.loc);
  var rate = $("input[name=rates_" + request.currency + "]").val();
  var price = request.price;
  /*if (rate)
            price = Math.round(price / rate);*/
  // price
  $("[name=price]").val(price);
  // price
  //$('[name=currency_id]').val(lari_currency_id);
  // airbags
  $("[name=airbags]").val(request.airbags);
  // car run dim
  $("[name=car_run]").val(request.car_run.replace(",", ""));
  // car run dim
  $("[name=car_run_dim]").val(request.car_run_dim);
  // engine
  $("[name=engine_volume]").val(request.engine);
  // gear type
  $("[name=gear_type_id]").val(request.gear_type);
  // color
  $("[name=color_id]").val(request.color);
  // saloon color
  $("[name=saloon_color_id]").val(request.saloon_color);
  // saloon material
  $("[name=saloon_material]").val(request.saloon_material);
  // fuel
  $("[name=fuel_type_id]").val(request.fuel);
  // doors
  $("[name=door_type_id]").val(request.doors);
  // doors
  $("[name=drive_type_id]").val(request.drive_type);
  // category
  $("[name=category_id]").val(request.category);
  // cylinder
  $("[name=cylinders]").val(request.cylinder);
  // VIN
  $("[name=vin]").val(request.vin);
  // auction dates
  $("[name=auction_end_dt_day]").val(request.auction_day);
  if (
    $(
      '[name=auction_end_dt_month] option[value="' +
        request.auction_month +
        '"]'
    )
  ) {
    $("[name=auction_end_dt_month]").val(request.auction_month);
  } else {
    $("[name=auction_end_dt_month] option:last").attr("selected", "selected");
  }
  $("[name=auction_end_dt_year]").val(request.auction_year);

  //@ options
  if (request.abs == 1) {
    $("[name=abs]").prop("checked", true);
  }
  if (request.el_windows == 1) {
    $("[name=el_windows]").prop("checked", true);
  }
  if (request.clim_cont == 1) {
    $("[name=clim_cont]").prop("checked", true);
  }
  if (request.disks == 1) {
    $("[name=disks]").prop("checked", true);
  }
  if (request.hatch == 1) {
    $("[name=hatch]").prop("checked", true);
  }
  if (request.board_comp == 1) {
    $("[name=board_comp]").prop("checked", true);
  }
  if (request.alarm == 1) {
    $("[name=alarm]").prop("checked", true);
  }
  if (request.right_wheel == 1) {
    $("#radio-1").prop("checked", true);
  }
  if (request.turbo == 1) {
    $("[name=has_turbo]").prop("checked", true);
  }
  if (request.parking_control == 1) {
    $("[name=parking_cont]").prop("checked", true);
  }
  if (request.cond == 1) {
    $("[name=conditioner]").prop("checked", true);
  }
  if (request.climat_cont == 1) {
    $("[name=climat_control]").prop("checked", true);
  }
  if (request.leather == 1) {
    $("[name=leather]").prop("checked", true);
  }
  if (request.central_lock == 1) {
    $("[name=center_lock]").prop("checked", true);
  }
  if (request.chair_warming == 1) {
    $("[name=chair_warming]").prop("checked", true);
  }
  if (request.hidraulics == 1) {
    $("[name=hydraulics]").prop("checked", true);
  }
  if (request.esd == 1) {
    $("[name=esd]").prop("checked", true);
  }
  if (
    request.auction == 1 &&
    request.auction_year !== "" &&
    $("[name=auction]").length
  ) {
    $("[name=auction]").prop("checked", true);
    $("#auction_date").removeClass("hide");
    $("#period").addClass("hide");
  }
  if (request.navigation == 1) {
    $("[name=nav_system]").prop("checked", true);
  }
  if (request.leather == 1) {
    $("[name=leather]").prop("checked", true);
  }

  // ganbajeba
  $("#baj-2").prop("checked", true);

  // set other details end

  // upload images
  // ------------------------------------------------------------------------------------
  var img = request.img;

  if (img.length == 0) {
    return true;
  }
  // Tags
  var form = $("#files-list-form");
  var files = $(".files-list");
  var progressbar = $(".files-list-new-file-progress p");
  var percent = $(".files-list-new-file i:first-child");
  var cancelbtn = $(".files-list-new-file-cancel");
  var uploadText = $(".files-list-new-file-text");
  var newFile = $(".files-list-new-file");

  // Fields
  var uploadedFilesCount = $("#UploadedFiles");
  var uploadedFiles = $("#files-list-file");

  // Clasess
  var uploadingClass = "files-list-new-file-uploading";

  var limit = $(".files-list").data("max-files");

  // Add Loader
  $(newFile).addClass(uploadingClass);
  $(uploadText).text("იტვირთება");
  progressbar.width(0 + "%"); //update progressbar percent complete
  percent.text(0 + "%"); //update status text

  window.URL = window.URL || window.webkitURL; // Take care of vendor prefixes.
  var blob = [];
  var xhr = [];
  for (var i = 0; i < request.img_counter; i++) {
    xhr[i] = new XMLHttpRequest();
    xhr[i].open("GET", img[i], true);
    xhr[i].overrideMimeType("image/jpg; charset=x-user-defined");
    xhr[i].responseType = "blob";
    xhr[i].onload = function (e) {
      if (this.status == 200) {
        blob.push(this.response);
        progressbar.width(i * 5 + "%");
        percent.text(i * 5 + "%");
      } else {
        console.log(img[i] + "__________" + this.status);
      }
    };
    xhr[i].send();
  }

  var imagesUrls = [];

  for (var i = 0; i < request.img_counter; i++) {
    let tmp = img[i];

    if (tmp.indexOf("//") == 0) tmp = "http:" + tmp;

    imagesUrls[i] = encodeURI(tmp);
  }

  if (blob.length == 0) {
    // Try to download images on server

    $.ajax({
      url: url + "/add/getImages",
      data:
        "images=" +
        encodeURIComponent(imagesUrls.join(",")) +
        "&proxy=" +
        (request.proxy != undefined ? request.proxy : false),
      type: "post",
      complete: function (response) {
        var data = JSON.parse(response.responseText);

        if (data.StatusCode == 1) {
          for (var i = 0; i < data.Data.length; i++) {
            blob[i] = b64toBlob(data.Data[i]);
          }
        }
      },
    });
  }

  var thirtinterval = window.setInterval(function () {
    if (blob.length != request.img_counter) {
      //console.log(blob.length);
    } else {
      window.__blob = blob;
      clearInterval(thirtinterval);
      var fd = new FormData();
      for (var i = 0; i < blob.length; i++) {
        fd.append("Files[]", blob[i]);
      }

      fd.append("do", "Files");
      fd.append("Func", form.find("[name=Func]").val());
      fd.append("SiteID", form.find("[name=SiteID]").val());
      fd.append("UserID", form.find("[name=UserID]").val());
      fd.append("IP", form.find("[name=IP]").val());
      fd.append("UploadedFiles", "0");

      $.ajax({
        url: form.attr("action"),
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        xhr: function () {
          var xhr = jQuery.ajaxSettings.xhr();
          if (xhr.upload) {
            xhr.upload.addEventListener(
              "progress",
              function (event) {
                var percentComplete = 0;
                var position = event.loaded || event.position;
                /*event.position is deprecated*/
                var total = event.total;
                if (event.lengthComputable) {
                  percentComplete = Math.ceil((position / total) * 100);
                }
                if (percentComplete > progressbar.width) {
                  progressbar.width(percentComplete + "%");
                  percent.text(percentComplete + "%");
                }
              },
              false
            );
          }
          return xhr;
        },
        beforeSend: function (xhr) {
          cancelbtn.click(xhr.abort);
        },
        success: function (response) {
          //console.log(response);
        },
        error: function (jqXHR, textStatus, errorMessage) {
          console.log(errorMessage); // Optional
        },
        complete: function (response) {
          if (response.status == 200) {
            try {
              data = $.parseJSON(response.responseText);
            } catch (e) {
              data = { StatusCode: -1, StatusMessage: "შეცდომა" };
            }
            if (data.StatusCode == 1 && data.Data.FilesList.length) {
              var img = data.Data.FilesList;
              for (i = 0; i < img.length; i++) {
                var mainText = "მთავარზე დაყენება";
                var cancelText = "გაუქმება";

                $(newFile).before(
                  '<li data-file="' +
                    img[i] +
                    '" class="img img-border-silver" style="background-image:url(' +
                    img[i] +
                    ');">' +
                    '<i onClick="_files.mainFile(this);" class="files-list-main-file" title="' +
                    mainText +
                    '"></i>' +
                    '<i onClick="_files.removeFile(this);" class="files-list-remove-file" title="' +
                    cancelText +
                    '"></i>' +
                    "</li>"
                );
              }
              // Calculate count
              var cnt = $(files).find("li").length - 1;
              uploadedFilesCount.val(cnt);
              $(newFile).css("display", cnt == limit ? "none" : "block");

              // Remove loader
              $(newFile).removeClass(uploadingClass);
              $(uploadText).html(
                "სურათის ატვირთვა <span>კიდევ " + (limit - i) + " ცალი</span>"
              );
              progressbar.width(0);
              percent.text("");
            } else {
              // alert("შეცდომა");
            }
          }
        },
      });
    }
  }, 1000);
  setTimeout(function() {
    sendResponse({status: true});
  }, 100);
  return true;
});

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || "image/jpg";
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}
