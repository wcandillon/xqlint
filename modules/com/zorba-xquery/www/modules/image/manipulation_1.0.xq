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
 : This module provides functions to handle image manipulations like resizing, zooming, 
 : special effects etc.
 :
 : <p>The errors raised by functions of this module have the namespace
 : <tt>http://www.zorba-xquery.com/modules/image/error</tt> (associated with prefix ierr).</p>
 :
 : @author Daniel Thomas
 : @library <a href="http://www.imagemagick.org/Magick++/">Magick++ C++ Library</a>
 : @project image
 :
 :)
module namespace man = 'http://www.zorba-xquery.com/modules/image/manipulation';

import schema namespace image = 'http://www.zorba-xquery.com/modules/image/image';

declare namespace err = "http://www.w3.org/2005/xqt-errors";
declare namespace ierr = "http://www.zorba-xquery.com/modules/image/error";
declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "1.0";

(:~
 : Get a copy of the passed image with changed width and height (without 
 : zooming the image's content). 
 : To change the size of the actual contents of an image, use the zoom function.
 :
 : More in detail: If the new dimensions are greater than the current dimensions 
 : the new image will have the passed image in the upper left corner and the rest 
 : will be filled with the current background color.
 : If the passed dimensions are less than the current dimensions, the new image 
 : will contain the specified rectangle of the passed image beginning at the upper 
 : left corner.
 :
 : @param $image image to resize
 : @param $width new width
 : @param $height new height
 : @return resized copy of the source image
 : @error ierr:IM001 passed image is invalid.
 : @example test/Queries/image/manipulation_resize.xq
 :)
declare function man:resize($image as xs:base64Binary, 
                            $width as xs:unsignedInt, 
                            $height as xs:unsignedInt) as xs:base64Binary external; 

(:~
 : Zoom the passed image by the specified factor while keeping the ratio between 
 : width and height.
 :
 : A ratio of less than 1 will make the image smaller. 
 : A ratio of less or equal than 0 will not effect the image.
 : Important note: this function does not change the size information stored in the
 : image (e.g. basic:width will not show a different value).
 :
 : @param $image image to resize
 : @param $ratio ratio to zoom width and height by
 : @return A copy of $image with resized content
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_zoom.xq
 :)
declare function man:zoom($image as xs:base64Binary, 
                          $ratio as xs:double) as xs:base64Binary external; 

(:~
 : Zoom the passed image to a given new width while keeping the ratio between 
 : width and height. 
 : So, the height is scaled accordingly.
 : Important note: this function does not change the size information stored 
 : in the image (e.g. basic:width will not show a different value).
 : 
 : @param $image image to resize
 : @param $width new width for the image in pixels
 : @return A copy of $image with given $width and height changed accordingly
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_zoom_width.xq
 :)
declare function man:zoom-by-width($image as xs:base64Binary, 
                                   $width as xs:unsignedInt) as xs:base64Binary external; 


(:~
 : Zoom the passed image to a given new height while keeping the ratio between 
 : width and height.
 : So, the width is scaled accordingly.
 : Important note: this function does not change the size information stored 
 : in the image (e.g. basic:width will not show a different value).
 : 
 : @param $image image to resize
 : @param $height new height for the image in pixels
 : @return A copy of $image with given $height and width adjusted accordingly
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_zoom_height.xq
 :)
declare function man:zoom-by-height($image as xs:base64Binary, 
                                    $height as xs:unsignedInt) as xs:base64Binary external; 

(:~
 : Copy a part of the source image specified by a rectangle. 
 : If the passed parameters for the sub-image specify a rectangle that isn't 
 : entirely within the source image only the area that lies within the image 
 : boundaries will be returned.
 :
 : @param $image the image from which to extract a sub-image
 : @param $left-upper-x is the x value of the upper left corner of the rectangle
 :                      to cut out
 : @param $left-upper-y is the y value of the upper left corner of the rectangle
 :                      to cut out.
 : @param $width width of the rectangle to cut out
 : @param $height height of the rectangle to cut out
 : @return A new image containing parts of the source image
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_sub_image.xq
 :)
declare function man:sub-image($image as xs:base64Binary, 
                               $left-upper-x as xs:unsignedInt, 
                               $left-upper-y as xs:unsignedInt, 
                               $width as xs:unsignedInt, 
                               $height as xs:unsignedInt) as xs:base64Binary external; 

(:~
 : Overlay $image with $overlay-image at the specfied position.
 :
 : The $operator defines the details of the overlay and can have one of the 
 : following values:
 : <ul> 
 :   <li>OverCompositeOp: The result is the union of the two image shapes 
 :       with the overlay image obscuring image in the region of overlap.</li> 
 :   <li>InCompositeOp: The result is a simple overlay image cut by the shape 
 :       of image. None of the image data of image is included in the result.</li>
 :   <li>OutCompositeOp: The resulting image is the overlay image with the shape 
 :       of image cut out.</li>
 :   <li>AtopCompositeOp: The result is the same shape as image, with overlay 
 :       image obscuring image there the image shapes overlap. Note that this 
 :       differs from OverCompositeOp because the portion of composite image 
 :       outside of image's shape does not appear in the result.</li>
 :   <li>XorCompositeOp: The result is the image data from both overlay image 
 :       and image that is outside the overlap region. The overlap region will 
 :       be blank.</li>
 :   <li>PlusCompositeOp: The result is just the sum of the image data of both 
 :       images. Output values are cropped to 255 (no overflow). This operation 
 :       is independent of the matte channels.</li>
 :   <li>MinusCompositeOp: The result of overlay image - image, with overflow 
 :       cropped to zero. The matte chanel is ignored (set to 255, full 
 :       coverage).</li>
 :   <li>AddCompositeOp: The result of overlay image + image, with overflow 
 :       wrapping around (mod 256).</li>
 :   <li>SubtractCompositeOp: The result of overlay image - image, with underflow 
 :       wrapping around (mod 256). The add and subtract operators can be used to 
 :       perform reverible transformations.</li>
 :   <li>DifferenceCompositeOp: The result of abs(overlay image - image). This is 
 :       useful for comparing two very similar images.</li>
 :   <li>BumpmapCompositeOp: The result image shaded by overlay image.</li>
 : </ul>
 : 
 : @param $image base image
 : @param $overlay-image image to overlay.
 : @param $overlay-upper-left-x horizontal position within $image where the left 
 :                              upper edge of the $overlay-image is placed
 : @param $overlay-upper-left-y vertical position within $image where the left 
 :                              upper edge of the $overlay-image is placed
 : @param $operator defines how the overlay image should be overlayed (see details
 :                  in operator listing above)
 : @return A new image consisting of $image overlayed with $overlay-image.
 : @error ierr:IM001 passed image is invalid
 : @error err:FORG0001 unsupported operator
 : @example test/Queries/image/manipulation_overlay.xq
 :)
declare function man:overlay($image as xs:base64Binary, 
                             $overlay-image as xs:base64Binary, 
                             $overlay-upper-left-x as xs:unsignedInt,
                             $overlay-upper-left-y as xs:unsignedInt, 
                             $operator as xs:string) as xs:base64Binary {
  man:overlay-impl($image, 
                   $overlay-image, 
                   $overlay-upper-left-x, 
                   $overlay-upper-left-y, 
                   image:compositeOperatorType($operator)) 
}; 

declare %private function man:overlay-impl($image as xs:base64Binary, 
                                           $overlay-image as xs:base64Binary, 
                                           $overlay-upper-left-x as xs:unsignedInt,
                                           $overlay-upper-left-y as xs:unsignedInt, 
                                           $operator as image:compositeOperatorType) 
  as xs:base64Binary external; 

(:~
 : Copy a part of a source image as new image. 
 : The copied part is all right of $upper-left-x and below $upper-left-y.
 : 
 : @param $image source image
 : @param $upper-left-x x position of the upper left corner of the part to copy
 : @param $upper-left-y y position of the upper left corner of the part to copy
 : @return A new image copied from a part of source image
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_chop.xq
 :)
declare function man:chop($image as xs:base64Binary, 
                          $upper-left-x as xs:unsignedInt, 
                          $upper-left-y as xs:unsignedInt) as xs:base64Binary external; 

(:~
 : Copy a part of a source image as new image.
 : The copied part is all left of $lower-right-x and above $lower-right-y.
 : 
 : @param $image source image
 : @param $lower-right-x x position of the lower right corner of the part to copy
 : @param $lower-right-y y position of the lower right corner of the part to copy
 : @return A new image copied from a part of source image
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_crop.xq
 :)
declare function man:crop($image as xs:base64Binary, 
                          $lower-right-x as xs:unsignedInt, 
                          $lower-right-y as xs:unsignedInt) as xs:base64Binary external; 


(:~
 : Get a new image as rotated copy of a passed source image (rotated by -360 to 
 : 360 degrees).
 : The image is enlarged if this is required for containing the rotated image, 
 : but never shrunk even if the rotation would make a smaller image possible.
 :
 : @param $image source image.
 : @param $angle between -360 to 360 degrees. Other values will be adjusted by 
 :               modulo 360
 : @return A rotated copy of $image
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_rotate.xq
 :)
declare function man:rotate($image as xs:base64Binary, 
                            $angle as xs:int) as xs:base64Binary external; 


(:~
 : Set all pixels of the image to the current backround color.
 : In most cases, this will result in all pixels to be set to white.
 :
 : @param $image image to erase
 : @return A copy of image with all pixels set to the current background color
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_erase.xq
 :)
declare function man:erase($image as xs:base64Binary) as xs:base64Binary external; 

(:~
 : Flop an image (horizontal rotation).
 :
 : @param $image source image
 : @return A horizontally rotated copy of $image
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_flop.xq
 :)
declare function man:flop($image as xs:base64Binary) as xs:base64Binary external; 

(:~
 : Flip an image (vertical rotation).
 :
 : @param $image source image
 : @return A vertically rotated copy of $image
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_flip.xq
 :)
declare function man:flip($image as xs:base64Binary) as xs:base64Binary external; 

(:~
 : Trim edges of the image's background color from the image.
 :
 : @param $image the source image
 : @return A trimmed copy of $image
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_trim.xq
 :)
declare function man:trim($image as xs:base64Binary) as xs:base64Binary external; 

(:~
 : Add noise to an image.
 :
 : Allowed noise types are: 
 : <ul> 
 :  <li>UniformNoise</li>
 :  <li>GaussianNoise</li>
 :  <li>MultiplicativeGaussianNoise</li>
 :  <li>ImpulseNoise</li>
 :  <li>LaplaceianNoise</li>
 :  <li>PoissonNoise</li>
 : </ul>
 :
 : @param $image the source image
 : @param $noise-type specifies the type of noise to add 
 : @return A copy of $image with added noise
 : @error ierr:IM001 passed image is invalid
 : @error err:FORG0001 unsupported noise type
 : @example test/Queries/image/manipulation_add_noise.xq
 :)
declare function man:add-noise($image as xs:base64Binary, 
                               $noise-type as xs:string) as xs:base64Binary {
  man:add-noise-impl($image, image:noiseType($noise-type)) 
}; 

declare %private function man:add-noise-impl($image as xs:base64Binary, 
                                             $noise-type as image:noiseType) 
  as xs:base64Binary external;

(:~ 
 : Blur an image.
 : 
 : @param $image the source image
 : @param $radius is the radius of the Gaussian in pixels.
 : @param $sigma is the standard deviation of the Laplacian in pixels.
 : @return A blured copy of $image
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_blur.xq
 :)
declare function man:blur($image as xs:base64Binary, 
                          $radius as xs:int, 
                          $sigma as xs:int) as xs:base64Binary external; 

(:~
 : Despeckle an image.
 : 
 : @param $image the source image
 : @return A despeckled copy of $image
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_despeckle.xq
 :)
declare function man:despeckle($image as xs:base64Binary) as xs:base64Binary external; 

(:~
 : Enhance an images (minimizes noise).
 : 
 : @param $image the source image
 : @return An enhanced copy of $image.
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_enhance.xq
 :) 
declare function man:enhance($image as xs:base64Binary) as xs:base64Binary external; 

(:~
 : Equalize an images (histogramm equalization).
 : 
 : @param $image the source image
 : @return An equalized copy of $image.
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_equalize.xq
 :) 
declare function man:equalize($image as xs:base64Binary) as xs:base64Binary external; 

(:~
 : Highlight edges in an image.
 : 
 : @param $image the source image
 : @param $radius radius of the pixel neighborhood (0 for automatic selection)
 : @return An edged copy of $image
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_edge.xq
 :) 
declare function man:edge($image as xs:base64Binary, 
                          $radius as xs:unsignedInt) as xs:base64Binary external; 

(:~
 : Apply a charcoal effect to the image (looks like a charcoal sketch).
 :
 : @param $image the source image
 : @param $radius radius of the Gaussian in pixels
 : @param $sigma standard deviation of the Laplacian in pixels
 : @return A charcoaled copy of $image
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_charcoal.xq
 :)
declare function man:charcoal($image as xs:base64Binary, 
                              $radius as xs:double, 
                              $sigma as xs:double) as xs:base64Binary external; 

(:~
 : Emboss an images (highlights edges with 3D effect).
 : 
 : @param $image the source image
 : @param $radius radius of the Gaussian in pixels
 : @param $sigma standard deviation of the Laplacian in pixels
 : @return An embossed copy of $image
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_emboss.xq
 :) 
declare function man:emboss($image as xs:base64Binary, 
                            $radius as xs:double, 
                            $sigma as xs:double) as xs:base64Binary external; 

(:~
 : Apply a solarize effect to the image (similar to the effect seen when 
 : exposing a photographic film to light during the development process).
 :
 : @param $image the source image
 : @param $factor strength of the solarization (0 to 65535; 65535=100%)
 : @return A solarized copy of $image.
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_solarize.xq
 :)
declare function man:solarize($image as xs:base64Binary, 
                              $factor as xs:double) as xs:base64Binary external; 

(:~
 : Make two passed images appear as stereo image when viewed with red-blue glasses.
 : Both images should be same but from a slightly different angle for this to work.
 : Both images should have the same size, if not, the size of the left image will 
 : be taken.
 :
 : @param $left-image left image for the stereo image.
 : @param $right-image right image for the stereo image.
 : @return A new image as combined stereo image of both source images
 : @error ierr:IM001 one of the passed images is invalid
 : @example test/Queries/image/manipulation_stereo.xq
 :)
declare function man:stereo($left-image as xs:base64Binary, 
                            $right-image as xs:base64Binary) as xs:base64Binary external; 

(:~
 : Make all pixels of the specfied color transparent.
 :
 : This works correctly only with image types supporting transparency 
 : (e.g GIF or PNG).
 :
 : @param $image the source image
 : @param $color color to make transparent (e.g. '#FFFFFF')
 : @return A copy of $image with the specified color made transparent.
 : @error ierr:IM001 passed image is invalid
 : @error err:FORG0001 unsupported color
 : @example test/Queries/image/manipulation_transparent.xq
 :)
declare function man:transparent($image as xs:base64Binary, 
                                 $color as xs:string) as xs:base64Binary {
  man:transparent-impl($image, image:colorType($color))
};

declare %private function man:transparent-impl($image as xs:base64Binary, $color as image:colorType) as xs:base64Binary external; 

(:~
 : Swirl an image (image pixels are rotated by degree).
 :
 : @param $image the source image
 : @param $degree degree to swirl image pixels
 : @return A swirled copy of $image
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_swirl.xq
 :)
declare function man:swirl($image as xs:base64Binary, 
                           $degree as xs:double) as xs:base64Binary external; 

(:~
 : Reduce noise of an image using a noise peak elemination filter.
 :
 : @param $image the source image
 : @param $order defines how much the noise is reduced
 : @return A copy of $image with reduced noise
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_reduce_noise.xq
 :)
declare function man:reduce-noise($image as xs:base64Binary, 
                                  $order as xs:double) as xs:base64Binary external; 
 
(:~
 : Contrast an image (enhances image intensity differences) by a given value.
 : 
 : @param $image the source image
 : @param $sharpen defines how much the image is contrasted.
 : @return A contrasted copy of $image 
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_contrast.xq
 :)
declare function man:contrast($image as xs:base64Binary, 
                              $sharpen as xs:double) as xs:base64Binary external;

(:~
 : Gamma correct an image.
 : Gamma values less than zero will erase the image.
 : 
 : @param $image the source image
 : @param $gamma-value value for which to gamma correct the image
 : @return A gamma corrected copy of $image
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_gamma.xq
 :)
declare function man:gamma($image as xs:base64Binary, 
                           $gamma-value as xs:double) as xs:base64Binary external;

(:~
 : Gamma correct an image for every color channel seperately.
 : Gamma values less than zero for any color will erase the corresponding color.
 : 
 : @param $image the source image
 : @param $gamma-red value to gamma correct the red channel of the image
 : @param $gamma-green value to gamma correct the green channel of the image
 : @param $gamma-blue value to gamma correct the blue channel of the image
 : @return A gamma corrected copy of $image
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_gamma2.xq
 :)
declare function man:gamma($image as xs:base64Binary, 
                           $gamma-red as xs:double, 
                           $gamma-green as xs:double, 
                           $gamma-blue as xs:double) as xs:base64Binary external; 
    
(:~
 : Apply an implode effect to an image (a sort of special effect).
 : 
 : @param $image the source image
 : @param $factor factor to implode to
 : @return An imploded copy of $image.
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_implode.xq 
 :)
declare function man:implode($image as xs:base64Binary, 
                             $factor as xs:double) as xs:base64Binary external; 

(:~
 : Apply an oil paint effect to an image (makes the image look as if it was 
 : an oil paint).
 :
 : @param $image the source image
 : @param $radius radius with which to oil paint
 : @return A oil-painted copy of $image
 : @error ierr:IM001 passed image is invalid
 : @example test/Queries/image/manipulation_oil_paint.xq
 :)
declare function man:oil-paint($image as xs:base64Binary, 
                               $radius as xs:double) as xs:base64Binary external; 
 
(:~
 : Add a $watermark image to $image.
 : 
 : @param $image the source image
 : @param $watermark the watermark image
 : @return A watermarked copy of $image
 : @error ierr:IM001 one of the passed images is invalid
 : @example test/Queries/image/manipulation_watermark.xq
 :)
declare function man:watermark($image as xs:base64Binary, 
                               $watermark as xs:base64Binary) as xs:base64Binary external; 

