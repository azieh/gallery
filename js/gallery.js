Vue.component('one-pic-template', {
   props: {
      pic: Object
   },
   template: `
   <div class="col-sm-12 col-md-4">
      <a class="lightbox" v-bind:href="pic.href">
         <img  v-bind:src="pic.href">
      </a>
   </div>
   `
  
});
var galleryVm = new Vue({
   el: '#galleryOne',
   data: {
      gallery: []
   },
   updated: function () {
      baguetteBox.run('.tz-gallery');
    }
});
var mainVm = function () {
   var self = this;
   this.corsProxy = 'https://cors-anywhere.herokuapp.com/';
   this.githubFotoPage = 'https://github.com/azieh/gallery/tree/master/foto/';
   this.galleryFolders = [];

   this.loadPhotos = function (folderName) {
      if (folderName == null)
         folderName = ''
      $.ajax({
         url: self.corsProxy + self.githubFotoPage + folderName,
         headers: {
            'Access-Control-Allow-Origin': 'null',
            'Access-Control-Allow-Headers': 'Origin'
         },
         success: function (data) {
            self.parseResponse(data, folderName);

            
         }
      });
   };

   this.parseResponse = function (data, parent) {
      var html = $.parseHTML(data);
      $(html).find(".js-navigation-open").each(function () {
         var title = $(this).attr("title");
         if (title != null)
            if (title.startsWith("__"))
               self.loadPhotos(title);
            else if (title.endsWith(".jpg")) {
            var pic = {
               h: 12,
               w: 4,
               href: 'https://raw.githubusercontent.com/azieh/gallery/master/foto/' + parent + '/' + title
            }
            galleryVm.gallery.push(pic);
            
         }
      });
   }
   this.initLoad = function () {
      self.loadPhotos();
   }
   self.initLoad();
   return self;
}
mainVm();