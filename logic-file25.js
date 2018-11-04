function init() {

  var satelliteImage = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'),
      Messtischblatt =  L.tileLayer('https://moojtest.s3.amazonaws.com/ready_maps/{z}/{y}/{x}.png'),
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

};

window.onload = init;
