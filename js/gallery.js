function loadPhotos (folderName) {
    $.ajax({
        url: "//azieh.github.io/gallery/foto/" + folderName,
        success: function(data){
           $(data).find("td > a").each(function(){
              // will loop through 
              alert("Found a file: " + $(this).attr("href"));
           });
        }
      });
};
loadPhotos("berlin");
baguetteBox.run('.tz-gallery');