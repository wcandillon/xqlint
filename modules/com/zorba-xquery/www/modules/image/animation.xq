xquery version "3.0";

(:
 : Copyright 2006-2009 The FLWOR Foundation.
 :
 : Licensed under the Apache License, Version 2.0 (the "License");
 : you may not use this file except in compliance with the License.
 : You may obtain a copy of the License at
 :
 : http://www.apache.org/licenses/LICENSE-2.0
 :
 : Unless required by applicable law or agreed to in writing, software
 : distributed under the License is distributed on an "AS IS" BASIS,
 : WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 : See the License for the specific language governing permissions and
 : limitations under the License.
:)

(:~
 : This module provides functions to create animated GIF images. 

 : @author Daniel Thomas
 : @library <a href="http://www.imagemagick.org/Magick++/">Magick++ C++ Library</a>
 : @project image
 :)
module namespace anim = 'http://www.zorba-xquery.com/modules/image/animation';

declare namespace ierr = "http://www.zorba-xquery.com/modules/image/error";
declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "1.0";

(:~
 : Creates an animated GIF image.
 : The resulting animated GIF shows the passed images consecutively. 
 : It has the same width and height as the first passed image.
 :
 : @param $images the image sequence
 : @param $delay the hundredths of seconds an image is shown
 : @param $iterations the amount of times all images are shown. 0 for infinite.
 : @return the animated GIF
 : @error ierr:IM001 one of the passed images is invalid.
 : @example test/Queries/image/animation_create.xq
 :)
declare function anim:create-animated-gif($images as xs:base64Binary+, $delay as xs:unsignedInt, $iterations as xs:unsignedInt) as xs:base64Binary external; 


(:~
 : Creates an animated GIF image with morph effect.
 : The resulting animated GIF shows the passed images consecutively with morph effect between the changes.
 : It has the same width and height as the first passed image.
 :
 : @param $images the image sequence
 : @param $delay the hundredths of seconds an image is shown
 : @param $iterations the amount of times all images are shown. 0 for infinite.
 : @param $nr-of-morph-images the number of additionally added images to create the morph effect between two passed images.
 : @return the animated GIF
 : @error ierr:IM001 one of the passed images is invalid.
 : @example test/Queries/image/animation_create.xq
 :)
declare function anim:create-morphed-gif($images as xs:base64Binary+, $delay as xs:unsignedInt, $iterations as xs:unsignedInt, $nr-of-morph-images as xs:unsignedInt) as xs:base64Binary external; 

