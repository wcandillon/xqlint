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
 : This module provides a function to extend an image with additional shapes. 
 : 
 : Fully supported image formats are:
 : <ul>
 :   <li>GIF</li>
 :   <li>JPEG</li>
 :   <li>PNG</li>
 :   <li>TIFF</li>
 :   <li>BMP</li>
 : </ul>
 :
 : <p>The errors raised by functions of this module have the namespace
 : <tt>http://www.zorba-xquery.com/modules/image/error</tt> (associated with prefix ierr).</p>
 :
 : @author Daniel Thomas
 : @library <a href="http://www.imagemagick.org/Magick++/">Magick++ C++ Library</a>
 : @project image
 :
 :)
module namespace paint = 'http://www.zorba-xquery.com/modules/image/paint';

import schema namespace img = 'http://www.zorba-xquery.com/modules/image/image';

declare namespace err = "http://www.w3.org/2005/xqt-errors";
declare namespace ierr = "http://www.zorba-xquery.com/modules/image/error";
declare namespace ver = "http://www.zorba-xquery.com/options/versioning";
declare option ver:module-version "1.0";


(:~
 : Extends the passed image with a sequence of shapes. 
 : The shapes are passed as a sequence of elements.
 : The possibilities for shape elements are:
 :    <ul>
 :      <li> line: 
 :        <pre class="brush: xml">
 :          &lt;img:line&gt;
 :            &lt;img:start&gt;&lt;img:x&gt;-20&lt;/img:x&gt;&lt;img:y&gt;-20&lt;/img:y&gt;&lt;/img:start&gt;
 :            &lt;img:end&gt;&lt;img:x&gt;80&lt;/img:x&gt;&lt;img:y&gt;80&lt;/img:y&gt;&lt;/img:end&gt;
 :          &lt;/img:line&gt;</pre>
 :      </li> 
 :       <li> polyline: 
 :         <pre class="brush: xml">
 :           &lt;img:polyLine&gt;
 :             &lt;img:point&gt;&lt;img:x&gt;10&lt;/img:x&gt;&lt;img:y&gt;10&lt;/img:y&gt;&lt;/img:point&gt;
 :             &lt;img:point&gt;&lt;img:x&gt;40&lt;/img:x&gt;&lt;img:y&gt;80&lt;/img:y&gt;&lt;/point&gt;
 :             &lt;img:point&gt;&lt;img:x&gt;50&lt;/img:x&gt;&lt;img:y&gt;30&lt;/img:y&gt;&lt;/point&gt;
 :             &lt;img:point&gt;&lt;img:x&gt;200&lt;/img:x&gt;&lt;img:y&gt;200&lt;/img:y&gt;&lt;/point&gt;
 :           &lt;/img:polyLine&gt; 
 :         </pre>
 :       </li>
 :       <li> stroked polyline: 
 :         <pre class="brush: xml">
 :           &lt;img:strokedPolyLine&gt;
 :             &lt;img:point&gt;&lt;img:x&gt;10&lt;/img:x&gt;&lt;img:y&gt;10&lt;/img:y&gt;&lt;/img:point&gt;
 :             &lt;img:point&gt;&lt;img:x&gt;40&lt;/img:x&gt;&lt;img:y&gt;80&lt;/img:y&gt;&lt;/img:point&gt;
 :             &lt;img:point&gt;&lt;img:x&gt;50&lt;/img:x&gt;&lt;img:y&gt;30&lt;/img:y&gt;&lt;/img:point&gt;
 :             &lt;img:strokeLength&gt;5&lt;/img:strokeLength&gt;&lt;img:gapLength&gt;2&lt;/img:gapLength&gt;
 :           &lt;/img:strokedPolyLine&gt;
 :         </pre>
 :       </li>
 :       <li> rectangle:
 :         <pre class="brush: xml">
 :           &lt;img:rectangle&gt;
 :             &lt;img:upperLeft&gt;&lt;img:x&gt;20&lt;/img:x&gt;&lt;img:y&gt;20&lt;/img:y&gt;&lt;/img:upperLeft&gt;
 :             &lt;img:lowerRight&gt;&lt;img:x&gt;50&lt;/img:x&gt;&lt;img:y&gt;50&lt;/img:y&gt;&lt;/img:lowerRight&gt;
 :           &lt;/img:rectangle&gt;
 :         </pre>
 :       </li>
 :       <li> rounded rectangle: 
 :         <pre class="brush: xml">
 :           &lt;img:roundedRectangle&gt;
 :             &lt;img:upperLeft&gt;&lt;img:x&gt;20&lt;/img:x&gt;&lt;img:y&gt;20&lt;/img:y&gt;&lt;/img:upperLeft&gt;
 :             &lt;img:lowerRight&gt;&lt;img:x&gt;50&lt;/img:x&gt;&lt;img:y&gt;50&lt;/img:y&gt;&lt;/img:lowerRight&gt;
 :             &lt;img:cornerWidth&gt;10&lt;/img:cornerWidth&gt;&lt;img:cornerHeight&gt;10&lt;/img:cornerHeight&gt;
 :           &lt;/img:roundedRectangle&gt;
 :         </pre>
 :       </li>
 :       <li> circle: 
 :         <pre class="brush: xml">
 :           &lt;img:circle&gt;
 :             &lt;img:origin&gt;&lt;img:x&gt;20&lt;/img:x&gt;&lt;img:y&gt;20&lt;/img:y&gt;&lt;/img:origin&gt;
 :             &lt;img:perimeter&gt;5&lt;/img:perimeter&gt;
 :           &lt;/img:circle&gt;
 :         </pre>
 :       </li>
 :       <li> ellipse: 
 :         <pre class="brush: xml">
 :           &lt;img:ellipse&gt;
 :             &lt;img:origin&gt;&lt;img:x&gt;50&lt;/img:x&gt;&lt;img:y&gt;50&lt;/img:y&gt;&lt;/img:origin&gt;
 :             &lt;img:perimeterX&gt;30&lt;/img:perimeterX&gt;&lt;img:perimeterY&gt;20&lt;/img:perimeterY&gt;
 :           &lt;/img:ellipse&gt;
 :         </pre>
 :       </li>
 :       <li> arc: 
 :         <pre class="brush: xml">
 :           &lt;img:arc&gt;
 :             &lt;img:origin&gt;&lt;img:x&gt;50&lt;/img:x&gt;&lt;img:y&gt;50&lt;/img:y&gt;&lt;/img:origin&gt;
 :             &lt;img:perimeterX&gt;10&lt;/img:perimeterX&gt;&lt;img:perimeterY&gt;20&lt;/img:perimeterY&gt;
 :             &lt;img:startDegrees&gt;180&lt;/img:startDegrees&gt;&lt;img:endDegrees&gt;270&lt;/img:endDegrees&gt;
 :           &lt;/img:arc&gt;
 :         </pre>
 :       </li>
 :       <li> polygon: 
 :         <pre class="brush: xml">
 :           &lt;img:polygon&gt;
 :             &lt;img:point&gt;&lt;img:x&gt;10&lt;/img:x&gt;&lt;img:y&gt;10&lt;/img:y&gt;&lt;/img:point&gt;
 :             &lt;img:point&gt;&lt;img:x&gt;40&lt;/img:x&gt;&lt;img:y&gt;80&lt;/img:y&gt;&lt;/img:point&gt;
 :             &lt;img:point&gt;&lt;img:x&gt;50&lt;/img:x&gt;&lt;img:y&gt;30&lt;/img:y&gt;&lt;/img:point&gt;
 :           &lt;/img:polygon&gt;
 :         </pre>
 :       </li>
 :       <li> text: 
 :         <pre class="brush: xml">
 :           &lt;img:text&gt;
 :             &lt;img:origin&gt;&lt;img:x&gt;20&lt;/img:x&gt;&lt;img:y&gt;20&lt;/img:y&gt;&lt;/img:origin&gt;
 :             &lt;img:text&gt;Hello Zorba&lt;/img:text&gt;&lt;img:font&gt;&lt;/img:font&gt;&lt;img:font-size&gt;12&lt;/img:font-size&gt;
 :           &lt;/img:text&gt;
 :         </pre>
 :       </li>
 :     </ul>
 : 
 : Optionally, each of the shape elements can contain elements to define the stroke with, stroke color, fill color, and anti-aliasing.
 : E.g.:
 : <p>
 :   <pre class="brush: xml">
 :     &lt;img:rectangle&gt;
 :       &lt;img:strokeWidth&gt;5&lt;/img:strokeWidth&gt;
 :       &lt;img:strokeColor&gt;#00AF00&lt;/img:strokeColor&gt;
 :       &lt;img:fillColor&gt;#A10000&lt;/img:fillColor&gt;
 :       &lt;img:antiAliasing&gt;true&lt;/img:antiAliasing&gt;
 :       &lt;img:upperLeft&gt;&lt;img:x&gt;20&lt;/img:x&gt;&lt;img:y&gt;20&lt;/img:y&gt;&lt;/img:upperLeft&gt;
 :       &lt;img:lowerRight&gt;&lt;img:x&gt;50&lt;/img:x&gt;&lt;img:y&gt;50&lt;/img:y&gt;&lt;/img:lowerRight&gt;
 :     &lt;/img:rectangle&gt;
 :   </pre>
 :  </p>
 : 
 : @param $image the passed image
 : @param $shapes the shapes
 : @return image with additional shapes 
 : @error ierr:IM001 the passed image is invalid.
 : @error err:FORG0001 one of the passed shape elements is invalid. 
 : @example test/Queries/image/paint_different_lines.xq
 : @example test/Queries/image/paint_polyline.xq
 : @example test/Queries/image/paint_stroked_polyline.xq
 : @example test/Queries/image/paint_polygon.xq
 : @example test/Queries/image/paint_rectangles.xq
 : @example test/Queries/image/paint_circles.xq
 : @example test/Queries/image/paint_text.xq
 :)
declare function paint:paint($image as xs:base64Binary, $shapes as element()*) as xs:base64Binary  {
  
  paint:paint-impl($image, for $x in $shapes return validate{$x})
};

declare %private function paint:paint-impl($image as xs:base64Binary, $shapes as element(*, img:paintableType)*) as xs:base64Binary external; 

