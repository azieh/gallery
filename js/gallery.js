function loadPhotos(folderName) {
   jQuery.support.cors = true;
   $.ajax({
      url: "https://github.com/azieh/gallery/tree/master/foto/" + folderName,
      success: function (data) {
         $(data).find("td > a").each(function () {
            // will loop through 
            alert("Found a file: " + $(this).attr("href"));
         });
      }
   });
};
loadPhotos("berlin");
baguetteBox.run('.tz-gallery');