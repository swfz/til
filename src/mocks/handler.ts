import { http, HttpResponse } from "msw"

import query0Words from "./algolia-search-response-0-words.json"
import query1Words from "./algolia-search-response-1-words.json"
import query2Words from "./algolia-search-response-2-words.json"
import query3Words from "./algolia-search-response-3-words.json"
import query4Words from "./algolia-search-response-4-words.json"
import query5Words from "./algolia-search-response-5-words.json"
import query6Words from "./algolia-search-response-6-words.json"
import query7Words from "./algolia-search-response-7-words.json"
import query8Words from "./algolia-search-response-8-words.json"

// FIXME: ./pixela.png をplaywright側で読み込めなかったので一旦インラインSVGにしている
const svgContent = `
    <?xml version="1.0" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
      "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 220 135"><defs>
        <style type="text/css"><![CDATA[
          .month {
            font-family: arial;
            fill: #000000;}
          .legend {
            font-family: arial;
            fill: #000000;}
        ]]></style>
      </defs>
      
        <rect x="0" y="0" width="220" height="135" fill="white" fill-opacity="0.5" stroke="none"/><g transform="translate(16, 20)">
        <g transform="translate(0, 0)"><a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210711/retina.svg" target="_blank"><rect data-tippy-content="8 pageviews on 2021-07-11" class="each-day" rx="2" ry="2" width="10" height="10" x="13" y="0" fill="#ffd5d5" data-count="8" data-date="2021-07-11" data-unit="pageviews" data-retina="false" data-retinaday="20210711" data-index="94" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210712/retina.svg" target="_blank"><rect data-tippy-content="142 pageviews on 2021-07-12" class="each-day" rx="2" ry="2" width="10" height="10" x="13" y="12" fill="#ff0000" data-count="142" data-date="2021-07-12" data-unit="pageviews" data-retina="false" data-retinaday="20210712" data-index="93" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210713/retina.svg" target="_blank"><rect data-tippy-content="45 pageviews on 2021-07-13" class="each-day" rx="2" ry="2" width="10" height="10" x="13" y="24" fill="#ff8080" data-count="45" data-date="2021-07-13" data-unit="pageviews" data-retina="false" data-retinaday="20210713" data-index="92" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210714/retina.svg" target="_blank"><rect data-tippy-content="83 pageviews on 2021-07-14" class="each-day" rx="2" ry="2" width="10" height="10" x="13" y="36" fill="#ff0000" data-count="83" data-date="2021-07-14" data-unit="pageviews" data-retina="false" data-retinaday="20210714" data-index="91" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210715/retina.svg" target="_blank"><rect data-tippy-content="43 pageviews on 2021-07-15" class="each-day" rx="2" ry="2" width="10" height="10" x="13" y="48" fill="#ff8080" data-count="43" data-date="2021-07-15" data-unit="pageviews" data-retina="false" data-retinaday="20210715" data-index="90" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210716/retina.svg" target="_blank"><rect data-tippy-content="71 pageviews on 2021-07-16" class="each-day" rx="2" ry="2" width="10" height="10" x="13" y="60" fill="#ff2b2b" data-count="71" data-date="2021-07-16" data-unit="pageviews" data-retina="false" data-retinaday="20210716" data-index="89" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210717/retina.svg" target="_blank"><rect data-tippy-content="19 pageviews on 2021-07-17" class="each-day" rx="2" ry="2" width="10" height="10" x="13" y="72" fill="#ffd5d5" data-count="19" data-date="2021-07-17" data-unit="pageviews" data-retina="false" data-retinaday="20210717" data-index="88" /></a></g>
        <g transform="translate(13, 0)"><a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210718/retina.svg" target="_blank"><rect data-tippy-content="59 pageviews on 2021-07-18" class="each-day" rx="2" ry="2" width="10" height="10" x="12" y="0" fill="#ff2b2b" data-count="59" data-date="2021-07-18" data-unit="pageviews" data-retina="false" data-retinaday="20210718" data-index="87" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210719/retina.svg" target="_blank"><rect data-tippy-content="70 pageviews on 2021-07-19" class="each-day" rx="2" ry="2" width="10" height="10" x="12" y="12" fill="#ff2b2b" data-count="70" data-date="2021-07-19" data-unit="pageviews" data-retina="false" data-retinaday="20210719" data-index="86" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210720/retina.svg" target="_blank"><rect data-tippy-content="61 pageviews on 2021-07-20" class="each-day" rx="2" ry="2" width="10" height="10" x="12" y="24" fill="#ff2b2b" data-count="61" data-date="2021-07-20" data-unit="pageviews" data-retina="false" data-retinaday="20210720" data-index="85" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210721/retina.svg" target="_blank"><rect data-tippy-content="62 pageviews on 2021-07-21" class="each-day" rx="2" ry="2" width="10" height="10" x="12" y="36" fill="#ff2b2b" data-count="62" data-date="2021-07-21" data-unit="pageviews" data-retina="false" data-retinaday="20210721" data-index="84" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210722/retina.svg" target="_blank"><rect data-tippy-content="38 pageviews on 2021-07-22" class="each-day" rx="2" ry="2" width="10" height="10" x="12" y="48" fill="#ff8080" data-count="38" data-date="2021-07-22" data-unit="pageviews" data-retina="false" data-retinaday="20210722" data-index="83" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210723/retina.svg" target="_blank"><rect data-tippy-content="59 pageviews on 2021-07-23" class="each-day" rx="2" ry="2" width="10" height="10" x="12" y="60" fill="#ff2b2b" data-count="59" data-date="2021-07-23" data-unit="pageviews" data-retina="false" data-retinaday="20210723" data-index="82" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210724/retina.svg" target="_blank"><rect data-tippy-content="36 pageviews on 2021-07-24" class="each-day" rx="2" ry="2" width="10" height="10" x="12" y="72" fill="#ff8080" data-count="36" data-date="2021-07-24" data-unit="pageviews" data-retina="false" data-retinaday="20210724" data-index="81" /></a></g>
        <g transform="translate(26, 0)"><a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210725/retina.svg" target="_blank"><rect data-tippy-content="41 pageviews on 2021-07-25" class="each-day" rx="2" ry="2" width="10" height="10" x="11" y="0" fill="#ff8080" data-count="41" data-date="2021-07-25" data-unit="pageviews" data-retina="false" data-retinaday="20210725" data-index="80" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210726/retina.svg" target="_blank"><rect data-tippy-content="20 pageviews on 2021-07-26" class="each-day" rx="2" ry="2" width="10" height="10" x="11" y="12" fill="#ffd5d5" data-count="20" data-date="2021-07-26" data-unit="pageviews" data-retina="false" data-retinaday="20210726" data-index="79" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210727/retina.svg" target="_blank"><rect data-tippy-content="49 pageviews on 2021-07-27" class="each-day" rx="2" ry="2" width="10" height="10" x="11" y="24" fill="#ff8080" data-count="49" data-date="2021-07-27" data-unit="pageviews" data-retina="false" data-retinaday="20210727" data-index="78" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210728/retina.svg" target="_blank"><rect data-tippy-content="53 pageviews on 2021-07-28" class="each-day" rx="2" ry="2" width="10" height="10" x="11" y="36" fill="#ff2b2b" data-count="53" data-date="2021-07-28" data-unit="pageviews" data-retina="false" data-retinaday="20210728" data-index="77" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210729/retina.svg" target="_blank"><rect data-tippy-content="28 pageviews on 2021-07-29" class="each-day" rx="2" ry="2" width="10" height="10" x="11" y="48" fill="#ffd5d5" data-count="28" data-date="2021-07-29" data-unit="pageviews" data-retina="false" data-retinaday="20210729" data-index="76" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210730/retina.svg" target="_blank"><rect data-tippy-content="31 pageviews on 2021-07-30" class="each-day" rx="2" ry="2" width="10" height="10" x="11" y="60" fill="#ff8080" data-count="31" data-date="2021-07-30" data-unit="pageviews" data-retina="false" data-retinaday="20210730" data-index="75" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210731/retina.svg" target="_blank"><rect data-tippy-content="20 pageviews on 2021-07-31" class="each-day" rx="2" ry="2" width="10" height="10" x="11" y="72" fill="#ffd5d5" data-count="20" data-date="2021-07-31" data-unit="pageviews" data-retina="false" data-retinaday="20210731" data-index="74" /></a></g>
        <g transform="translate(39, 0)"><a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210801/retina.svg" target="_blank"><rect data-tippy-content="0 pageviews on 2021-08-01" class="each-day" rx="2" ry="2" width="10" height="10" x="10" y="0" fill="#eeeeee" data-count="0" data-date="2021-08-01" data-unit="pageviews" data-retina="false" data-retinaday="20210801" data-index="73" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210802/retina.svg" target="_blank"><rect data-tippy-content="35 pageviews on 2021-08-02" class="each-day" rx="2" ry="2" width="10" height="10" x="10" y="12" fill="#ff8080" data-count="35" data-date="2021-08-02" data-unit="pageviews" data-retina="false" data-retinaday="20210802" data-index="72" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210803/retina.svg" target="_blank"><rect data-tippy-content="58 pageviews on 2021-08-03" class="each-day" rx="2" ry="2" width="10" height="10" x="10" y="24" fill="#ff2b2b" data-count="58" data-date="2021-08-03" data-unit="pageviews" data-retina="false" data-retinaday="20210803" data-index="71" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210804/retina.svg" target="_blank"><rect data-tippy-content="61 pageviews on 2021-08-04" class="each-day" rx="2" ry="2" width="10" height="10" x="10" y="36" fill="#ff2b2b" data-count="61" data-date="2021-08-04" data-unit="pageviews" data-retina="false" data-retinaday="20210804" data-index="70" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210805/retina.svg" target="_blank"><rect data-tippy-content="44 pageviews on 2021-08-05" class="each-day" rx="2" ry="2" width="10" height="10" x="10" y="48" fill="#ff8080" data-count="44" data-date="2021-08-05" data-unit="pageviews" data-retina="false" data-retinaday="20210805" data-index="69" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210806/retina.svg" target="_blank"><rect data-tippy-content="51 pageviews on 2021-08-06" class="each-day" rx="2" ry="2" width="10" height="10" x="10" y="60" fill="#ff2b2b" data-count="51" data-date="2021-08-06" data-unit="pageviews" data-retina="false" data-retinaday="20210806" data-index="68" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210807/retina.svg" target="_blank"><rect data-tippy-content="9 pageviews on 2021-08-07" class="each-day" rx="2" ry="2" width="10" height="10" x="10" y="72" fill="#ffd5d5" data-count="9" data-date="2021-08-07" data-unit="pageviews" data-retina="false" data-retinaday="20210807" data-index="67" /></a></g>
        <g transform="translate(52, 0)"><a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210808/retina.svg" target="_blank"><rect data-tippy-content="14 pageviews on 2021-08-08" class="each-day" rx="2" ry="2" width="10" height="10" x="9" y="0" fill="#ffd5d5" data-count="14" data-date="2021-08-08" data-unit="pageviews" data-retina="false" data-retinaday="20210808" data-index="66" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210809/retina.svg" target="_blank"><rect data-tippy-content="44 pageviews on 2021-08-09" class="each-day" rx="2" ry="2" width="10" height="10" x="9" y="12" fill="#ff8080" data-count="44" data-date="2021-08-09" data-unit="pageviews" data-retina="false" data-retinaday="20210809" data-index="65" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210810/retina.svg" target="_blank"><rect data-tippy-content="20 pageviews on 2021-08-10" class="each-day" rx="2" ry="2" width="10" height="10" x="9" y="24" fill="#ffd5d5" data-count="20" data-date="2021-08-10" data-unit="pageviews" data-retina="false" data-retinaday="20210810" data-index="64" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210811/retina.svg" target="_blank"><rect data-tippy-content="37 pageviews on 2021-08-11" class="each-day" rx="2" ry="2" width="10" height="10" x="9" y="36" fill="#ff8080" data-count="37" data-date="2021-08-11" data-unit="pageviews" data-retina="false" data-retinaday="20210811" data-index="63" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210812/retina.svg" target="_blank"><rect data-tippy-content="56 pageviews on 2021-08-12" class="each-day" rx="2" ry="2" width="10" height="10" x="9" y="48" fill="#ff2b2b" data-count="56" data-date="2021-08-12" data-unit="pageviews" data-retina="false" data-retinaday="20210812" data-index="62" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210813/retina.svg" target="_blank"><rect data-tippy-content="46 pageviews on 2021-08-13" class="each-day" rx="2" ry="2" width="10" height="10" x="9" y="60" fill="#ff8080" data-count="46" data-date="2021-08-13" data-unit="pageviews" data-retina="false" data-retinaday="20210813" data-index="61" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210814/retina.svg" target="_blank"><rect data-tippy-content="20 pageviews on 2021-08-14" class="each-day" rx="2" ry="2" width="10" height="10" x="9" y="72" fill="#ffd5d5" data-count="20" data-date="2021-08-14" data-unit="pageviews" data-retina="false" data-retinaday="20210814" data-index="60" /></a></g>
        <g transform="translate(65, 0)"><a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210815/retina.svg" target="_blank"><rect data-tippy-content="17 pageviews on 2021-08-15" class="each-day" rx="2" ry="2" width="10" height="10" x="8" y="0" fill="#ffd5d5" data-count="17" data-date="2021-08-15" data-unit="pageviews" data-retina="false" data-retinaday="20210815" data-index="59" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210816/retina.svg" target="_blank"><rect data-tippy-content="44 pageviews on 2021-08-16" class="each-day" rx="2" ry="2" width="10" height="10" x="8" y="12" fill="#ff8080" data-count="44" data-date="2021-08-16" data-unit="pageviews" data-retina="false" data-retinaday="20210816" data-index="58" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210817/retina.svg" target="_blank"><rect data-tippy-content="68 pageviews on 2021-08-17" class="each-day" rx="2" ry="2" width="10" height="10" x="8" y="24" fill="#ff2b2b" data-count="68" data-date="2021-08-17" data-unit="pageviews" data-retina="false" data-retinaday="20210817" data-index="57" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210818/retina.svg" target="_blank"><rect data-tippy-content="62 pageviews on 2021-08-18" class="each-day" rx="2" ry="2" width="10" height="10" x="8" y="36" fill="#ff2b2b" data-count="62" data-date="2021-08-18" data-unit="pageviews" data-retina="false" data-retinaday="20210818" data-index="56" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210819/retina.svg" target="_blank"><rect data-tippy-content="71 pageviews on 2021-08-19" class="each-day" rx="2" ry="2" width="10" height="10" x="8" y="48" fill="#ff2b2b" data-count="71" data-date="2021-08-19" data-unit="pageviews" data-retina="false" data-retinaday="20210819" data-index="55" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210820/retina.svg" target="_blank"><rect data-tippy-content="117 pageviews on 2021-08-20" class="each-day" rx="2" ry="2" width="10" height="10" x="8" y="60" fill="#ff0000" data-count="117" data-date="2021-08-20" data-unit="pageviews" data-retina="false" data-retinaday="20210820" data-index="54" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210821/retina.svg" target="_blank"><rect data-tippy-content="25 pageviews on 2021-08-21" class="each-day" rx="2" ry="2" width="10" height="10" x="8" y="72" fill="#ffd5d5" data-count="25" data-date="2021-08-21" data-unit="pageviews" data-retina="false" data-retinaday="20210821" data-index="53" /></a></g>
        <g transform="translate(78, 0)"><a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210822/retina.svg" target="_blank"><rect data-tippy-content="16 pageviews on 2021-08-22" class="each-day" rx="2" ry="2" width="10" height="10" x="7" y="0" fill="#ffd5d5" data-count="16" data-date="2021-08-22" data-unit="pageviews" data-retina="false" data-retinaday="20210822" data-index="52" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210823/retina.svg" target="_blank"><rect data-tippy-content="60 pageviews on 2021-08-23" class="each-day" rx="2" ry="2" width="10" height="10" x="7" y="12" fill="#ff2b2b" data-count="60" data-date="2021-08-23" data-unit="pageviews" data-retina="false" data-retinaday="20210823" data-index="51" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210824/retina.svg" target="_blank"><rect data-tippy-content="38 pageviews on 2021-08-24" class="each-day" rx="2" ry="2" width="10" height="10" x="7" y="24" fill="#ff8080" data-count="38" data-date="2021-08-24" data-unit="pageviews" data-retina="false" data-retinaday="20210824" data-index="50" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210825/retina.svg" target="_blank"><rect data-tippy-content="64 pageviews on 2021-08-25" class="each-day" rx="2" ry="2" width="10" height="10" x="7" y="36" fill="#ff2b2b" data-count="64" data-date="2021-08-25" data-unit="pageviews" data-retina="false" data-retinaday="20210825" data-index="49" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210826/retina.svg" target="_blank"><rect data-tippy-content="52 pageviews on 2021-08-26" class="each-day" rx="2" ry="2" width="10" height="10" x="7" y="48" fill="#ff2b2b" data-count="52" data-date="2021-08-26" data-unit="pageviews" data-retina="false" data-retinaday="20210826" data-index="48" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210827/retina.svg" target="_blank"><rect data-tippy-content="74 pageviews on 2021-08-27" class="each-day" rx="2" ry="2" width="10" height="10" x="7" y="60" fill="#ff0000" data-count="74" data-date="2021-08-27" data-unit="pageviews" data-retina="false" data-retinaday="20210827" data-index="47" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210828/retina.svg" target="_blank"><rect data-tippy-content="57 pageviews on 2021-08-28" class="each-day" rx="2" ry="2" width="10" height="10" x="7" y="72" fill="#ff2b2b" data-count="57" data-date="2021-08-28" data-unit="pageviews" data-retina="false" data-retinaday="20210828" data-index="46" /></a></g>
        <g transform="translate(91, 0)"><a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210829/retina.svg" target="_blank"><rect data-tippy-content="12 pageviews on 2021-08-29" class="each-day" rx="2" ry="2" width="10" height="10" x="6" y="0" fill="#ffd5d5" data-count="12" data-date="2021-08-29" data-unit="pageviews" data-retina="false" data-retinaday="20210829" data-index="45" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210830/retina.svg" target="_blank"><rect data-tippy-content="36 pageviews on 2021-08-30" class="each-day" rx="2" ry="2" width="10" height="10" x="6" y="12" fill="#ff8080" data-count="36" data-date="2021-08-30" data-unit="pageviews" data-retina="false" data-retinaday="20210830" data-index="44" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210831/retina.svg" target="_blank"><rect data-tippy-content="56 pageviews on 2021-08-31" class="each-day" rx="2" ry="2" width="10" height="10" x="6" y="24" fill="#ff2b2b" data-count="56" data-date="2021-08-31" data-unit="pageviews" data-retina="false" data-retinaday="20210831" data-index="43" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210901/retina.svg" target="_blank"><rect data-tippy-content="52 pageviews on 2021-09-01" class="each-day" rx="2" ry="2" width="10" height="10" x="6" y="36" fill="#ff2b2b" data-count="52" data-date="2021-09-01" data-unit="pageviews" data-retina="false" data-retinaday="20210901" data-index="42" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210902/retina.svg" target="_blank"><rect data-tippy-content="63 pageviews on 2021-09-02" class="each-day" rx="2" ry="2" width="10" height="10" x="6" y="48" fill="#ff2b2b" data-count="63" data-date="2021-09-02" data-unit="pageviews" data-retina="false" data-retinaday="20210902" data-index="41" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210903/retina.svg" target="_blank"><rect data-tippy-content="63 pageviews on 2021-09-03" class="each-day" rx="2" ry="2" width="10" height="10" x="6" y="60" fill="#ff2b2b" data-count="63" data-date="2021-09-03" data-unit="pageviews" data-retina="false" data-retinaday="20210903" data-index="40" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210904/retina.svg" target="_blank"><rect data-tippy-content="22 pageviews on 2021-09-04" class="each-day" rx="2" ry="2" width="10" height="10" x="6" y="72" fill="#ffd5d5" data-count="22" data-date="2021-09-04" data-unit="pageviews" data-retina="false" data-retinaday="20210904" data-index="39" /></a></g>
        <g transform="translate(104, 0)"><a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210905/retina.svg" target="_blank"><rect data-tippy-content="29 pageviews on 2021-09-05" class="each-day" rx="2" ry="2" width="10" height="10" x="5" y="0" fill="#ffd5d5" data-count="29" data-date="2021-09-05" data-unit="pageviews" data-retina="false" data-retinaday="20210905" data-index="38" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210906/retina.svg" target="_blank"><rect data-tippy-content="51 pageviews on 2021-09-06" class="each-day" rx="2" ry="2" width="10" height="10" x="5" y="12" fill="#ff2b2b" data-count="51" data-date="2021-09-06" data-unit="pageviews" data-retina="false" data-retinaday="20210906" data-index="37" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210907/retina.svg" target="_blank"><rect data-tippy-content="86 pageviews on 2021-09-07" class="each-day" rx="2" ry="2" width="10" height="10" x="5" y="24" fill="#ff0000" data-count="86" data-date="2021-09-07" data-unit="pageviews" data-retina="false" data-retinaday="20210907" data-index="36" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210908/retina.svg" target="_blank"><rect data-tippy-content="69 pageviews on 2021-09-08" class="each-day" rx="2" ry="2" width="10" height="10" x="5" y="36" fill="#ff2b2b" data-count="69" data-date="2021-09-08" data-unit="pageviews" data-retina="false" data-retinaday="20210908" data-index="35" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210909/retina.svg" target="_blank"><rect data-tippy-content="38 pageviews on 2021-09-09" class="each-day" rx="2" ry="2" width="10" height="10" x="5" y="48" fill="#ff8080" data-count="38" data-date="2021-09-09" data-unit="pageviews" data-retina="false" data-retinaday="20210909" data-index="34" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210910/retina.svg" target="_blank"><rect data-tippy-content="90 pageviews on 2021-09-10" class="each-day" rx="2" ry="2" width="10" height="10" x="5" y="60" fill="#ff0000" data-count="90" data-date="2021-09-10" data-unit="pageviews" data-retina="false" data-retinaday="20210910" data-index="33" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210911/retina.svg" target="_blank"><rect data-tippy-content="16 pageviews on 2021-09-11" class="each-day" rx="2" ry="2" width="10" height="10" x="5" y="72" fill="#ffd5d5" data-count="16" data-date="2021-09-11" data-unit="pageviews" data-retina="false" data-retinaday="20210911" data-index="32" /></a></g>
        <g transform="translate(117, 0)"><a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210912/retina.svg" target="_blank"><rect data-tippy-content="27 pageviews on 2021-09-12" class="each-day" rx="2" ry="2" width="10" height="10" x="4" y="0" fill="#ffd5d5" data-count="27" data-date="2021-09-12" data-unit="pageviews" data-retina="false" data-retinaday="20210912" data-index="31" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210913/retina.svg" target="_blank"><rect data-tippy-content="59 pageviews on 2021-09-13" class="each-day" rx="2" ry="2" width="10" height="10" x="4" y="12" fill="#ff2b2b" data-count="59" data-date="2021-09-13" data-unit="pageviews" data-retina="false" data-retinaday="20210913" data-index="30" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210914/retina.svg" target="_blank"><rect data-tippy-content="104 pageviews on 2021-09-14" class="each-day" rx="2" ry="2" width="10" height="10" x="4" y="24" fill="#ff0000" data-count="104" data-date="2021-09-14" data-unit="pageviews" data-retina="false" data-retinaday="20210914" data-index="29" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210915/retina.svg" target="_blank"><rect data-tippy-content="80 pageviews on 2021-09-15" class="each-day" rx="2" ry="2" width="10" height="10" x="4" y="36" fill="#ff0000" data-count="80" data-date="2021-09-15" data-unit="pageviews" data-retina="false" data-retinaday="20210915" data-index="28" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210916/retina.svg" target="_blank"><rect data-tippy-content="76 pageviews on 2021-09-16" class="each-day" rx="2" ry="2" width="10" height="10" x="4" y="48" fill="#ff0000" data-count="76" data-date="2021-09-16" data-unit="pageviews" data-retina="false" data-retinaday="20210916" data-index="27" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210917/retina.svg" target="_blank"><rect data-tippy-content="85 pageviews on 2021-09-17" class="each-day" rx="2" ry="2" width="10" height="10" x="4" y="60" fill="#ff0000" data-count="85" data-date="2021-09-17" data-unit="pageviews" data-retina="false" data-retinaday="20210917" data-index="26" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210918/retina.svg" target="_blank"><rect data-tippy-content="135 pageviews on 2021-09-18" class="each-day" rx="2" ry="2" width="10" height="10" x="4" y="72" fill="#ff0000" data-count="135" data-date="2021-09-18" data-unit="pageviews" data-retina="false" data-retinaday="20210918" data-index="25" /></a></g>
        <g transform="translate(130, 0)"><a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210919/retina.svg" target="_blank"><rect data-tippy-content="32 pageviews on 2021-09-19" class="each-day" rx="2" ry="2" width="10" height="10" x="3" y="0" fill="#ff8080" data-count="32" data-date="2021-09-19" data-unit="pageviews" data-retina="false" data-retinaday="20210919" data-index="24" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210920/retina.svg" target="_blank"><rect data-tippy-content="34 pageviews on 2021-09-20" class="each-day" rx="2" ry="2" width="10" height="10" x="3" y="12" fill="#ff8080" data-count="34" data-date="2021-09-20" data-unit="pageviews" data-retina="false" data-retinaday="20210920" data-index="23" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210921/retina.svg" target="_blank"><rect data-tippy-content="76 pageviews on 2021-09-21" class="each-day" rx="2" ry="2" width="10" height="10" x="3" y="24" fill="#ff0000" data-count="76" data-date="2021-09-21" data-unit="pageviews" data-retina="false" data-retinaday="20210921" data-index="22" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210922/retina.svg" target="_blank"><rect data-tippy-content="73 pageviews on 2021-09-22" class="each-day" rx="2" ry="2" width="10" height="10" x="3" y="36" fill="#ff0000" data-count="73" data-date="2021-09-22" data-unit="pageviews" data-retina="false" data-retinaday="20210922" data-index="21" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210923/retina.svg" target="_blank"><rect data-tippy-content="14 pageviews on 2021-09-23" class="each-day" rx="2" ry="2" width="10" height="10" x="3" y="48" fill="#ffd5d5" data-count="14" data-date="2021-09-23" data-unit="pageviews" data-retina="false" data-retinaday="20210923" data-index="20" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210924/retina.svg" target="_blank"><rect data-tippy-content="95 pageviews on 2021-09-24" class="each-day" rx="2" ry="2" width="10" height="10" x="3" y="60" fill="#ff0000" data-count="95" data-date="2021-09-24" data-unit="pageviews" data-retina="false" data-retinaday="20210924" data-index="19" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210925/retina.svg" target="_blank"><rect data-tippy-content="44 pageviews on 2021-09-25" class="each-day" rx="2" ry="2" width="10" height="10" x="3" y="72" fill="#ff8080" data-count="44" data-date="2021-09-25" data-unit="pageviews" data-retina="false" data-retinaday="20210925" data-index="18" /></a></g>
        <g transform="translate(143, 0)"><a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210926/retina.svg" target="_blank"><rect data-tippy-content="73 pageviews on 2021-09-26" class="each-day" rx="2" ry="2" width="10" height="10" x="2" y="0" fill="#ff0000" data-count="73" data-date="2021-09-26" data-unit="pageviews" data-retina="false" data-retinaday="20210926" data-index="17" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210927/retina.svg" target="_blank"><rect data-tippy-content="110 pageviews on 2021-09-27" class="each-day" rx="2" ry="2" width="10" height="10" x="2" y="12" fill="#ff0000" data-count="110" data-date="2021-09-27" data-unit="pageviews" data-retina="false" data-retinaday="20210927" data-index="16" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210928/retina.svg" target="_blank"><rect data-tippy-content="113 pageviews on 2021-09-28" class="each-day" rx="2" ry="2" width="10" height="10" x="2" y="24" fill="#ff0000" data-count="113" data-date="2021-09-28" data-unit="pageviews" data-retina="false" data-retinaday="20210928" data-index="15" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210929/retina.svg" target="_blank"><rect data-tippy-content="81 pageviews on 2021-09-29" class="each-day" rx="2" ry="2" width="10" height="10" x="2" y="36" fill="#ff0000" data-count="81" data-date="2021-09-29" data-unit="pageviews" data-retina="false" data-retinaday="20210929" data-index="14" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20210930/retina.svg" target="_blank"><rect data-tippy-content="95 pageviews on 2021-09-30" class="each-day" rx="2" ry="2" width="10" height="10" x="2" y="48" fill="#ff0000" data-count="95" data-date="2021-09-30" data-unit="pageviews" data-retina="false" data-retinaday="20210930" data-index="13" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20211001/retina.svg" target="_blank"><rect data-tippy-content="99 pageviews on 2021-10-01" class="each-day" rx="2" ry="2" width="10" height="10" x="2" y="60" fill="#ff0000" data-count="99" data-date="2021-10-01" data-unit="pageviews" data-retina="false" data-retinaday="20211001" data-index="12" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20211002/retina.svg" target="_blank"><rect data-tippy-content="18 pageviews on 2021-10-02" class="each-day" rx="2" ry="2" width="10" height="10" x="2" y="72" fill="#ffd5d5" data-count="18" data-date="2021-10-02" data-unit="pageviews" data-retina="false" data-retinaday="20211002" data-index="11" /></a></g>
        <g transform="translate(156, 0)"><a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20211003/retina.svg" target="_blank"><rect data-tippy-content="19 pageviews on 2021-10-03" class="each-day" rx="2" ry="2" width="10" height="10" x="1" y="0" fill="#ffd5d5" data-count="19" data-date="2021-10-03" data-unit="pageviews" data-retina="false" data-retinaday="20211003" data-index="10" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20211004/retina.svg" target="_blank"><rect data-tippy-content="88 pageviews on 2021-10-04" class="each-day" rx="2" ry="2" width="10" height="10" x="1" y="12" fill="#ff0000" data-count="88" data-date="2021-10-04" data-unit="pageviews" data-retina="false" data-retinaday="20211004" data-index="9" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20211005/retina.svg" target="_blank"><rect data-tippy-content="116 pageviews on 2021-10-05" class="each-day" rx="2" ry="2" width="10" height="10" x="1" y="24" fill="#ff0000" data-count="116" data-date="2021-10-05" data-unit="pageviews" data-retina="false" data-retinaday="20211005" data-index="8" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20211006/retina.svg" target="_blank"><rect data-tippy-content="105 pageviews on 2021-10-06" class="each-day" rx="2" ry="2" width="10" height="10" x="1" y="36" fill="#ff0000" data-count="105" data-date="2021-10-06" data-unit="pageviews" data-retina="false" data-retinaday="20211006" data-index="7" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20211007/retina.svg" target="_blank"><rect data-tippy-content="116 pageviews on 2021-10-07" class="each-day" rx="2" ry="2" width="10" height="10" x="1" y="48" fill="#ff0000" data-count="116" data-date="2021-10-07" data-unit="pageviews" data-retina="false" data-retinaday="20211007" data-index="6" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20211008/retina.svg" target="_blank"><rect data-tippy-content="152 pageviews on 2021-10-08" class="each-day" rx="2" ry="2" width="10" height="10" x="1" y="60" fill="#ff0000" data-count="152" data-date="2021-10-08" data-unit="pageviews" data-retina="false" data-retinaday="20211008" data-index="5" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20211009/retina.svg" target="_blank"><rect data-tippy-content="35 pageviews on 2021-10-09" class="each-day" rx="2" ry="2" width="10" height="10" x="1" y="72" fill="#ff8080" data-count="35" data-date="2021-10-09" data-unit="pageviews" data-retina="false" data-retinaday="20211009" data-index="4" /></a></g>
        <g transform="translate(169, 0)"><a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20211010/retina.svg" target="_blank"><rect data-tippy-content="20 pageviews on 2021-10-10" class="each-day" rx="2" ry="2" width="10" height="10" x="0" y="0" fill="#ffd5d5" data-count="20" data-date="2021-10-10" data-unit="pageviews" data-retina="false" data-retinaday="20211010" data-index="3" /></a>
        <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20211011/retina.svg" target="_blank"><rect data-tippy-content="119 pageviews on 2021-10-11" class="each-day" rx="2" ry="2" width="10" height="10" x="0" y="12" fill="#ff0000" data-count="119" data-date="2021-10-11" data-unit="pageviews" data-retina="false" data-retinaday="20211011" data-index="2" /></a>
        
              <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews/20211012/retina.svg" target="_blank"><rect class="each-day" rx="2" ry="2" width="10" height="10" x="0" y="24" fill="#ffd5d5" data-count="10" data-date="2021-10-12" data-unit="pageviews" data-retina="true" data-retinaday="20211012" data-index="1" /></a>
        </g><text x="13" y="-5" class="month">7</text><text x="39" y="-5" class="month">8</text><text x="104" y="-5" class="month">9</text><text x="156" y="-5" class="month">10</text>
            
          
            
          
            
          
            
          
        <g transform="translate(109 , 3)">
          <rect class="day" rx="2" ry="2" width="11" height="11" x="0" y="99" fill="#eeeeee"/>
        </g>
        <g transform="translate(124 , 3)">
          <rect class="day" rx="2" ry="2" width="11" height="11" x="0" y="99" fill="#ffd5d5"/>
        </g>
        <g transform="translate(139 , 3)">
          <rect class="day" rx="2" ry="2" width="11" height="11" x="0" y="99" fill="#ff8080"/>
        </g>
        <g transform="translate(154 , 3)">
          <rect class="day" rx="2" ry="2" width="11" height="11" x="0" y="99" fill="#ff2b2b"/>
        </g>
        <g transform="translate(169 , 3)">
          <rect class="day" rx="2" ry="2" width="11" height="11" x="0" y="99" fill="#ff0000"/>
        </g>
    
    <a href="https://pixe.la/v1/users/swfz/graphs/til-pageviews.html" target="_blank">
    <g>
    
    <rect x="5" y="93" width="23px" height="22px" fill="white" fill-opacity="0.5" stroke="none"/>
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" x="5" y="93" width="23px" height="22px" viewBox="0 0 7600 7480" preserveAspectRatio="xMidYMid meet">
    <g id="layer101" fill="#000000" stroke="none">
     <path d="M4580 6976 l0 -506 943 0 942 1 -90 86 c-416 396 -983 712 -1565 871 -80 22 -164 43 -187 47 l-43 7 0 -506z"/>
     <path d="M2290 6970 l0 -500 500 0 500 0 0 500 0 500 -500 0 -500 0 0 -500z"/>
     <path d="M3430 6970 l0 -500 505 0 505 0 0 500 0 500 -505 0 -505 0 0 -500z"/>
     <path d="M1140 5830 l0 -500 505 0 505 0 0 500 0 500 -505 0 -505 0 0 -500z"/>
     <path d="M2290 5830 l0 -500 500 0 500 0 0 500 0 500 -500 0 -500 0 0 -500z"/>
     <path d="M3430 5830 l0 -500 505 0 505 0 0 500 0 500 -505 0 -505 0 0 -500z"/>
     <path d="M4580 5830 l0 -500 1339 0 1340 0 -31 68 c-136 291 -353 622 -577 879 l-46 53 -1012 0 -1013 0 0 -500z"/>
     <path d="M0 4690 l0 -500 500 0 500 0 0 500 0 500 -500 0 -500 0 0 -500z"/>
     <path d="M1140 4690 l0 -500 505 0 505 0 0 500 0 500 -505 0 -505 0 0 -500z"/>
     <path d="M2290 4690 l0 -500 500 0 500 0 0 500 0 500 -500 0 -500 0 0 -500z"/>
     <path d="M3430 4690 l0 -500 505 0 505 0 0 500 0 500 -505 0 -505 0 0 -500z"/>
     <path d="M4580 4690 l0 -500 1493 0 1494 0 -13 98 c-39 285 -112 578 -206 824 l-30 78 -1369 0 -1369 0 0 -500z"/>
     <path d="M4585 4015 c17 -13 77 -61 134 -106 132 -104 329 -294 437 -424 492 -587 701 -1285 573 -1920 -105 -520 -440 -980 -940 -1290 -179 -111 -348 -184 -559 -241 -118 -32 -121 -34 -60 -29 414 36 978 220 1415 464 559 312 1053 760 1394 1266 327 485 519 978 596 1535 19 135 31 515 20 652 l-7 96 -431 6 c-238 3 -920 8 -1517 10 l-1085 4 30 -23z"/>
     <path d="M2588 3995 c-632 -106 -1113 -500 -1318 -1080 -78 -220 -112 -477 -92 -687 28 -287 109 -486 261 -639 64 -64 93 -85 181 -127 246 -120 506 -142 733 -64 143 49 258 142 342 277 l44 70 -6 1133 -6 1132 -31 -1 c-17 -1 -66 -7 -108 -14z"/>
     <path d="M4816 3533 c252 -329 378 -768 334 -1164 -89 -814 -732 -1387 -1430 -1274 -273 45 -534 181 -807 424 -50 44 -94 81 -96 81 -2 0 -21 -28 -43 -62 -148 -241 -441 -371 -762 -338 -125 13 -250 48 -361 101 -46 22 -85 38 -87 36 -5 -5 82 -203 121 -274 290 -533 803 -884 1450 -994 156 -27 440 -36 600 -20 484 49 897 229 1214 526 436 411 655 1005 590 1603 -49 456 -277 917 -642 1298 -91 95 -133 125 -81 57z"/>
     <path d="M3950 2715 c-108 -30 -194 -109 -238 -218 -33 -83 -29 -205 10 -289 128 -275 524 -274 654 1 50 104 41 254 -21 350 -85 133 -254 198 -405 156z"/>
     </g>
    <g id="layer102" fill="#226727" stroke="none">
     <path d="M4580 6975 l0 -505 943 0 942 1 -80 76 c-370 353 -861 646 -1366 817 -126 42 -397 116 -426 116 -10 0 -13 -106 -13 -505z"/>
     <path d="M2290 6970 l0 -500 500 0 500 0 0 500 0 500 -500 0 -500 0 0 -500z"/>
     <path d="M3430 6970 l0 -500 505 0 505 0 0 500 0 500 -505 0 -505 0 0 -500z"/>
     <path d="M1140 5830 l0 -500 505 0 505 0 0 500 0 500 -505 0 -505 0 0 -500z"/>
     <path d="M2290 5830 l0 -500 500 0 500 0 0 500 0 500 -500 0 -500 0 0 -500z"/>
     <path d="M3437 6323 c-4 -3 -7 -228 -7 -500 l0 -493 505 0 505 0 0 500 0 500 -498 0 c-274 0 -502 -3 -505 -7z"/>
     <path d="M4580 5830 l0 -500 1340 0 1340 0 -69 139 c-151 301 -331 568 -559 829 l-28 32 -1012 0 -1012 0 0 -500z"/>
     <path d="M0 4690 l0 -500 500 0 500 0 0 500 0 500 -500 0 -500 0 0 -500z"/>
     <path d="M1140 4690 l0 -500 505 0 505 0 0 500 0 500 -505 0 -505 0 0 -500z"/>
     <path d="M2290 4690 l0 -500 500 0 500 0 0 500 0 500 -500 0 -500 0 0 -500z"/>
     <path d="M3430 4690 l0 -500 505 0 505 0 0 500 0 500 -505 0 -505 0 0 -500z"/>
     <path d="M4580 4690 l0 -500 1493 0 1494 0 -13 98 c-38 281 -113 581 -206 824 l-30 78 -1369 0 -1369 0 0 -500z"/>
     <path d="M4560 4036 c0 -1 55 -45 123 -96 169 -130 447 -410 568 -572 427 -572 598 -1215 478 -1802 -103 -508 -405 -938 -879 -1251 -207 -137 -385 -217 -620 -281 -117 -32 -121 -34 -60 -28 361 31 851 179 1245 376 1234 615 2060 1764 2175 3028 11 127 13 438 4 541 l-7 67 -441 6 c-475 6 -2586 16 -2586 12z"/>
     <path d="M2585 3994 c-404 -72 -708 -230 -964 -500 -457 -483 -585 -1259 -292 -1769 51 -90 170 -202 266 -252 281 -146 602 -160 846 -38 88 45 196 146 254 239 l44 71 -6 1133 -6 1132 -31 -1 c-17 0 -67 -7 -111 -15z"/>
     <path d="M4800 3568 c0 -4 30 -52 66 -105 364 -540 390 -1210 66 -1753 -270 -454 -738 -691 -1212 -615 -267 44 -538 185 -797 415 -56 49 -104 90 -106 90 -2 0 -21 -27 -41 -60 -213 -345 -689 -447 -1125 -239 -46 22 -85 38 -87 36 -2 -1 19 -54 45 -116 285 -660 890 -1085 1666 -1171 209 -23 514 -6 732 41 212 46 482 154 653 261 297 188 551 473 705 793 331 691 215 1495 -312 2153 -76 95 -252 283 -253 270z"/>
     </g>
    <g id="layer103" fill="#48a245" stroke="none">
     <path d="M3430 6970 l0 -500 505 0 505 0 0 500 0 500 -505 0 -505 0 0 -500z"/>
     <path d="M1140 5830 l0 -500 505 0 505 0 0 500 0 500 -505 0 -505 0 0 -500z"/>
     <path d="M2290 5830 l0 -500 500 0 500 0 0 500 0 500 -500 0 -500 0 0 -500z"/>
     <path d="M4580 5830 l0 -500 1340 0 1341 0 -80 158 c-132 261 -296 508 -490 739 l-86 103 -1012 0 -1013 0 0 -500z"/>
     <path d="M0 4690 l0 -500 500 0 500 0 0 500 0 500 -500 0 -500 0 0 -500z"/>
     <path d="M1140 4690 l0 -500 505 0 505 0 0 500 0 500 -505 0 -505 0 0 -500z"/>
     <path d="M3438 4690 l-3 -500 503 0 502 0 0 500 0 500 -500 0 -500 0 -2 -500z"/>
     <path d="M4580 4690 l0 -500 1493 0 1494 0 -13 98 c-38 281 -113 581 -206 824 l-30 78 -1369 0 -1369 0 0 -500z"/>
     <path d="M2585 3994 c-404 -72 -708 -230 -964 -500 -457 -483 -585 -1259 -292 -1769 51 -90 170 -202 266 -252 281 -146 602 -160 846 -38 88 45 196 146 254 239 l44 71 -6 1133 -6 1132 -31 -1 c-17 0 -67 -7 -111 -15z"/>
     <path d="M4800 3568 c0 -4 30 -52 66 -105 364 -540 390 -1210 66 -1753 -270 -454 -738 -691 -1212 -615 -267 44 -538 185 -797 415 -56 49 -104 90 -106 90 -2 0 -21 -27 -41 -60 -213 -345 -689 -447 -1125 -239 -46 22 -85 38 -87 36 -2 -1 19 -54 45 -116 285 -660 890 -1085 1666 -1171 209 -23 514 -6 732 41 212 46 482 154 653 261 297 188 551 473 705 793 331 691 215 1495 -312 2153 -76 95 -252 283 -253 270z"/>
     </g>
    <g id="layer104" fill="#8ec56a" stroke="none">
     <path d="M3437 7463 c-4 -3 -7 -228 -7 -500 l0 -493 505 0 505 0 0 500 0 500 -498 0 c-274 0 -502 -3 -505 -7z"/>
     <path d="M2290 5830 l0 -500 500 0 500 0 0 500 0 500 -500 0 -500 0 0 -500z"/>
     <path d="M0 4690 l0 -500 500 0 500 0 0 500 0 500 -500 0 -500 0 0 -500z"/>
     <path d="M1140 4690 l0 -500 505 0 505 0 0 500 0 500 -505 0 -505 0 0 -500z"/>
     <path d="M4580 4690 l0 -500 1490 0 1490 0 0 34 c0 55 -48 325 -85 474 -32 131 -88 311 -135 435 l-21 57 -1370 0 -1369 0 0 -500z"/>
     <path d="M2585 3994 c-404 -72 -708 -230 -964 -500 -457 -483 -585 -1259 -292 -1769 51 -90 170 -202 266 -252 281 -146 602 -160 846 -38 88 45 196 146 254 239 l44 71 -6 1133 -6 1132 -31 -1 c-17 0 -67 -7 -111 -15z"/>
     <path d="M4800 3568 c0 -4 30 -51 67 -105 126 -187 220 -410 265 -635 32 -161 32 -434 0 -593 -107 -537 -442 -949 -892 -1099 -437 -145 -915 -2 -1356 407 -34 31 -64 57 -66 57 -3 0 -21 -26 -41 -59 -141 -227 -369 -345 -667 -344 -178 1 -321 34 -474 110 l-69 35 7 -29 c13 -50 93 -222 147 -311 323 -542 887 -884 1574 -953 73 -7 188 -10 295 -6 697 23 1280 330 1635 862 489 733 423 1652 -174 2395 -77 95 -250 281 -251 268z"/>
     </g>
    <g id="layer105" fill="#d6e58a" stroke="none">
     <path d="M2290 5830 l0 -500 500 0 500 0 0 500 0 500 -500 0 -500 0 0 -500z"/>
     <path d="M0 4690 l0 -500 500 0 500 0 0 500 0 500 -500 0 -500 0 0 -500z"/>
     <path d="M2640 4003 c-118 -19 -252 -51 -339 -80 -383 -127 -694 -376 -893 -713 -297 -502 -315 -1155 -43 -1536 67 -94 146 -159 260 -214 274 -134 588 -143 818 -23 91 47 219 172 264 258 l32 60 -6 1128 -6 1127 -31 -1 c-17 -1 -42 -4 -56 -6z"/>
     </g>
    </svg>
    </g>
    </a>
    
        <text class="legend" x="93" y="113">0</text>
        <text class="legend" x="188" y="112">+</text></g>
    </svg>`

export const handlers = [
  http.get("https://pixe.la/v1/users/swfz/graphs/til-pageviews", async () => {
    const encoder = new TextEncoder()
    const svgBuffer = encoder.encode(svgContent).buffer

    return new HttpResponse(svgBuffer)
  }),

  http.post("https://*.algolia.net/1/indexes/*/queries", async ({ request }: { request: Request }) => {
    const empty = query0Words // First Request: 初回読み込み時に空のクエリでリクエストが走る

    const wordCountResponseMap = [
      empty, // 空
      query1Words, // B
      query2Words, // Bi
      query3Words, // Big
      query4Words, // BigQ
      query5Words, // BigQu
      query6Words, // BigQue
      query7Words, // BigQuer
      query8Words, // BigQuery
    ]

    const bodyString = await request.text()

    if (bodyString.length === 0) {
      return HttpResponse.json(empty)
    }

    const body = JSON.parse(bodyString)
    const params = [...new URLSearchParams(body.requests[0].params).entries()].reduce(
      (obj, e) => ({ ...obj, [e[0]]: e[1] }),
      {} as { query: string }
    )

    if (!params.query || params.query.length === 0 || params.query.length > wordCountResponseMap.length) {
      return HttpResponse.json(empty)
    }

    return HttpResponse.json(wordCountResponseMap[params.query.length])
  }),

  http.get("/api/like", ({ request }: { request: Request }) => {
    const url = new URL(request.url.toString())
    const slug = url.searchParams.get("slug")

    const count = slug?.match("samples") ? 2 : 0
    const likes = { results: [{ c: count }] }

    return new HttpResponse(JSON.stringify(likes))
  }),
]
