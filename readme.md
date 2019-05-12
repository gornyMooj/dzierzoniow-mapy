## My Hometown on old Prussian Maps - [Basamp for Leaflet.js](https://gornymooj.github.io/dzierzoniow-mapy/)

This is the web app written only in Javascript without third-party CSS frameworks or plugins. All tools used in the process of the creation are open source and freely available on the internet. The aim of the app is to show my hometown and its surroundings on old Prussian maps (*[Messtischblatt](https://de.wikipedia.org/wiki/Messtischblatt)*) and to be able to compare them with current maps.The application is not mobile friendly and it is not finished. However, the main objectives of this project have been completed.

### Prussian Maps and basemap production

The orginal maps are made avaialbel in .jpg format on [Archiwu Map Zachodniej Polski](http://mapy.amzp.pl/maps.shtml). The maps covering Dzierzoniow and and it surrandings are in two spatial references: [EPSG:31469](https://spatialreference.org/ref/epsg/dhdn-gauss-kruger-zone-5/) (zone 5) and in *+proj=tmerc +lat_0=0 +lon_0=18 +k=1 +x_0=6500000 +y_0=0 +ellps=bessel +datum=potsdam +units=m +no_defs* (zone 6), more information can be found on this [web site](https://gis-support.pl/kalibracja-map-messtischblatt-w-qgis/). 

The .jpg files were downloaded and processed in [Gimp](https://www.gimp.org/) to remove unwanted edges and separate pieces of zone 5 from zone 6. Then the files were brought to QGIS and georeferenced according to the zones in which they represent.</br> 
Once the rasters were prepared, the basemap was created. It was done using [TileMill] (https://tilemill-project.github.io/tilemill/). The tiles generated with this software were uploaded to S3 in AWS and can be used by anybody. Here is the basemap Url that can be brought as a basemap in Leaflet.js applications:</br></br> https://moojtest.s3.amazonaws.com/ready_maps/{z}/{x}/{y}.png

### Logo

Logo was created in [Inkscape](https://inkscape.org/) professional quality vector graphics software which runs on Linux, Mac OS X and Windows desktop computers.

![Dzierzioniow](https://github.com/gornyMooj/dzierzoniow-mapy/blob/master/images/text1272.png)

### Tools and technologies used
- Leaflet.js
- D3.js
- Gimp
- QGIS
- TileMill
- Inkscape
- AWS 
