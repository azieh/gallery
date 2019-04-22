Vue.component('one-pic-template', {
   props: ['pic'],
   template: `
   <div class="col-sm-{{pic.w}} col-md-{{pic.h}}">
      <a class="lightbox" href="{{pic.href}}">
         <img src="{{pic.href}}"">
      </a>
   </div>
   `
})

var galleryVm = new Vue({
   el: '#galleryOne',
   data: {
      gallery: []
   }
})

var template = '<div class="row"><div class="col-sm-12 col-md-4"><a class="lightbox" href=""><img src=""></a></div></div>';
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
            self.parseResponse(data);
         }
      });
   };

   this.parseResponse = function (data) {
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
               href: title
            }
            galleryVm.items.push(pic);
         }
      });
      var template1 = $.parseHTML(template);
      $(template1).attr("id", "berlin");
      $('.tz-gallery').append(template1);
   }
   this.initLoad = function () {
      self.loadPhotos();
      baguetteBox.run('.tz-gallery');
   }
   self.initLoad();
   return self;
}
mainVm();