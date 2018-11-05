function init() {

  var satelliteImage = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'),
      Messtischblatt =  L.tileLayer('https://moojtest.s3.amazonaws.com/ready_maps/{z}/{x}/{y}.png'),
      BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'),
      BlackAndWhite2 = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'),
      OSMmapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
      wholeAreaPolygon = L.geoJSON(whole_area, {style: styleWholeArea('#FFCC33', '0')}),
      wholeAreaPolygonMini = L.geoJSON(whole_area, {style: styleWholeArea('#FFCC33','0')}), // used in minimap
      wholeAreaPolygonBounds = wholeAreaPolygon.getBounds(),
      polskaBoundaries = L.geoJSON(polska,{style: styleWholeArea('white', '10 5 10')}),
      polskaBounds = polskaBoundaries.getBounds();
    

  function styleWholeArea(boundariesColor, dashType) {
    var boundariesColor = boundariesColor,
        dashType = dashType;

    var wholeAreaStyleProperties =  {
        fill: false,
        weight:3,
        opacity: 1,
        color: boundariesColor,
        dashArray: dashType,
    };
    return wholeAreaStyleProperties;
  };

  var map = new L.Map('map', {
    center: [50.728251910678814, 16.651282310485843],
    zoom: 15,
    maxZoom: 16,
    minZoom: 6,
    zoomControl: false,
    fullscreenControl: {
      pseudoFullscreen: false,
      position: 'topright'
  }
    // layers: [
    //    Messtischblatt, 
    // ]
  });

  Messtischblatt.addTo(map);
  polskaBoundaries.addTo(map);
  //polskaBoundaries.bringToBack()

    var glassType = L.magnifyingGlass({
        zoomOffset: 0,
        radius: 50,
        layers: [
          satelliteImage
        ],
        fixedPosition: false,
      });

  map.addLayer(glassType);

  var blackAndWhiteBasemap = new L.LayerGroup([BlackAndWhite]);
  var layers = new L.LayerGroup([blackAndWhiteBasemap, wholeAreaPolygonMini.setStyle({weight: 3})]);
  var miniMap = new L.Control.MiniMap(layers, { toggleDisplay: true, 
    minimized: false,
    height: 200,
    width: 200,
    zoomLevelOffset: -3,
    aimingRectOptions: {
      color: "none"
    }
  }).addTo(map);

  wholeAreaPolygon.addTo(map);

  var isGlass = true;
  var isMesstischblatt = true
  
  map.on('zoomend',function(event){
    var currentZoom = map.getZoom();
    var glass = glassType.getMap();
    console.log(currentZoom);
    
    // when zoomed out change glass
    if(currentZoom === 11 && isGlass === true) {
        console.log('zoom out 11 change glass and main map');
        map.removeLayer(Messtischblatt);
        glass.removeLayer(satelliteImage); // dziala
        glassType.options.layers = [OSMmapnik];
        glass.addLayer(OSMmapnik);
        glassType.options.zoomOffset = 0;
        map.addLayer(satelliteImage);
        //map.removeLayer(glassType);
        isGlass = false;
        isMesstischblatt = false;
        setBounds(polskaBounds);
        
    };
    // add glass when zoomed in
    if(currentZoom === 12 && isGlass === false) {
        console.log('add glas');     
        map.removeLayer(satelliteImage);
        glass.removeLayer(OSMmapnik); // dziala
        glassType.options.layers = [satelliteImage];
        glass.addLayer(satelliteImage);
        map.addLayer(Messtischblatt);
        isGlass = true;
        setBounds(wholeAreaPolygonBounds);
    };



  });

  function setBounds(bounds) {
    map.setMaxBounds(bounds);
  };

  setBounds(wholeAreaPolygonBounds);
  L.control.zoom({position: 'topright'}).addTo(map);
  L.control.scale({imperial: false}).addTo(map);


    // object that keeps images and their descritions
    var jpgMaps = [
      {jpgSmall:'images/5164_Schweidnitz_1936_small.jpg',
        jpgBig:'images/5164_Schweidnitz_1936.jpg', 
        title: '<b>Schweidnitz</b> - Świdnica', 
        alt: 'XXXX',
        x: 6672,
        y: 6672
        },
      {jpgSmall:'images/5165_Weizenrodau_2_1936_small.jpg',
          jpgBig:'images/5165_Weizenrodau_2_1936.jpg', 
          title: '<b>Weizenrodau</b> - Pszenno', 
          alt: 'XXXX',
          x: 6514,
          y: 6936
        },
      {jpgSmall:'images/5166_Zobten_1938_small.jpg',
          jpgBig:'images/5166_Zobten_1938.jpg',
          title: '<b>Zobten</b> - Sobótka', 
          alt: 'XXXX',
          x: 6680,
          y: 7041
        },
      {jpgSmall:'images/5264_Bad_Charlottenbrunn_1939_small.jpg',
          jpgBig:'images/5264_Bad_Charlottenbrunn_1939.jpg', 
          title: '<b>Bad Charlottenbrunn</b> - Jedlina Zdrój', 
          alt: 'XXXX',
          x: 6465,
          y: 6719
        },
      {jpgSmall:'images/5265_Reichenbach_small.png',
          jpgBig:'images/5265_Reichenbach.png', 
          title: '<b>Reichenbach</b> - Dzierżoniów', 
          alt: 'XXXX',
          x: 4421,
          y: 4417
        }, 
      {jpgSmall:'images/5266_Lauterbach_1936_small.jpg',
          jpgBig:'images/5266_Lauterbach_1936.jpg', 
          title: '<b>Lauterbach</b> - Sieniawka', 
          alt: 'XXXX',
          x: 6683,
          y: 6980
        },
      {jpgSmall:'images/5364_Wustegiersdorf_small.png',
          jpgBig:'images/5364_Wustegiersdorf.png', 
          title: '<b>Wustegiersdorf</b> - Głuszyca', 
          alt: 'XXXX',
          x: 4521,
          y: 4462
        },
      {jpgSmall:'images/5365_Langenbielau_1940_small.jpg',
          jpgBig:'images/5365_Langenbielau_1940.jpg', 
          title: '<b>Langenbielau</b> - Bielawa', 
          alt: 'XXXX',
          x: 6487,
          y: 7011
        },
      {jpgSmall:'images/5366_Gnadenfrei_1938_small.jpg', 
          jpgBig:'images/5366_Gnadenfrei_1938.jpg',
          title: '<b>Gnadenfrei</b> - Piława', 
          alt: 'XXXX',
          x: 6732,
          y: 7005
        },   
  ];

  // creates leaflet view with the image
  function createMapWithImageInModal(id) {
      var w = jpgMaps[id].x,
          h = jpgMaps[id].y,
          url = jpgMaps[id].jpgBig,
          
          map = L.map('mymap', {
              minZoom: 1,
              maxZoom: 6,
              center: [0, 0],
              zoom: 1,
              crs: L.CRS.Simple,
              
          });
      var southWest = map.unproject([0, h], map.getMaxZoom()-1);
      var northEast = map.unproject([w, 0], map.getMaxZoom()-1);
      var bounds = new L.LatLngBounds(southWest, northEast);
      
      addedImage = L.imageOverlay(url, bounds, {attribution: 'Source: <a href="http://mapy.amzp.pl/">Archiwum Mpa Zachodniej Polski</a> | Application Created by: <a href="https://www.linkedin.com/in/lukasz-gorny-327732133/">Lukasz Gorny</a>'});
      
      addedImage.addTo(map);
      map.setMaxBounds(bounds);
  };

  // method that adds content to the side panel
  function addContentToSideImagePanel() {
          for (i=0, n = jpgMaps.length; i < n; i++) {

              var creatDIV = document.createElement("DIV");
              creatDIV.id = 'ImageCont' + i;
              var para = document.createElement("p");
              //var node = document.createTextNode(jpgMaps[i].title);
              para.innerHTML = jpgMaps[i].title;

              // create image and add to div
              var picture = document.createElement('img');
              picture.classList.add("myImg");
              picture.id = 'Image' + i;
              picture.alt = jpgMaps[i].title;
              picture.src = jpgMaps[i].jpgSmall;
              // adds and images and text to div
              creatDIV.appendChild(picture);
              //para.appendChild(node);
              creatDIV.appendChild(para);
              creatDIV.className = "Images";
              // adds div with image and text to side-panel
              var element = document.getElementById("left-side-panel");
              element.appendChild(creatDIV);

              // style elements in divs: images and divs
              document.getElementById('Image' + i).style.width = "100%";
              document.getElementById('Image' + i).style.maxWidth = "50px";
              document.getElementById('ImageCont' + i).style.color = "#030d13fe",
              document.getElementById('ImageCont' + i).style.backgroundColor = "white";
          };
      };

      // initialises onClick event for divs in pictures with images
      function addOnclickToImagesInSidePanel() {
          var divWithPicture = document.getElementsByClassName('Images');
              for (var i=0; i < divWithPicture.length; i++) {
              
                  // Here we have the same onclick 
                  divWithPicture.item(i).onclick = function() {
                  //console.log(this);
                  // gets id name of image that was clicked in the side panel
                  var idHTMLname = this.id;
                  var idImage =  parseInt(idHTMLname.slice(-1));

                  var modal = document.getElementById('myModal');
                  var modalImg = document.getElementById(idHTMLname);
                  var captionText = document.getElementsByClassName("caption")[0];

                  modal.style.display = "block";

                  
                  var containerForMap = document.getElementsByClassName("container-for-map")[0];
                  var tempContainerForMap = document.createElement('div');
                  containerForMap.appendChild(tempContainerForMap);
                  tempContainerForMap.classList.add("temp-div-for-map");


                  var childContainerForMap = document.createElement('div');
                  childContainerForMap.id = 'mymap';
                  childContainerForMap.style.backgroundColor = 'none';
                  childContainerForMap.style.height = "600px";
                  childContainerForMap.style.width = "600px";
                  var parentContainer = document.getElementsByClassName('temp-div-for-map')[0];
                  parentContainer.appendChild(childContainerForMap);   //
                  
                  
                  createMapWithImageInModal(idImage); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      
                  //appends description from array with images to Modal
                  captionText.innerHTML = jpgMaps[idImage].title;


                  var span = document.getElementsByClassName("close")[0];

                  // When the user clicks on <span> (x), close the modal
                  span.onclick = function() { 
                      modal.style.display = "none";
                      // my code to remove div from container-for-map
                      var list = document.getElementsByClassName("temp-div-for-map");
                      for(var i = list.length - 1; 0 <= i; i--)
                      if(list[i] && list[i].parentElement)
                      list[i].parentElement.removeChild(list[i]);

                  };               
              };
          };
      };
  // method used to open side panel 
  function openDiv() {

      var getDiv = document.getElementById("left-side-panel");
      var getDivStyle = getDiv.style;
      // opens div-side-panel
      if(getDivStyle.height === "0px" || getDivStyle.height === "") {
          getDivStyle.animationName = "small-to-big";
          getDivStyle.animationDuration = "0.7s";     
          getDiv.addEventListener("webkitAnimationEnd", function(){
              getDivStyle.height = "700px";
              getDivStyle.width = "407px";
              // adds content to the side-panel (images and a name of elements)
              addContentToSideImagePanel();
              addOnclickToImagesInSidePanel();
           });
      //closes div-side-panel
      } else {
          console.log("dizala");
          getDivStyle.animationName = "big-to-small";
          getDivStyle.animationDuration = "0.2s";
          getDiv.addEventListener("webkitAnimationEnd", function(){
              getDivStyle.height = "0px";
              getDivStyle.width = "0px";
              getDiv.innerHTML = "";
          });

      };
  };

// button onclick when window.onload is used
var opSideDivOnClick = document.getElementById('logoMain');
  opSideDivOnClick.onclick = function() {
    openDiv();
  };

  openDiv();






// styling leaflet zoom control


};

window.onload = init;
